# Especificación Técnica: Scaffolding en Google Sheets (sheets-scaffold-spec)

Esta especificación detalla las reglas de diseño, la sintaxis exacta de Google Apps Script y las convenciones visuales requeridas para que el código generado construya automáticamente la base de datos distribuida en Google Sheets, **incorporando los Criterios de Evaluación oficiales de los Decretos Autonómicos** tanto para **Educación Primaria** como para **Secundaria y Bachillerato**.

---

## 1. Principios de Diseño del Scaffolding

1. **Idempotencia Absoluta**: Ejecutar `inicializarEcosistema()` más de una vez jamás debe duplicar pestañas ni fallar. Si la pestaña ya existe, se limpia (`sheet.clear()`) y se repuebla.
2. **Justificación Curricular Integrada (LOMLOE / Decretos Autonómicos)**: Cada fila de reto debe contener obligatoriamente su **Criterio de Evaluación (CE)** oficial y el **Saber Básico** correspondiente del Decreto Autonómico cargado en NotebookLM. De este modo, la hoja sirve simultáneamente como motor del juego y como **cuaderno de programación y evaluación formal** del profesorado.
3. **Jerarquía Visual y Accesibilidad**:
   - Color distintivo en la pestaña (`setTabColor`).
   - Fila 1 congelada (`setFrozenRows(1)`).
   - Encabezados contrastados (fondo oscuro/color sólido, texto blanco y negrita).
   - Anchos de columna explícitos para evitar texto truncado.
4. **Pestaña Global de Configuración**: Siempre debe existir una primera pestaña llamada `Config_Juego` con parámetros globales.

---

## 2. Convención de Nomenclatura y Código Cromático por Materia

### A. Educación Primaria (1.º a 6.º)
| Materia de Primaria | Nombre de Pestaña Sugerido | Color Hex Pestaña | Fondo Encabezado |
| :--- | :--- | :--- | :--- |
| **Configuración Global** | `Config_Juego` | `#1A73E8` (Azul Google) | `#1557B0` |
| **Conocimiento del Medio Natural, Social y Cultural** | `ConoMedio_Naturaleza` / `ConoMedio_Sociedad` | `#2E7D32` (Verde bosque) | `#1B5E20` |
| **Lengua Castellana y Literatura (o Cooficial)** | `Lengua_Aventura` / `Lengua_Palabras` | `#7B1FA2` (Púrpura) | `#4A148C` |
| **Matemáticas** | `Mates_Enigmas` / `Mates_Calculo` | `#0288D1` (Azul cielo) | `#01579B` |
| **Educación Artística (Plástica y Música)** | `Artistica_Taller` / `Musica_Ritmos` | `#D81B60` (Rosa fucsia) | `#880E4F` |
| **Lengua Extranjera (Inglés/Francés)** | `Ingles_Mision` / `Idiomas_Vocab` | `#F57F17` (Mostaza) | `#E65100` |
| **Educación Física / Hábitos Saludables** | `EdFisica_Energia` / `Salud_Retos` | `#00897B` (Verde azulado) | `#004D40` |
| **Educación en Valores Cívicos y Éticos** | `Valores_Dilemas` / `Convivencia_Paz` | `#5D4037` (Marrón tierra)| `#3E2723` |

### B. Educación Secundaria y Bachillerato
| Departamento / Materia | Nombre de Pestaña Sugerido | Color Hex Pestaña | Fondo Encabezado |
| :--- | :--- | :--- | :--- |
| **Geografía e Historia** | `Historia_Rutas` / `Historia_Misiones` | `#E65100` (Ámbar oscuro) | `#BF360C` |
| **Biología y Geología** | `Biologia_Bestiario` / `Ciencias_Eco` | `#388E3C` (Verde) | `#1B5E20` |
| **Física y Química** | `FyQ_Reacciones` / `FyQ_Laboratorio` | `#0097A7` (Turquesa) | `#006064` |
| **Filosofía / Valores Éticos** | `Filo_Dilemas` / `Etica_Decisiones` | `#4E342E` (Tierra) | `#3E2723` |
| **Tecnología y Digitalización** | `Tecno_Circuitos` / `Digital_Logica` | `#455A64` (Gris azulado) | `#263238` |

---

## 3. Esquemas de Columnas Estándar con Criterios de Evaluación

### A. Pestaña de Control: `Config_Juego`
Organizada en formato Clave-Valor (3 columnas):

| Columna A (Parametro) | Columna B (Valor) | Columna C (Descripcion_Docente) |
| :--- | :--- | :--- |
| `TITULO_JUEGO` | El Tesoro del Parque Natural | Título visible en la cabecera del juego |
| `ETAPA_CURSO` | 5.º de Primaria | Nivel escolar al que va dirigido |
| `COMUNIDAD_AUTONOMA`| Andalucía | Normativa autonómica de referencia |
| `DESCRIPCION` | Una misión ecológica por Doñana y Sierra Nevada | Sinopsis de bienvenida |
| `VIDAS_INICIALES` | 3 | Vidas o intentos disponibles |
| `PUNTOS_VICTORIA` | 80 | Puntos necesarios para ganar |
| `MENSAJE_VICTORIA` | ¡Misión cumplida! Eres Guardián Mayor de la Biodiversidad. | Mensaje al superar la meta |
| `MENSAJE_DERROTA` | La expedición no ha resistido los peligros. ¡Revisa tus pistas! | Mensaje al perder |

### B. Pestaña Estándar de Materia (Educación Primaria y Secundaria)

Cada pestaña de materia incluye doce columnas normalizadas:

| Columna | Cabecera | Ancho (px) | Propósito Pedagógico / Funcional |
| :--- | :--- | :--- | :--- |
| **A** | `ID` | 70 | Código único del reto (ej. `MED_01`, `MAT_01`, `LENG_01`) |
| **B** | `Etapa_O_Lugar` | 130 | Localización narrativa o nivel del mapa |
| **C** | `Criterio_Evaluacion` | 240 | **Código y redacción del CE oficial del Decreto Autonómico** (ej. `CE 3.2: Identificar las relaciones en ecosistemas...`) |
| **D** | `Saber_Basico` | 170 | **Saber curricular del Decreto** (ej. `Ecosistemas y cadenas tróficas`) |
| **E** | `Emisor_O_Personaje` | 120 | Personaje o entidad que habla (ej. Guardabosques, Sabio) |
| **F** | `Texto_Narrativo` | 320 | Planteamiento del reto, enigma o pregunta contextualizada |
| **G** | `Opcion_A` | 190 | Alternativa A |
| **H** | `Opcion_B` | 190 | Alternativa B |
| **I** | `Opcion_C` | 190 | Alternativa C |
| **J** | `Respuesta_Correcta` | 120 | Debe ser exactamente `A`, `B` o `C` |
| **K** | `Feedback_Didactico` | 280 | Justificación pedagógica inmediata tras responder |
| **L** | `Puntos` | 70 | Puntos sumados al acertar (ej. 25, 30) |

---

## 4. Patrón Canónico de Código Apps Script

```javascript
/**
 * Configura una pestaña de materia con cabeceras curriculares y datos semilla.
 */
function configurarPestanaMateria(ss, nombreHoja, colorPestana, colorCabecera, cabeceras, anchos, semillas) {
  var hoja = ss.getSheetByName(nombreHoja);
  if (!hoja) {
    hoja = ss.insertSheet(nombreHoja);
  } else {
    hoja.clear();
  }

  // 1. Color de la pestaña
  hoja.setTabColor(colorPestana);

  // 2. Encabezados con formato institucional
  var rHeader = hoja.getRange(1, 1, 1, cabeceras.length);
  rHeader.setValues([cabeceras]);
  rHeader.setBackground(colorCabecera);
  rHeader.setFontColor('#FFFFFF');
  rHeader.setFontWeight('bold');
  rHeader.setHorizontalAlignment('center');
  rHeader.setVerticalAlignment('middle');
  hoja.setRowHeight(1, 38);

  // 3. Inserción de semillas con bandas alternadas
  if (semillas && semillas.length > 0) {
    var rData = hoja.getRange(2, 1, semillas.length, cabeceras.length);
    rData.setValues(semillas);
    rData.setVerticalAlignment('middle');
    
    for (var i = 0; i < semillas.length; i++) {
      if (i % 2 === 1) {
        hoja.getRange(i + 2, 1, 1, cabeceras.length).setBackground('#F8FAFC');
      }
    }
  }

  // 4. Congelar la fila 1 y ajustar anchos
  hoja.setFrozenRows(1);
  if (anchos && anchos.length === cabeceras.length) {
    for (var c = 0; c < anchos.length; c++) {
      hoja.setColumnWidth(c + 1, anchos[c]);
    }
  }

  // 5. Validación desplegable en la columna de Respuesta_Correcta (Columna J = 10)
  var colRespuesta = cabeceras.indexOf('Respuesta_Correcta') + 1;
  if (colRespuesta > 0) {
    var regla = SpreadsheetApp.newDataValidation()
      .requireValueInList(['A', 'B', 'C'], true)
      .setAllowInvalid(false)
      .setHelpText('Selecciona A, B o C según la opción correcta.')
      .build();
    hoja.getRange(2, colRespuesta, 99, 1).setDataValidation(regla);
  }

  return hoja;
}
```
