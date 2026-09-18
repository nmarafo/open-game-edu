# Guía de Implantación para el Claustro Docente (guia-docente)

Esta guía explica paso a paso cómo dinamizar partidas en el aula en cualquiera de las **5 modalidades de juego**, cómo lanzar la **Carrera Multijugador en Línea en la Pizarra Digital** y cómo consultar el **Cuaderno de Evaluación Automático (`Puntuaciones_Online`)**.

---

## 1. El Flujo de Trabajo en 4 Fases con NotebookLM

> [!IMPORTANT]
> ### ⚠️ PASO 0 (OBLIGATORIO): PREPARAR LAS FUENTES EN NOTEBOOKLM
> **Google NotebookLM no tiene acceso a internet y no puede buscar decretos por su cuenta.**
> Antes de pedirle nada, debes entrar en [NotebookLM](https://notebooklm.google.com/) y pulsar **+ Añadir fuentes**:
> 1. Añade los archivos del repositorio `open-game-edu`.
> 2. **Sube el PDF o documento con el Decreto de Currículo autonómico o los currículos de las materias que van a participar.**
> Si no subes los currículos, NotebookLM no podrá extraer los Criterios de Evaluación y Saberes Básicos oficiales.

```
  ┌────────────────────────────────────────────────────────┐
  │ PASO 0: Subir Fuentes Curriculares a NotebookLM        │
  │ • Archivos de open-game-edu.                           │
  │ • PDF de Decretos Curriculares de las materias.        │
  └──────────────────────────┬─────────────────────────────┘
                             │
                             ▼
  ┌────────────────────────────────────────────────────────┐
  │ FASE 1: Solicitud Inicial del Docente                  │
  │ Indicar etapa, nivel, materias, palabras clave y tema. │
  └──────────────────────────┬─────────────────────────────┘
                             │
                             ▼
  ┌────────────────────────────────────────────────────────┐
  │ FASE 2: Propuesta Pedagógica de NotebookLM (Sin Código)│
  │ • Dimensión A: El Videojuego (narrativa, dinámica, PDI)│
  │ • Dimensión B: Trabajo del Alumnado para Crearlo (ABP):│
  │   - Investigación, redacción de retos y distractores.  │
  │   - Criterios LOMLOE y Saberes Básicos aplicados.      │
  │   - Roles cooperativos y Pull Request escolar.         │
  │ • El docente revisa y responde "Conforme".             │
  └──────────────────────────┬─────────────────────────────┘
                             │ Docente conforme
                             ▼
  ┌────────────────────────────────────────────────────────┐
  │ FASE 3: Código Backend Google Apps Script (Codigo.gs)  │
  │ • Pegar en Apps Script > Codigo.gs.                    │
  │ • Ejecutar 'inicializarEcosistema' para crear hojas.   │
  └──────────────────────────┬─────────────────────────────┘
                             │ Docente pide la Fase 4
                             ▼
  ┌────────────────────────────────────────────────────────┐
  │ FASE 4: Código Frontend Web (Index.html)               │
  │ • En Apps Script: Archivos (+) > HTML > Nombrar 'Index'│
  │ • Pegar el código de Index.html y guardar.             │
  └──────────────────────────┬─────────────────────────────┘
                             │
                             ▼
  ┌────────────────────────────────────────────────────────┐
  │ ¡LISTO PARA EL AULA!                                   │
  │ • Proyectar en la Pizarra Digital (PDI).               │
  │ • Alumnos juegan desde sus dispositivos.               │
  │ ──► ¡Partida multijugador y registro de notas en vivo! │
  └────────────────────────────────────────────────────────┘
```

---

## 2. Cómo Lanzar la Carrera Multijugador en la Pizarra Digital

Para una sesión de clase donde toda el aula participa en vivo:

1. **En la Pizarra Digital Interactiva (PDI) o Proyector del aula:**
   - Abre la hoja de cálculo y haz clic en **`🎮 open-game-edu > 🏁 Abrir Carrera Multijugador`** (o abre la URL de la Web App en modo carrera).
   - Verás la pista de carrera con las calles numeradas de 0 a 10 casillas.
2. **En los dispositivos del alumnado (Tablets, Chromebooks o móviles):**
   - Los alumnos abren el enlace de la Web App.
   - Escriben el nombre de su equipo (*"Equipo 3: Los Linces"*) y eligen un avatar (*⛵, 🚀, 🦊, 🏎️*).
3. **Durante la partida en vivo:**
   - Cada equipo responde los retos curriculares en su pantalla.
   - **Con cada respuesta correcta, su avatar avanza visualmente una casilla en la pantalla gigante de la clase**.
   - Toda el aula observa los adelantamientos y la emoción del avance colectivo.
4. **Al cruzar la meta:**
   - Suena la fanfarria de victoria y los resultados se registran instantáneamente en la hoja de cálculo del profesor.

---

## 3. Cuaderno de Evaluación Automático (`Puntuaciones_Online`)

Al finalizar la sesión, el docente abre la pestaña **`Puntuaciones_Online`** en su Google Sheets y encuentra:

* La lista de todos los alumnos o equipos que han jugado.
* El tiempo que tardaron en completar los retos.
* Los corazones o vidas que les sobraron.
* **El desglose de competencias por materia:**
  - *¿Acertaron todos en Historia pero tropezaron en la probabilidad de Matemáticas?*
  - Esta información ofrece un diagnóstico inmediato para reforzar conceptos en las siguientes clases sin necesidad de corregir exámenes tradicionales en papel.

---

## 4. El Proyecto ABP: El Alumnado como Creador y Diseñador del Videojuego

En `open-game-edu`, los estudiantes **no son meros jugadores pasivos ni redactores de tests; son los creadores integrales del videojuego**. En lugar de resolver fichas tradicionales, el alumnado genera productos auténticos de aprendizaje en cada materia que dan vida al mundo interactivo:

### 4.1. Productos Auténticos por Materia (Entregables Reales)
* **Lengua Castellana y Literatura**: Redacción del guion narrativo, entradas de la bitácora o diario de a bordo, árboles de diálogo interactivo y recopilación del glosario dialectal o voces de época.
* **Matemáticas**: Elaboración de maquetas cartográficas a escala real, modelización de probabilidades de navegación/combate, calibración de curvas de dificultad y balanza de recursos del juego.
* **Música**: Creación de la identidad sonora del juego (diseño de frecuencias y timbres en Web Audio API, efectos de sonido de colisiones o victoria y transcripción de patrones rítmicos de cantos de trabajo tradicionales).
* **Otras materias (Historia, Ciencias, Plástica)**: Recreación documental de fuentes primarias, mapas cronológicos, diseño de avatares o banderas heráldicas.

### 4.2. Organización del Aula: Roles de Estudio de Desarrollo
Para asegurar una dinámica cooperativa eficaz, los equipos funcionan como estudios de desarrollo indie con roles rotativos:
* **Director/a Narrativo/a y Guionista**: Redacta el lore, los diálogos de los personajes y vela por la corrección estilística y ortográfica.
* **Diseñador/a de Mecánicas y Matemáticas**: Modela las ecuaciones de puntuación, comprueba las escalas y calibra las probabilidades numéricas.
* **Diseñador/a Sonoro y Artístico**: Define los esquemas rítmicos, sintetiza o selecciona efectos de sonido y cuida la estética visual.
* **Documentalista y Validador/a Curricular**: Contrasta la veracidad histórica o científica con los libros de texto y fundamenta las soluciones y distractores.
* **Control de Calidad (QA Tester)**: Introduce los datos, previsualiza el juego con **`▶️ RUN / Previsualizar`**, comprueba la jugabilidad y detecta inconsistencias.

### 4.3. Ciclo de Desarrollo Escolar y Calidad (Pull Request Educativo)
1. **Investigación y Creación de Artefactos**: Cada departamento guía a los alumnos en la producción de sus contenidos curriculares.
2. **Transposición a Retos Jugables y Envío**: Los alumnos sintetizan sus hallazgos en situaciones-problema y las envían con estado `PENDIENTE`.
3. **Revisión y Mentoría Docente**: En Google Sheets (**`🎮 open-game-edu > 📋 Panel de Revisión de Propuestas`**), el profesorado introduce sugerencias en `Feedback_Docente` para refinar el trabajo o pulsa **`✅ Aprobar`** si el reto está listo.
4. **Despliegue y Partida en Vivo**: Toda la clase juega la versión oficial en la PDI o proyector del aula.
5. **Sesión Post-Mortem y Análisis de Telemetría**: El alumnado abre en Matemáticas la pestaña **`Puntuaciones_Online`** y analiza estadísticamente los datos de la partida grupal (gráficas de dispersión, medias de tiempo, retos con mayor índice de error), cerrando el ciclo con una reflexión metacognitiva real.
