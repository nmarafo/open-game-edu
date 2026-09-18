# Especificación Técnica: Scaffolding en Google Sheets (sheets-scaffold-spec)

Esta especificación detalla las reglas de diseño, la sintaxis exacta de Google Apps Script y las convenciones visuales requeridas para que el código generado cree automáticamente la base de datos distribuida en Google Sheets.

---

## 1. Principios de Diseño del Scaffolding

1. **Idempotencia Absoluta**: Ejecutar `inicializarEcosistema()` más de una vez jamás debe lanzar un error de "Sheet already exists". Si la pestaña ya existe, se limpia (`sheet.clear()`) y se repuebla.
2. **Jerarquía Visual y Accesibilidad**: Cada pestaña debe tener:
   - Color distintivo en la pestaña (`setTabColor`).
   - Fila 1 congelada (`setFrozenRows(1)`).
   - Encabezados contrastados (fondo oscuro/color sólido, texto blanco y negrita).
   - Anchos de columna explícitos para evitar que el texto quede cortado.
3. **Pestaña Global de Configuración**: Siempre debe existir una primera pestaña llamada `Config_Juego` con parámetros globales.

---

## 2. Convención de Nomenclatura y Código Cromático por Materia

| Departamento / Materia | Nombre de Pestaña Sugerido | Color Hexadecimal Pestaña | Fondo de Encabezado |
| :--- | :--- | :--- | :--- |
| **Configuración** | `Config_Juego` | `#4285F4` (Azul Google) | `#1A73E8` |
| **Lengua y Literatura** | `Lengua_Dialogos` / `Lengua_Retos` | `#9C27B0` (Púrpura) | `#6A1B9A` |
| **Historia y Geografía** | `Historia_Rutas` / `Historia_Misiones`| `#E65100` (Ámbar oscuro) | `#BF360C` |
| **Matemáticas** | `Mates_Probabilidad` / `Mates_Enigmas`| `#1565C0` (Azul zafiro) | `#0D47A1` |
| **Biología y Geología** | `Biologia_Bestiario` / `Ciencias_Eco` | `#2E7D32` (Verde bosque) | `#1B5E20` |
| **Física y Química** | `FyQ_Reacciones` / `FyQ_Energia` | `#00838F` (Cian petróleo) | `#006064` |
| **Lenguas Extranjeras** | `Ingles_Traduccion` / `Idiomas_Claves`| `#F9A825` (Mostaza) | `#F57F17` |
| **Educación Artística / Música**| `Arte_Galeria` / `Musica_Secuencias` | `#AD1457` (Magenta) | `#880E4F` |
| **Filosofía / Valores Éticos** | `Filo_Dilemas` / `Etica_Decisiones` | `#4E342E` (Tierra) | `#3E2723` |

---

## 3. Esquemas de Columnas Estándar

### A. Pestaña de Control: `Config_Juego`
Organizada en formato Clave-Valor (2 columnas):

| Columna A (Parametro) | Columna B (Valor) | Columna C (Descripcion_Docente) |
| :--- | :--- | :--- |
| `TITULO_JUEGO` | Las Crónicas del Galeón Perdido | Nombre visible en la barra superior |
| `DESCRIPCION` | Una travesía por el Atlántico en 1588 | Sinopsis mostrada en la pantalla de bienvenida |
| `VIDAS_INICIALES` | 3 | Número de intentos o vidas antes del Game Over |
| `PUNTOS_VICTORIA` | 100 | Puntuación requerida para ganar la partida |
| `MENSAJE_VICTORIA` | ¡Has arribado a puerto con éxito! | Texto al completar todos los retos |
| `MENSAJE_DERROTA` | El galeón no ha superado las adversidades | Texto al perder todas las vidas |

### B. Pestaña de Retos / Diálogos Narrativos (ej. Lengua / Historia)
Permite preguntas con opciones múltiples o árboles de decisión con feedback pedagógico:

| Columna | Nombre Cabecera | Ancho (px) | Propósito |
| :--- | :--- | :--- | :--- |
| **A** | `ID` | 60 | Identificador único (ej. `LENG_01`) |
| **B** | `Etapa_O_Lugar` | 120 | En qué fase o localización aparece |
| **C** | `Emisor` | 110 | Personaje que habla (ej. Capitán, Monje, Marinero) |
| **D** | `Texto_Narrativo` | 300 | Pregunta, diálogo o dilema planteado |
| **E** | `Opcion_A` | 180 | Primera alternativa |
| **F** | `Opcion_B` | 180 | Segunda alternativa |
| **G** | `Opcion_C` | 180 | Tercera alternativa |
| **H** | `Respuesta_Correcta` | 140 | Debe coincidir exactamente con A, B o C |
| **I** | `Feedback_Didactico` | 260 | Explicación educativa tras responder |
| **J** | `Puntos` | 70 | Puntos sumados si acierta |

### C. Pestaña de Retos Cuantitativos / Fórmulas (ej. Matemáticas / Física)

| Columna | Nombre Cabecera | Ancho (px) | Propósito |
| :--- | :--- | :--- | :--- |
| **A** | `ID` | 60 | Identificador único (ej. `MAT_01`) |
| **B** | `Situacion_Problema` | 280 | Planteamiento del cálculo o dilema de probabilidad |
| **C** | `Formula_O_Concepto` | 140 | Pista teórica curricular (ej. Casos favorables / posibles) |
| **D** | `Valor_Esperado` | 100 | Resultado numérico o texto exacto |
| **E** | `Tolerancia` | 80 | Margen de error aceptado (ej. 0 o 0.05) |
| **F** | `Pistas` | 220 | Pista si el alumno falla el primer intento |
| **G** | `Impacto_Salud` | 90 | Daño al jugador si falla |

---

## 4. Patrón Canónico de Código Apps Script

Todo generador en el modelo de lenguaje debe utilizar este patrón exacto:

```javascript
/**
 * Crea o reinicia una pestaña con formato visual institucional y datos semilla.
 * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} ss - Hoja de cálculo activa.
 * @param {string} nombreHoja - Nombre de la pestaña.
 * @param {string} colorPestanaHex - Color de la pestaña (ej. "#6A1B9A").
 * @param {string} colorCabeceraHex - Color de fondo de los encabezados.
 * @param {Array<string>} cabeceras - Array con los nombres de las columnas.
 * @param {Array<number>} anchosColumnas - Ancho en píxeles de cada columna.
 * @param {Array<Array<any>>} datosSemilla - Filas de contenido inicial.
 */
function configurarPestana(ss, nombreHoja, colorPestanaHex, colorCabeceraHex, cabeceras, anchosColumnas, datosSemilla) {
  var hoja = ss.getSheetByName(nombreHoja);
  if (!hoja) {
    hoja = ss.insertSheet(nombreHoja);
  } else {
    hoja.clear();
  }

  // 1. Color de la pestaña
  hoja.setTabColor(colorPestanaHex);

  // 2. Inserción y formato de encabezados
  var filaCabecera = [cabeceras];
  var rangoCabecera = hoja.getRange(1, 1, 1, cabeceras.length);
  rangoCabecera.setValues(filaCabecera);
  rangoCabecera.setBackground(colorCabeceraHex);
  rangoCabecera.setFontColor('#FFFFFF');
  rangoCabecera.setFontWeight('bold');
  rangoCabecera.setHorizontalAlignment('center');
  rangoCabecera.setVerticalAlignment('middle');
  hoja.setRowHeight(1, 36);

  // 3. Inserción de datos semilla
  if (datosSemilla && datosSemilla.length > 0) {
    var rangoDatos = hoja.getRange(2, 1, datosSemilla.length, cabeceras.length);
    rangoDatos.setValues(datosSemilla);
    rangoDatos.setVerticalAlignment('middle');
    
    // Bandas alternadas sutiles para legibilidad
    for (var i = 0; i < datosSemilla.length; i++) {
      if (i % 2 === 1) {
        hoja.getRange(i + 2, 1, 1, cabeceras.length).setBackground('#F8F9FA');
      }
    }
  }

  // 4. Congelar la fila 1
  hoja.setFrozenRows(1);

  // 5. Ajuste de anchos de columna
  if (anchosColumnas && anchosColumnas.length === cabeceras.length) {
    for (var col = 0; col < anchosColumnas.length; col++) {
      hoja.setColumnWidth(col + 1, anchosColumnas[col]);
    }
  }

  return hoja;
}
```

---

## 5. Validaciones de Datos Automáticas

Para garantizar que los estudiantes no introduzcan valores inválidos en ciertas columnas clave:

```javascript
/**
 * Añade validación desplegable a una columna de la hoja.
 * @param {GoogleAppsScript.Spreadsheet.Sheet} hoja 
 * @param {number} colIndex (1-indexed)
 * @param {Array<string>} opcionesValidas 
 */
function aplicarValidacionColumna(hoja, colIndex, opcionesValidas) {
  var regla = SpreadsheetApp.newDataValidation()
    .requireValueInList(opcionesValidas, true)
    .setAllowInvalid(false)
    .setHelpText('Selecciona una opción válida de la lista.')
    .build();
  
  // Aplica la regla desde la fila 2 hasta la fila 100
  hoja.getRange(2, colIndex, 99, 1).setDataValidation(regla);
}
```
