# Guía de Implantación para el Claustro Docente (guia-docente)

Esta guía explica paso a paso cómo cualquier equipo docente de secundaria o bachillerato puede generar, desplegar y dinamizar un videojuego educativo interdepartamental en menos de 5 minutos, **sin necesidad de conocimientos previos de programación ni instalación de software**.

---

## 1. El Flujo de Trabajo en 3 Pasos

```
  ┌────────────────────────────────────────────────────────┐
  │ PASO 1: Pedir el instalador a NotebookLM               │
  │ Describir las materias y temarios en el cuaderno.      │
  └──────────────────────────┬─────────────────────────────┘
                             │ Copiar el bloque Codigo.gs
                             ▼
  ┌────────────────────────────────────────────────────────┐
  │ PASO 2: Pegar en Google Sheets                         │
  │ Abrir hoja en blanco > Extensiones > Apps Script.       │
  │ Pegar el código y ejecutar 'inicializarEcosistema'.   │
  └──────────────────────────┬─────────────────────────────┘
                             │ Pestañas y formato listos en 3 seg.
                             ▼
  ┌────────────────────────────────────────────────────────┐
  │ PASO 3: Publicar la Web App                            │
  │ Implementar > Nueva implementación > Aplicación web.  │
  │ ¡Compartir enlace con los estudiantes para jugar!     │
  └────────────────────────────────────────────────────────┘
```

---

## 2. Paso a Paso Detallado

### Paso 1: Configurar NotebookLM y Generar el Código
1. Entra en [Google NotebookLM](https://notebooklm.google.com).
2. Crea un nuevo cuaderno llamado *"Cerebro Videojuegos Educativos"*.
3. En la sección **Fuentes**, sube los archivos de este repositorio (o pega los enlaces de GitHub en bruto / carga la carpeta `specs/`, `prompts/` y `guides/`).
4. En el chat del cuaderno, escribe la petición del claustro:
   > *"En 3.º de ESO participan Lengua (Siglo de Oro y teatro), Historia (comercio de Indias en el siglo XVI) y Matemáticas (probabilidad y fracciones). Genera el instalador monolítico Codigo.gs."*
5. Copia el bloque de código generado por el modelo.

---

### Paso 2: Ejecutar el Instalador en Google Sheets
1. Entra en [Google Drive](https://drive.google.com) y crea una **Hoja de cálculo de Google en blanco**.
2. Ponle un nombre al archivo (ej. `Proyecto_Videojuego_3ESO`).
3. En el menú superior, ve a **Extensiones > Apps Script**.
4. Borra cualquier texto que aparezca en el editor y **pega el código completo copiado de NotebookLM**.
5. Pulsa el icono del disquete (**Guardar proyecto**).
6. En el selector superior de funciones, asegúrate de que está seleccionada la función `inicializarEcosistema` y pulsa **Ejecutar**.

> **Ventana de Permisos de Google (Solo la primera vez):**
> Google mostrará un aviso de seguridad porque el script va a interactuar con tu hoja.
> 1. Haz clic en **Revisar permisos** y selecciona tu cuenta de correo del centro.
> 2. Haz clic en el enlace pequeño **Configuración avanzada** (abajo a la izquierda).
> 3. Haz clic en **Ir a Proyecto (no seguro)**.
> 4. Haz clic en **Permitir**.
>
> *(Este aviso es completamente normal: Google advierte porque el script lo has pegado tú y no proviene de la tienda oficial de Google Workspace Marketplace).*

Vuelve a la pestaña de tu hoja de cálculo: verás que han aparecido mágicamente todas las pestañas coloreadas por materia (`Lengua_Teatro`, `Historia_Rutas`, `Mates_Probabilidad`, `Config_Juego`) con sus cabeceras y filas de ejemplo.

---

### Paso 3: Desplegar el Videojuego como Aplicación Web
1. En la esquina superior derecha del editor de Apps Script, pulsa el botón azul **Implementar > Nueva implementación**.
2. En el panel izquierdo, pulsa el icono del engranaje (⚙️) y selecciona **Aplicación web**.
3. Rellena los datos:
   - **Descripción**: `Versión 1`.
   - **Ejecutar como**: `Yo (tu cuenta de correo)`.
   - **Quién tiene acceso**:
     - Selecciona `Cualquier usuario con una cuenta de [Tu Centro]` si los alumnos tienen correo del colegio/instituto.
     - O selecciona `Cualquier persona` si van a jugar desde móviles particulares o en casa sin loguearse.
4. Pulsa **Implementar**.
5. Copia la **URL de la aplicación web** (termina en `/exec`). ¡Ese es el enlace directo a tu videojuego!

---

## 3. Dinamización Pedagógica en el Aula: Aprendizaje Basado en Creación

El verdadero potencial de `open-game-edu` no es solo que jueguen, sino que **los estudiantes se conviertan en los diseñadores del juego**:

1. **Reparto de roles por materias:**
   - En la clase de **Lengua**, un equipo de alumnos redacta nuevos diálogos, versos de Quevedo o acertijos teatrales en la pestaña `Lengua_Teatro`.
   - En la clase de **Historia**, otro equipo investiga los cargamentos de especias y oro en el Archivo de Indias e introduce nuevos puertos en `Historia_Rutas`.
   - En la clase de **Matemáticas**, calculan las probabilidades de tormenta según la época del año en `Mates_Probabilidad`.
2. **Ciclo de retroalimentación inmediata:**
   - Nada más editar una celda en Google Sheets, los alumnos van a la Web App del juego, pulsan **Recargar página (F5)** y comprueban en directo cómo su contenido recién investigado aparece dentro del videojuego.

---

## 4. Preguntas Frecuentes y Resolución de Problemas

### ¿Qué pasa si añadimos más preguntas o filas en la hoja?
La Web App lee automáticamente todas las filas existentes en cada recarga. No hace falta volver a ejecutar ningún script ni volver a implementar la aplicación.

### ¿Se pueden cambiar los textos de victoria o las vidas iniciales?
Sí, en la pestaña `Config_Juego` puedes cambiar el valor de `VIDAS_INICIALES`, `TITULO_JUEGO` o cualquier otro parámetro clave-valor sin tocar una sola línea de código.

### ¿Se puede insertar el juego en Google Sites o Google Classroom?
Totalmente. Al tener habilitado `HtmlService.XFrameOptionsMode.ALLOWALL`, la URL de la aplicación web puede insertarse directamente en Google Sites mediante el botón *Insertar > Mediante URL (iframe)*.
