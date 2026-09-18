# Guía de Implantación para el Claustro Docente (guia-docente)

Esta guía explica paso a paso cómo cualquier equipo docente de **Educación Primaria, Secundaria o Bachillerato** puede generar, desplegar y dinamizar un videojuego educativo interdepartamental, utilizando el **Botón RUN de Previsualización** y el **Flujo de Revisión y Aprobación de Propuestas (Pull Request Escolar)**.

---

## 1. El Flujo de Trabajo en 3 Pasos

```
  ┌────────────────────────────────────────────────────────┐
  │ PASO 1: Pedir el instalador a NotebookLM               │
  │ Cargar el OKF + el Decreto de Currículo Autonómico.    │
  │ Indicar etapa y materias.                              │
  └──────────────────────────┬─────────────────────────────┘
                             │ Copiar el bloque Codigo.gs
                             ▼
  ┌────────────────────────────────────────────────────────┐
  │ PASO 2: Pegar en Google Sheets                         │
  │ Abrir hoja en blanco > Extensiones > Apps Script.       │
  │ Pegar el código y ejecutar 'inicializarEcosistema'.   │
  │ ──► Menú nativo '🎮 open-game-edu' activado.           │
  └──────────────────────────┬─────────────────────────────┘
                             │ Pestañas listas con Criterios y Autoría
                             ▼
  ┌────────────────────────────────────────────────────────┐
  │ PASO 3: Publicar la Web App y Probar con RUN           │
  │ Implementar > Nueva implementación > Aplicación web.  │
  │ ──► Probar con el botón RUN y compartir con la clase.  │
  └────────────────────────────────────────────────────────┘
```

---

## 2. El Botón "RUN" de Previsualización Inmediata

El ecosistema permite previsualizar y probar el juego de dos formas instantáneas:

### A. Desde la propia Hoja de Google Sheets
Sin necesidad de abrir nuevas pestañas del navegador:
1. En la barra superior de menús de tu hoja de cálculo, haz clic en **`🎮 open-game-edu`**.
2. Selecciona **`▶️ Run / Previsualizar Juego`**.
3. Se abrirá una ventana flotante modal interactiva donde podrás jugar y validar las preguntas, los cálculos y los sonidos en vivo.

### B. Desde la Aplicación Web (URL desplegada)
En la parte superior de la Web App encontrarás la barra de navegación:
* **`▶️ RUN / Previsualizar`**: Lanza la partida completa con todos los retos aprobados.
* **Casilla *"Ver borradores"***: Permite al profesorado o a los alumnos previsualizar también los retos que aún están en estado `PENDIENTE` para comprobar cómo quedan en pantalla antes de aprobarlos.

---

## 3. Dinámica de Creación y Aprobación de Retos (Pull Request Escolar)

Para que el proyecto fomente el trabajo colaborativo con rigor pedagógico:

```
[ Alumno / Equipo ] ──► Escribe en Web o Sheets ──► Estado: 'PENDIENTE'
                                                           │
                                                           ▼
[ Docente ] ◄── Menú '📋 Panel de Revisión' ◄── Revisa y retroalimenta
      │
      ├── ¿Tiene errores? ──► Estado: 'CORREGIR' + Feedback educativo
      │
      └── ¿Está correcto?  ──► Estado: 'APROBADO'
                                    │
                                    ▼
                      ¡Aparece en el Videojuego (RUN)!
```

### ¿Cómo envían los alumnos sus retos?
1. **Opción Formulario Web:** Entran en la Web App del juego, pulsan la pestaña **`✏️ Enviar Reto`**, eligen la materia, ponen el nombre de su equipo, el enunciado, las opciones y la explicación pedagógica, y pulsan **`🚀 Enviar a Revisión`**.
2. **Opción Directa en Google Sheets:** Si el profesor comparte la hoja con permisos de edición en las pestañas de las materias, los alumnos añaden filas directamente seleccionando en la columna `Estado_Revision` el valor `PENDIENTE`.

### ¿Cómo revisa y aprueba el profesorado?
1. En Google Sheets, ve a **`🎮 open-game-edu > 📋 Panel de Revisión de Propuestas`**.
2. Verás la lista de todos los retos pendientes enviados por los distintos equipos.
3. Haz clic en **`✅ Aprobar para el Juego`**. La celda pasará automáticamente a `APROBADO` y el reto quedará integrado en la versión oficial jugable de inmediato.
4. Si un reto requiere ajustes (por ejemplo, corregir la ortografía o reformular una opción), cambia la celda a `CORREGIR` y escribe en la columna `Feedback_Docente` la indicación de mejora.

---

## 4. Valor para la Programación Docente e Inspección

La presencia de las columnas:
* **`Criterio_Evaluacion`**: Vincula directamente cada prueba al marco normativo de tu Comunidad Autónoma.
* **`Autor_O_Equipo`**: Evidencia el trabajo colaborativo y la autoría de cada estudiante.
* **`Feedback_Docente`**: Registra la evaluación formativa y el seguimiento del aprendizaje realizado por el profesor.
