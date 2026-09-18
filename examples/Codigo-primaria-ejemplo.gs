// ====================================================================
// open-game-edu: Ecosistema Monolítico con Multijugador y Telemetría
// Etapa: 5.º de Educación Primaria - Decreto Curricular LOMLOE
// Materias: Conocimiento del Medio, Lengua Castellana, Matemáticas
// Modalidad: Aventura con Pista de Carrera Multijugador en Línea
// Licencia: Creative Commons Atribución-CompartirIgual 4.0 (CC BY-SA 4.0)
// Basado en proyectos de Norberto Martín Afonso (OpenDidactia / open-game-edu)
// ====================================================================

/**
 * 1. MENÚ NATIVO DE GOOGLE SHEETS (onOpen)
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('🎮 open-game-edu')
    .addItem('▶️ Run / Previsualizar Juego', 'mostrarJuegoModal')
    .addItem('🏁 Pantalla de Carrera Multijugador', 'mostrarCarreraModal')
    .addItem('📋 Panel de Revisión de Propuestas', 'mostrarPanelRevision')
    .addSeparator()
    .addItem('⚙️ Reinicializar Ecosistema', 'inicializarEcosistema')
    .addToUi();
}

/**
 * Abre el juego en una ventana modal interactiva dentro de Google Sheets.
 */
function mostrarJuegoModal() {
  var datos = obtenerDatosJuego();
  var html = HtmlService.createHtmlOutput(getGameHtml(JSON.stringify(datos)))
    .setWidth(840)
    .setHeight(660);
  SpreadsheetApp.getUi().showModalDialog(html, '🎮 Modo RUN - La Eco-Patrulla');
}

/**
 * Abre la pantalla de proyección de la Carrera Multijugador para el aula.
 */
function mostrarCarreraModal() {
  var datos = obtenerDatosJuego();
  var html = HtmlService.createHtmlOutput(getGameHtml(JSON.stringify(datos)))
    .setWidth(860)
    .setHeight(660);
  SpreadsheetApp.getUi().showModalDialog(html, '🏁 Pantalla de Carrera Multijugador en Vivo');
}

/**
 * Muestra el panel con las propuestas enviadas por el alumnado pendientes de aprobación.
 */
function mostrarPanelRevision() {
  var datos = obtenerDatosJuego();
  var html = '<!DOCTYPE html><html><head><meta charset="UTF-8"><style>' +
    'body{font-family:system-ui,sans-serif;padding:16px;background:#f8fafc;color:#1e293b;}' +
    'h2{color:#1e3a8a;margin-bottom:12px;font-size:1.2rem;}' +
    '.card{background:#fff;border:1px solid #cbd5e1;border-radius:8px;padding:12px;margin-bottom:12px;box-shadow:0 2px 4px rgba(0,0,0,0.05);}' +
    '.badge{display:inline-block;padding:3px 8px;border-radius:12px;font-size:0.75rem;font-weight:bold;background:#fef3c7;color:#92400e;}' +
    '.btn-app{background:#10b981;color:#fff;border:none;padding:6px 12px;border-radius:4px;cursor:pointer;font-weight:bold;margin-top:8px;}' +
    '</style></head><body>' +
    '<h2>📋 Propuestas de Retos del Alumnado</h2>';

  var pendientes = [];
  var materias = datos.materias || {};
  Object.keys(materias).forEach(function(m) {
    (materias[m] || []).forEach(function(r) {
      if (r.Estado_Revision === 'PENDIENTE') {
        r._materia = m;
        pendientes.push(r);
      }
    });
  });

  if (pendientes.length === 0) {
    html += '<p style="color:#64748b;">No hay propuestas pendientes de revisión en este momento. ¡Todos los retos están aprobados!</p>';
  } else {
    pendientes.forEach(function(p) {
      html += '<div class="card">' +
        '<span class="badge">' + p._materia.replace('_', ' ') + '</span> ' +
        '<strong>ID:</strong> ' + p.ID + '<br>' +
        '<strong>Autor:</strong> ' + (p.Autor_O_Equipo || 'Alumno/a') + '<br>' +
        '<strong>Pregunta:</strong> ' + p.Texto_Narrativo + '<br>' +
        '<strong>Criterio:</strong> <small>' + (p.Criterio_Evaluacion || 'No especificado') + '</small><br>' +
        '<button class="btn-app" onclick="google.script.run.withSuccessHandler(function(){location.reload();}).cambiarEstadoReto(\'' + p._materia + '\',\'' + p.ID + '\',\'APROBADO\',\'Aprobado por el docente\');">✅ Aprobar para el Juego</button>' +
      '</div>';
    });
  }

  html += '</body></html>';
  var modal = HtmlService.createHtmlOutput(html).setWidth(600).setHeight(500);
  SpreadsheetApp.getUi().showModalDialog(modal, '📋 Panel de Revisión Docente');
}

/**
 * 2. CONFIGURADOR DEL ECOSISTEMA DE BASE DE DATOS EN SHEETS
 */
function inicializarEcosistema() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // --- A. Pestaña de Configuración ---
  configurarPestanaConfig(ss, [
    ['TITULO_JUEGO', '🌿 La Eco-Patrulla del Bosque Mágico', 'Título visible en la cabecera'],
    ['ETAPA_CURSO', '5.º de Educación Primaria', 'Etapa y curso educativo'],
    ['COMUNIDAD_AUTONOMA', 'Decreto Autonómico de Educación Primaria (LOMLOE)', 'Normativa curricular de referencia'],
    ['MODALIDAD_JUEGO', 'CARRERA_MULTIJUGADOR', 'Modalidad: AVENTURA o CARRERA_MULTIJUGADOR'],
    ['DESCRIPCION', '¡Hola, explorador/a! Únete a la patrulla ambiental para proteger la fauna y competir en la Gran Regata del bosque.', 'Sinopsis'],
    ['VIDAS_INICIALES', 4, 'Intentos o vidas disponibles'],
    ['PUNTOS_VICTORIA', 75, 'Puntos necesarios para completar la misión'],
    ['MENSAJE_VICTORIA', '🌟 ¡Enhorabuena! Has conseguido la insignia de Guardián Mayor del Bosque.', 'Mensaje final'],
    ['MENSAJE_DERROTA', '🌱 ¡Ánimo! El bosque necesita más investigación. ¡Vuelve a intentarlo!', 'Mensaje al perder']
  ]);

  // --- B. Pestaña de Puntuaciones y Telemetría en Vivo ---
  configurarPestanaPuntuaciones(ss);

  // --- C. Pestaña de Lobby Multijugador ---
  configurarPestanaLobby(ss);

  var cabecerasMateria = [
    'ID', 'Etapa', 'Criterio_Evaluacion', 'Saber_Basico', 'Autor_O_Equipo', 
    'Estado_Revision', 'Feedback_Docente', 'Personaje', 'Texto_Narrativo', 
    'Opcion_A', 'Opcion_B', 'Opcion_C', 'Respuesta_Correcta', 'Feedback_Didactico', 'Puntos'
  ];
  var anchosMateria = [70, 120, 240, 160, 140, 120, 200, 130, 300, 180, 180, 180, 110, 260, 60];

  // --- Conocimiento del Medio ---
  configurarPestana(
    ss, 'ConoMedio_Ecosistemas', '#2E7D32', '#1B5E20',
    cabecerasMateria, anchosMateria,
    [
      [
        'MED_01', 'El Robledal', 'CE.CMN.5.2: Identificar las relaciones tróficas y el equilibrio ecológico.',
        'Redes tróficas y productores', 'Equipo Docente', 'APROBADO', '',
        '🦊 Guardabosques Leo',
        'En este bosque hay robles, orugas, pájaros carboneros y halcones. ¿Quiénes son los seres vivos PRODUCTORES?',
        'A) Los robles y plantas (autótrofos)', 'B) Las orugas', 'C) Los pájaros carboneros',
        'A',
        '¡Genial! Los robles y las plantas fabrican su propio alimento mediante fotosíntesis, por eso son los productores.', 25
      ],
      [
        'MED_02', 'La Laguna', 'CE.CMN.5.4: Reconocer la importancia de la biodiversidad y especies autóctonas.',
        'Conservación y biodiversidad', 'Lucas y Sara (Alumnos)', 'APROBADO', 'Excelente contextualización',
        '🐸 Nutria Sabia',
        'Hemos encontrado peces de acuario que alguien soltó en la laguna. ¿Por qué es un grave peligro para la fauna local?',
        'A) Porque son especies invasoras que compiten por el alimento', 'B) Porque limpian demasiado el agua', 'C) No supone peligro alguno',
        'A',
        '¡Muy bien! Las especies exóticas invasoras alteran el hábitat y pueden extinguir a los animales autóctonos.', 25
      ],
      [
        'MED_03', 'La Cueva Oscura', 'CE.CMN.5.1: Utilizar criterios científicos para clasificar animales vertebrados.',
        'Clasificación animal', 'Equipo 3 - Los Murciélagos', 'PENDIENTE', '',
        '🦇 Murciélago Chispa',
        'Aunque vuelo como las aves y tengo alas, ¿por qué los científicos me clasifican dentro del grupo de los MAMÍFEROS?',
        'A) Porque tengo plumas ocultas', 'B) Porque nazco del vientre materno y tomo leche', 'C) Porque tengo sangre fría',
        'B',
        '¡Estupendo! Los murciélagos son mamíferos porque amamantan a sus crías y no nacen de huevos.', 25
      ]
    ]
  );

  // --- Lengua Castellana ---
  configurarPestana(
    ss, 'Lengua_Exploradores', '#7B1FA2', '#4A148C',
    cabecerasMateria, anchosMateria,
    [
      [
        'LENG_01', 'El Árbol Sabio', 'CE.LCL.5.5: Identificar las categorías gramaticales básicas (adjetivos y sustantivos).',
        'Clases de palabras', 'Equipo Docente', 'APROBADO', '',
        '🦉 Búho Maestro',
        'En la frase: "El ágil zorro cruzó el río cristalino", ¿cuáles son las dos palabras que funcionan como ADJETIVOS?',
        'A) zorro y río', 'B) ágil y cristalino', 'C) cruzó y el',
        'B',
        '¡Bravo! "Ágil" describe al zorro y "cristalino" describe al agua del río.', 25
      ],
      [
        'LENG_02', 'El Manantial', 'CE.LCL.5.6: Reconocer la rima consonante y asonante en poemas.',
        'Recursos poéticos y rima', 'Marta y Daniel', 'APROBADO', 'Gran ejemplo de rima',
        '🐝 Abeja Cantarina',
        '¿Qué palabra rima en CONSONANTE perfecta con "primavera"?',
        'A) sendero', 'B) pradera', 'C) cometa',
        'B',
        '¡Acertaste! "Primavera" y "pradera" coinciden exactamente desde la vocal tónica (-era).', 25
      ]
    ]
  );

  // --- Matemáticas ---
  configurarPestana(
    ss, 'Mates_Aventura', '#0288D1', '#01579B',
    cabecerasMateria, anchosMateria,
    [
      [
        'MAT_01', 'El Huerto Escolar', 'CE.MAT.5.1: Resolver problemas cotidianos utilizando fracciones simples.',
        'Concepto de fracciones', 'Equipo Docente', 'APROBADO', '',
        '🌻 Jardinera Maya',
        'Hemos dividido el bancal del huerto en 8 partes iguales. Si sembramos fresas en 3 partes y tomates en 2 partes, ¿qué fracción del huerto está sembrada?',
        'A) 5/8 del huerto', 'B) 3/8 del huerto', 'C) 1/2 del huerto',
        'A',
        '¡Exacto! Sumamos 3/8 + 2/8 = 5/8 del total del huerto sembrado.', 25
      ],
      [
        'MAT_02', 'La Cabaña de Madera', 'CE.MAT.5.3: Calcular perímetros de figuras geométricas en situaciones reales.',
        'Perímetro de rectángulos', 'Equipo 4 - Los Castores', 'APROBADO', '',
        '🦔 Erizo Carpintero',
        'Para cercar una zona rectangular de 6 metros de largo y 4 metros de ancho, ¿cuántos metros de valla necesitamos en total?',
        'A) 10 metros', 'B) 20 metros', 'C) 24 metros',
        'B',
        '¡Muy bien! El perímetro es la suma de los 4 lados: 6 + 4 + 6 + 4 = 20 metros de valla.', 25
      ]
    ]
  );

  SpreadsheetApp.flush();
}

/**
 * 3. FUNCIONES BACKEND RPC: MULTIJUGADOR, TELEMETRÍA Y PROPUESTAS
 */
function actualizarPosicionLobby(nombreEquipo, avatar, nuevaCasilla, puntos) {
  try {
    var cache = CacheService.getScriptCache();
    var raw = cache.get('LOBBY_STATE');
    var lobby = raw ? JSON.parse(raw) : {};

    lobby[nombreEquipo] = {
      equipo: nombreEquipo,
      avatar: avatar || '🦊',
      casilla: parseInt(nuevaCasilla, 10) || 0,
      puntos: parseInt(puntos, 10) || 0,
      timestamp: Date.now()
    };

    cache.put('LOBBY_STATE', JSON.stringify(lobby), 7200);
    return { ok: true, lobby: lobby };
  } catch(e) {
    return { ok: false, error: e.message };
  }
}

function obtenerEstadoLobbyMemoria() {
  var cache = CacheService.getScriptCache();
  var raw = cache.get('LOBBY_STATE');
  if (raw) return JSON.parse(raw);
  return {};
}

function registrarPartidaOnline(partida) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var hoja = ss.getSheetByName('Puntuaciones_Online');
    if (!hoja) return { ok: false, error: 'Pestaña Puntuaciones_Online no encontrada' };

    var ahora = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
    var fila = [
      ahora,
      partida.jugador || 'Anónimo',
      partida.curso || '5.º Primaria',
      parseInt(partida.puntos, 10) || 0,
      parseInt(partida.vidas, 10) || 0,
      parseInt(partida.tiempo, 10) || 0,
      partida.desglose || '',
      partida.resultado || 'FINALIZADO'
    ];

    hoja.appendRow(fila);
    return { ok: true, mensaje: 'Partida guardada en el cuaderno de evaluación.' };
  } catch(err) {
    return { ok: false, error: err.message };
  }
}

function guardarPropuestaReto(nombreMateria, reto) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var hoja = ss.getSheetByName(nombreMateria);
    if (!hoja) throw new Error('No se encontró la materia: ' + nombreMateria);

    var id = reto.ID || (nombreMateria.substring(0, 3).toUpperCase() + '_' + Math.floor(100 + Math.random() * 900));
    var fila = [
      id,
      reto.Etapa || 'Misión del Aula',
      reto.Criterio_Evaluacion || '',
      reto.Saber_Basico || '',
      reto.Autor_O_Equipo || 'Alumno/a de Primaria',
      'PENDIENTE',
      '',
      reto.Personaje || 'Guía Forestal',
      reto.Texto_Narrativo || '',
      reto.Opcion_A || '',
      reto.Opcion_B || '',
      reto.Opcion_C || '',
      (reto.Respuesta_Correcta || 'A').toUpperCase(),
      reto.Feedback_Didactico || '',
      parseInt(reto.Puntos, 10) || 25
    ];
    hoja.appendRow(fila);
    return { ok: true, id: id, mensaje: '¡Reto enviado! Queda pendiente de aprobación por el profesor.' };
  } catch(e) {
    return { ok: false, error: e.message };
  }
}

function cambiarEstadoReto(nombreMateria, idReto, nuevoEstado, feedbackDocente) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var hoja = ss.getSheetByName(nombreMateria);
  if (!hoja) return { ok: false, error: 'Hoja no encontrada' };

  var datos = hoja.getDataRange().getValues();
  for (var i = 1; i < datos.length; i++) {
    if (String(datos[i][0]).trim() === String(idReto).trim()) {
      var filaNum = i + 1;
      hoja.getRange(filaNum, 6).setValue(nuevoEstado);
      if (feedbackDocente) hoja.getRange(filaNum, 7).setValue(feedbackDocente);
      return { ok: true };
    }
  }
  return { ok: false, error: 'Reto no encontrado' };
}

/**
 * 4. ENDPOINT HTTP WEB (doGet)
 */
function doGet(e) {
  try {
    var accion = (e && e.parameter && e.parameter.action) || 'app';

    if (accion === 'lobby') {
      return ContentService.createTextOutput(JSON.stringify(obtenerEstadoLobbyMemoria()))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var datosJuego = obtenerDatosJuego();

    if (accion === 'data') {
      return ContentService.createTextOutput(JSON.stringify(datosJuego))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var htmlOutput = HtmlService.createHtmlOutput(getGameHtml(JSON.stringify(datosJuego)));
    var titulo = (datosJuego.meta && datosJuego.meta.TITULO_JUEGO) ? datosJuego.meta.TITULO_JUEGO : 'La Eco-Patrulla - Primaria';
    
    htmlOutput.setTitle(titulo);
    htmlOutput.addMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    htmlOutput.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);

    return htmlOutput;
  } catch (err) {
    return HtmlService.createHtmlOutput(
      '<div style="font-family:sans-serif;padding:30px;color:#d32f2f;">' +
      '<h2>Error cargando la aplicación</h2><p>' + err.message + '</p></div>'
    );
  }
}

/**
 * 5. EXTRACTOR DE DATOS DE SHEETS
 */
function obtenerDatosJuego() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var hojas = ss.getSheets();
  var paquete = { meta: {}, materias: {} };

  for (var i = 0; i < hojas.length; i++) {
    var hoja = hojas[i];
    var nombre = hoja.getName();
    var valores = hoja.getDataRange().getValues();
    if (valores.length === 0) continue;

    if (nombre === 'Config_Juego') {
      for (var r = 1; r < valores.length; r++) {
        var k = String(valores[r][0] || '').trim();
        if (k) paquete.meta[k] = valores[r][1];
      }
    } else if (nombre !== 'Puntuaciones_Online' && nombre !== 'Lobby_Multijugador') {
      var headers = valores[0].map(function(h) { return String(h || '').trim(); });
      var items = [];
      for (var row = 1; row < valores.length; row++) {
        var fila = valores[row];
        var tieneContenido = fila.some(function(celda) { return celda !== '' && celda !== null; });
        if (!tieneContenido) continue;

        var obj = {};
        for (var c = 0; c < headers.length; c++) {
          obj[headers[c]] = fila[c];
        }
        items.push(obj);
      }
      paquete.materias[nombre] = items;
    }
  }
  return paquete;
}

/**
 * 6. GENERADOR FRONTEND MONOLÍTICO: JUEGO, MULTIJUGADOR Y FORMULARIO
 */
function getGameHtml(initialDataJson) {
  return '<!DOCTYPE html>\n' +
'<html lang="es">\n' +
'<head>\n' +
'  <meta charset="UTF-8">\n' +
'  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
'  <style>\n' +
'    :root {\n' +
'      --bg-color: #0d1b2a;\n' +
'      --card-bg: #1b263b;\n' +
'      --card-border: #415a77;\n' +
'      --text-main: #f0f4f8;\n' +
'      --text-muted: #a0aec0;\n' +
'      --color-gold: #ffd166;\n' +
'      --color-green: #06d6a0;\n' +
'      --color-blue: #118ab2;\n' +
'      --color-red: #ef476f;\n' +
'      --radius: 16px;\n' +
'    }\n' +
'    * { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; }\n' +
'    body {\n' +
'      background: var(--bg-color);\n' +
'      color: var(--text-main);\n' +
'      min-height: 100vh;\n' +
'      display: flex;\n' +
'      flex-direction: column;\n' +
'      align-items: center;\n' +
'      padding: 14px;\n' +
'    }\n' +
'    #app {\n' +
'      width: 100%;\n' +
'      max-width: 800px;\n' +
'      background: var(--card-bg);\n' +
'      border: 2px solid var(--card-border);\n' +
'      border-radius: var(--radius);\n' +
'      box-shadow: 0 12px 30px rgba(0,0,0,0.6);\n' +
'      overflow: hidden;\n' +
'      display: flex;\n' +
'      flex-direction: column;\n' +
'    }\n' +
'    .top-nav {\n' +
'      background: #060d17;\n' +
'      padding: 10px 16px;\n' +
'      display: flex;\n' +
'      justify-content: space-between;\n' +
'      align-items: center;\n' +
'      border-bottom: 1px solid var(--card-border);\n' +
'      gap: 8px;\n' +
'      flex-wrap: wrap;\n' +
'    }\n' +
'    .nav-btn {\n' +
'      background: #24344d;\n' +
'      color: #fff;\n' +
'      border: 1px solid var(--card-border);\n' +
'      padding: 8px 14px;\n' +
'      border-radius: 20px;\n' +
'      font-weight: 700;\n' +
'      font-size: 0.88rem;\n' +
'      cursor: pointer;\n' +
'      transition: all 0.2s;\n' +
'    }\n' +
'    .nav-btn.active, .nav-btn:hover { background: var(--color-gold); color: #000; border-color: var(--color-gold); }\n' +
'    .run-pulse { background: var(--color-green); color: #000; border: none; }\n' +
'    header {\n' +
'      background: #0b132b;\n' +
'      padding: 12px 20px;\n' +
'      display: flex;\n' +
'      justify-content: space-between;\n' +
'      align-items: center;\n' +
'      border-bottom: 2px solid var(--card-border);\n' +
'    }\n' +
'    .logo-text { font-size: 1.2rem; font-weight: 800; color: var(--color-gold); }\n' +
'    .stats-pill { display: flex; align-items: center; gap: 12px; font-weight: 700; font-size: 1rem; }\n' +
'    .score-chip { background: var(--color-blue); color: white; padding: 5px 12px; border-radius: 20px; }\n' +
'    main { padding: 22px; min-height: 420px; display: flex; flex-direction: column; justify-content: center; }\n' +
'    .criterio-badge {\n' +
'      background: rgba(17, 138, 178, 0.2);\n' +
'      border-left: 4px solid var(--color-blue);\n' +
'      padding: 8px 12px;\n' +
'      border-radius: 6px;\n' +
'      font-size: 0.85rem;\n' +
'      color: #90e0ef;\n' +
'      margin-bottom: 8px;\n' +
'      line-height: 1.4;\n' +
'    }\n' +
'    .author-badge { font-size: 0.82rem; color: var(--color-gold); margin-bottom: 12px; font-weight: 600; }\n' +
'    .dialogue-card {\n' +
'      background: rgba(13, 27, 42, 0.85);\n' +
'      border: 2px solid var(--color-gold);\n' +
'      padding: 18px;\n' +
'      border-radius: 12px;\n' +
'      font-size: 1.1rem;\n' +
'      line-height: 1.6;\n' +
'      margin-bottom: 20px;\n' +
'    }\n' +
'    .speaker-name { color: var(--color-gold); font-size: 1rem; font-weight: 800; margin-bottom: 6px; }\n' +
'    .options-grid { display: flex; flex-direction: column; gap: 12px; margin-bottom: 16px; }\n' +
'    .option-btn {\n' +
'      background: #24344d;\n' +
'      border: 2px solid #415a77;\n' +
'      color: white;\n' +
'      padding: 14px 18px;\n' +
'      border-radius: 12px;\n' +
'      font-size: 1.05rem;\n' +
'      font-weight: 600;\n' +
'      text-align: left;\n' +
'      cursor: pointer;\n' +
'      transition: transform 0.15s, background 0.15s;\n' +
'      min-height: 52px;\n' +
'    }\n' +
'    .option-btn:hover { background: #324b6d; border-color: var(--color-gold); transform: translateY(-2px); }\n' +
'    .option-btn:disabled { opacity: 0.7; cursor: not-allowed; }\n' +
'    .btn-action {\n' +
'      background: var(--color-gold);\n' +
'      color: #000;\n' +
'      font-weight: 800;\n' +
'      border: none;\n' +
'      padding: 14px 26px;\n' +
'      border-radius: 12px;\n' +
'      font-size: 1.05rem;\n' +
'      cursor: pointer;\n' +
'      align-self: flex-start;\n' +
'      margin-top: 14px;\n' +
'    }\n' +
'    .btn-action:hover { background: #e0b443; }\n' +
'    .feedback-box { padding: 16px; border-radius: 10px; margin-top: 12px; font-size: 0.95rem; line-height: 1.5; }\n' +
'    .fb-ok { background: rgba(6, 214, 160, 0.2); border: 2px solid var(--color-green); color: #80ed99; }\n' +
'    .fb-err { background: rgba(239, 71, 111, 0.2); border: 2px solid var(--color-red); color: #ffb4a2; }\n' +
'    .subject-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 14px; }\n' +
'    @media(max-width: 600px) { .subject-grid { grid-template-columns: 1fr; } }\n' +
'    .subject-card {\n' +
'      background: #0d1b2a;\n' +
'      border: 2px solid var(--card-border);\n' +
'      border-radius: 12px;\n' +
'      padding: 18px;\n' +
'      cursor: pointer;\n' +
'      transition: transform 0.2s, border-color 0.2s;\n' +
'    }\n' +
'    .subject-card:hover { border-color: var(--color-gold); transform: translateY(-3px); }\n' +
'    .subject-card.done { opacity: 0.6; border-color: var(--color-green); }\n' +
'    /* Pista Multijugador en Vivo */\n' +
'    .track-container {\n' +
'      background: #060d17;\n' +
'      border: 2px solid var(--card-border);\n' +
'      border-radius: 12px;\n' +
'      padding: 16px;\n' +
'      margin-top: 14px;\n' +
'    }\n' +
'    .track-lane {\n' +
'      background: #111d2e;\n' +
'      margin-bottom: 10px;\n' +
'      border-radius: 8px;\n' +
'      padding: 8px 12px;\n' +
'      display: flex;\n' +
'      align-items: center;\n' +
'      position: relative;\n' +
'      height: 48px;\n' +
'      border-left: 4px solid var(--color-blue);\n' +
'    }\n' +
'    .lane-avatar {\n' +
'      position: absolute;\n' +
'      font-size: 1.8rem;\n' +
'      transition: left 0.6s ease-in-out;\n' +
'    }\n' +
'    .form-group { margin-bottom: 12px; text-align: left; }\n' +
'    .form-group label { display: block; font-weight: 700; margin-bottom: 6px; font-size: 0.9rem; color: var(--color-gold); }\n' +
'    .form-control {\n' +
'      width: 100%;\n' +
'      padding: 10px 12px;\n' +
'      border-radius: 8px;\n' +
'      border: 1px solid var(--card-border);\n' +
'      background: #0d1b2a;\n' +
'      color: #fff;\n' +
'      font-size: 0.95rem;\n' +
'    }\n' +
'    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }\n' +
'  </style>\n' +
'</head>\n' +
'<body>\n' +
'  <div id="app">\n' +
'    <div class="top-nav">\n' +
'      <div>\n' +
'        <button class="nav-btn run-pulse" id="btnNavRun" onclick="AudioFX.click(); activarModo(\\\'run\\\');">▶️ RUN / Misión</button>\n' +
'        <button class="nav-btn" id="btnNavCarrera" onclick="AudioFX.click(); activarModo(\\\'carrera\\\');">🏁 Carrera en Vivo</button>\n' +
'        <button class="nav-btn" id="btnNavForm" onclick="AudioFX.click(); activarModo(\\\'form\\\');">✏️ Proponer Reto</button>\n' +
'      </div>\n' +
'      <label style="font-size:0.8rem;color:var(--text-muted);display:flex;align-items:center;gap:6px;">\n' +
'        <input type="checkbox" id="chkTodos" onchange="alternarFiltroPendientes()"> Ver borradores\n' +
'      </label>\n' +
'    </div>\n' +
'    <header>\n' +
'      <div class="logo-text" id="headerTitle">🌿 Eco-Patrulla</div>\n' +
'      <div class="stats-pill">\n' +
'        <span id="heartsBox">❤️❤️❤️❤️</span>\n' +
'        <span class="score-chip"><span id="scoreVal">0</span> pts</span>\n' +
'      </div>\n' +
'    </header>\n' +
'    <main id="stage"></main>\n' +
'  </div>\n' +
'\n' +
'  <script>\n' +
'    window.GAME_DATA = ' + initialDataJson + ';\n' +
'    var modoActual = "run";\n' +
'    var verBorradores = false;\n' +
'    var timerPoll = null;\n' +
'\n' +
'    var AudioFX = (function() {\n' +
'      var ctx = null;\n' +
'      function getC() { if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)(); return ctx; }\n' +
'      function tone(f, type, dur, delay) {\n' +
'        try {\n' +
'          var c = getC();\n' +
'          var osc = c.createOscillator();\n' +
'          var g = c.createGain();\n' +
'          osc.type = type || "sine";\n' +
'          osc.frequency.setValueAtTime(f, c.currentTime + (delay || 0));\n' +
'          g.gain.setValueAtTime(0.12, c.currentTime + (delay || 0));\n' +
'          g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + (delay || 0) + dur);\n' +
'          osc.connect(g); g.connect(c.destination);\n' +
'          osc.start(c.currentTime + (delay || 0));\n' +
'          osc.stop(c.currentTime + (delay || 0) + dur);\n' +
'        } catch(e) {}\n' +
'      }\n' +
'      return {\n' +
'        click: function() { tone(440, "triangle", 0.05); },\n' +
'        winTone: function() { [523, 659, 784, 1046].forEach(function(f, i){ tone(f, "triangle", 0.25, i*0.12); }); },\n' +
'        okTone: function() { tone(523, "sine", 0.1, 0); tone(659, "sine", 0.12, 0.09); tone(784, "sine", 0.25, 0.18); },\n' +
'        errTone: function() { tone(240, "sawtooth", 0.15, 0); tone(200, "sawtooth", 0.2, 0.12); }\n' +
'      };\n' +
'    })();\n' +
'\n' +
'    var Game = {\n' +
'      jugador: "",\n' +
'      avatar: "🦊",\n' +
'      casilla: 0,\n' +
'      vidas: 4,\n' +
'      puntos: 0,\n' +
'      puntosMeta: 75,\n' +
'      tiempoInicio: Date.now(),\n' +
'      completados: {},\n' +
'      aciertosPorMateria: {},\n' +
'      materia: null,\n' +
'      retoIdx: 0\n' +
'    };\n' +
'\n' +
'    function alternarFiltroPendientes() {\n' +
'      verBorradores = document.getElementById("chkTodos").checked;\n' +
'      if (modoActual === "run") renderSelector();\n' +
'    }\n' +
'\n' +
'    function activarModo(modo) {\n' +
'      modoActual = modo;\n' +
'      if (timerPoll) { clearInterval(timerPoll); timerPoll = null; }\n' +
'      document.getElementById("btnNavRun").className = (modo === "run") ? "nav-btn run-pulse active" : "nav-btn";\n' +
'      document.getElementById("btnNavCarrera").className = (modo === "carrera") ? "nav-btn active" : "nav-btn";\n' +
'      document.getElementById("btnNavForm").className = (modo === "form") ? "nav-btn active" : "nav-btn";\n' +
'\n' +
'      if (modo === "run") {\n' +
'        if (!Game.jugador) renderRegistroJugador();\n' +
'        else renderInicio();\n' +
'      } else if (modo === "carrera") {\n' +
'        renderPantallaCarrera();\n' +
'      } else {\n' +
'        renderFormularioPropuesta();\n' +
'      }\n' +
'    }\n' +
'\n' +
'    function actualizarBarra() {\n' +
'      var h = "";\n' +
'      for (var i = 0; i < Game.vidas; i++) h += "❤️";\n' +
'      document.getElementById("heartsBox").innerText = h || "💔";\n' +
'      document.getElementById("scoreVal").innerText = Game.puntos;\n' +
'    }\n' +
'\n' +
'    function filtrarRetosMateria(nom) {\n' +
'      var lista = (window.GAME_DATA.materias && window.GAME_DATA.materias[nom]) || [];\n' +
'      if (verBorradores) return lista;\n' +
'      return lista.filter(function(r) { return r.Estado_Revision === "APROBADO" || !r.Estado_Revision; });\n' +
'    }\n' +
'\n' +
'    function renderRegistroJugador() {\n' +
'      var stage = document.getElementById("stage");\n' +
'      stage.innerHTML = \n' +
'        \'<h2 style="color:var(--color-gold);margin-bottom:8px;">🎒 ¡Bienvenido/a a la Misión!</h2>\' +\n' +
'        \'<p style="color:var(--text-muted);margin-bottom:16px;">Escribe tu nombre o el de tu equipo para registrar tus puntuaciones en el cuaderno del profe:</p>\' +\n' +
'        \'<div class="dialogue-card">\' +\n' +
'          \'<div class="form-group">\' +\n' +
'            \'<label>Nombre o Equipo:</label>\' +\n' +
'            \'<input type="text" id="regNombre" class="form-control" placeholder="Ej. Equipo 3 - Los Linces" required>\' +\n' +
'          \'</div>\' +\n' +
'          \'<div class="form-group">\' +\n' +
'            \'<label>Elige tu Avatar:</label>\' +\n' +
'            \'<select id="regAvatar" class="form-control">\' +\n' +
'              \'<option value="🦊">🦊 Zorro Veloz</option>\' +\n' +
'              \'<option value="🦉">🦉 Búho Sabio</option>\' +\n' +
'              \'<option value="🐸">🐸 Nutria Ágil</option>\' +\n' +
'              \'<option value="🚀">🚀 Nave Exploradora</option>\' +\n' +
'              \'<option value="⛵">⛵ Barco Velero</option>\' +\n' +
'            \'</select>\' +\n' +
'          \'</div>\' +\n' +
'          \'<button class="btn-action" onclick="guardarRegistroLocal()">Entrar al Juego ➔</button>\' +\n' +
'        \'</div>\';\n' +
'    }\n' +
'\n' +
'    function guardarRegistroLocal() {\n' +
'      var n = document.getElementById("regNombre").value.trim();\n' +
'      if (!n) { alert("Por favor, introduce tu nombre o el de tu equipo"); return; }\n' +
'      Game.jugador = n;\n' +
'      Game.avatar = document.getElementById("regAvatar").value;\n' +
'      Game.tiempoInicio = Date.now();\n' +
'      AudioFX.click();\n' +
'      sincronizarLobby();\n' +
'      renderInicio();\n' +
'    }\n' +
'\n' +
'    function sincronizarLobby() {\n' +
'      if (typeof google !== "undefined" && google.script && google.script.run && Game.jugador) {\n' +
'        google.script.run.actualizarPosicionLobby(Game.jugador, Game.avatar, Game.casilla, Game.puntos);\n' +
'      }\n' +
'    }\n' +
'\n' +
'    function renderInicio() {\n' +
'      var m = window.GAME_DATA.meta || {};\n' +
'      Game.vidas = parseInt(m.VIDAS_INICIALES, 10) || 4;\n' +
'      Game.puntosMeta = parseInt(m.PUNTOS_VICTORIA, 10) || 75;\n' +
'      document.getElementById("headerTitle").innerText = m.TITULO_JUEGO || "🌿 La Eco-Patrulla";\n' +
'      actualizarBarra();\n' +
'\n' +
'      var stage = document.getElementById("stage");\n' +
'      stage.innerHTML = \n' +
'        \'<h2 style="font-size:1.5rem;color:var(--color-gold);margin-bottom:6px;">\' + (m.TITULO_JUEGO || "Misión Ambiental") + \'</h2>\' +\n' +
'        \'<p style="color:var(--color-gold);font-weight:700;margin-bottom:10px;">Jugando como: \' + Game.avatar + \' \' + Game.jugador + \'</p>\' +\n' +
'        \'<div class="dialogue-card">\' + (m.DESCRIPCION || "¡Bienvenido a la aventura!") + \'</div>\' +\n' +
'        \'<button class="btn-action" onclick="AudioFX.click(); renderSelector();">🚀 Comenzar Misión (RUN)</button>\';\n' +
'    }\n' +
'\n' +
'    function renderSelector() {\n' +
'      actualizarBarra();\n' +
'      if (Game.vidas <= 0) { renderGameOver(); return; }\n' +
'      if (Game.puntos >= Game.puntosMeta) { renderVictoria(); return; }\n' +
'\n' +
'      var stage = document.getElementById("stage");\n' +
'      var mats = window.GAME_DATA.materias || {};\n' +
'      var nombres = Object.keys(mats);\n' +
'\n' +
'      var html = \'<h2 style="color:var(--color-gold);font-size:1.4rem;margin-bottom:6px;">🗺️ Elige Rincón del Bosque</h2>\' +\n' +
'                 \'<div class="subject-grid">\';\n' +
'\n' +
'      nombres.forEach(function(nom) {\n' +
'        var lista = filtrarRetosMateria(nom);\n' +
'        var done = lista.length > 0 && lista.every(function(item) { return Game.completados[item.ID]; });\n' +
'        var cName = done ? "subject-card done" : "subject-card";\n' +
'        var estado = done ? "✅ ¡Rincón protegido!" : ("⭐ " + lista.length + " retos disponibles");\n' +
'\n' +
'        html += \'<div class="\' + cName + \'" onclick="AudioFX.click(); abrirRincon(\\\'\' + nom + \'\\\')">\' +\n' +
'                  \'<h3 style="color:var(--color-gold);font-size:1.15rem;margin-bottom:4px;">\' + nom.replace("_", " ") + \'</h3>\' +\n' +
'                  \'<p style="font-size:0.9rem;color:var(--text-muted);">\' + estado + \'</p>\' +\n' +
'                \'</div>\';\n' +
'      });\n' +
'      html += \'</div>\';\n' +
'      stage.innerHTML = html;\n' +
'    }\n' +
'\n' +
'    function abrirRincon(nom) {\n' +
'      Game.materia = nom;\n' +
'      var lista = filtrarRetosMateria(nom);\n' +
'      if (lista.length === 0) {\n' +
'        alert("No hay retos aprobados en esta materia aún.");\n' +
'        return;\n' +
'      }\n' +
'      var primerNoHecho = 0;\n' +
'      for (var i = 0; i < lista.length; i++) {\n' +
'        if (!Game.completados[lista[i].ID]) { primerNoHecho = i; break; }\n' +
'      }\n' +
'      Game.retoIdx = primerNoHecho;\n' +
'      renderPregunta();\n' +
'    }\n' +
'\n' +
'    function renderPregunta() {\n' +
'      var lista = filtrarRetosMateria(Game.materia);\n' +
'      if (Game.retoIdx >= lista.length) { renderSelector(); return; }\n' +
'\n' +
'      var reto = lista[Game.retoIdx];\n' +
'      var stage = document.getElementById("stage");\n' +
'      var personaje = reto.Personaje || "Guía";\n' +
'\n' +
'      var badgeCurricular = reto.Criterio_Evaluacion ? (\'<div class="criterio-badge">🎯 \' + reto.Criterio_Evaluacion + \'</div>\') : \'\';\n' +
'      var badgeAutor = reto.Autor_O_Equipo ? (\'<div class="author-badge">💡 Diseñado por: <strong>\' + reto.Autor_O_Equipo + \'</strong></div>\') : \'\';\n' +
'\n' +
'      var html = \'<h3 style="color:var(--color-blue);font-size:1.25rem;margin-bottom:6px;">📍 \' + (reto.Etapa || Game.materia) + \'</h3>\' +\n' +
'        badgeCurricular + badgeAutor +\n' +
'        \'<div class="dialogue-card">\' +\n' +
'          \'<div class="speaker-name">\' + personaje + \'</div>\' +\n' +
'          \'<div>\' + reto.Texto_Narrativo + \'</div>\' +\n' +
'        \'</div>\' +\n' +
'        \'<div class="options-grid">\' +\n' +
'          \'<button class="option-btn" onclick="contestar(\\\'A\\\', this)">\' + reto.Opcion_A + \'</button>\' +\n' +
'          \'<button class="option-btn" onclick="contestar(\\\'B\\\', this)">\' + reto.Opcion_B + \'</button>\' +\n' +
'          \'<button class="option-btn" onclick="contestar(\\\'C\\\', this)">\' + reto.Opcion_C + \'</button>\' +\n' +
'        \'</div>\' +\n' +
'        \'<div id="fbBox"></div>\';\n' +
'\n' +
'      stage.innerHTML = html;\n' +
'    }\n' +
'\n' +
'    function contestar(opc, btn) {\n' +
'      var lista = filtrarRetosMateria(Game.materia);\n' +
'      var reto = lista[Game.retoIdx];\n' +
'      var fb = document.getElementById("fbBox");\n' +
'      var btns = document.querySelectorAll(".option-btn");\n' +
'      btns.forEach(function(b) { b.disabled = true; });\n' +
'\n' +
'      var correcta = String(reto.Respuesta_Correcta || "").trim().toUpperCase();\n' +
'      var didactico = reto.Feedback_Didactico || "";\n' +
'      var saber = reto.Saber_Basico ? (\'<br><small style="color:#94a3b8">📚 Saber curricular: \' + reto.Saber_Basico + \'</small>\') : \'\';\n' +
'\n' +
'      if (opc === correcta) {\n' +
'        AudioFX.okTone();\n' +
'        var p = parseInt(reto.Puntos, 10) || 25;\n' +
'        Game.puntos += p;\n' +
'        Game.casilla += 1;\n' +
'        Game.completados[reto.ID] = true;\n' +
'        Game.aciertosPorMateria[Game.materia] = (Game.aciertosPorMateria[Game.materia] || 0) + 1;\n' +
'        actualizarBarra();\n' +
'        sincronizarLobby();\n' +
'        fb.innerHTML = \'<div class="feedback-box fb-ok">\' +\n' +
'          \'<strong>🎉 ¡Muy bien hecho! (+\' + p + \' pts - Avanzas en la carrera)</strong><br>\' + didactico + saber +\n' +
'        \'</div>\' +\n' +
'        \'<button class="btn-action" onclick="avanzar()">Continuar Explorando ➔</button>\';\n' +
'      } else {\n' +
'        AudioFX.errTone();\n' +
'        Game.vidas -= 1;\n' +
'        actualizarBarra();\n' +
'        fb.innerHTML = \'<div class="feedback-box fb-err">\' +\n' +
'          \'<strong>💪 ¡Casi! Revisa la pista:</strong><br>\' + didactico + saber +\n' +
'        \'</div>\' +\n' +
'        \'<button class="btn-action" onclick="avanzar()">Seguir Adelante ➔</button>\';\n' +
'      }\n' +
'    }\n' +
'\n' +
'    function avanzar() {\n' +
'      AudioFX.click();\n' +
'      if (Game.vidas <= 0) { renderGameOver(); return; }\n' +
'      if (Game.puntos >= Game.puntosMeta) { renderVictoria(); return; }\n' +
'\n' +
'      Game.retoIdx++;\n' +
'      var lista = filtrarRetosMateria(Game.materia);\n' +
'      if (Game.retoIdx < lista.length) renderPregunta();\n' +
'      else renderSelector();\n' +
'    }\n' +
'\n' +
'    function registrarFinPartida(resultado) {\n' +
'      var tSeg = Math.round((Date.now() - Game.tiempoInicio) / 1000);\n' +
'      var desglose = Object.keys(Game.aciertosPorMateria).map(function(m){\n' +
'        return m.replace(\'_\', \' \') + \': \' + Game.aciertosPorMateria[m];\n' +
'      }).join(\', \');\n' +
'\n' +
'      if (typeof google !== "undefined" && google.script && google.script.run && Game.jugador) {\n' +
'        google.script.run.registrarPartidaOnline({\n' +
'          jugador: Game.jugador,\n' +
'          puntos: Game.puntos,\n' +
'          vidas: Game.vidas,\n' +
'          tiempo: tSeg,\n' +
'          desglose: desglose,\n' +
'          resultado: resultado\n' +
'        });\n' +
'      }\n' +
'    }\n' +
'\n' +
'    function renderGameOver() {\n' +
'      AudioFX.errTone();\n' +
'      registrarFinPartida("DERROTA");\n' +
'      var stage = document.getElementById("stage");\n' +
'      stage.innerHTML = \n' +
'        \'<h2 style="color:var(--color-red);font-size:1.5rem;margin-bottom:8px;">🌱 Misión en Pausa</h2>\' +\n' +
'        \'<div class="dialogue-card">Has gastado tus corazones, ¡pero tus puntos han quedado guardados en el registro!</div>\' +\n' +
'        \'<p style="color:var(--text-muted);margin-bottom:14px;">Puntuación final: \' + Game.puntos + \' pts.</p>\' +\n' +
'        \'<button class="btn-action" onclick="AudioFX.click(); renderInicio();">🔄 Intentar de Nuevo (RUN)</button>\';\n' +
'    }\n' +
'\n' +
'    function renderVictoria() {\n' +
'      AudioFX.winTone();\n' +
'      registrarFinPartida("VICTORIA_PODIO");\n' +
'      var stage = document.getElementById("stage");\n' +
'      stage.innerHTML = \n' +
'        \'<h2 style="color:var(--color-gold);font-size:1.6rem;margin-bottom:8px;">🏆 ¡Misión y Carrera Cumplidas!</h2>\' +\n' +
'        \'<div class="dialogue-card">¡Extraordinario trabajo, \' + Game.jugador + \'! Has protegido el bosque y tu puntuación ya está en el cuaderno del docente.</div>\' +\n' +
'        \'<p style="color:var(--text-muted);margin-bottom:16px;">Puntos finales: <strong>\' + Game.puntos + \' pts</strong></p>\' +\n' +
'        \'<button class="btn-action" onclick="AudioFX.click(); renderInicio();">✨ Volver a Jugar</button>\';\n' +
'    }\n' +
'\n' +
'    /* PANTALLA DE CARRERA MULTIJUGADOR EN VIVO */\n' +
'    function renderPantallaCarrera() {\n' +
'      var stage = document.getElementById("stage");\n' +
'      stage.innerHTML = \n' +
'        \'<h2 style="color:var(--color-gold);margin-bottom:6px;">🏁 Carrera Multijugador del Aula</h2>\' +\n' +
'        \'<p style="color:var(--text-muted);margin-bottom:14px;font-size:0.9rem;">Visualización en vivo de los equipos. Los avatares avanzan con cada respuesta correcta (refresco cada 3 seg):</p>\' +\n' +
'        \'<div id="pistaContainer" class="track-container">Cargando posiciones del aula...</div>\';\n' +
'\n' +
'      refrescarPista();\n' +
'      timerPoll = setInterval(refrescarPista, 3000);\n' +
'    }\n' +
'\n' +
'    function refrescarPista() {\n' +
'      if (typeof google !== "undefined" && google.script && google.script.run) {\n' +
'        google.script.run.withSuccessHandler(pintarPista).obtenerEstadoLobbyMemoria();\n' +
'      } else {\n' +
'        // Simulación visual en entorno local\n' +
'        var fake = {\n' +
'          "Equipo Los Linces": { avatar: "🦊", casilla: 7, puntos: 75 },\n' +
'          "Equipo Nutrias": { avatar: "🐸", casilla: 5, puntos: 50 },\n' +
'          "Equipo Búhos": { avatar: "🦉", casilla: 8, puntos: 80 }\n' +
'        };\n' +
'        if (Game.jugador) fake[Game.jugador] = { avatar: Game.avatar, casilla: Game.casilla, puntos: Game.puntos };\n' +
'        pintarPista(fake);\n' +
'      }\n' +
'    }\n' +
'\n' +
'    function pintarPista(lobby) {\n' +
'      var cont = document.getElementById("pistaContainer");\n' +
'      if (!cont) return;\n' +
'      var keys = Object.keys(lobby || {});\n' +
'      if (keys.length === 0) {\n' +
'        cont.innerHTML = "<p style=\'color:#94a3b8;\'>Esperando a que los equipos se conecten y respondan retos...</p>";\n' +
'        return;\n' +
'      }\n' +
'      var metaCasillas = 10;\n' +
'      var html = "";\n' +
'      keys.forEach(function(k) {\n' +
'        var j = lobby[k];\n' +
'        var c = Math.min(metaCasillas, j.casilla || 0);\n' +
'        var pct = (c / metaCasillas) * 85;\n' +
'        html += \'<div class="track-lane">\' +\n' +
'          \'<strong style="color:#fff;font-size:0.9rem;width:150px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">\' + k + \'</strong>\' +\n' +
'          \'<div style="flex:1;position:relative;height:100%;margin:0 10px;">\' +\n' +
'            \'<span class="lane-avatar" style="left:\' + pct + \'%;">\' + (j.avatar || "🦊") + \'</span>\' +\n' +
'          \'</div>\' +\n' +
'          \'<span style="color:var(--color-gold);font-weight:bold;font-size:0.85rem;">\' + (j.puntos || 0) + \' pts (C\' + c + \')</span>\' +\n' +
'        \'</div>\';\n' +
'      });\n' +
'      cont.innerHTML = html;\n' +
'    }\n' +
'\n' +
'    /* FORMULARIO DE PROPUESTAS */\n' +
'    function renderFormularioPropuesta() {\n' +
'      var stage = document.getElementById("stage");\n' +
'      var mats = Object.keys(window.GAME_DATA.materias || {});\n' +
'      var optMaterias = mats.map(function(m){ return \'<option value="\' + m + \'">\' + m.replace(\'_\', \' \') + \'</option>\'; }).join(\'\');\n' +
'\n' +
'      stage.innerHTML = \n' +
'        \'<h2 style="color:var(--color-gold);margin-bottom:6px;">✏️ Enviar Propuesta de Reto</h2>\' +\n' +
'        \'<form id="formReto" onsubmit="enviarFormulario(event)">\' +\n' +
'          \'<div class="form-row">\' +\n' +
'            \'<div class="form-group">\' +\n' +
'              \'<label>Materia:</label>\' +\n' +
'              \'<select id="f_materia" class="form-control">\' + optMaterias + \'</select>\' +\n' +
'            \'</div>\' +\n' +
'            \'<div class="form-group">\' +\n' +
'              \'<label>Autor / Equipo:</label>\' +\n' +
'              \'<input type="text" id="f_autor" class="form-control" value="\' + (Game.jugador || "") + \'" placeholder="Nombre del equipo" required>\' +\n' +
'            \'</div>\' +\n' +
'          \'</div>\' +\n' +
'          \'<div class="form-group">\' +\n' +
'            \'<label>Criterio de Evaluación:</label>\' +\n' +
'            \'<input type="text" id="f_criterio" class="form-control" placeholder="Ej. CE.CMN.5.2 - Cadenas tróficas">\' +\n' +
'          \'</div>\' +\n' +
'          \'<div class="form-group">\' +\n' +
'            \'<label>Pregunta del Reto:</label>\' +\n' +
'            \'<textarea id="f_texto" class="form-control" rows="2" placeholder="Escribe aquí el reto..." required></textarea>\' +\n' +
'          \'</div>\' +\n' +
'          \'<div class="form-row">\' +\n' +
'            \'<div class="form-group"><label>Opción A:</label><input type="text" id="f_opA" class="form-control" required></div>\' +\n' +
'            \'<div class="form-group"><label>Opción B:</label><input type="text" id="f_opB" class="form-control" required></div>\' +\n' +
'          \'</div>\' +\n' +
'          \'<div class="form-row">\' +\n' +
'            \'<div class="form-group"><label>Opción C:</label><input type="text" id="f_opC" class="form-control" required></div>\' +\n' +
'            \'<div class="form-group"><label>Respuesta Correcta:</label>\' +\n' +
'              \'<select id="f_correcta" class="form-control"><option value="A">Opción A</option><option value="B">Opción B</option><option value="C">Opción C</option></select>\' +\n' +
'            \'</div>\' +\n' +
'          \'</div>\' +\n' +
'          \'<div class="form-group">\' +\n' +
'            \'<label>Explicación Didáctica:</label>\' +\n' +
'            \'<input type="text" id="f_feedback" class="form-control" placeholder="Por qué es la opción correcta..." required>\' +\n' +
'          \'</div>\' +\n' +
'          \'<button type="submit" class="btn-action" id="btnSubmitForm">🚀 Enviar a Revisión Docente</button>\' +\n' +
'          \'<div id="formMsg" style="margin-top:14px;font-weight:bold;"></div>\' +\n' +
'        \'</form>\';\n' +
'    }\n' +
'\n' +
'    function enviarFormulario(e) {\n' +
'      e.preventDefault();\n' +
'      AudioFX.click();\n' +
'      var btn = document.getElementById("btnSubmitForm");\n' +
'      var msg = document.getElementById("formMsg");\n' +
'      btn.disabled = true;\n' +
'      btn.innerText = "Enviando a Google Sheets...";\n' +
'\n' +
'      var materia = document.getElementById("f_materia").value;\n' +
'      var reto = {\n' +
'        Autor_O_Equipo: document.getElementById("f_autor").value,\n' +
'        Criterio_Evaluacion: document.getElementById("f_criterio").value,\n' +
'        Texto_Narrativo: document.getElementById("f_texto").value,\n' +
'        Opcion_A: document.getElementById("f_opA").value,\n' +
'        Opcion_B: document.getElementById("f_opB").value,\n' +
'        Opcion_C: document.getElementById("f_opC").value,\n' +
'        Respuesta_Correcta: document.getElementById("f_correcta").value,\n' +
'        Feedback_Didactico: document.getElementById("f_feedback").value,\n' +
'        Puntos: 25\n' +
'      };\n' +
'\n' +
'      if (typeof google !== "undefined" && google.script && google.script.run) {\n' +
'        google.script.run\n' +
'          .withSuccessHandler(function(res) {\n' +
'            btn.disabled = false;\n' +
'            btn.innerText = "🚀 Enviar a Revisión Docente";\n' +
'            if (res.ok) {\n' +
'              AudioFX.okTone();\n' +
'              msg.innerHTML = \'<span style="color:var(--color-green);">\' + res.mensaje + \'</span>\';\n' +
'              document.getElementById("formReto").reset();\n' +
'            } else {\n' +
'              AudioFX.errTone();\n' +
'              msg.innerHTML = \'<span style="color:var(--color-red);">Error: \' + res.error + \'</span>\';\n' +
'            }\n' +
'          })\n' +
'          .guardarPropuestaReto(materia, reto);\n' +
'      } else {\n' +
'        btn.disabled = false;\n' +
'        btn.innerText = "🚀 Enviar a Revisión Docente";\n' +
'        msg.innerHTML = \'<span style="color:var(--color-green);">Simulación local: Propuesta registrada en la hoja.</span>\';\n' +
'      }\n' +
'    }\n' +
'\n' +
'    window.onload = function() { renderRegistroJugador(); };\n' +
'  </script>\n' +
'</body>\n' +
'</html>';
}

/**
 * 7. MÉTODOS AUXILIARES DE CREACIÓN DE PESTAÑAS
 */
function configurarPestana(ss, nombre, tabColor, headerBg, cabeceras, anchos, semillas) {
  var hoja = ss.getSheetByName(nombre);
  if (!hoja) hoja = ss.insertSheet(nombre);
  else hoja.clear();

  hoja.setTabColor(tabColor);
  var rHeader = hoja.getRange(1, 1, 1, cabeceras.length);
  rHeader.setValues([cabeceras]);
  rHeader.setBackground(headerBg);
  rHeader.setFontColor('#FFFFFF');
  rHeader.setFontWeight('bold');
  rHeader.setHorizontalAlignment('center');
  rHeader.setVerticalAlignment('middle');
  hoja.setRowHeight(1, 38);

  if (semillas && semillas.length > 0) {
    var rData = hoja.getRange(2, 1, semillas.length, cabeceras.length);
    rData.setValues(semillas);
    rData.setVerticalAlignment('middle');
  }

  hoja.setFrozenRows(1);
  if (anchos && anchos.length === cabeceras.length) {
    for (var i = 0; i < anchos.length; i++) hoja.setColumnWidth(i + 1, anchos[i]);
  }

  var colEstado = cabeceras.indexOf('Estado_Revision') + 1;
  if (colEstado > 0) {
    var reglaEstado = SpreadsheetApp.newDataValidation()
      .requireValueInList(['APROBADO', 'PENDIENTE', 'CORREGIR'], true)
      .setAllowInvalid(false)
      .setHelpText('Selecciona APROBADO, PENDIENTE o CORREGIR.')
      .build();
    hoja.getRange(2, colEstado, 99, 1).setDataValidation(reglaEstado);
  }

  var colResp = cabeceras.indexOf('Respuesta_Correcta') + 1;
  if (colResp > 0) {
    var reglaResp = SpreadsheetApp.newDataValidation()
      .requireValueInList(['A', 'B', 'C'], true)
      .setAllowInvalid(false)
      .setHelpText('Elige A, B o C.')
      .build();
    hoja.getRange(2, colResp, 99, 1).setDataValidation(reglaResp);
  }
}

function configurarPestanaPuntuaciones(ss) {
  var hoja = ss.getSheetByName('Puntuaciones_Online');
  if (!hoja) hoja = ss.insertSheet('Puntuaciones_Online');
  else hoja.clear();

  hoja.setTabColor('#00897B');
  var cabeceras = ['Fecha_Hora', 'Jugador_O_Equipo', 'Curso_Grupo', 'Puntuacion_Final', 'Vidas_Restantes', 'Tiempo_Segundos', 'Desglose_Aciertos', 'Resultado_Mision'];
  var anchos = [150, 180, 110, 110, 110, 120, 260, 130];

  var rHeader = hoja.getRange(1, 1, 1, cabeceras.length);
  rHeader.setValues([cabeceras]);
  rHeader.setBackground('#004D40');
  rHeader.setFontColor('#FFFFFF');
  rHeader.setFontWeight('bold');
  rHeader.setHorizontalAlignment('center');
  rHeader.setVerticalAlignment('middle');
  hoja.setRowHeight(1, 38);
  hoja.setFrozenRows(1);
  for (var i = 0; i < anchos.length; i++) hoja.setColumnWidth(i + 1, anchos[i]);
}

function configurarPestanaLobby(ss) {
  var hoja = ss.getSheetByName('Lobby_Multijugador');
  if (!hoja) hoja = ss.insertSheet('Lobby_Multijugador');
  else hoja.clear();

  hoja.setTabColor('#D81B60');
  var cabeceras = ['ID_Sesion', 'Nombre_Equipo', 'Icono_Avatar', 'Posicion_Pista', 'Puntos_Acumulados', 'Ultima_Actualizacion'];
  var anchos = [110, 180, 100, 110, 120, 160];

  var rHeader = hoja.getRange(1, 1, 1, cabeceras.length);
  rHeader.setValues([cabeceras]);
  rHeader.setBackground('#880E4F');
  rHeader.setFontColor('#FFFFFF');
  rHeader.setFontWeight('bold');
  rHeader.setHorizontalAlignment('center');
  rHeader.setVerticalAlignment('middle');
  hoja.setRowHeight(1, 38);
  hoja.setFrozenRows(1);
  for (var i = 0; i < anchos.length; i++) hoja.setColumnWidth(i + 1, anchos[i]);
}

function configurarPestanaConfig(ss, filasParametros) {
  var hoja = ss.getSheetByName('Config_Juego');
  if (!hoja) hoja = ss.insertSheet('Config_Juego', 0);
  else hoja.clear();

  hoja.setTabColor('#1A73E8');
  var cabeceras = ['Parametro', 'Valor', 'Descripcion_Docente'];
  var rHeader = hoja.getRange(1, 1, 1, 3);
  rHeader.setValues([cabeceras]);
  rHeader.setBackground('#1A73E8');
  rHeader.setFontColor('#FFFFFF');
  rHeader.setFontWeight('bold');
  hoja.setRowHeight(1, 38);

  var rData = hoja.getRange(2, 1, filasParametros.length, 3);
  rData.setValues(filasParametros);
  hoja.setFrozenRows(1);
  hoja.setColumnWidth(1, 200);
  hoja.setColumnWidth(2, 320);
  hoja.setColumnWidth(3, 360);
}
