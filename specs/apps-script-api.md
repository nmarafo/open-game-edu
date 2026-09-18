# Especificación Técnica: Apps Script API y Despliegue Web (apps-script-api)

Esta especificación describe el protocolo del backend en Google Apps Script, el funcionamiento del punto de entrada `doGet(e)` y la arquitectura de inyección de datos para servir el videojuego educativo como Web App sin servidores externos.

---

## 1. Ciclo de Vida del Backend

El backend en Apps Script cumple dos funciones fundamentales:
1. **Instalador y configurador de la base de datos** (`inicializarEcosistema`).
2. **Servidor HTTP y despachador de la Web App** (`doGet`).

```
[Navegador del Alumno]
        │
        ▼ HTTP GET
┌────────────────────────────────────────────────────────┐
│                      doGet(e)                          │
├────────────────────────────────────────────────────────┤
│ ¿e.parameter.action === 'data'?                        │
│   ├── SI  ──► ContentService (JSON crudo de las hojas) │
│   └── NO  ──► HtmlService (Web App con datos inyectados)│
└────────────────────────────────────────────────────────┘
        │
        ▼
[Lectura de Google Sheets: obtenerDatosJuego()]
```

---

## 2. Implementación Canónica de `doGet(e)`

```javascript
/**
 * Punto de entrada HTTP GET para la Aplicación Web.
 * @param {Object} e - Objeto de evento de Apps Script.
 * @return {GoogleAppsScript.HTML.HtmlOutput|GoogleAppsScript.Content.TextOutput}
 */
function doGet(e) {
  try {
    var datosJuego = obtenerDatosJuego();

    // Modo API: si se solicita ?action=data, responde JSON crudo
    if (e && e.parameter && e.parameter.action === 'data') {
      return ContentService.createTextOutput(JSON.stringify(datosJuego))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Modo Web App: genera el HTML e inyecta los datos directamente
    var datosJsonString = JSON.stringify(datosJuego);
    var htmlContent = getGameHtml(datosJsonString);

    var output = HtmlService.createHtmlOutput(htmlContent);
    
    // Título de la pestaña del navegador
    var titulo = (datosJuego.meta && datosJuego.meta.TITULO_JUEGO) 
      ? datosJuego.meta.TITULO_JUEGO 
      : 'Aventura Educativa Interdepartamental';
    
    output.setTitle(titulo);
    output.addMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    
    // Permite embeber el juego en Google Sites, Moodle o Classroom mediante iframes
    output.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);

    return output;
  } catch (error) {
    return HtmlService.createHtmlOutput(
      '<div style="font-family:sans-serif;padding:24px;color:#c62828;">' +
      '<h2>Error cargando el juego educativo</h2>' +
      '<p>Asegúrate de haber ejecutado <code>inicializarEcosistema()</code> primero.</p>' +
      '<pre>' + error.message + '\n' + error.stack + '</pre></div>'
    );
  }
}
```

---

## 3. Extractor Universal de Datos: `obtenerDatosJuego()`

Esta función recorre dinámicamente todas las pestañas existentes en la hoja y las empaqueta en una estructura JSON limpia:

```javascript
/**
 * Lee todas las pestañas de la hoja y las convierte en un objeto JSON unificado.
 * @return {Object} Estructura con { meta: {...}, materias: { NombrePestana: [filas...] } }
 */
function obtenerDatosJuego() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var hojas = ss.getSheets();
  var resultado = {
    meta: {},
    materias: {}
  };

  for (var h = 0; h < hojas.length; h++) {
    var hoja = hojas[h];
    var nombreHoja = hoja.getName();
    var datos = hoja.getDataRange().getValues();

    if (datos.length === 0) continue;

    // Caso Especial: Pestaña de Configuración (Clave - Valor)
    if (nombreHoja === 'Config_Juego') {
      for (var r = 1; r < datos.length; r++) {
        var clave = String(datos[r][0] || '').trim();
        var valor = datos[r][1];
        if (clave) {
          resultado.meta[clave] = valor;
        }
      }
      continue;
    }

    // Pestañas de Materias: Fila 1 son las cabeceras, Filas 2..N son objetos
    var cabeceras = datos[0].map(function(c) { return String(c || '').trim(); });
    var filas = [];

    for (var f = 1; f < datos.length; f++) {
      var filaActual = datos[f];
      // Ignorar filas completamente vacías
      var tieneContenido = filaActual.some(function(celda) { return celda !== '' && celda !== null; });
      if (!tieneContenido) continue;

      var filaObjeto = {};
      for (var c = 0; c < cabeceras.length; c++) {
        var key = cabeceras[c] || ('columna_' + (c + 1));
        var val = filaActual[c];
        
        // Formatear fechas si fuera necesario
        if (val instanceof Date) {
          val = Utilities.formatDate(val, Session.getScriptTimeZone(), 'yyyy-MM-dd');
        }
        filaObjeto[key] = val;
      }
      filas.push(filaObjeto);
    }

    resultado.materias[nombreHoja] = filas;
  }

  return resultado;
}
```

---

## 4. Técnica de Inyección Instantánea (Bootstrap Zero-Latency)

En lugar de que el cliente realice una petición asíncrona adicional con `google.script.run` (la cual puede tardar entre 2 y 6 segundos por la latencia de Apps Script), los datos de la hoja se incrustan como una variable global dentro del `<script>` del juego:

```javascript
function getGameHtml(datosJsonString) {
  return '<!DOCTYPE html>\n' +
    '<html lang="es">\n' +
    '<head>\n' +
    '  <meta charset="UTF-8">\n' +
    '  <style>/* Estilos CSS del juego */</style>\n' +
    '</head>\n' +
    '<body>\n' +
    '  <div id="app"></div>\n' +
    '  <script>\n' +
    '    // Inyección de datos desde el backend sin llamadas asíncronas lentas:\n' +
    '    window.GAME_DATA = ' + datosJsonString + ';\n' +
    '    // Iniciar el motor:\n' +
    '    window.onload = function() { iniciarMotorJuego(); };\n' +
    '  </script>\n' +
    '</body>\n' +
    '</html>';
}
```

> **Seguridad de Escapado:** `JSON.stringify(datosJuego)` en el servidor produce un literal JSON válido en JavaScript. Al estar dentro de una cadena de Apps Script, se inyecta directamente.

---

## 5. Parámetros de Despliegue en Google Workspace

Para que el videojuego esté operativo y accesible para los estudiantes:

1. En el editor de Apps Script, hacer clic en **Implementar > Nueva implementación**.
2. Seleccionar el tipo de engranaje: **Aplicación web**.
3. Configurar los campos:
   - **Descripción**: `v1 - Producción Aula`.
   - **Ejecutar como**: `Yo (tu correo docente)` *(Crucial: permite a los alumnos leer las hojas sin necesidad de tener permisos individuales de edición sobre el script)*.
   - **Quién tiene acceso**:
     - `Cualquier usuario de la organización` (si los alumnos tienen cuentas de correo de centro Google Workspace for Education).
     - `Cualquier persona` (si los alumnos acceden desde dispositivos propios sin iniciar sesión).
4. Copiar la URL generada (`https://script.google.com/macros/s/.../exec`).
