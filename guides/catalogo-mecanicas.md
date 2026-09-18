# Catálogo Curricular de Mecánicas de Juego (catalogo-mecanicas)

Este catálogo actúa como la **matriz de diseño lúdico-pedagógico** para NotebookLM y el profesorado. Describe cómo traducir los saberes básicos y los **Criterios de Evaluación (CE)** de los Decretos Autonómicos tanto en **Educación Primaria** como en **Educación Secundaria y Bachillerato** a mecánicas jugables, integrando el rol de los estudiantes como diseñadores de retos (*Pull Request Escolar*).

---

## 1. El Alumnado como Diseñador de Retos (Roles de Aula)

En `open-game-edu`, los estudiantes no son solo jugadores pasivos: asumen el rol de **Diseñadores de Experiencias Educativas**:

- **Rol de Guionistas / Investigadores (Letras y Humanidades)**: Redactan los textos narrativos, ambientaciones históricas y diálogos de personajes en `Lengua`, `Historia` o `Filosofía`.
- **Rol de Diseñadores de Mecánicas / Balanceadores (STEM)**: Formulan los problemas numéricos, proporciones, recetas de crafteo o probabilidades en `Matemáticas`, `Física y Química` y `Biología`.
- **Rol de Control de Calidad y Revisores**: Comprueban que los retos cumplan las reglas de validación, no tengan erratas y aporten una explicación didáctica (`Feedback_Didactico`) clara antes de enviarlos a revisión docente.

---

## 2. Matriz para Educación Primaria (1.º a 6.º)

| Asignatura de Primaria | Mecánica en el Videojuego | Equivalente en la Hoja de Sheets | Criterios de Evaluación Típicos (Decretos Autonómicos) |
| :--- | :--- | :--- | :--- |
| **Conocimiento del Medio Natural, Social y Cultural** | Clasificación de seres vivos, cadenas tróficas, orientación espacial en mapas locales, reciclaje y patrimonio histórico. | Retos con identificación de hábitats, deducción de causas ambientales, etapas históricas de la localidad. | *Identificar las características de los seres vivos, valorar el patrimonio natural y social, aplicar pautas de consumo responsable.* |
| **Lengua Castellana y Literatura (o Cooficial)** | Adivinanzas lingüísticas, identificación de palabras (sustantivos, adjetivos, verbos), comprensión de noticias, rimas sencillas. | Diálogos con personajes que piden la palabra correcta, ordenación de frases o deducción de significados en contexto. | *Comprender e interpretar textos orales y escritos, producir textos sencillos, identificar las clases de palabras.* |
| **Matemáticas** | Enigmas de cálculo mental, resolución de situaciones cotidianas (compras, recetas con fracciones, medición de distancias). | Columnas con problemas numéricos contextualizados, opciones de cantidades o cálculo de áreas/perímetros de recintos. | *Resolver problemas cotidianos mediante operaciones básicas, interpretar datos en tablas, reconocer figuras y cuerpos geométricos.* |
| **Educación Artística (Plástica y Música)** | Identificación de mezclas cromáticas, texturas, familias de instrumentos musicales, ritmos y melodías sintetizadas. | Opciones con ruedas de color, instrumentos tradicionales y secuencias de notas de la Web Audio API. | *Explorar las posibilidades del sonido y la imagen, reconocer manifestaciones culturales y artísticas.* |
| **Lengua Extranjera (Inglés/Francés)** | Pistas en el idioma meta, saludos, descripciones físicas de personajes, identificación de animales y colores. | Diálogos bilingües donde el alumno elige la traducción o respuesta adecuada para abrir un paso. | *Comprender mensajes breves en lengua extranjera, utilizar vocabulario temático contextualizado.* |
| **Educación Física y Hábitos Saludables** | Gestión de barrita de energía/estamina, elección de menús saludables (pirámide alimentaria), calentamiento previo. | Preguntas sobre descanso, hidratación y elecciones nutricionales antes de superar un esfuerzo físico. | *Adoptar hábitos de vida activa y saludable, gestionar la energía y el trabajo en equipo.* |
| **Educación en Valores Cívicos y Éticos** | Dilemas de convivencia escolar, resolución pacífica de conflictos, empatía con compañeros y cuidado del entorno. | Árboles de decisiones sociales sin penalización punitiva, pero con recompensas de convivencia. | *Desarrollar actitudes de respeto, empatía, inclusión e igualdad en el ámbito escolar y comunitario.* |

---

## 3. Matriz para Educación Secundaria y Bachillerato

| Asignatura | Mecánica Lúdica en el Motor | Criterios de Evaluación Típicos |
| :--- | :--- | :--- |
| **Geografía e Historia** | Cartografía interactiva, gestión de convoyes comerciales, cronología y relaciones geopolíticas entre facciones. | *Analizar procesos históricos, interpretar fuentes cartográficas y documentales, valorar la causalidad múltiple.* |
| **Lengua Castellana y Literatura** | Análisis de fragmentos literarios, declamación de métricas, identificación de falacias argumentativas y registros. | *Interpretar textos literarios de distintas épocas, analizar la estructura sintáctica y el uso pragmático de la lengua.* |
| **Matemáticas** | Probabilidad de sucesos (Laplace), proporciones, sistemas de ecuaciones, optimización económica de recursos. | *Modelizar situaciones reales mediante el lenguaje algebraico y probabilístico, justificar razonamientos matemáticos.* |
| **Biología y Geología** | Resistencia a estados alterados (venenos, temperaturas), cadenas de herencia genética, dinámica de poblaciones. | *Aplicar principios de genética y evolución, analizar el impacto humano en la biosfera.* |
| **Física y Química** | Sistema de alquimia y crafteo, estequiometría de reacciones, cálculo de velocidades, fuerzas y energía mecánica. | *Formular y balancear ecuaciones químicas, aplicar las leyes de Newton y la conservación de la energía.* |
| **Filosofía** | Árboles de dilemas morales (utilitarismo, deontología, relativismo) que alteran el rumbo de la trama. | *Argumentar con rigor filosófico, detectar contradicciones lógicas y evaluar posturas éticas encontradas.* |

---

## 4. Ejemplos de Sinergias con Flujo de Aprobación

1. **"La Eco-Patrulla del Bosque Mágico" (5.º Primaria)**:
   - Los alumnos investigan en la biblioteca del colegio sobre animales en peligro.
   - Envían sus retos mediante el formulario web como `PENDIENTE` indicando el nombre de su equipo (*"Equipo Los Linces"*).
   - El docente revisa la propuesta en Google Sheets, añade un comentario formativo y pulsa `APROBADO`.
   - Al pulsar el botón `▶️ RUN`, el nuevo reto aparece dentro de la misión ecológica oficial.

2. **"La Flota de Indias" (3.º ESO)**:
   - Los estudiantes de Historia elaboran mapas de rutas y galeones.
   - Los de Matemáticas calculan probabilidades de averías y proporciones de carga.
   - Tras la aprobación del claustro, los retos se integran en la expedición que juegan todos los grupos.
