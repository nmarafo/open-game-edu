// ====================================================================
// open-game-edu: Instalador y Motor Monolítico de Referencia
// Nivel: 3.º de ESO
// Materias: Lengua Castellana (Teatro y Siglo de Oro), Historia (Comercio s.XVI), Matemáticas (Probabilidad)
// Licencia: MIT - Proyecto Open Game Edu
// ====================================================================

/**
 * 1. CONFIGURADOR DEL ECOSISTEMA DE BASE DE DATOS EN SHEETS
 * Ejecuta esta función una sola vez desde el editor para inicializar las pestañas.
 */
function inicializarEcosistema() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // --- A. Pestaña de Configuración Global ---
  configurarPestanaConfig(ss, [
    ['TITULO_JUEGO', 'La Flota de Indias: Crónicas del Siglo de Oro', 'Título mostrado en la cabecera del juego'],
    ['DESCRIPCION', 'Zarpa desde Sevilla en 1588. Supera enigmas literarios, calcula probabilidades náuticas y gestiona rutas comerciales.', 'Sinopsis de bienvenida'],
    ['VIDAS_INICIALES', 3, 'Número de intentos disponibles para el alumno'],
    ['PUNTOS_VICTORIA', 80, 'Puntuación mínima para completar la expedición'],
    ['MENSAJE_VICTORIA', '¡Enhorabuena, Almirante! Tu flota ha arribado a Veracruz con honores y riqueza.', 'Mensaje al ganar'],
    ['MENSAJE_DERROTA', 'La travesía ha sucumbido a las inclemencias y la falta de pericia.', 'Mensaje al agotar vidas']
  ]);

  // --- B. Pestaña de Lengua Castellana y Literatura ---
  configurarPestana(
    ss,
    'Lengua_Teatro',
    '#7B1FA2', // Púrpura
    '#4A148C',
    ['ID', 'Etapa', 'Personaje', 'Texto_Narrativo', 'Opcion_A', 'Opcion_B', 'Opcion_C', 'Respuesta_Correcta', 'Feedback_Didactico', 'Puntos'],
    [80, 130, 120, 320, 200, 200, 200, 130, 280, 70],
    [
      [
        'LENG_01', 'Puerto de Sevilla', 'Dramaturgo Callejero',
        'Para conseguir el pasaje, un cómico te reta a completar el verso octosílabo en rima asonante:\n"En un rincón de la nave / cantaba alegre el..."',
        'A) jilguero', 'B) soldado', 'C) marinero',
        'A',
        '¡Exacto! "Nave" y "jilguero" comparten la rima asonante en las vocales a-e en posición par.',
        25
      ],
      [
        'LENG_02', 'Alta Mar', 'Fraile Cronista',
        '¿A qué célebre autor del Siglo de Oro, apodado "Fénix de los Ingenios", debemos el tratado "Arte nuevo de hacer comedias"?',
        'A) Francisco de Quevedo', 'B) Lope de Vega', 'C) Pedro Calderón de la Barca',
        'B',
        '¡Correcto! Lope de Vega revolucionó el teatro rompiendo las tres unidades aristotélicas.',
        25
      ],
      [
        'LENG_03', 'Llegada a las Antillas', 'Gobernador de Cuba',
        'En la obra "La vida es sueño", ¿cuál de estos personajes pronuncia el famoso monólogo sobre la libertad encadenada?',
        'A) Clarín', 'B) Segismundo', 'C) Basilio',
        'B',
        '¡Muy bien! Segismundo reflexiona en su torre sobre la condición humana y el libre albedrío.',
        30
      ]
    ]
  );

  // --- C. Pestaña de Geografía e Historia ---
  configurarPestana(
    ss,
    'Historia_Rutas',
    '#D84315', // Ámbar / Fuego
    '#BF360C',
    ['ID', 'Etapa', 'Enclave', 'Texto_Narrativo', 'Opcion_A', 'Opcion_B', 'Opcion_C', 'Respuesta_Correcta', 'Feedback_Didactico', 'Puntos'],
    [80, 130, 140, 320, 200, 200, 200, 130, 280, 70],
    [
      [
        'HIST_01', 'Aduana de Indias', 'Casa de la Contratación',
        '¿Qué institución fundada en Sevilla en 1503 monopolizaba el registro de mercancías, mapas y pilotos hacia el Nuevo Mundo?',
        'A) El Consejo de Indias', 'B) La Casa de la Contratación', 'C) El Consulado del Mar',
        'B',
        '¡Históricamente riguroso! La Casa de la Contratación custodiaba además el Padrón Real (mapa secreto).',
        25
      ],
      [
        'HIST_02', 'Paso de las Canarias', 'Isla de La Gomera',
        'Las flotas españolas aprovechaban un sistema constante de vientos para cruzar el océano Atlántico hacia América. ¿Cuáles eran?',
        'A) Vientos Alisios', 'B) Vientos Polares del Este', 'C) Corriente de Humboldt',
        'A',
        '¡Brillante! Los vientos alisios del este-noreste impulsaban las carabelas y galeones velozmente.',
        25
      ],
      [
        'HIST_03', 'Mar Caribe', 'Cayo Sombrío',
        '¿Qué sistema defensivo se instauró para proteger los navíos cargados de plata de los ataques de corsarios y piratas?',
        'A) La Armada Invencible', 'B) El Régimen de Navegación Libre', 'C) El Sistema de Flotas y Galeones',
        'C',
        '¡Correcto! Viajaban en convoy dos veces al año escoltados por buques de guerra de la Real Armada.',
        30
      ]
    ]
  );

  // --- D. Pestaña de Matemáticas ---
  configurarPestana(
    ss,
    'Mates_Probabilidad',
    '#1565C0', // Azul Océano
    '#0D47A1',
    ['ID', 'Etapa', 'Desafío_Cálculo', 'Texto_Narrativo', 'Opcion_A', 'Opcion_B', 'Opcion_C', 'Respuesta_Correcta', 'Feedback_Didactico', 'Puntos'],
    [80, 130, 140, 320, 200, 200, 200, 130, 280, 70],
    [
      [
        'MAT_01', 'Bodega del Galeón', 'Reparto de Víveres',
        'De 60 quintales de grano almacenados, las ratas han dañado 15 quintales. ¿Qué fracción del cargamento de grano sigue intacta?',
        'A) 1/4', 'B) 3/4', 'C) 2/3',
        'B',
        '¡Exacto! 60 - 15 = 45 quintales intactos. Simplificando: 45/60 = 3/4 (o el 75%).',
        25
      ],
      [
        'MAT_02', 'Tormenta en el Atlántico', 'Cálculo de Rumbo',
        'Un anemómetro rudimentario indica 4 vientos probables de tempestad de un total de 16 cuadrantes de la rosa. Según la regla de Laplace, ¿cuál es la probabilidad de entrar en temporal?',
        'A) 1/4 (25%)', 'B) 1/2 (50%)', 'C) 1/8 (12.5%)',
        'A',
        '¡Bien calculado! Casos favorables / casos posibles = 4/16 = 1/4 = 25%.',
        30
      ],
      [
        'MAT_03', 'Mercado de Veracruz', 'Venta de Especias',
        'Una carga de canela y clavo se vende por 800 reales con un beneficio neto del 20%. ¿Cuál fue el coste original de compra en Sevilla?',
        'A) 640 reales', 'B) 666.67 reales', 'C) 700 reales',
        'B',
        '¡Cálculo comercial maestro! Coste * 1.20 = 800  =>  Coste = 800 / 1.2 = 666.67 reales.',
        30
      ]
    ]
  );

  // Aplicar validaciones en columnas de Respuesta_Correcta (columna 8 = H)
  aplicarValidacionRespuesta(ss.getSheetByName('Lengua_Teatro'), 8);
  aplicarValidacionRespuesta(ss.getSheetByName('Historia_Rutas'), 8);
  aplicarValidacionRespuesta(ss.getSheetByName('Mates_Probabilidad'), 8);

  SpreadsheetApp.flush();
}

/**
 * 2. ENDPOINT HTTP WEB (doGet)
 */
function doGet(e) {
  try {
    var datosJuego = obtenerDatosJuego();

    // Si se consulta ?action=data, se devuelven los datos en JSON puro
    if (e && e.parameter && e.parameter.action === 'data') {
      return ContentService.createTextOutput(JSON.stringify(datosJuego))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var htmlOutput = HtmlService.createHtmlOutput(getGameHtml(JSON.stringify(datosJuego)));
    
    var titulo = (datosJuego.meta && datosJuego.meta.TITULO_JUEGO) 
      ? datosJuego.meta.TITULO_JUEGO 
      : 'La Flota de Indias - Juego Educativo';
    
    htmlOutput.setTitle(titulo);
    htmlOutput.addMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    htmlOutput.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);

    return htmlOutput;
  } catch (err) {
    return HtmlService.createHtmlOutput(
      '<div style="font-family:sans-serif;padding:30px;color:#d32f2f;">' +
      '<h2>Error al cargar el videojuego</h2>' +
      '<p>Por favor, asegúrate de ejecutar primero la función <code>inicializarEcosistema()</code>.</p>' +
      '<p>Detalle: ' + err.message + '</p></div>'
    );
  }
}

/**
 * 3. EXTRACTOR DINÁMICO DE DATOS DE SHEETS
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
    } else {
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
 * 4. GENERADOR DEL FRONTEND MONOLÍTICO (HTML + CSS + VANILLA JS)
 */
function getGameHtml(initialDataJson) {
  return '<!DOCTYPE html>\n' +
'<html lang="es">\n' +
'<head>\n' +
'  <meta charset="UTF-8">\n' +
'  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
'  <style>\n' +
'    :root {\n' +
'      --bg-dark: #0f172a;\n' +
'      --card-bg: #1e293b;\n' +
'      --card-border: #334155;\n' +
'      --text-main: #f8fafc;\n' +
'      --text-muted: #94a3b8;\n' +
'      --accent-gold: #f59e0b;\n' +
'      --accent-blue: #38bdf8;\n' +
'      --success-green: #10b981;\n' +
'      --danger-red: #ef4444;\n' +
'      --radius: 12px;\n' +
'    }\n' +
'    * { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; }\n' +
'    body {\n' +
'      background: var(--bg-dark);\n' +
'      color: var(--text-main);\n' +
'      min-height: 100vh;\n' +
'      display: flex;\n' +
'      flex-direction: column;\n' +
'      align-items: center;\n' +
'      padding: 16px;\n' +
'    }\n' +
'    #app {\n' +
'      width: 100%;\n' +
'      max-width: 760px;\n' +
'      background: var(--card-bg);\n' +
'      border: 1px solid var(--card-border);\n' +
'      border-radius: var(--radius);\n' +
'      box-shadow: 0 10px 25px rgba(0,0,0,0.5);\n' +
'      overflow: hidden;\n' +
'      display: flex;\n' +
'      flex-direction: column;\n' +
'    }\n' +
'    /* Header */\n' +
'    header {\n' +
'      background: #111827;\n' +
'      padding: 14px 20px;\n' +
'      display: flex;\n' +
'      justify-content: space-between;\n' +
'      align-items: center;\n' +
'      border-bottom: 1px solid var(--card-border);\n' +
'    }\n' +
'    .title-badge { font-weight: 700; font-size: 1.1rem; color: var(--accent-gold); display: flex; align-items: center; gap: 8px; }\n' +
'    .stats-bar { display: flex; align-items: center; gap: 14px; font-weight: 600; font-size: 0.95rem; }\n' +
'    .heart-icon { color: var(--danger-red); }\n' +
'    .score-badge { background: #0284c7; color: white; padding: 4px 10px; border-radius: 20px; }\n' +
'    /* Main Stage */\n' +
'    main { padding: 24px; min-height: 380px; display: flex; flex-direction: column; justify-content: center; }\n' +
'    .card-title { font-size: 1.4rem; color: var(--accent-blue); margin-bottom: 10px; }\n' +
'    .narrative-box {\n' +
'      background: rgba(15, 23, 42, 0.7);\n' +
'      border-left: 4px solid var(--accent-gold);\n' +
'      padding: 16px;\n' +
'      border-radius: 6px;\n' +
'      font-size: 1.05rem;\n' +
'      line-height: 1.6;\n' +
'      margin-bottom: 20px;\n' +
'      white-space: pre-line;\n' +
'    }\n' +
'    .speaker { font-weight: bold; color: var(--accent-gold); font-size: 0.9rem; text-transform: uppercase; margin-bottom: 6px; }\n' +
'    /* Options Grid */\n' +
'    .options-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 16px; }\n' +
'    .opt-btn {\n' +
'      background: #334155;\n' +
'      border: 2px solid #475569;\n' +
'      color: white;\n' +
'      padding: 14px 18px;\n' +
'      border-radius: 8px;\n' +
'      cursor: pointer;\n' +
'      font-size: 1rem;\n' +
'      text-align: left;\n' +
'      transition: all 0.2s ease;\n' +
'    }\n' +
'    .opt-btn:hover { background: #475569; border-color: var(--accent-blue); transform: translateY(-2px); }\n' +
'    .opt-btn:disabled { opacity: 0.7; cursor: not-allowed; }\n' +
'    /* Feedback Banner */\n' +
'    .feedback-banner {\n' +
'      padding: 16px;\n' +
'      border-radius: 8px;\n' +
'      margin-top: 14px;\n' +
'      font-size: 0.95rem;\n' +
'      line-height: 1.5;\n' +
'      animation: fadeIn 0.3s ease;\n' +
'    }\n' +
'    .feedback-correct { background: rgba(16, 185, 129, 0.15); border: 1px solid var(--success-green); color: #6ee7b7; }\n' +
'    .feedback-wrong { background: rgba(239, 68, 68, 0.15); border: 1px solid var(--danger-red); color: #fca5a5; }\n' +
'    /* Actions */\n' +
'    .action-btn {\n' +
'      background: var(--accent-gold);\n' +
'      color: #000;\n' +
'      border: none;\n' +
'      font-weight: 700;\n' +
'      padding: 14px 24px;\n' +
'      border-radius: 8px;\n' +
'      cursor: pointer;\n' +
'      font-size: 1rem;\n' +
'      margin-top: 16px;\n' +
'      align-self: flex-start;\n' +
'      transition: background 0.2s;\n' +
'    }\n' +
'    .action-btn:hover { background: #d97706; }\n' +
'    .hub-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 16px; }\n' +
'    @media(max-width: 600px) { .hub-grid { grid-template-columns: 1fr; } }\n' +
'    .hub-card {\n' +
'      background: #0f172a;\n' +
'      border: 1px solid var(--card-border);\n' +
'      padding: 18px;\n' +
'      border-radius: 10px;\n' +
'      cursor: pointer;\n' +
'      transition: transform 0.2s, border-color 0.2s;\n' +
'    }\n' +
'    .hub-card:hover { border-color: var(--accent-gold); transform: translateY(-3px); }\n' +
'    .hub-card.completed { opacity: 0.6; border-color: var(--success-green); }\n' +
'    @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }\n' +
'  </style>\n' +
'</head>\n' +
'<body>\n' +
'  <div id="app">\n' +
'    <header>\n' +
'      <div class="title-badge">⚓ <span id="headerTitle">La Flota de Indias</span></div>\n' +
'      <div class="stats-bar">\n' +
'        <span id="heartsContainer">❤️❤️❤️</span>\n' +
'        <span class="score-badge"><span id="scoreDisplay">0</span> pts</span>\n' +
'      </div>\n' +
'    </header>\n' +
'    <main id="gameStage"></main>\n' +
'  </div>\n' +
'\n' +
'  <script>\n' +
'    window.GAME_DATA = ' + initialDataJson + ';\n' +
'\n' +
'    // --- SINTETIZADOR WEB AUDIO API ---\n' +
'    var Sound = (function() {\n' +
'      var ctx = null;\n' +
'      function init() { if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)(); }\n' +
'      function play(f, type, dur, delay) {\n' +
'        try {\n' +
'          init();\n' +
'          var osc = ctx.createOscillator();\n' +
'          var g = ctx.createGain();\n' +
'          osc.type = type || "sine";\n' +
'          osc.frequency.setValueAtTime(f, ctx.currentTime + (delay || 0));\n' +
'          g.gain.setValueAtTime(0.12, ctx.currentTime + (delay || 0));\n' +
'          g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (delay || 0) + dur);\n' +
'          osc.connect(g); g.connect(ctx.destination);\n' +
'          osc.start(ctx.currentTime + (delay || 0));\n' +
'          osc.stop(ctx.currentTime + (delay || 0) + dur);\n' +
'        } catch(e) {}\n' +
'      }\n' +
'      return {\n' +
'        click: function() { play(400, "triangle", 0.05); },\n' +
'        correct: function() {\n' +
'          play(523, "sine", 0.1, 0);\n' +
'          play(659, "sine", 0.1, 0.08);\n' +
'          play(784, "sine", 0.25, 0.16);\n' +
'        },\n' +
'        wrong: function() {\n' +
'          play(220, "sawtooth", 0.15, 0);\n' +
'          play(180, "sawtooth", 0.25, 0.12);\n' +
'        },\n' +
'        win: function() {\n' +
'          [523, 659, 784, 1046].forEach(function(f, i) { play(f, "triangle", 0.3, i * 0.14); });\n' +
'        }\n' +
'      };\n' +
'    })();\n' +
'\n' +
'    // --- ESTADO DEL JUEGO ---\n' +
'    var State = {\n' +
'      vidas: 3,\n' +
'      puntos: 0,\n' +
'      puntosMeta: 80,\n' +
'      completados: {},\n' +
'      materiaActual: null,\n' +
'      indiceReto: 0\n' +
'    };\n' +
'\n' +
'    function actualizarStats() {\n' +
'      var hearts = "";\n' +
'      for (var i = 0; i < State.vidas; i++) hearts += "❤️";\n' +
'      document.getElementById("heartsContainer").innerText = hearts || "💀";\n' +
'      document.getElementById("scoreDisplay").innerText = State.puntos;\n' +
'    }\n' +
'\n' +
'    function renderTitle() {\n' +
'      var stage = document.getElementById("gameStage");\n' +
'      var meta = window.GAME_DATA.meta || {};\n' +
'      State.vidas = parseInt(meta.VIDAS_INICIALES, 10) || 3;\n' +
'      State.puntosMeta = parseInt(meta.PUNTOS_VICTORIA, 10) || 80;\n' +
'      document.getElementById("headerTitle").innerText = meta.TITULO_JUEGO || "Aventura Educativa";\n' +
'      actualizarStats();\n' +
'\n' +
'      stage.innerHTML = \n' +
'        \'<h2 class="card-title">📜 \' + (meta.TITULO_JUEGO || "Expedición") + \'</h2>\' +\n' +
'        \'<div class="narrative-box">\' + (meta.DESCRIPCION || "Bienvenido a la aventura.") + \'</div>\' +\n' +
'        \'<p style="color:var(--text-muted);margin-bottom:16px;">Supera los retos de cada departamento para alcanzar la meta de \' + State.puntosMeta + \' puntos.</p>\' +\n' +
'        \'<button class="action-btn" onclick="Sound.click(); renderHub();">🚀 Comenzar Travesía</button>\';\n' +
'    }\n' +
'\n' +
'    function renderHub() {\n' +
'      actualizarStats();\n' +
'      var stage = document.getElementById("gameStage");\n' +
'      var materias = window.GAME_DATA.materias || {};\n' +
'      var keys = Object.keys(materias);\n' +
'\n' +
'      // Verificar si ya ganó o perdió\n' +
'      if (State.vidas <= 0) { renderGameOver(); return; }\n' +
'      if (State.puntos >= State.puntosMeta) { renderVictory(); return; }\n' +
'\n' +
'      var html = \'<h2 class="card-title">🗺️ Cuaderno de Bitácora: Elige Misión</h2>\' +\n' +
'                 \'<p style="color:var(--text-muted);margin-bottom:12px;">Selecciona la materia que deseas explorar:</p>\' +\n' +
'                 \'<div class="hub-grid">\';\n' +
'\n' +
'      keys.forEach(function(m) {\n' +
'        var lista = materias[m] || [];\n' +
'        var done = lista.every(function(item) { return State.completados[item.ID]; });\n' +
'        var cssClass = done ? "hub-card completed" : "hub-card";\n' +
'        var tag = done ? "✅ Superada" : ("📌 " + lista.length + " retos disponibles");\n' +
'        \n' +
'        html += \'<div class="\' + cssClass + \'" onclick="Sound.click(); abrirMateria(\\\'\' + m + \'\\\')">\' +\n' +
'                  \'<h3 style="color:var(--accent-gold);margin-bottom:6px;">\' + m.replace("_", " ") + \'</h3>\' +\n' +
'                  \'<p style="font-size:0.88rem;color:var(--text-muted);">\' + tag + \'</p>\' +\n' +
'                \'</div>\';\n' +
'      });\n' +
'      html += \'</div>\';\n' +
'      stage.innerHTML = html;\n' +
'    }\n' +
'\n' +
'    function abrirMateria(nombreMateria) {\n' +
'      State.materiaActual = nombreMateria;\n' +
'      var lista = window.GAME_DATA.materias[nombreMateria] || [];\n' +
'      // Encontrar el primer reto no completado\n' +
'      var idx = 0;\n' +
'      for (var i = 0; i < lista.length; i++) {\n' +
'        if (!State.completados[lista[i].ID]) { idx = i; break; }\n' +
'      }\n' +
'      State.indiceReto = idx;\n' +
'      renderReto();\n' +
'    }\n' +
'\n' +
'    function renderReto() {\n' +
'      var lista = window.GAME_DATA.materias[State.materiaActual] || [];\n' +
'      if (State.indiceReto >= lista.length) { renderHub(); return; }\n' +
'\n' +
'      var reto = lista[State.indiceReto];\n' +
'      var stage = document.getElementById("gameStage");\n' +
'      var emisor = reto.Personaje || reto.Enclave || reto.Desafío_Cálculo || "Desafío";\n' +
'      var texto = reto.Texto_Narrativo || reto.Situacion_Problema || "";\n' +
'\n' +
'      var html = \'<h2 class="card-title">⚓ \' + (reto.Etapa || State.materiaActual) + \'</h2>\' +\n' +
'        \'<div class="narrative-box">\' +\n' +
'          \'<div class="speaker">🗣️ \' + emisor + \'</div>\' +\n' +
'          \'<div>\' + texto + \'</div>\' +\n' +
'        \'</div>\' +\n' +
'        \'<div class="options-list" id="optsContainer">\' +\n' +
'          \'<button class="opt-btn" onclick="responder(\\\'A\\\', this)">\' + reto.Opcion_A + \'</button>\' +\n' +
'          \'<button class="opt-btn" onclick="responder(\\\'B\\\', this)">\' + reto.Opcion_B + \'</button>\' +\n' +
'          \'<button class="opt-btn" onclick="responder(\\\'C\\\', this)">\' + reto.Opcion_C + \'</button>\' +\n' +
'        \'</div>\' +\n' +
'        \'<div id="feedbackContainer"></div>\';\n' +
'\n' +
'      stage.innerHTML = html;\n' +
'    }\n' +
'\n' +
'    function responder(opcion, btn) {\n' +
'      var lista = window.GAME_DATA.materias[State.materiaActual];\n' +
'      var reto = lista[State.indiceReto];\n' +
'      var fb = document.getElementById("feedbackContainer");\n' +
'      \n' +
'      // Desactivar botones de opciones\n' +
'      var btns = document.querySelectorAll(".opt-btn");\n' +
'      btns.forEach(function(b) { b.disabled = true; });\n' +
'\n' +
'      var correcta = String(reto.Respuesta_Correcta || "").trim().toUpperCase();\n' +
'      var didactico = reto.Feedback_Didactico || "";\n' +
'\n' +
'      if (opcion === correcta) {\n' +
'        Sound.correct();\n' +
'        var pts = parseInt(reto.Puntos, 10) || 25;\n' +
'        State.puntos += pts;\n' +
'        State.completados[reto.ID] = true;\n' +
'        actualizarStats();\n' +
'        fb.innerHTML = \'<div class="feedback-banner feedback-correct">\' +\n' +
'          \'<strong>✅ ¡Acertado! (+\' + pts + \' pts)</strong><br>\' + didactico +\n' +
'        \'</div>\' +\n' +
'        \'<button class="action-btn" onclick="siguienteReto()">Continuar ➔</button>\';\n' +
'      } else {\n' +
'        Sound.wrong();\n' +
'        State.vidas -= 1;\n' +
'        actualizarStats();\n' +
'        fb.innerHTML = \'<div class="feedback-banner feedback-wrong">\' +\n' +
'          \'<strong>❌ Respuesta incorrecta (-1 vida)</strong><br>\' + didactico +\n' +
'        \'</div>\' +\n' +
'        \'<button class="action-btn" onclick="siguienteReto()">Avanzar ➔</button>\';\n' +
'      }\n' +
'    }\n' +
'\n' +
'    function siguienteReto() {\n' +
'      Sound.click();\n' +
'      if (State.vidas <= 0) { renderGameOver(); return; }\n' +
'      if (State.puntos >= State.puntosMeta) { renderVictory(); return; }\n' +
'\n' +
'      State.indiceReto++;\n' +
'      var lista = window.GAME_DATA.materias[State.materiaActual];\n' +
'      if (State.indiceReto < lista.length) {\n' +
'        renderReto();\n' +
'      } else {\n' +
'        renderHub();\n' +
'      }\n' +
'    }\n' +
'\n' +
'    function renderGameOver() {\n' +
'      Sound.wrong();\n' +
'      var meta = window.GAME_DATA.meta || {};\n' +
'      var stage = document.getElementById("gameStage");\n' +
'      stage.innerHTML = \n' +
'        \'<h2 class="card-title" style="color:var(--danger-red)">💀 Fin de la Partida</h2>\' +\n' +
'        \'<div class="narrative-box">\' + (meta.MENSAJE_DERROTA || "Has agotado todas tus vidas en el océano.") + \'</div>\' +\n' +
'        \'<p style="color:var(--text-muted);margin-bottom:16px;">Puntuación alcanzada: \' + State.puntos + \' puntos.</p>\' +\n' +
'        \'<button class="action-btn" onclick="Sound.click(); renderTitle();">🔄 Intentar de Nuevo</button>\';\n' +
'    }\n' +
'\n' +
'    function renderVictory() {\n' +
'      Sound.win();\n' +
'      var meta = window.GAME_DATA.meta || {};\n' +
'      var stage = document.getElementById("gameStage");\n' +
'      stage.innerHTML = \n' +
'        \'<h2 class="card-title" style="color:var(--accent-gold)">🏆 ¡Victoria Gloriosa!</h2>\' +\n' +
'        \'<div class="narrative-box">\' + (meta.MENSAJE_VICTORIA || "¡Has arribado al puerto con éxito!") + \'</div>\' +\n' +
'        \'<p style="color:var(--text-muted);margin-bottom:16px;">¡Puntuación final: <strong>\' + State.puntos + \' pts</strong>!</p>\' +\n' +
'        \'<button class="action-btn" onclick="Sound.click(); renderTitle();">✨ Volver a Jugar</button>\';\n' +
'    }\n' +
'\n' +
'    window.onload = function() { renderTitle(); };\n' +
'  </script>\n' +
'</body>\n' +
'</html>';
}

/**
 * 5. MÉTODOS AUXILIARES DE SCAFFOLDING
 */
function configurarPestana(ss, nombre, tabColor, headerBg, cabeceras, anchos, semillas) {
  var hoja = ss.getSheetByName(nombre);
  if (!hoja) {
    hoja = ss.insertSheet(nombre);
  } else {
    hoja.clear();
  }

  hoja.setTabColor(tabColor);
  var rHeader = hoja.getRange(1, 1, 1, cabeceras.length);
  rHeader.setValues([cabeceras]);
  rHeader.setBackground(headerBg);
  rHeader.setFontColor('#FFFFFF');
  rHeader.setFontWeight('bold');
  rHeader.setHorizontalAlignment('center');
  rHeader.setVerticalAlignment('middle');
  hoja.setRowHeight(1, 36);

  if (semillas && semillas.length > 0) {
    var rData = hoja.getRange(2, 1, semillas.length, cabeceras.length);
    rData.setValues(semillas);
    rData.setVerticalAlignment('middle');
  }

  hoja.setFrozenRows(1);

  if (anchos && anchos.length === cabeceras.length) {
    for (var i = 0; i < anchos.length; i++) {
      hoja.setColumnWidth(i + 1, anchos[i]);
    }
  }
}

function configurarPestanaConfig(ss, filasParametros) {
  var hoja = ss.getSheetByName('Config_Juego');
  if (!hoja) {
    hoja = ss.insertSheet('Config_Juego', 0);
  } else {
    hoja.clear();
  }

  hoja.setTabColor('#1A73E8');
  var cabeceras = ['Parametro', 'Valor', 'Descripcion_Docente'];
  var rHeader = hoja.getRange(1, 1, 1, 3);
  rHeader.setValues([cabeceras]);
  rHeader.setBackground('#1A73E8');
  rHeader.setFontColor('#FFFFFF');
  rHeader.setFontWeight('bold');
  hoja.setRowHeight(1, 36);

  var rData = hoja.getRange(2, 1, filasParametros.length, 3);
  rData.setValues(filasParametros);
  hoja.setFrozenRows(1);
  hoja.setColumnWidth(1, 180);
  hoja.setColumnWidth(2, 280);
  hoja.setColumnWidth(3, 340);
}

function aplicarValidacionRespuesta(hoja, numColumna) {
  if (!hoja) return;
  var regla = SpreadsheetApp.newDataValidation()
    .requireValueInList(['A', 'B', 'C'], true)
    .setAllowInvalid(false)
    .setHelpText('Introduce A, B o C según la opción correcta.')
    .build();
  hoja.getRange(2, numColumna, 99, 1).setDataValidation(regla);
}
