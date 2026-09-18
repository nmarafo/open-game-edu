# Especificación Técnica: Scaffolding en Google Sheets (sheets-scaffold-spec)

Esta especificación detalla las reglas de diseño, la sintaxis de Google Apps Script y las convenciones visuales requeridas para que el código generado construya automáticamente la base de datos distribuida en Google Sheets, incorporando el **Flujo de Revisión y Aprobación de Propuestas (Pull Request Escolar)** y los **Criterios de Evaluación** oficiales para **Educación Primaria** y **Secundaria**.

---

## 1. Principios de Diseño del Scaffolding

1. **Idempotencia Absoluta**: Ejecutar `inicializarEcosistema()` más de una vez jamás debe duplicar pestañas ni fallar. Si la pestaña ya existe, se limpia (`sheet.clear()`) y se repuebla.
2. **Flujo de Calidad Escolar (Staging $\rightarrow$ Aprobación $\rightarrow$ Producción)**:
   - Los retos introducidos por el alumnado ingresan con el estado `PENDIENTE`.
   - El docente valida o solicita cambios desde el menú de Google Sheets o la interfaz web.
   - El motor de juego en modo oficial solo ejecuta los retos con estado `APROBADO`.
3. **Reconocimiento de Autoría**: La columna `Autor_O_Equipo` acredita al estudiante o grupo creador del enigma, fomentando la motivación y el sentido de pertenencia.
4. **Justificación Curricular Integrada (LOMLOE / Decretos Autonómicos)**: Cada fila contiene su código oficial de **Criterio de Evaluación** y **Saber Básico**.
5. **Jerarquía Visual**: Fila 1 congelada, colores de pestaña por departamento y cabeceras contrastadas.

---

## 2. Convención Cromática por Materia

### A. Educación Primaria (1.º a 6.º)
| Materia de Primaria | Nombre de Pestaña | Color Pestaña | Fondo Encabezado |
| :--- | :--- | :--- | :--- |
| **Configuración Global** | `Config_Juego` | `#1A73E8` (Azul Google) | `#1557B0` |
| **Conocimiento del Medio** | `ConoMedio_Ecosistemas` | `#2E7D32` (Verde bosque) | `#1B5E20` |
| **Lengua Castellana y Literatura** | `Lengua_Exploradores` | `#7B1FA2` (Púrpura) | `#4A148C` |
| **Matemáticas** | `Mates_Aventura` | `#0288D1` (Azul cielo) | `#01579B` |
| **Educación Artística** | `Artistica_Taller` | `#D81B60` (Rosa fucsia) | `#880E4F` |
| **Lengua Extranjera** | `Ingles_Mision` | `#F57F17` (Mostaza) | `#E65100` |
| **Educación Física / Hábitos** | `EdFisica_Energia` | `#00897B` (Verde azulado) | `#004D40` |

### B. Educación Secundaria y Bachillerato
| Departamento / Materia | Nombre de Pestaña | Color Pestaña | Fondo Encabezado |
| :--- | :--- | :--- | :--- |
| **Geografía e Historia** | `Historia_Rutas` | `#E65100` (Ámbar oscuro) | `#BF360C` |
| **Lengua Castellana y Literatura** | `Lengua_Teatro` | `#7B1FA2` (Púrpura) | `#4A148C` |
| **Matemáticas** | `Mates_Probabilidad` | `#1565C0` (Azul zafiro) | `#0D47A1` |
| **Biología y Geología** | `Biologia_Bestiario` | `#388E3C` (Verde) | `#1B5E20` |
| **Física y Química** | `FyQ_Reacciones` | `#0097A7` (Turquesa) | `#006064` |
| **Filosofía** | `Filo_Dilemas` | `#4E342E` (Tierra) | `#3E2723` |

---

## 3. Esquema Normalizado de Columnas por Pestaña de Materia

Cada pestaña de materia cuenta con 15 columnas estandarizadas:

| Columna | Cabecera | Ancho (px) | Propósito y Validaciones |
| :--- | :--- | :--- | :--- |
| **A** | `ID` | 70 | Identificador único (ej. `MED_01`, `LENG_01`) |
| **B** | `Etapa_O_Lugar` | 130 | Escenario o localización narrativa |
| **C** | `Criterio_Evaluacion` | 240 | Código y descriptor oficial del Decreto Autonómico |
| **D** | `Saber_Basico` | 170 | Saber curricular vinculado |
| **E** | `Autor_O_Equipo` | 150 | Alumno/s creadores (ej. *"Equipo 3: Los Linces"*) |
| **F** | `Estado_Revision` | 130 | **Desplegable:** `APROBADO`, `PENDIENTE`, `CORREGIR` |
| **G** | `Feedback_Docente` | 240 | Observaciones de mejora del profesor si está en `CORREGIR` |
| **H** | `Emisor_O_Personaje` | 130 | Nombre del NPC o entidad que plantea el reto |
| **I** | `Texto_Narrativo` | 320 | Pregunta o planteamiento contextualizado |
| **J** | `Opcion_A` | 190 | Primera alternativa |
| **K** | `Opcion_B` | 190 | Segunda alternativa |
| **L** | `Opcion_C` | 190 | Tercera alternativa |
| **M** | `Respuesta_Correcta` | 120 | **Desplegable:** `A`, `B` o `C` |
| **N** | `Feedback_Didactico` | 280 | Explicación educativa tras contestar |
| **O** | `Puntos` | 70 | Puntos sumados al acertar (ej. 25) |

---

## 4. Código Canónico de Scaffolding en Apps Script

```javascript
/**
 * Configura una pestaña de materia con cabeceras completas, validaciones y semillas.
 */
function configurarPestanaMateria(ss, nombreHoja, colorPestana, colorCabecera, cabeceras, anchos, semillas) {
  var hoja = ss.getSheetByName(nombreHoja);
  if (!hoja) {
    hoja = ss.insertSheet(nombreHoja);
  } else {
    hoja.clear();
  }

  // 1. Color de pestaña
  hoja.setTabColor(colorPestana);

  // 2. Encabezados
  var rHeader = hoja.getRange(1, 1, 1, cabeceras.length);
  rHeader.setValues([cabeceras]);
  rHeader.setBackground(colorCabecera);
  rHeader.setFontColor('#FFFFFF');
  rHeader.setFontWeight('bold');
  rHeader.setHorizontalAlignment('center');
  rHeader.setVerticalAlignment('middle');
  hoja.setRowHeight(1, 38);

  // 3. Semillas de contenido
  if (semillas && semillas.length > 0) {
    var rData = hoja.getRange(2, 1, semillas.length, cabeceras.length);
    rData.setValues(semillas);
    rData.setVerticalAlignment('middle');
  }

  // 4. Congelar fila 1 y anchos de columna
  hoja.setFrozenRows(1);
  if (anchos && anchos.length === cabeceras.length) {
    for (var c = 0; c < anchos.length; c++) {
      hoja.setColumnWidth(c + 1, anchos[c]);
    }
  }

  // 5. Validación desplegable: Estado_Revision (Columna F = 6)
  var colEstado = cabeceras.indexOf('Estado_Revision') + 1;
  if (colEstado > 0) {
    var reglaEstado = SpreadsheetApp.newDataValidation()
      .requireValueInList(['APROBADO', 'PENDIENTE', 'CORREGIR'], true)
      .setAllowInvalid(false)
      .setHelpText('Selecciona APROBADO, PENDIENTE o CORREGIR.')
      .build();
    hoja.getRange(2, colEstado, 99, 1).setDataValidation(reglaEstado);
  }

  // 6. Validación desplegable: Respuesta_Correcta (Columna M = 13)
  var colResp = cabeceras.indexOf('Respuesta_Correcta') + 1;
  if (colResp > 0) {
    var reglaResp = SpreadsheetApp.newDataValidation()
      .requireValueInList(['A', 'B', 'C'], true)
      .setAllowInvalid(false)
      .setHelpText('Selecciona A, B o C según la opción correcta.')
      .build();
    hoja.getRange(2, colResp, 99, 1).setDataValidation(reglaResp);
  }

  return hoja;
}
```
