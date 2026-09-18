// ====================================================================
// open-game-edu: Instalador y Motor Monolítico de Referencia
// Etapa: 3.º de ESO (Secundaria) - Decreto Curricular LOMLOE
// Materias: Lengua Castellana (Siglo de Oro), Geografía e Historia (Comercio s.XVI), Matemáticas (Probabilidad)
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
    .addItem('📋 Panel de Revisión de Propuestas', 'mostrarPanelRevision')
    .addSeparator()
    .addItem('⚙️ Reinicializar Ecosistema', 'inicializarEcosistema')
    .addToUi();
}

/**
 * Abre el juego en una ventana modal flotante dentro de Google Sheets.
 */
function mostrarJuegoModal() {
  var datos = obtenerDatosJuego();
  var html = HtmlService.createHtmlOutput(getGameHtml(JSON.stringify(datos)))
    .setWidth(820)
    .setHeight(640);
  SpreadsheetApp.getUi().showModalDialog(html, '🎮 Previsualización del Videojuego - Modo RUN');
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
    '<h2>📋 Propuestas de Retos del Alumnado (3.º ESO)</h2>';

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
        '<strong>Autor:</strong> ' + (p.Autor_O_Equipo || 'Equipo Alumnos') + '<br>' +
        '<strong>Pregunta:</strong> ' + p.Texto_Narrativo + '<br>' +
        '<strong>Criterio:</strong> <small>' + (p.Criterio_Evaluacion || 'Sin especificar') + '</small><br>' +
        '<button class="btn-app" onclick="google.script.run.withSuccessHandler(function(){location.reload();}).cambiarEstadoReto(\'' + p._materia + '\',\'' + p.ID + '\',\'APROBADO\',\'Aprobado por el profesor\');">✅ Aprobar para el Juego</button>' +
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

  configurarPestanaConfig(ss, [
    ['TITULO_JUEGO', 'La Flota de Indias: Crónicas del Siglo de Oro', 'Título mostrado en la cabecera del juego'],
    ['ETAPA_CURSO', '3.º de ESO', 'Etapa y curso educativo'],
    ['COMUNIDAD_AUTONOMA', 'Decreto Autonómico de Educación Secundaria (LOMLOE)', 'Decreto autonómico de currículo aplicado'],
    ['DESCRIPCION', 'Zarpa desde Sevilla en 1588. Supera enigmas literarios, calcula probabilidades náuticas y gestiona rutas comerciales.', 'Sinopsis de bienvenida'],
    ['VIDAS_INICIALES', 3, 'Número de intentos disponibles para el alumno'],
    ['PUNTOS_VICTORIA', 80, 'Puntuación mínima para completar la expedición'],
    ['MENSAJE_VICTORIA', '¡Enhorabuena, Almirante! Tu flota ha arribado a Veracruz con honores y riqueza.', 'Mensaje al ganar'],
    ['MENSAJE_DERROTA', 'La travesía ha sucumbido a las inclemencias y la falta de pericia.', 'Mensaje al agotar vidas']
  ]);

  var cabecerasMateria = [
    'ID', 'Etapa', 'Criterio_Evaluacion', 'Saber_Basico', 'Autor_O_Equipo', 
    'Estado_Revision', 'Feedback_Docente', 'Personaje', 'Texto_Narrativo', 
    'Opcion_A', 'Opcion_B', 'Opcion_C', 'Respuesta_Correcta', 'Feedback_Didactico', 'Puntos'
  ];
  var anchosMateria = [70, 120, 240, 160, 140, 120, 200, 130, 300, 180, 180, 180, 110, 260, 60];

  // --- Lengua Castellana y Literatura ---
  configurarPestana(
    ss, 'Lengua_Teatro', '#7B1FA2', '#4A148C',
    cabecerasMateria, anchosMateria,
    [
      [
        'LENG_01', 'Puerto de Sevilla',
        'CE.LCL.3.2: Leer e interpretar textos literarios identificando convenciones métricas y rima.',
        'Métrica y rima del Siglo de Oro', 'Equipo Docente', 'APROBADO', '',
        'Dramaturgo Callejero',
        'Para conseguir el pasaje, un cómico te reta a completar el verso octosílabo en rima asonante:\n"En un rincón de la nave / cantaba alegre el..."',
        'A) jilguero', 'B) soldado', 'C) marinero',
        'A',
        '¡Exacto! "Nave" y "jilguero" comparten rima asonante en las vocales a-e en posición par.', 25
      ],
      [
        'LENG_02', 'Alta Mar',
        'CE.LCL.3.7: Conocer los autores y obras cumbre de la literatura española del Barroco.',
        'El teatro de Lope de Vega', 'Ana y Carlos (Alumnos)', 'APROBADO', 'Pregunta muy bien enfocada',
        'Fraile Cronista',
        '¿A qué célebre autor del Siglo de Oro, apodado "Fénix de los Ingenios", debemos el tratado "Arte nuevo de hacer comedias"?',
        'A) Francisco de Quevedo', 'B) Lope de Vega', 'C) Pedro Calderón de la Barca',
        'B',
        '¡Correcto! Lope de Vega revolucionó el teatro rompiendo las tres unidades aristotélicas.', 25
      ],
      [
        'LENG_03', 'Llegada a las Antillas',
        'CE.LCL.3.3: Explicar la evolución de los personajes y los grandes temas teatrales clásicos.',
        'El drama calderoniano', 'Equipo 2 - Los Poetas', 'PENDIENTE', '',
        'Gobernador de Cuba',
        'En la obra "La vida es sueño", ¿cuál de estos personajes pronuncia el famoso monólogo sobre la libertad encadenada?',
        'A) Clarín', 'B) Segismundo', 'C) Basilio',
        'B',
        '¡Muy bien! Segismundo reflexiona en su torre sobre la condición humana y el libre albedrío.', 30
      ]
    ]
  );

  // --- Geografía e Historia ---
  configurarPestana(
    ss, 'Historia_Rutas', '#D84315', '#BF360C',
    cabecerasMateria, anchosMateria,
    [
      [
        'HIST_01', 'Aduana de Indias',
        'CE.GH.3.4: Analizar las instituciones de control del comercio marítimo en la Edad Moderna.',
        'La Casa de la Contratación y el monopolio', 'Equipo Docente', 'APROBADO', '',
        'Casa de la Contratación',
        '¿Qué institución fundada en Sevilla en 1503 monopolizaba el registro de mercancías, mapas y pilotos hacia el Nuevo Mundo?',
        'A) El Consejo de Indias', 'B) La Casa de la Contratación', 'C) El Consulado del Mar',
        'B',
        '¡Históricamente riguroso! La Casa de la Contratación custodiaba además el Padrón Real.', 25
      ],
      [
        'HIST_02', 'Paso de las Canarias',
        'CE.GH.3.2: Interpretar factores geográficos y vientos en las navegaciones oceánicas.',
        'Rutas transatlánticas y vientos alisios', 'Javier y Elena', 'APROBADO', 'Gran trabajo con los mapas',
        'Isla de La Gomera',
        'Las flotas españolas aprovechaban un sistema constante de vientos para cruzar el océano Atlántico hacia América. ¿Cuáles eran?',
        'A) Vientos Alisios', 'B) Vientos Polares del Este', 'C) Corriente de Humboldt',
        'A',
        '¡Brillante! Los vientos alisios del este-noreste impulsaban las carabelas y galeones velozmente.', 25
      ]
    ]
  );

  // --- Matemáticas ---
  configurarPestana(
    ss, 'Mates_Probabilidad', '#1565C0', '#0D47A1',
    cabecerasMateria, anchosMateria,
    [
      [
        'MAT_01', 'Bodega del Galeón',
        'CE.MAT.3.1: Utilizar fracciones y proporciones para resolver problemas de inventario y pérdidas.',
        'Operaciones con fracciones', 'Equipo Docente', 'APROBADO', '',
        'Reparto de Víveres',
        'De 60 quintales de grano almacenados, las ratas han dañado 15 quintales. ¿Qué fracción del cargamento de grano sigue intacta?',
        'A) 1/4', 'B) 3/4', 'C) 2/3',
        'B',
        '¡Exacto! 60 - 15 = 45 quintales intactos. Simplificando: 45/60 = 3/4 (o el 75%).', 25
      ],
      [
        'MAT_02', 'Tormenta en el Atlántico',
        'CE.MAT.3.7: Calcular probabilidades de sucesos aleatorios simples mediante la regla de Laplace.',
        'Probabilidad simple y regla de Laplace', 'Equipo 4 - Pitágoras', 'APROBADO', '',
        'Cálculo de Rumbo',
        'Un anemómetro rudimentario indica 4 vientos probables de tempestad de un total de 16 cuadrantes de la rosa. Según la regla de Laplace, ¿cuál es la probabilidad de entrar en temporal?',
        'A) 1/4 (25%)', 'B) 1/2 (50%)', 'C) 1/8 (12.5%)',
        'A',
        '¡Bien calculado! Casos favorables / casos posibles = 4/16 = 1/4 = 25%.', 30
      ]
    ]
  );

  SpreadsheetApp.flush();
}

/**
 * 3. FUNCIONES BACKEND RPC (Envío y Moderación de Propuestas)
 */
function guardarPropuestaReto(nombreMateria, reto) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var hoja = ss.getSheetByName(nombreMateria);
    if (!hoja) throw new Error('No se encontró la materia: ' + nombreMateria);

    var id = reto.ID || (nombreMateria.substring(0, 3).toUpperCase() + '_' + Math.floor(100 + Math.random() * 900));
    var fila = [
      id,
      reto.Etapa || 'Travesía de Indias',
      reto.Criterio_Evaluacion || '',
      reto.Saber_Basico || '',
      reto.Autor_O_Equipo || 'Equipo Alumnado',
      'PENDIENTE',
      '',
      reto.Personaje || 'Oficial de Cubierta',
      reto.Texto_Narrativo || '',
      reto.Opcion_A || '',
      reto.Opcion_B || '',
      reto.Opcion_C || '',
      (reto.Respuesta_Correcta || 'A').toUpperCase(),
      reto.Feedback_Didactico || '',
      parseInt(reto.Puntos, 10) || 25
    ];
    hoja.appendRow(fila);
    return { ok: true, id: id, mensaje: 'Propuesta registrada con éxito. Aparecerá en el juego cuando sea aprobada por el docente.' };
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
    var datosJuego = obtenerDatosJuego();

    if (e && e.parameter && e.parameter.action === 'data') {
      return ContentService.createTextOutput(JSON.stringify(datosJuego))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var htmlOutput = HtmlService.createHtmlOutput(getGameHtml(JSON.stringify(datosJuego)));
    var titulo = (datosJuego.meta && datosJuego.meta.TITULO_JUEGO) ? datosJuego.meta.TITULO_JUEGO : 'La Flota de Indias - Juego Educativo';
    
    htmlOutput.setTitle(titulo);
    htmlOutput.addMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    htmlOutput.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);

    return htmlOutput;
  } catch (err) {
    return HtmlService.createHtmlOutput(
      '<div style="font-family:sans-serif;padding:30px;color:#d32f2f;">' +
      '<h2>Error al cargar el videojuego</h2>' +
      '<p>Asegúrate de ejecutar primero la función <code>inicializarEcosistema()</code>.</p></div>'
    );
  }
}

/**
 * 5. EXTRACTOR DE DATOS
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
 * 6. GENERADOR FRONTEND MONOLÍTICO CON BOTÓN "RUN" Y FORMULARIO DE PROPUESTAS
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
'      max-width: 780px;\n' +
'      background: var(--card-bg);\n' +
'      border: 1px solid var(--card-border);\n' +
'      border-radius: var(--radius);\n' +
'      box-shadow: 0 10px 25px rgba(0,0,0,0.5);\n' +
'      overflow: hidden;\n' +
'      display: flex;\n' +
'      flex-direction: column;\n' +
'    }\n' +
'    /* Barra Superior de Navegación / Modos */\n' +
'    .top-nav {\n' +
'      background: #090e17;\n' +
'      padding: 10px 18px;\n' +
'      display: flex;\n' +
'      justify-content: space-between;\n' +
'      align-items: center;\n' +
'      border-bottom: 1px solid var(--card-border);\n' +
'      gap: 10px;\n' +
'    }\n' +
'    .nav-btn {\n' +
'      background: #334155;\n' +
'      color: #fff;\n' +
'      border: 1px solid var(--card-border);\n' +
'      padding: 8px 16px;\n' +
'      border-radius: 20px;\n' +
'      font-weight: 700;\n' +
'      font-size: 0.9rem;\n' +
'      cursor: pointer;\n' +
'      transition: all 0.2s;\n' +
'    }\n' +
'    .nav-btn.active, .nav-btn:hover { background: var(--accent-gold); color: #000; border-color: var(--accent-gold); }\n' +
'    .run-pulse { background: var(--success-green); color: #000; border: none; }\n' +
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
'    main { padding: 24px; min-height: 400px; display: flex; flex-direction: column; justify-content: center; }\n' +
'    .card-title { font-size: 1.4rem; color: var(--accent-blue); margin-bottom: 10px; }\n' +
'    .curriculum-pill {\n' +
'      background: rgba(56, 189, 248, 0.1);\n' +
'      border-left: 3px solid var(--accent-blue);\n' +
'      padding: 8px 12px;\n' +
'      border-radius: 4px;\n' +
'      font-size: 0.83rem;\n' +
'      color: var(--accent-blue);\n' +
'      margin-bottom: 8px;\n' +
'      line-height: 1.4;\n' +
'    }\n' +
'    .author-pill {\n' +
'      font-size: 0.82rem;\n' +
'      color: var(--accent-gold);\n' +
'      margin-bottom: 12px;\n' +
'      font-weight: 600;\n' +
'    }\n' +
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
'    /* Formulario */\n' +
'    .form-group { margin-bottom: 14px; text-align: left; }\n' +
'    .form-group label { display: block; font-weight: 700; margin-bottom: 6px; font-size: 0.9rem; color: var(--accent-gold); }\n' +
'    .form-control {\n' +
'      width: 100%;\n' +
'      padding: 10px 12px;\n' +
'      border-radius: 6px;\n' +
'      border: 1px solid var(--card-border);\n' +
'      background: #0f172a;\n' +
'      color: #fff;\n' +
'      font-size: 0.95rem;\n' +
'    }\n' +
'    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }\n' +
'    @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }\n' +
'  </style>\n' +
'</head>\n' +
'<body>\n' +
'  <div id="app">\n' +
'    <div class="top-nav">\n' +
'      <div>\n' +
'        <button class="nav-btn run-pulse" id="btnNavRun" onclick="Sound.click(); activarModo(\\\'run\\\');">▶️ RUN / Previsualizar</button>\n' +
'        <button class="nav-btn" id="btnNavForm" onclick="Sound.click(); activarModo(\\\'form\\\');">✏️ Proponer Reto (Alumnos)</button>\n' +
'      </div>\n' +
'      <label style="font-size:0.8rem;color:var(--text-muted);display:flex;align-items:center;gap:6px;">\n' +
'        <input type="checkbox" id="chkTodos" onchange="alternarFiltroPendientes()"> Ver borradores\n' +
'      </label>\n' +
'    </div>\n' +
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
'    var modoActual = "run";\n' +
'    var verBorradores = false;\n' +
'\n' +
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
'        correct: function() { play(523, "sine", 0.1, 0); play(659, "sine", 0.1, 0.08); play(784, "sine", 0.25, 0.16); },\n' +
'        wrong: function() { play(220, "sawtooth", 0.15, 0); play(180, "sawtooth", 0.25, 0.12); },\n' +
'        win: function() { [523, 659, 784, 1046].forEach(function(f, i) { play(f, "triangle", 0.3, i * 0.14); }); }\n' +
'      };\n' +
'    })();\n' +
'\n' +
'    var State = {\n' +
'      vidas: 3,\n' +
'      puntos: 0,\n' +
'      puntosMeta: 80,\n' +
'      completados: {},\n' +
'      materiaActual: null,\n' +
'      indiceReto: 0\n' +
'    };\n' +
'\n' +
'    function alternarFiltroPendientes() {\n' +
'      verBorradores = document.getElementById("chkTodos").checked;\n' +
'      if (modoActual === "run") renderHub();\n' +
'    }\n' +
'\n' +
'    function activarModo(modo) {\n' +
'      modoActual = modo;\n' +
'      document.getElementById("btnNavRun").className = (modo === "run") ? "nav-btn run-pulse active" : "nav-btn";\n' +
'      document.getElementById("btnNavForm").className = (modo === "form") ? "nav-btn active" : "nav-btn";\n' +
'      if (modo === "run") {\n' +
'        renderTitle();\n' +
'      } else {\n' +
'        renderFormularioPropuesta();\n' +
'      }\n' +
'    }\n' +
'\n' +
'    function actualizarStats() {\n' +
'      var hearts = "";\n' +
'      for (var i = 0; i < State.vidas; i++) hearts += "❤️";\n' +
'      document.getElementById("heartsContainer").innerText = hearts || "💀";\n' +
'      document.getElementById("scoreDisplay").innerText = State.puntos;\n' +
'    }\n' +
'\n' +
'    function filtrarRetosMateria(nom) {\n' +
'      var lista = (window.GAME_DATA.materias && window.GAME_DATA.materias[nom]) || [];\n' +
'      if (verBorradores) return lista;\n' +
'      return lista.filter(function(r) { return r.Estado_Revision === "APROBADO" || !r.Estado_Revision; });\n' +
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
'      var subtitulo = meta.ETAPA_CURSO ? (\'<p style="color:var(--accent-gold);margin-bottom:8px;font-weight:600;">Etapa: \' + meta.ETAPA_CURSO + \'</p>\') : \'\';\n' +
'      stage.innerHTML = \n' +
'        \'<h2 class="card-title">📜 \' + (meta.TITULO_JUEGO || "Expedición") + \'</h2>\' +\n' +
'        subtitulo +\n' +
'        \'<div class="narrative-box">\' + (meta.DESCRIPCION || "Bienvenido a la aventura.") + \'</div>\' +\n' +
'        \'<p style="color:var(--text-muted);margin-bottom:16px;">Supera los retos curriculares para alcanzar \' + State.puntosMeta + \' puntos.</p>\' +\n' +
'        \'<button class="action-btn" onclick="Sound.click(); renderHub();">🚀 Comenzar Travesía (RUN)</button>\';\n' +
'    }\n' +
'\n' +
'    function renderHub() {\n' +
'      actualizarStats();\n' +
'      var stage = document.getElementById("gameStage");\n' +
'      var materias = window.GAME_DATA.materias || {};\n' +
'      var keys = Object.keys(materias);\n' +
'\n' +
'      if (State.vidas <= 0) { renderGameOver(); return; }\n' +
'      if (State.puntos >= State.puntosMeta) { renderVictory(); return; }\n' +
'\n' +
'      var html = \'<h2 class="card-title">🗺️ Cuaderno de Bitácora: Elige Misión</h2>\' +\n' +
'                 \'<p style="color:var(--text-muted);margin-bottom:12px;">Selecciona la materia que deseas explorar:</p>\' +\n' +
'                 \'<div class="hub-grid">\';\n' +
'\n' +
'      keys.forEach(function(m) {\n' +
'        var lista = filtrarRetosMateria(m);\n' +
'        var done = lista.length > 0 && lista.every(function(item) { return State.completados[item.ID]; });\n' +
'        var cssClass = done ? "hub-card completed" : "hub-card";\n' +
'        var tag = done ? "✅ Superada" : ("📌 " + lista.length + " retos aprobados");\n' +
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
'      var lista = filtrarRetosMateria(nombreMateria);\n' +
'      if (lista.length === 0) {\n' +
'        alert("No hay retos aprobados en esta materia aún. ¡Envía una propuesta en la pestaña superior!");\n' +
'        return;\n' +
'      }\n' +
'      var idx = 0;\n' +
'      for (var i = 0; i < lista.length; i++) {\n' +
'        if (!State.completados[lista[i].ID]) { idx = i; break; }\n' +
'      }\n' +
'      State.indiceReto = idx;\n' +
'      renderReto();\n' +
'    }\n' +
'\n' +
'    function renderReto() {\n' +
'      var lista = filtrarRetosMateria(State.materiaActual);\n' +
'      if (State.indiceReto >= lista.length) { renderHub(); return; }\n' +
'\n' +
'      var reto = lista[State.indiceReto];\n' +
'      var stage = document.getElementById("gameStage");\n' +
'      var emisor = reto.Personaje || reto.Enclave || reto.Desafío_Cálculo || "Desafío";\n' +
'      var texto = reto.Texto_Narrativo || reto.Situacion_Problema || "";\n' +
'\n' +
'      var criterioHtml = reto.Criterio_Evaluacion \n' +
'        ? (\'<div class="curriculum-pill">🎯 <strong>Criterio Curricular:</strong> \' + reto.Criterio_Evaluacion + \'</div>\')\n' +
'        : \'\';\n' +
'      var autorHtml = reto.Autor_O_Equipo\n' +
'        ? (\'<div class="author-pill">💡 Reto diseñado por: <strong>\' + reto.Autor_O_Equipo + \'</strong></div>\')\n' +
'        : \'\';\n' +
'\n' +
'      var html = \'<h2 class="card-title">⚓ \' + (reto.Etapa || State.materiaActual) + \'</h2>\' +\n' +
'        criterioHtml +\n' +
'        autorHtml +\n' +
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
'      var lista = filtrarRetosMateria(State.materiaActual);\n' +
'      var reto = lista[State.indiceReto];\n' +
'      var fb = document.getElementById("feedbackContainer");\n' +
'      \n' +
'      var btns = document.querySelectorAll(".opt-btn");\n' +
'      btns.forEach(function(b) { b.disabled = true; });\n' +
'\n' +
'      var correcta = String(reto.Respuesta_Correcta || "").trim().toUpperCase();\n' +
'      var didactico = reto.Feedback_Didactico || "";\n' +
'      var saber = reto.Saber_Basico ? (\'<br><small style="color:#94a3b8">📚 Saber básico: \' + reto.Saber_Basico + \'</small>\') : \'\';\n' +
'\n' +
'      if (opcion === correcta) {\n' +
'        Sound.correct();\n' +
'        var pts = parseInt(reto.Puntos, 10) || 25;\n' +
'        State.puntos += pts;\n' +
'        State.completados[reto.ID] = true;\n' +
'        actualizarStats();\n' +
'        fb.innerHTML = \'<div class="feedback-banner feedback-correct">\' +\n' +
'          \'<strong>✅ ¡Acertado! (+\' + pts + \' pts)</strong><br>\' + didactico + saber +\n' +
'        \'</div>\' +\n' +
'        \'<button class="action-btn" onclick="siguienteReto()">Continuar ➔</button>\';\n' +
'      } else {\n' +
'        Sound.wrong();\n' +
'        State.vidas -= 1;\n' +
'        actualizarStats();\n' +
'        fb.innerHTML = \'<div class="feedback-banner feedback-wrong">\' +\n' +
'          \'<strong>❌ Respuesta incorrecta (-1 vida)</strong><br>\' + didactico + saber +\n' +
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
'      var lista = filtrarRetosMateria(State.materiaActual);\n' +
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
'        \'<p style="color:var(--text-muted);margin-bottom:16px;">Puntos: \' + State.puntos + \' pts.</p>\' +\n' +
'        \'<button class="action-btn" onclick="Sound.click(); renderTitle();">🔄 Intentar de Nuevo (RUN)</button>\';\n' +
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
'    /* FORMULARIO DE PROPUESTAS DE RETOS */\n' +
'    function renderFormularioPropuesta() {\n' +
'      var stage = document.getElementById("gameStage");\n' +
'      var mats = Object.keys(window.GAME_DATA.materias || {});\n' +
'      var optMaterias = mats.map(function(m){ return \'<option value="\' + m + \'">\' + m.replace(\'_\', \' \') + \'</option>\'; }).join(\'\');\n' +
'\n' +
'      stage.innerHTML = \n' +
'        \'<h2 class="card-title">✏️ Enviar Propuesta de Reto</h2>\' +\n' +
'        \'<p style="color:var(--text-muted);margin-bottom:16px;font-size:0.9rem;">Crea un nuevo desafío curricular para el juego. Quedará en espera de aprobación por el profesorado.</p>\' +\n' +
'        \'<form id="formReto" onsubmit="enviarFormulario(event)">\' +\n' +
'          \'<div class="form-row">\' +\n' +
'            \'<div class="form-group">\' +\n' +
'              \'<label>Materia:</label>\' +\n' +
'              \'<select id="f_materia" class="form-control">\' + optMaterias + \'</select>\' +\n' +
'            \'</div>\' +\n' +
'            \'<div class="form-group">\' +\n' +
'              \'<label>Autor / Equipo:</label>\' +\n' +
'              \'<input type="text" id="f_autor" class="form-control" placeholder="Ej. Equipo 2 - Los Galeones" required>\' +\n' +
'            \'</div>\' +\n' +
'          \'</div>\' +\n' +
'          \'<div class="form-group">\' +\n' +
'            \'<label>Criterio de Evaluación / Saber:</label>\' +\n' +
'            \'<input type="text" id="f_criterio" class="form-control" placeholder="Ej. CE.LCL.3.2 - Teatro del Siglo de Oro">\' +\n' +
'          \'</div>\' +\n' +
'          \'<div class="form-group">\' +\n' +
'            \'<label>Pregunta / Reto Narrativo:</label>\' +\n' +
'            \'<textarea id="f_texto" class="form-control" rows="2" placeholder="Planteamiento de la situación o dilema..." required></textarea>\' +\n' +
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
'            \'<label>Feedback Didáctico:</label>\' +\n' +
'            \'<input type="text" id="f_feedback" class="form-control" placeholder="Explicación educativa de la respuesta..." required>\' +\n' +
'          \'</div>\' +\n' +
'          \'<button type="submit" class="action-btn" id="btnSubmitForm">🚀 Enviar a Revisión Docente</button>\' +\n' +
'          \'<div id="formMsg" style="margin-top:14px;font-weight:bold;"></div>\' +\n' +
'        \'</form>\';\n' +
'    }\n' +
'\n' +
'    function enviarFormulario(e) {\n' +
'      e.preventDefault();\n' +
'      Sound.click();\n' +
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
'              Sound.correct();\n' +
'              msg.innerHTML = \'<span style="color:var(--success-green);">\' + res.mensaje + \'</span>\';\n' +
'              document.getElementById("formReto").reset();\n' +
'            } else {\n' +
'              Sound.wrong();\n' +
'              msg.innerHTML = \'<span style="color:var(--danger-red);">Error: \' + res.error + \'</span>\';\n' +
'            }\n' +
'          })\n' +
'          .withFailureHandler(function(err) {\n' +
'            btn.disabled = false;\n' +
'            btn.innerText = "🚀 Enviar a Revisión Docente";\n' +
'            Sound.wrong();\n' +
'            msg.innerHTML = \'<span style="color:var(--danger-red);">Error: \' + err.message + \'</span>\';\n' +
'          })\n' +
'          .guardarPropuestaReto(materia, reto);\n' +
'      } else {\n' +
'        btn.disabled = false;\n' +
'        btn.innerText = "🚀 Enviar a Revisión Docente";\n' +
'        msg.innerHTML = \'<span style="color:var(--success-green);">Simulación local: Propuesta registrada (en Apps Script se guarda en Sheets).</span>\';\n' +
'      }\n' +
'    }\n' +
'\n' +
'    window.onload = function() { renderTitle(); };\n' +
'  </script>\n' +
'</body>\n' +
'</html>';
}

/**
 * 7. MÉTODOS AUXILIARES DE SCAFFOLDING
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
      .setHelpText('Introduce A, B o C.')
      .build();
    hoja.getRange(2, colResp, 99, 1).setDataValidation(reglaResp);
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
