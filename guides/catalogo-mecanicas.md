# Catálogo Curricular de Mecánicas y Modalidades de Juego (catalogo-mecanicas)

Este catálogo describe cómo traducir los saberes básicos y los **Criterios de Evaluación (CE)** de los Decretos Autonómicos a experiencias jugables en Google Sheets, organizadas en **5 modalidades de juego** y con soporte para **partidas multijugador en vivo en el aula**.

---

## 1. Las 5 Modalidades de Juego del Motor

| Modalidad | Estilo Pedagógico | Tipo de Interacción | Escenario de Aula Ideal |
| :--- | :--- | :--- | :--- |
| **1. Aventura Narrativa / RPG** | Inmersión contextual, toma de decisiones éticas y desarrollo de la empatía histórica/científica. | Individual o parejas | Trabajo por proyectos (ABP), tareas en casa, biblioteca o rincones. |
| **2. Tablero / Trivial Interdepartamental** | Gamificación clásica, tirada de dado virtual y recolección de insignias por cada asignatura superada. | Individual o pequeños grupos | Sesiones de repaso antes de evaluaciones, semanas culturales. |
| **3. Escape Room Digital** | Desafíos encadenados contrarreloj; cada materia custodia un dígito de la clave de salida. | Pequeños grupos colaborativos | Fomento del pensamiento lateral, resolución de problemas bajo presión. |
| **4. Carrera Multijugador ("La Gran Regata")** | Pista visual de avatares sincronizada en vivo mediante *polling*. Los aciertos mueven el avatar en la pantalla común. | Competitivo por equipos en tiempo real | Clase entera conectada simultáneamente con PDI o proyector como meta visual. |
| **5. Desafío Colaborativo ("Boss Raid")** | Un reto gigante colectivo (1.000 HP). Toda la clase suma aciertos para vaciar la barra de amenaza común. | Cooperativo 100% sin perdedores | Cohesión grupal, concienciación ambiental y clima positivo de aula. |

---

## 2. Telemetría y Cuaderno de Evaluación en Vivo (`Puntuaciones_Online`)

El motor no solo divierte: genera **evidencias de aprendizaje formativas** de forma automática:
- Cada vez que un alumno juega, su sesión se envía a `Puntuaciones_Online`.
- El docente dispone de una tabla con:
  - Tiempo invertido en resolver los retos.
  - Vidas restantes (margen de error).
  - Desglose de competencias: *¿En qué materia falló más el grupo?* Permite al profesorado adaptar las siguientes clases con datos reales.

---

## 3. Matriz Curricular por Etapas (Primaria y Secundaria)

### Educación Primaria (1.º a 6.º):
- **Conocimiento del Medio**: Ecosistemas, clasificación animal, reciclaje y patrimonio local.
- **Lengua Castellana**: Clases de palabras (adjetivos/sustantivos), comprensión lectora, rimas.
- **Matemáticas**: Fracciones cotidianas, perímetros, sumas/multiplicaciones y dinero.
- **Educación Artística**: Teoría del color, familias de instrumentos y melodías.
- **Lengua Extranjera**: Saludos, vocabulario y pistas en idioma meta.
- **Educación Física**: Hábitos saludables, pirámide nutricional y energía.

### Educación Secundaria y Bachillerato:
- **Geografía e Historia**: Rutas transatlánticas, feudalismo, causalidad histórica y cartografía.
- **Lengua Castellana y Literatura**: Teatro clásico, figuras retóricas y análisis crítico.
- **Matemáticas**: Probabilidad (Laplace), proporciones, optimización y álgebra.
- **Biología y Geología**: Genética, dinámicas poblacionales y redes tróficas complejas.
- **Física y Química**: Leyes de Newton, estequiometría y cambios de estado.
- **Filosofía**: Dilemas morales (utilitarismo vs. deontología) y lógica formal.

---

## 4. El Alumnado como Diseñador de Retos (Pedagogía de la Co-Creación)

El motor pedagógico de `open-game-edu` trasciende el modelo del estudiante como simple receptor lúdico. Al involucrar al alumnado en el diseño y autoría de los retos:
1. **Activación de Niveles Superiores de Bloom**: Diseñar una pregunta exige comprender a fondo el concepto; formular distractores plausibles exige prever los errores conceptuales típicos; redactar el feedback formativo consolida la metacognición.
2. **Autoría Interdisciplinar**: Los equipos investigan en los apuntes de cada materia, calculan datos reales (ej. escalas en mapas marinos, métricas poéticas, física de proyectiles) y los traducen a situaciones de juego.
3. **Validación y Previsualización**: Mediante el flujo de Pull Request escolar (`PENDIENTE` -> `APROBADO`) y el botón `▶️ RUN`, los estudiantes iteran y testean sus propuestas antes de verlas en acción en la pantalla gigante de la clase.
