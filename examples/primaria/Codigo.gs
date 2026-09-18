// ====================================================================
// open-game-edu: Ecosistema Monolítico con Multijugador y Telemetría
// Etapa: 5.º de Educación Primaria - Decreto Curricular LOMLOE
// Materias: Conocimiento del Medio, Lengua Castellana, Matemáticas
// Modalidad: Aventura con Pista de Carrera Multijugador en Línea
// Licencia: Creative Commons Atribución-CompartirIgual 4.0 (CC BY-SA 4.0)
// Basado en proyectos de Norberto Martín Afonso (OpenDidactia / open-game-edu)
// ====================================================================


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
