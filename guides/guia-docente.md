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

## 4. El Proyecto ABP: El Alumnado como Diseñador del Videojuego

En `open-game-edu`, los estudiantes **no son meros jugadores pasivos, sino los autores y diseñadores del videojuego**. En lugar de resolver fichas tradicionales, cada equipo asume la misión de investigar y crear los retos curriculares que conformarán la partida del aula.

### 4.1. Roles Cooperativos en el Equipo de Creación
Para asegurar la participación activa de todo el grupo, se recomiendan cuatro roles rotativos:
* **Guionista Narrativo/a**: Integra la pregunta en la ambientación temática (ej. diálogos de corsarios, bitácoras de navegantes).
* **Investigador/a Curricular**: Consulta los apuntes o libros de texto para asegurar la veracidad del contenido y formula la respuesta correcta.
* **Validador/a de Opciones**: Diseña los 2 distractores incorrectos basados en errores conceptuales comunes y redacta la explicación didáctica formativa.
* **Tester (Probador/a del Modo RUN)**: Previsualiza el reto en la Web App pulsando **`▶️ RUN / Previsualizar`** para comprobar la legibilidad y coherencia antes del envío definitivo.

### 4.2. Flujo de Calidad Escolar (Pull Request Educativo)
1. **Envío de la propuesta**: El equipo introduce su reto desde el formulario **`✏️ Proponer Reto`** de la Web App (o directamente en su hoja de trabajo).
2. **Estado PENDIENTE**: El reto se almacena en la hoja de la materia con el estado inicial `PENDIENTE`.
3. **Revisión Docente**: El profesorado revisa las propuestas abriendo el menú **`🎮 open-game-edu > 📋 Panel de Revisión de Propuestas`** en Google Sheets:
   - Si requiere correcciones, introduce sugerencias en la columna `Feedback_Docente` para que el equipo investigue de nuevo.
   - Si cumple los criterios de calidad curricular y redacción, pulsa **`✅ Aprobar`** (cambiando el estado a `APROBADO`).
4. **Integración en la Partida**: Solo los retos con estado `APROBADO` se cargan en la experiencia oficial del aula y en la Carrera Multijugador.
