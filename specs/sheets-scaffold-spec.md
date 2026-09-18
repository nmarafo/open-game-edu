# Especificación Técnica: Scaffolding en Google Sheets (sheets-scaffold-spec)

Esta especificación detalla las reglas de diseño, la sintaxis de Google Apps Script y las convenciones visuales requeridas para que el código generado construya automáticamente la base de datos distribuida en Google Sheets, incorporando el **Flujo de Revisión Escolar (Pull Request)**, los **Criterios de Evaluación** oficiales, el **Lobby Multijugador** y el **Registro de Puntuaciones en Línea**.

---

## 1. Principios de Diseño del Scaffolding

1. **Idempotencia Absoluta**: Ejecutar `inicializarEcosistema()` más de una vez jamás duplica pestañas ni lanza errores. Si la pestaña ya existe, se limpia (`sheet.clear()`) y se repuebla.
2. **Telemetría y Evaluación Formativa**: La pestaña `Puntuaciones_Online` registra en tiempo real cada partida jugada, convirtiendo la hoja de cálculo en el **cuaderno de evaluación automático** del docente con desglose de aciertos por materia.
3. **Soporte Multijugador en Vivo**: La pestaña `Lobby_Multijugador` mantiene el registro de avatares, salas y posiciones para carreras o desafíos comunitarios en el aula.
4. **Flujo de Calidad Escolar (Pull Request)**: Columnas `Autor_O_Equipo`, `Estado_Revision` (`APROBADO`, `PENDIENTE`, `CORREGIR`) y `Feedback_Docente` en cada materia.
5. **Justificación Curricular LOMLOE**: Columnas `Criterio_Evaluacion` y `Saber_Basico` vinculadas a los Decretos Autonómicos.

---

## 2. Mapa Completo de Pestañas del Ecosistema

| Pestaña | Tipo | Color Pestaña | Fondo Encabezado | Propósito |
| :--- | :--- | :--- | :--- | :--- |
| **`Config_Juego`** | Control | `#1A73E8` (Azul Google) | `#1557B0` | Metadatos, título, vidas, modalidad de juego y dificultad. |
| **`Puntuaciones_Online`** | Telemetría | `#00897B` (Teal oscuro) | `#004D40` | Historial de partidas, tiempos, notas y aciertos por materia. |
| **`Lobby_Multijugador`** | Multijugador | `#D81B60` (Fucsia vivo) | `#880E4F` | Registro de avatares, posiciones de carrera y salas en vivo. |
| **`[Materia_1]`** | Curricular | Según departamento | Color contrastado | Retos, Criterios de Evaluación, opciones y feedback didáctico. |
| **`[Materia_2]`** | Curricular | Según departamento | Color contrastado | Retos, Criterios de Evaluación, opciones y feedback didáctico. |

---

## 3. Esquemas de Columnas Normalizadas

### A. Pestaña de Telemetría: `Puntuaciones_Online`
Registra automáticamente cada partida finalizada por un estudiante o equipo:

| Columna | Cabecera | Ancho (px) | Propósito Pedagógico |
| :--- | :--- | :--- | :--- |
| **A** | `Fecha_Hora` | 150 | Marca temporal exacta de la partida |
| **B** | `Jugador_O_Equipo` | 180 | Nombre o pseudónimo del alumno/equipo |
| **C** | `Curso_Grupo` | 110 | Nivel y grupo escolar (ej. 5.º A, 3.º ESO B) |
| **D** | `Puntuacion_Final` | 110 | Puntos conseguidos en la partida |
| **E** | `Vidas_Restantes` | 110 | Corazones o vidas con las que terminó |
| **F** | `Tiempo_Segundos` | 120 | Duración total de la partida en segundos |
| **G** | `Desglose_Aciertos` | 260 | Aciertos por asignatura (ej. *Lengua: 3/3, Mates: 2/3*) |
| **H** | `Resultado_Mision` | 130 | `VICTORIA`, `DERROTA` o `PODIO_CARRERA` |

### B. Pestaña de Multijugador: `Lobby_Multijugador`
Almacena el estado de los avatares para la visualización en vivo:

| Columna | Cabecera | Ancho (px) | Propósito Funcional |
| :--- | :--- | :--- | :--- |
| **A** | `ID_Sesion` | 110 | Identificador único de conexión del alumno |
| **B** | `Nombre_Equipo` | 180 | Nombre visible en la pista de carrera |
| **C** | `Icono_Avatar` | 100 | Emoji o icono del avatar (ej. ⛵, 🚀, 🦊, 🏎️) |
| **D** | `Posicion_Pista` | 110 | Número de casilla alcanzada (0 a 10) |
| **E** | `Puntos_Acumulados` | 120 | Puntos conseguidos en la sesión |
| **F** | `Ultima_Actualizacion` | 160 | Hora del último acierto o latido |

### C. Pestaña Estándar de Materia Curricular (15 Columnas)
`ID`, `Etapa_O_Lugar`, `Criterio_Evaluacion`, `Saber_Basico`, `Autor_O_Equipo`, `Estado_Revision`, `Feedback_Docente`, `Emisor_O_Personaje`, `Texto_Narrativo`, `Opcion_A`, `Opcion_B`, `Opcion_C`, `Respuesta_Correcta`, `Feedback_Didactico`, `Puntos`.

---

## 4. Código Canónico de Scaffolding en Apps Script

```javascript
/**
 * Configura la pestaña de Puntuaciones Online para telemetría educativa.
 */
function configurarPestanaPuntuaciones(ss) {
  var hoja = ss.getSheetByName('Puntuaciones_Online');
  if (!hoja) {
    hoja = ss.insertSheet('Puntuaciones_Online');
  } else {
    hoja.clear();
  }

  hoja.setTabColor('#00897B');
  var cabeceras = [
    'Fecha_Hora', 'Jugador_O_Equipo', 'Curso_Grupo', 'Puntuacion_Final',
    'Vidas_Restantes', 'Tiempo_Segundos', 'Desglose_Aciertos', 'Resultado_Mision'
  ];
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

  for (var i = 0; i < anchos.length; i++) {
    hoja.setColumnWidth(i + 1, anchos[i]);
  }
}

/**
 * Configura la pestaña de Lobby Multijugador para carreras en vivo.
 */
function configurarPestanaLobby(ss) {
  var hoja = ss.getSheetByName('Lobby_Multijugador');
  if (!hoja) {
    hoja = ss.insertSheet('Lobby_Multijugador');
  } else {
    hoja.clear();
  }

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

  for (var i = 0; i < anchos.length; i++) {
    hoja.setColumnWidth(i + 1, anchos[i]);
  }
}
```
