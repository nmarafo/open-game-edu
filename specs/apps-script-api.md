# Especificación Técnica: Apps Script API y Menú Nativo (apps-script-api)

Esta especificación describe los puntos de entrada, el disparador `onOpen()`, las funciones RPC para el flujo de revisión de propuestas y la arquitectura de la Web App en Google Apps Script.

---

## 1. Menú Nativo en Google Sheets (`onOpen`)

El archivo monolítico `Codigo.gs` debe implementar el disparador `onOpen()` para dotar a la hoja de cálculo de herramientas de previsualización y revisión accesibles con un solo clic:

```javascript
/**
 * Disparador automático al abrir la hoja de Google Sheets.
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('🎮 open-game-edu')
    .addItem('▶️ Run / Previsualizar Juego', 'mostrarJuegoModal')
    .addItem('📋 Panel de Revisión de Propuestas', 'mostrarPanelRevision')
    .addSeparator()
    .addItem('⚙️ Reinicializar Ecosistema', 'inicializarEcosistema')
    .addToUi();
}

/**
 * Abre una ventana modal flotante en Google Sheets con el juego interactivo en vivo.
 */
function mostrarJuegoModal() {
  var datosJuego = obtenerDatosJuego();
  var html = getGameHtml(JSON.stringify(datosJuego));
  var modal = HtmlService.createHtmlOutput(html)
    .setWidth(820)
    .setHeight(640);
  SpreadsheetApp.getUi().showModalDialog(modal, '🎮 Previsualización del Videojuego');
}
```

---

## 2. Funciones Backend de Inserción y Revisión (RPC)

Para soportar el envío de propuestas desde el formulario web y su posterior moderación por el docente:

```javascript
/**
 * Guarda una nueva propuesta de reto en la hoja indicada con estado PENDIENTE.
 * @param {string} nombreMateria - Nombre de la pestaña (ej. "Lengua_Teatro")
 * @param {Object} reto - Datos del reto enviados desde el formulario web
 * @return {Object} Respuesta con estado de éxito o error
 */
function guardarPropuestaReto(nombreMateria, reto) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var hoja = ss.getSheetByName(nombreMateria);
    if (!hoja) throw new Error('No se encontró la pestaña: ' + nombreMateria);

    var nuevoId = reto.ID || (nombreMateria.substring(0, 3).toUpperCase() + '_' + Utilities.getUuid().substring(0, 4));
    
    var nuevaFila = [
      nuevoId,
      reto.Etapa_O_Lugar || 'Nuevo Escenario',
      reto.Criterio_Evaluacion || '',
      reto.Saber_Basico || '',
      reto.Autor_O_Equipo || 'Estudiante Anónimo',
      'PENDIENTE', // Siempre entra como PENDIENTE de revisión
      '',          // Feedback_Docente vacío inicialmente
      reto.Emisor_O_Personaje || 'Guía',
      reto.Texto_Narrativo || '',
      reto.Opcion_A || '',
      reto.Opcion_B || '',
      reto.Opcion_C || '',
      (reto.Respuesta_Correcta || 'A').toUpperCase(),
      reto.Feedback_Didactico || '',
      parseInt(reto.Puntos, 10) || 25
    ];

    hoja.appendRow(nuevaFila);
    return { ok: true, id: nuevoId, mensaje: 'Propuesta enviada con éxito. Pendiente de aprobación docente.' };
  } catch(err) {
    return { ok: false, error: err.message };
  }
}

/**
 * Actualiza el estado de revisión de un reto (Aprobar o Solicitar Cambios).
 */
function cambiarEstadoReto(nombreMateria, idReto, nuevoEstado, feedbackDocente) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var hoja = ss.getSheetByName(nombreMateria);
  if (!hoja) return { ok: false, error: 'Hoja no encontrada' };

  var datos = hoja.getDataRange().getValues();
  for (var i = 1; i < datos.length; i++) {
    if (String(datos[i][0]).trim() === String(idReto).trim()) {
      var filaNum = i + 1;
      hoja.getRange(filaNum, 6).setValue(nuevoEstado); // Columna F: Estado_Revision
      if (feedbackDocente) {
        hoja.getRange(filaNum, 7).setValue(feedbackDocente); // Columna G: Feedback_Docente
      }
      return { ok: true, mensaje: 'Reto actualizado a ' + nuevoEstado };
    }
  }
  return { ok: false, error: 'ID no encontrado' };
}
```

---

## 3. Extractor de Datos con Filtrado de Calidad: `obtenerDatosJuego()`

```javascript
/**
 * Lee las pestañas y estructura los datos para la Web App.
 * @return {Object} Paquete con { meta: {...}, materias: {...} }
 */
function obtenerDatosJuego() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var hojas = ss.getSheets();
  var resultado = { meta: {}, materias: {} };

  for (var h = 0; h < hojas.length; h++) {
    var hoja = hojas[h];
    var nombre = hoja.getName();
    var datos = hoja.getDataRange().getValues();
    if (datos.length === 0) continue;

    if (nombre === 'Config_Juego') {
      for (var r = 1; r < datos.length; r++) {
        var k = String(datos[r][0] || '').trim();
        if (k) resultado.meta[k] = datos[r][1];
      }
    } else {
      var cabeceras = datos[0].map(function(c) { return String(c || '').trim(); });
      var filas = [];

      for (var f = 1; f < datos.length; f++) {
        var fila = datos[f];
        var tieneContenido = fila.some(function(celda) { return celda !== '' && celda !== null; });
        if (!tieneContenido) continue;

        var obj = {};
        for (var c = 0; c < cabeceras.length; c++) {
          obj[cabeceras[c]] = fila[c];
        }
        filas.push(obj);
      }
      resultado.materias[nombre] = filas;
    }
  }
  return resultado;
}
```

---

## 4. Servidor Web App: `doGet(e)`

La función `doGet(e)` despacha la aplicación web inyectando los datos de las hojas, sirviendo tanto el formulario de propuestas como el botón **RUN** para previsualizar el juego en vivo.
