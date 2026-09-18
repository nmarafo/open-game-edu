// ====================================================================
// open-game-edu: Instalador y Motor Monolítico de Referencia
// Etapa: 5.º de Educación Primaria - Decreto Curricular LOMLOE
// Materias: Conocimiento del Medio, Lengua Castellana, Matemáticas
// Licencia: Creative Commons Atribución-CompartirIgual 4.0 (CC BY-SA 4.0)
// Basado en proyectos de Norberto Martín Afonso (OpenDidactia / open-game-edu)
// ====================================================================

/**
 * 1. CONFIGURADOR DEL ECOSISTEMA DE BASE DE DATOS EN SHEETS (5.º PRIMARIA)
 */
function inicializarEcosistema() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // --- A. Pestaña de Control y Configuración ---
  configurarPestanaConfig(ss, [
    ['TITULO_JUEGO', '🌿 La Eco-Patrulla del Bosque Mágico', 'Título visible en la cabecera'],
    ['ETAPA_CURSO', '5.º de Educación Primaria', 'Etapa y curso educativo'],
    ['COMUNIDAD_AUTONOMA', 'Decreto Autonómico de Educación Primaria (LOMLOE)', 'Normativa curricular de referencia'],
    ['DESCRIPCION', '¡Hola, explorador/a! Únete a la patrulla ambiental para proteger la fauna, descifrar mensajes en la naturaleza y calcular recursos ecológicos.', 'Sinopsis para el alumnado'],
    ['VIDAS_INICIALES', 4, 'Intentos o vidas disponibles (adaptado a Primaria)'],
    ['PUNTOS_VICTORIA', 75, 'Puntos necesarios para completar la misión'],
    ['MENSAJE_VICTORIA', '🌟 ¡Enhorabuena! Has conseguido la insignia de Guardián Mayor del Bosque.', 'Mensaje final de victoria'],
    ['MENSAJE_DERROTA', '🌱 ¡Ánimo! El bosque necesita más investigación. ¡Vuelve a intentarlo!', 'Mensaje de motivación al perder']
  ]);

  // --- B. Conocimiento del Medio Natural, Social y Cultural ---
  configurarPestana(
    ss,
    'ConoMedio_Ecosistemas',
    '#2E7D32', // Verde Bosque
    '#1B5E20',
    ['ID', 'Etapa', 'Criterio_Evaluacion', 'Saber_Basico', 'Personaje', 'Texto_Narrativo', 'Opcion_A', 'Opcion_B', 'Opcion_C', 'Respuesta_Correcta', 'Feedback_Didactico', 'Puntos'],
    [80, 130, 250, 180, 140, 320, 190, 190, 190, 120, 280, 70],
    [
      [
        'MED_01', 'El Robledal Antiguo',
        'CE.CMN.5.2: Identificar las relaciones tróficas entre seres vivos y el equilibrio de los ecosistemas.',
        'Redes tróficas y productores/consumidores',
        '🦊 Guardabosques Leo',
        'En este bosque hay robles, orugas, pájaros carboneros y halcones. ¿Quiénes son los seres vivos PRODUCTORES de esta cadena?',
        'A) Los robles (plantas autótrofas)', 'B) Las orugas', 'C) Los pájaros carboneros',
        'A',
        '¡Genial! Los robles y las plantas fabrican su propio alimento mediante la fotosíntesis, por eso son los productores.',
        25
      ],
      [
        'MED_02', 'La Laguna Esmeralda',
        'CE.CMN.5.4: Reconocer la importancia de la biodiversidad y las acciones humanas para su conservación.',
        'Conservación y especies autóctonas',
        '🐸 Nutria Sabia',
        'Hemos encontrado unos peces de acuario que alguien soltó en la laguna. ¿Por qué es un grave peligro para la fauna local?',
        'A) Porque son especies invasoras que compiten por el alimento', 'B) Porque limpian demasiado el agua', 'C) No supone ningún peligro',
        'A',
        '¡Muy bien pensado! Las especies exóticas invasoras alteran el hábitat y pueden hacer desaparecer a los animales autóctonos.',
        25
      ],
      [
        'MED_03', 'La Cueva de los Ecos',
        'CE.CMN.5.1: Utilizar criterios científicos para clasificar animales vertebrados e invertebrados.',
        'Clasificación del reino animal',
        '🦇 Murciélago Chispa',
        'Aunque vuelo como las aves y tengo alas, ¿por qué los científicos me clasifican dentro del grupo de los MAMÍFEROS?',
        'A) Porque tengo plumas invisibles', 'B) Porque nazco del vientre materno y tomo leche', 'C) Porque tengo sangre fría',
        'B',
        '¡Estupendo! Los murciélagos son los únicos mamíferos capaces de volar activamente y amamantan a sus crías.',
        25
      ]
    ]
  );

  // --- C. Lengua Castellana y Literatura ---
  configurarPestana(
    ss,
    'Lengua_Exploradores',
    '#7B1FA2', // Púrpura
    '#4A148C',
    ['ID', 'Etapa', 'Criterio_Evaluacion', 'Saber_Basico', 'Personaje', 'Texto_Narrativo', 'Opcion_A', 'Opcion_B', 'Opcion_C', 'Respuesta_Correcta', 'Feedback_Didactico', 'Puntos'],
    [80, 130, 250, 180, 140, 320, 190, 190, 190, 120, 280, 70],
    [
      [
        'LENG_01', 'El Árbol de las Palabras',
        'CE.LCL.5.5: Identificar las categorías gramaticales básicas (sustantivos, adjetivos, verbos) en oraciones.',
        'Clases de palabras y adjetivos',
        '🦉 Búho Maestro',
        'En la frase: "El ágil zorro cruzó el río cristalino", ¿cuáles son las dos palabras que funcionan como ADJETIVOS?',
        'A) zorro y río', 'B) ágil y cristalino', 'C) cruzó y el',
        'B',
        '¡Bravo! "Ágil" nos dice cómo es el zorro y "cristalino" describe cómo es el agua del río.',
        25
      ],
      [
        'LENG_02', 'El Refugio de los Cuentos',
        'CE.LCL.5.2: Comprender el sentido de textos narrativos e identificar sus elementos estructurales.',
        'Estructura del texto narrativo',
        '🐿️ Ardilla Escritora',
        'Todo cuento tradicional tiene tres partes principales. ¿En cuál de ellas se presenta el conflicto o problema que deben resolver los personajes?',
        'A) En la introducción o inicio', 'B) En el nudo', 'C) En el desenlace',
        'B',
        '¡Correcto! En el nudo es donde ocurre la aventura o el problema que pone a prueba a los protagonistas.',
        25
      ],
      [
        'LENG_03', 'El Manantial de las Rimas',
        'CE.LCL.5.6: Reconocer la rima consonante y asonante en poemas infantiles y populares.',
        'Recursos poéticos y rima',
        '🐝 Abeja Cantarina',
        '¿Qué palabra rima en CONSONANTE perfecta con "primavera"?',
        'A) sendero', 'B) pradera', 'C) cometa',
        'B',
        '¡Acertaste! "Primavera" y "pradera" coinciden exactamente en todas las letras desde la vocal tónica (-era).',
        25
      ]
    ]
  );

  // --- D. Matemáticas ---
  configurarPestana(
    ss,
    'Mates_Aventura',
    '#0288D1', // Azul brillante
    '#01579B',
    ['ID', 'Etapa', 'Criterio_Evaluacion', 'Saber_Basico', 'Personaje', 'Texto_Narrativo', 'Opcion_A', 'Opcion_B', 'Opcion_C', 'Respuesta_Correcta', 'Feedback_Didactico', 'Puntos'],
    [80, 130, 250, 180, 140, 320, 190, 190, 190, 120, 280, 70],
    [
      [
        'MAT_01', 'El Huerto Escolar',
        'CE.MAT.5.1: Resolver problemas cotidianos utilizando fracciones simples como partes de la unidad.',
        'Concepto y representación de fracciones',
        '🌻 Jardinera Maya',
        'Hemos dividido el bancal del huerto en 8 partes iguales. Si hemos plantado fresas en 3 partes y tomates en 2 partes, ¿qué fracción del huerto está sembrada?',
        'A) 5/8 del huerto', 'B) 3/8 del huerto', 'C) 1/2 del huerto',
        'A',
        '¡Exacto! Sumamos 3/8 + 2/8 = 5/8 del total del huerto sembrado.',
        25
      ],
      [
        'MAT_02', 'La Cabaña de Madera',
        'CE.MAT.5.3: Calcular perímetros y áreas de polígonos regulares e irregulares en situaciones reales.',
        'Perímetro de figuras geométricas',
        '🦔 Erizo Carpintero',
        'Para cercar la zona de descanso rectangular, sabemos que mide 6 metros de largo y 4 metros de ancho. ¿Cuántos metros de valla necesitamos en total (perímetro)?',
        'A) 10 metros', 'B) 20 metros', 'C) 24 metros',
        'B',
        '¡Muy bien calculado! El perímetro es la suma de los 4 lados: 6 + 4 + 6 + 4 = 20 metros.',
        25
      ],
      [
        'MAT_03', 'El Campamento Base',
        'CE.MAT.5.2: Resolver problemas combinados con operaciones básicas de sumas, restas y multiplicaciones.',
        'Operaciones combinadas con dinero',
        '🎒 Guía Mateo',
        'Tenemos 3 billetes de 10 € para comprar cantimploras. Cada cantimplora cuesta 6 € y compramos 4 cantimploras. ¿Cuánto dinero nos sobra?',
        'A) Nos sobran 6 €', 'B) Nos sobran 10 €', 'C) Nos sobran 14 €',
        'A',
        '¡Genial! Teníamos 3 x 10 = 30 €. Gastamos 4 x 6 = 24 €. 30 - 24 = 6 € de sobra.',
        25
      ]
    ]
  );

  SpreadsheetApp.flush();
}

/**
 * 2. ENDPOINT HTTP WEB (doGet)
 */
function doGet(e) {
  try {
    var datosJuego = obtenerDatosJuego();

    if (e && e.parameter && e.parameter.action === 'data') {
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
      '<h2>Error cargando el juego</h2>' +
      '<p>Asegúrate de ejecutar primero la función <code>inicializarEcosistema()</code>.</p></div>'
    );
  }
}

/**
 * 3. EXTRACTOR DINÁMICO DE DATOS
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
 * 4. GENERADOR FRONTEND MONOLÍTICO PARA PRIMARIA (BOTONES GRANDES, ALTA ACCESIBILIDAD)
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
'      padding: 16px;\n' +
'    }\n' +
'    #app {\n' +
'      width: 100%;\n' +
'      max-width: 760px;\n' +
'      background: var(--card-bg);\n' +
'      border: 2px solid var(--card-border);\n' +
'      border-radius: var(--radius);\n' +
'      box-shadow: 0 12px 30px rgba(0,0,0,0.6);\n' +
'      overflow: hidden;\n' +
'      display: flex;\n' +
'      flex-direction: column;\n' +
'    }\n' +
'    header {\n' +
'      background: #0b132b;\n' +
'      padding: 16px 22px;\n' +
'      display: flex;\n' +
'      justify-content: space-between;\n' +
'      align-items: center;\n' +
'      border-bottom: 2px solid var(--card-border);\n' +
'    }\n' +
'    .logo-text { font-size: 1.25rem; font-weight: 800; color: var(--color-gold); }\n' +
'    .stats-pill { display: flex; align-items: center; gap: 12px; font-weight: 700; font-size: 1.05rem; }\n' +
'    .score-chip { background: var(--color-blue); color: white; padding: 6px 14px; border-radius: 20px; }\n' +
'    main { padding: 26px; min-height: 420px; display: flex; flex-direction: column; justify-content: center; }\n' +
'    .criterio-badge {\n' +
'      background: rgba(17, 138, 178, 0.2);\n' +
'      border-left: 4px solid var(--color-blue);\n' +
'      padding: 10px 14px;\n' +
'      border-radius: 6px;\n' +
'      font-size: 0.88rem;\n' +
'      color: #90e0ef;\n' +
'      margin-bottom: 14px;\n' +
'      line-height: 1.4;\n' +
'    }\n' +
'    .dialogue-card {\n' +
'      background: rgba(13, 27, 42, 0.85);\n' +
'      border: 2px solid var(--color-gold);\n' +
'      padding: 20px;\n' +
'      border-radius: 12px;\n' +
'      font-size: 1.15rem;\n' +
'      line-height: 1.6;\n' +
'      margin-bottom: 22px;\n' +
'    }\n' +
'    .speaker-name { color: var(--color-gold); font-size: 1rem; font-weight: 800; margin-bottom: 8px; }\n' +
'    /* Botones grandes adaptados para Primaria y pantallas táctiles */\n' +
'    .options-grid { display: flex; flex-direction: column; gap: 14px; margin-bottom: 18px; }\n' +
'    .option-btn {\n' +
'      background: #24344d;\n' +
'      border: 2px solid #415a77;\n' +
'      color: white;\n' +
'      padding: 16px 20px;\n' +
'      border-radius: 12px;\n' +
'      font-size: 1.05rem;\n' +
'      font-weight: 600;\n' +
'      text-align: left;\n' +
'      cursor: pointer;\n' +
'      transition: transform 0.15s, background 0.15s;\n' +
'      min-height: 54px;\n' +
'    }\n' +
'    .option-btn:hover { background: #324b6d; border-color: var(--color-gold); transform: translateY(-2px); }\n' +
'    .option-btn:disabled { opacity: 0.7; cursor: not-allowed; }\n' +
'    .btn-action {\n' +
'      background: var(--color-gold);\n' +
'      color: #000;\n' +
'      font-weight: 800;\n' +
'      border: none;\n' +
'      padding: 16px 30px;\n' +
'      border-radius: 12px;\n' +
'      font-size: 1.1rem;\n' +
'      cursor: pointer;\n' +
'      align-self: flex-start;\n' +
'      margin-top: 14px;\n' +
'    }\n' +
'    .btn-action:hover { background: #e0b443; }\n' +
'    .feedback-box {\n' +
'      padding: 18px;\n' +
'      border-radius: 10px;\n' +
'      margin-top: 12px;\n' +
'      font-size: 1rem;\n' +
'      line-height: 1.5;\n' +
'    }\n' +
'    .fb-ok { background: rgba(6, 214, 160, 0.2); border: 2px solid var(--color-green); color: #80ed99; }\n' +
'    .fb-err { background: rgba(239, 71, 111, 0.2); border: 2px solid var(--color-red); color: #ffb4a2; }\n' +
'    .subject-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 16px; }\n' +
'    @media(max-width: 600px) { .subject-grid { grid-template-columns: 1fr; } }\n' +
'    .subject-card {\n' +
'      background: #0d1b2a;\n' +
'      border: 2px solid var(--card-border);\n' +
'      border-radius: 12px;\n' +
'      padding: 20px;\n' +
'      cursor: pointer;\n' +
'      transition: transform 0.2s, border-color 0.2s;\n' +
'    }\n' +
'    .subject-card:hover { border-color: var(--color-gold); transform: translateY(-3px); }\n' +
'    .subject-card.done { opacity: 0.6; border-color: var(--color-green); }\n' +
'  </style>\n' +
'</head>\n' +
'<body>\n' +
'  <div id="app">\n' +
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
'      vidas: 4,\n' +
'      puntos: 0,\n' +
'      puntosMeta: 75,\n' +
'      completados: {},\n' +
'      materia: null,\n' +
'      retoIdx: 0\n' +
'    };\n' +
'\n' +
'    function actualizarBarra() {\n' +
'      var h = "";\n' +
'      for (var i = 0; i < Game.vidas; i++) h += "❤️";\n' +
'      document.getElementById("heartsBox").innerText = h || "💔";\n' +
'      document.getElementById("scoreVal").innerText = Game.puntos;\n' +
'    }\n' +
'\n' +
'    function renderInicio() {\n' +
'      var m = window.GAME_DATA.meta || {};\n' +
'      Game.vidas = parseInt(m.VIDAS_INICIALES, 10) || 4;\n' +
'      Game.puntosMeta = parseInt(m.PUNTOS_VICTORIA, 10) || 75;\n' +
'      document.getElementById("headerTitle").innerText = m.TITULO_JUEGO || "🌿 La Eco-Patrulla";\n' +
'      actualizarBarra();\n' +
'\n' +
'      var nivel = m.ETAPA_CURSO ? (\'<p style="color:var(--color-gold);font-weight:700;margin-bottom:10px;">🎒 \' + m.ETAPA_CURSO + \'</p>\') : \'\';\n' +
'\n' +
'      var stage = document.getElementById("stage");\n' +
'      stage.innerHTML = \n' +
'        \'<h2 style="font-size:1.6rem;color:var(--color-gold);margin-bottom:8px;">\' + (m.TITULO_JUEGO || "Misión Ambiental") + \'</h2>\' +\n' +
'        nivel +\n' +
'        \'<div class="dialogue-card">\' + (m.DESCRIPCION || "¡Bienvenido a la aventura de la naturaleza!") + \'</div>\' +\n' +
'        \'<p style="color:var(--text-muted);margin-bottom:18px;">Consigue al menos \' + Game.puntosMeta + \' puntos investigando todas las áreas del bosque.</p>\' +\n' +
'        \'<button class="btn-action" onclick="AudioFX.click(); renderSelector();">🚀 ¡Iniciar la Misión!</button>\';\n' +
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
'      var html = \'<h2 style="color:var(--color-gold);font-size:1.5rem;margin-bottom:8px;">🗺️ Mapa del Territorio Natural</h2>\' +\n' +
'                 \'<p style="color:var(--text-muted);margin-bottom:14px;">Elige el rincón del bosque que quieres explorar:</p>\' +\n' +
'                 \'<div class="subject-grid">\';\n' +
'\n' +
'      nombres.forEach(function(nom) {\n' +
'        var lista = mats[nom] || [];\n' +
'        var done = lista.every(function(item) { return Game.completados[item.ID]; });\n' +
'        var cName = done ? "subject-card done" : "subject-card";\n' +
'        var estado = done ? "✅ ¡Rincón protegido!" : ("⭐ " + lista.length + " retos por resolver");\n' +
'\n' +
'        html += \'<div class="\' + cName + \'" onclick="AudioFX.click(); abrirRincon(\\\'\' + nom + \'\\\')">\' +\n' +
'                  \'<h3 style="color:var(--color-gold);font-size:1.2rem;margin-bottom:6px;">\' + nom.replace("_", " ") + \'</h3>\' +\n' +
'                  \'<p style="font-size:0.92rem;color:var(--text-muted);">\' + estado + \'</p>\' +\n' +
'                \'</div>\';\n' +
'      });\n' +
'      html += \'</div>\';\n' +
'      stage.innerHTML = html;\n' +
'    }\n' +
'\n' +
'    function abrirRincon(nom) {\n' +
'      Game.materia = nom;\n' +
'      var lista = window.GAME_DATA.materias[nom] || [];\n' +
'      var primerNoHecho = 0;\n' +
'      for (var i = 0; i < lista.length; i++) {\n' +
'        if (!Game.completados[lista[i].ID]) { primerNoHecho = i; break; }\n' +
'      }\n' +
'      Game.retoIdx = primerNoHecho;\n' +
'      renderPregunta();\n' +
'    }\n' +
'\n' +
'    function renderPregunta() {\n' +
'      var lista = window.GAME_DATA.materias[Game.materia] || [];\n' +
'      if (Game.retoIdx >= lista.length) { renderSelector(); return; }\n' +
'\n' +
'      var reto = lista[Game.retoIdx];\n' +
'      var stage = document.getElementById("stage");\n' +
'      var personaje = reto.Personaje || "Guía Forestal";\n' +
'\n' +
'      var badgeCurricular = reto.Criterio_Evaluacion\n' +
'        ? (\'<div class="criterio-badge">🎯 <strong>Criterio Oficial:</strong> \' + reto.Criterio_Evaluacion + \'</div>\')\n' +
'        : \'\';\n' +
'\n' +
'      var html = \'<h3 style="color:var(--color-blue);font-size:1.3rem;margin-bottom:8px;">📍 \' + (reto.Etapa || Game.materia) + \'</h3>\' +\n' +
'        badgeCurricular +\n' +
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
'      var lista = window.GAME_DATA.materias[Game.materia];\n' +
'      var reto = lista[Game.retoIdx];\n' +
'      var fb = document.getElementById("fbBox");\n' +
'      var btns = document.querySelectorAll(".option-btn");\n' +
'      btns.forEach(function(b) { b.disabled = true; });\n' +
'\n' +
'      var correcta = String(reto.Respuesta_Correcta || "").trim().toUpperCase();\n' +
'      var saber = reto.Saber_Basico ? (\'<br><small style="color:#94a3b8">📚 Saber curricular: \' + reto.Saber_Basico + \'</small>\') : \'\';\n' +
'\n' +
'      if (opc === correcta) {\n' +
'        AudioFX.okTone();\n' +
'        var p = parseInt(reto.Puntos, 10) || 25;\n' +
'        Game.puntos += p;\n' +
'        Game.completados[reto.ID] = true;\n' +
'        actualizarBarra();\n' +
'        fb.innerHTML = \'<div class="feedback-box fb-ok">\' +\n' +
'          \'<strong>🎉 ¡Muy bien hecho! (+\' + p + \' puntos)</strong><br>\' + reto.Feedback_Didactico + saber +\n' +
'        \'</div>\' +\n' +
'        \'<button class="btn-action" onclick="avanzar()">Continuar Explorando ➔</button>\';\n' +
'      } else {\n' +
'        AudioFX.errTone();\n' +
'        Game.vidas -= 1;\n' +
'        actualizarBarra();\n' +
'        fb.innerHTML = \'<div class="feedback-box fb-err">\' +\n' +
'          \'<strong>💪 ¡Casi! Revisa la pista didáctica:</strong><br>\' + reto.Feedback_Didactico + saber +\n' +
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
'      var lista = window.GAME_DATA.materias[Game.materia];\n' +
'      if (Game.retoIdx < lista.length) {\n' +
'        renderPregunta();\n' +
'      } else {\n' +
'        renderSelector();\n' +
'      }\n' +
'    }\n' +
'\n' +
'    function renderGameOver() {\n' +
'      AudioFX.errTone();\n' +
'      var m = window.GAME_DATA.meta || {};\n' +
'      var stage = document.getElementById("stage");\n' +
'      stage.innerHTML = \n' +
'        \'<h2 style="color:var(--color-red);font-size:1.6rem;margin-bottom:8px;">🌱 Misión en Pausa</h2>\' +\n' +
'        \'<div class="dialogue-card">\' + (m.MENSAJE_DERROTA || "Has gastado tus corazones, ¡pero has aprendido mucho!") + \'</div>\' +\n' +
'        \'<p style="color:var(--text-muted);margin-bottom:16px;">Has conseguido \' + Game.puntos + \' puntos de conocimiento.</p>\' +\n' +
'        \'<button class="btn-action" onclick="AudioFX.click(); renderInicio();">🔄 Intentar Otra Vez</button>\';\n' +
'    }\n' +
'\n' +
'    function renderVictoria() {\n' +
'      AudioFX.winTone();\n' +
'      var m = window.GAME_DATA.meta || {};\n' +
'      var stage = document.getElementById("stage");\n' +
'      stage.innerHTML = \n' +
'        \'<h2 style="color:var(--color-gold);font-size:1.6rem;margin-bottom:8px;">🏆 ¡Misión Ecológica Cumplida!</h2>\' +\n' +
'        \'<div class="dialogue-card">\' + (m.MENSAJE_VICTORIA || "¡Eres un auténtico Guardián del Bosque!") + \'</div>\' +\n' +
'        \'<p style="color:var(--text-muted);margin-bottom:16px;">Puntuación de Honor: <strong>\' + Game.puntos + \' pts</strong></p>\' +\n' +
'        \'<button class="btn-action" onclick="AudioFX.click(); renderInicio();">✨ Volver a Jugar</button>\';\n' +
'    }\n' +
'\n' +
'    window.onload = function() { renderInicio(); };\n' +
'  </script>\n' +
'</body>\n' +
'</html>';
}

/**
 * 5. MÉTODOS AUXILIARES DE CREACIÓN DE PESTAÑAS
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
  hoja.setRowHeight(1, 38);

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

  var colResp = cabeceras.indexOf('Respuesta_Correcta') + 1;
  if (colResp > 0) {
    var regla = SpreadsheetApp.newDataValidation()
      .requireValueInList(['A', 'B', 'C'], true)
      .setAllowInvalid(false)
      .setHelpText('Elige A, B o C.')
      .build();
    hoja.getRange(2, colResp, 99, 1).setDataValidation(regla);
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
  hoja.setRowHeight(1, 38);

  var rData = hoja.getRange(2, 1, filasParametros.length, 3);
  rData.setValues(filasParametros);
  hoja.setFrozenRows(1);
  hoja.setColumnWidth(1, 200);
  hoja.setColumnWidth(2, 320);
  hoja.setColumnWidth(3, 360);
}
