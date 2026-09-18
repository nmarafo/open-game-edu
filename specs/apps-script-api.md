# Especificación Técnica: Apps Script API, CacheService y Multijugador (apps-script-api)

Esta especificación describe los puntos de entrada HTTP, el uso de **`CacheService`** para sincronización multijugador ultra-rápida, la telemetría en `Puntuaciones_Online` y el menú nativo en Google Sheets.

---

## 1. Arquitectura de Sincronización Multijugador con `CacheService`

Google Sheets por sí solo tiene una latencia de escritura de 300-800 ms por celda. Para permitir que **30 alumnos compitan en vivo en una carrera de avatares sin provocar bloqueos de cuota**:

1. **Memoria Temporal en Servidor (`CacheService.getScriptCache()`):**
   - El estado de la carrera (`LOBBY_ROOM`) se guarda en la memoria caché de Apps Script.
   - Tiempo de respuesta de lectura/escritura: **inferior a 80 ms**.
2. **Polling Ligero del Cliente:**
   - Cada cliente o pantalla de aula consulta `doGet?action=lobby` cada 3 segundos.
   - El endpoint lee directamente de `CacheService` y devuelve únicamente un JSON con los avatares y sus casillas.
3. **Persistencia en Sheets:**
   - Las posiciones de la sala se vuelcan periódicamente en la pestaña `Lobby_Multijugador`.
   - Al cruzar la meta, la partida completa se guarda en `Puntuaciones_Online`.

---

## 2. Endpoints HTTP Canónicos (`doGet`)

```javascript
/**
 * Punto de entrada HTTP GET para la Aplicación Web.
 */
function doGet(e) {
  try {
    var accion = (e && e.parameter && e.parameter.action) || 'app';

    // 1. Endpoint Multijugador: responde con las posiciones en vivo del Lobby
    if (accion === 'lobby') {
      var estadoLobby = obtenerEstadoLobbyMemoria();
      return ContentService.createTextOutput(JSON.stringify(estadoLobby))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // 2. Endpoint de Datos Crudos: devuelve las preguntas aprobadas
    if (accion === 'data') {
      var datosJuego = obtenerDatosJuego();
      return ContentService.createTextOutput(JSON.stringify(datosJuego))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // 3. Endpoint de la Aplicación Web completa (HTML + CSS + JS)
    var datos = obtenerDatosJuego();
    var htmlContent = getGameHtml(JSON.stringify(datos));
    var output = HtmlService.createHtmlOutput(htmlContent);
    
    var titulo = (datos.meta && datos.meta.TITULO_JUEGO) 
      ? datos.meta.TITULO_JUEGO 
      : 'Videojuego Educativo Interdepartamental';
    
    output.setTitle(titulo);
    output.addMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    output.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);

    return output;
  } catch (err) {
    return HtmlService.createHtmlOutput(
      '<div style="font-family:sans-serif;padding:30px;color:#c62828;">' +
      '<h2>Error en la aplicación web</h2><p>' + err.message + '</p></div>'
    );
  }
}
```

---

## 3. Funciones RPC Backend para Multijugador y Telemetría

```javascript
/**
 * Actualiza la posición de un jugador en la memoria de la sala y en la hoja.
 */
function actualizarPosicionLobby(nombreEquipo, avatar, nuevaCasilla, puntos) {
  try {
    var cache = CacheService.getScriptCache();
    var raw = cache.get('LOBBY_STATE');
    var lobby = raw ? JSON.parse(raw) : {};

    lobby[nombreEquipo] = {
      equipo: nombreEquipo,
      avatar: avatar || '⛵',
      casilla: parseInt(nuevaCasilla, 10) || 0,
      puntos: parseInt(puntos, 10) || 0,
      timestamp: Date.now()
    };

    // Guardar en caché durante 2 horas
    cache.put('LOBBY_STATE', JSON.stringify(lobby), 7200);

    return { ok: true, lobby: lobby };
  } catch(e) {
    return { ok: false, error: e.message };
  }
}

/**
 * Lee el estado del lobby desde la memoria de alta velocidad.
 */
function obtenerEstadoLobbyMemoria() {
  var cache = CacheService.getScriptCache();
  var raw = cache.get('LOBBY_STATE');
  if (raw) return JSON.parse(raw);

  // Fallback a la hoja si la caché expiró
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var hoja = ss.getSheetByName('Lobby_Multijugador');
  var resultado = {};
  if (hoja) {
    var vals = hoja.getDataRange().getValues();
    for (var i = 1; i < vals.length; i++) {
      var eq = vals[i][1];
      if (eq) {
        resultado[eq] = {
          equipo: eq,
          avatar: vals[i][2],
          casilla: vals[i][3],
          puntos: vals[i][4],
          timestamp: Date.now()
        };
      }
    }
  }
  return resultado;
}

/**
 * Registra formalmente una partida finalizada en la pestaña Puntuaciones_Online.
 */
function registrarPartidaOnline(partida) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var hoja = ss.getSheetByName('Puntuaciones_Online');
    if (!hoja) return { ok: false, error: 'Pestaña Puntuaciones_Online no encontrada' };

    var ahora = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
    var fila = [
      ahora,
      partida.jugador || 'Anónimo',
      partida.curso || 'General',
      parseInt(partida.puntos, 10) || 0,
      parseInt(partida.vidas, 10) || 0,
      parseInt(partida.tiempo, 10) || 0,
      partida.desglose || '',
      partida.resultado || 'FINALIZADO'
    ];

    hoja.appendRow(fila);
    return { ok: true, mensaje: 'Puntuación registrada en el cuaderno docente.' };
  } catch(err) {
    return { ok: false, error: err.message };
  }
}
```

---

## 4. Menú Nativo en Google Sheets (`onOpen`)

Permite al docente gestionar las salas multijugador y previsualizar la carrera sin abandonar la hoja de cálculo:

```javascript
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('🎮 open-game-edu')
    .addItem('▶️ Run / Previsualizar Juego', 'mostrarJuegoModal')
    .addItem('🏁 Abrir Pantalla de Carrera Multijugador', 'mostrarCarreraModal')
    .addItem('📋 Panel de Revisión de Propuestas', 'mostrarPanelRevision')
    .addSeparator()
    .addItem('⚙️ Reinicializar Ecosistema', 'inicializarEcosistema')
    .addToUi();
}
```
