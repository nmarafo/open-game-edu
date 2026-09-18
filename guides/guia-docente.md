# Guía de Implantación para el Claustro Docente (guia-docente)

Esta guía explica paso a paso cómo cualquier equipo docente de **Educación Primaria, Secundaria o Bachillerato** puede generar, desplegar y dinamizar un videojuego educativo interdepartamental en menos de 5 minutos, **vinculando automáticamente los Criterios de Evaluación oficiales de su Decreto Autonómico**.

---

## 1. El Flujo de Trabajo en 3 Pasos

```
  ┌────────────────────────────────────────────────────────┐
  │ PASO 1: Pedir el instalador a NotebookLM               │
  │ Cargar el OKF + el Decreto de Currículo Autonómico.    │
  │ Indicar etapa (Primaria/Secundaria) y materias.        │
  └──────────────────────────┬─────────────────────────────┘
                             │ Copiar el bloque Codigo.gs
                             ▼
  ┌────────────────────────────────────────────────────────┐
  │ PASO 2: Pegar en Google Sheets                         │
  │ Abrir hoja en blanco > Extensiones > Apps Script.       │
  │ Pegar el código y ejecutar 'inicializarEcosistema'.   │
  └──────────────────────────┬─────────────────────────────┘
                             │ Pestañas listas con Criterios de Evaluación
                             ▼
  ┌────────────────────────────────────────────────────────┐
  │ PASO 3: Publicar la Web App                            │
  │ Implementar > Nueva implementación > Aplicación web.  │
  │ ¡Compartir enlace para jugar en tablets, PDI o móvil!  │
  └────────────────────────────────────────────────────────┘
```

---

## 2. Paso a Paso Detallado

### Paso 1: Configurar NotebookLM con el Decreto Autonómico
1. Entra en [Google NotebookLM](https://notebooklm.google.com).
2. Crea un nuevo cuaderno (ej. *"Cerebro Videojuegos Educativos - Primaria y ESO"*).
3. En la sección **Fuentes**, añade:
   - Los archivos de este repositorio (`specs/`, `prompts/`, `guides/`).
   - El **PDF del Decreto de Currículo de tu Comunidad Autónoma** para tu etapa (Primaria, Secundaria o Bachillerato).
4. En el chat del cuaderno, escribe la petición del equipo docente:
   > *"En 5.º de Primaria en Canarias participan Conocimiento del Medio (ecosistemas de la laurisilva), Lengua Castellana (textos expositivos y adivinanzas) y Matemáticas (fracciones y probabilidad básica). Genera el instalador monolítico Codigo.gs asociando a cada reto el Criterio de Evaluación oficial de nuestro Decreto."*
5. Copia el bloque de código generado por el modelo.

---

### Paso 2: Ejecutar el Instalador en Google Sheets
1. Entra en [Google Drive](https://drive.google.com) y crea una **Hoja de cálculo de Google en blanco**.
2. Ponle un nombre al archivo (ej. `Videojuego_5Primaria_Laurisilva`).
3. En el menú superior, ve a **Extensiones > Apps Script**.
4. Borra cualquier texto que aparezca en el editor y **pega el código completo copiado de NotebookLM**.
5. Pulsa el icono del disquete (**Guardar proyecto**).
6. En el selector superior de funciones, asegúrate de que está seleccionada la función `inicializarEcosistema` y pulsa **Ejecutar**.

> **Ventana de Permisos de Google (Solo la primera vez):**
> 1. Haz clic en **Revisar permisos** y selecciona tu cuenta del centro educativo.
> 2. Haz clic en **Configuración avanzada** (abajo a la izquierda).
> 3. Haz clic en **Ir a Proyecto (no seguro)**.
> 4. Haz clic en **Permitir**.

Vuelve a la hoja de cálculo: comprobarás que se han creado las pestañas de cada materia con su código cromático, las cabeceras formateadas y, de manera crucial, **la columna `Criterio_Evaluacion` rellenada con el código y texto oficial del Decreto Autonómico**.

---

### Paso 3: Desplegar el Videojuego como Aplicación Web
1. En la esquina superior derecha del editor de Apps Script, pulsa **Implementar > Nueva implementación**.
2. En el panel izquierdo, pulsa el icono de engranaje (⚙️) y selecciona **Aplicación web**.
3. Rellena los datos:
   - **Descripción**: `Versión 1 - Aula`.
   - **Ejecutar como**: `Yo (tu cuenta de correo)`.
   - **Quién tiene acceso**:
     - `Cualquier usuario de [Tu Centro]` si los alumnos usan cuentas corporativas.
     - `Cualquier persona` si van a jugar desde tablets de aula compartidas o desde casa.
4. Pulsa **Implementar**.
5. Copia la **URL de la aplicación web** (terminada en `/exec`).

---

## 3. Dinamización Didáctica según la Etapa

### En Educación Primaria (1.º a 6.º):
- **Asamblea y Pizarra Digital Interactiva (PDI)**: Proyecta la Web App del juego en la Pizarra Digital. Los alumnos salen por turnos o debaten en pequeños grupos qué respuesta elegir, mientras el docente guía el razonamiento didáctico.
- **Rincones o Estaciones de Aprendizaje**: En una estación con 2 o 3 tablets del aula, las parejas de alumnos resuelven la misión de Conocimiento del Medio o de Matemáticas.
- **Cocreación Guiada**: Los alumnos inventan preguntas en papel ("Adivina qué animal soy") y el docente (o los propios alumnos de 5.º/6.º) las introducen en la hoja de Sheets compartida.

### En Educación Secundaria y Bachillerato:
- **Equipos Departamentales de Alumnos**: Cada grupo de trabajo se encarga de alimentar una pestaña de la hoja de cálculo (los de Historia documentan el contexto socioeconómico; los de Lengua escriben las réplicas teatrales; los de Matemáticas formulan los desafíos probabilísticos).
- **Gamificación en Vivo**: Al pulsar F5 en el juego, comprueban instantáneamente cómo su trabajo de investigación se convierte en una experiencia interactiva para el resto del instituto.

---

## 4. Valor para la Programación de Aula e Inspección Educativa

La columna **`Criterio_Evaluacion`** generada automáticamente a partir del Decreto Autonómico permite:
1. **Justificación Curricular Inmediata**: Demostrar ante la jefatura de estudios y la inspección educativa que la actividad gamificada responde directamente a los saberes y criterios oficiales de la LOMLOE.
2. **Evaluación Formativa**: El docente sabe exactamente qué competencia o criterio está ejercitando cada estudiante en cada momento de la aventura.
