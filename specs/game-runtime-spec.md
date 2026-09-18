# Especificación Técnica: Motor de Juego Vanilla JS (game-runtime-spec)

Esta especificación detalla el diseño del motor de videojuego ligero en JavaScript Vanilla y CSS puro. Diseñado para ejecutarse en el navegador de cualquier alumno de **Educación Primaria, Secundaria o Bachillerato** sin librerías externas (sin React, Phaser, Tailwind ni CDNs de audio o fuentes).

---

## 1. Principios del Motor

1. **Inmunidad a Filtros Escolares**: Al no realizar ninguna petición a servidores o CDNs externos, funciona en cualquier red protegida de centro escolar o consejería educativa.
2. **Pedagogía Visible (Criterios de Evaluación)**: El motor lee las columnas `Criterio_Evaluacion` y `Saber_Basico` de las hojas y puede mostrarlas de forma elegante en un distintivo curricular (`badge`) o en la tarjeta de retroalimentación didáctica.
3. **Adaptabilidad Etapa Primaria / Secundaria**:
   - **En Primaria**: Botones táctiles de mayor tamaño (mínimo 52px de altura), tipografía amplia y legible, uso de iconos/emojis temáticos como anclaje visual y sonidos reforzadores muy positivos.
   - **En Secundaria / Bachillerato**: Mayor densidad de información, dilemas con explicaciones contextuales y gráficos o fórmulas de apoyo.
4. **Sonido Sintetizado Nativo**: Emplea la **Web Audio API** del navegador mediante osciladores, eliminando la necesidad de archivos `.mp3` o `.wav`.

---

## 2. Máquina de Estados del Motor

```
  ┌───────────────┐
  │     TITLE     │ ◄── [Pantalla de Inicio, Título, Curso y Sinopsis]
  └───────┬───────┘
          │ (Botón Iniciar Aventura)
          ▼
  ┌───────────────┐
  │      HUB      │ ◄── [Selector de Asignaturas / Misiones del Territorio]
  └───────┬───────┘
          │ (Elegir materia o estación)
          ▼
  ┌───────────────┐
  │   ENCOUNTER   │ ◄── [Diálogo / Pregunta contextualizada + Insignia de Criterio]
  └───────┬───────┘
          │ (Seleccionar opción A, B o C)
          ▼
  ┌───────────────┐
  │   FEEDBACK    │ ◄── [Sonido + Explicación Didáctica + Saber Básico]
  └───────┬───────┘
          │
     ┌────┴────────────────────────┐
     ▼                             ▼
¿Vidas === 0?              ¿Completadas todas?
     │                             │
     ▼                             ▼
┌───────────┐                ┌───────────┐
│ GAME_OVER │                │  VICTORY  │
└───────────┘                └───────────┘
```

---

## 3. Síntesis de Sonido Nativa (Web Audio API)

El motor cuenta con un sintetizador integrado de 0 bytes de descarga externa:

```javascript
var SoundEngine = (function() {
  var ctx = null;
  function getCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    return ctx;
  }

  function playTone(freq, type, duration, delay) {
    try {
      var c = getCtx();
      var osc = c.createOscillator();
      var gain = c.createGain();
      osc.type = type || 'sine';
      osc.frequency.setValueAtTime(freq, c.currentTime + (delay || 0));
      
      gain.gain.setValueAtTime(0.12, c.currentTime + (delay || 0));
      gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + (delay || 0) + duration);

      osc.connect(gain);
      gain.connect(c.destination);

      osc.start(c.currentTime + (delay || 0));
      osc.stop(c.currentTime + (delay || 0) + duration);
    } catch(e) {}
  }

  return {
    click: function() { playTone(440, 'triangle', 0.05); },
    correct: function() {
      playTone(523.25, 'sine', 0.1, 0);     // Do
      playTone(659.25, 'sine', 0.1, 0.08);   // Mi
      playTone(783.99, 'sine', 0.25, 0.16);  // Sol
    },
    wrong: function() {
      playTone(220, 'sawtooth', 0.15, 0);
      playTone(180, 'sawtooth', 0.25, 0.12);
    },
    win: function() {
      var melodia = [523.25, 659.25, 783.99, 1046.50];
      melodia.forEach(function(f, i) { playTone(f, 'triangle', 0.3, i * 0.14); });
    }
  };
})();
```

---

## 4. Visualización del Criterio de Evaluación en la Interfaz

Para que el juego evidencie el aprendizaje curricular formal ante docentes, alumnos e inspectores, cada pantalla de reto incorpora:

```
┌─────────────────────────────────────────────────────────────┐
│ 🌿 El Bosque Milenario                ❤️ x3   ⭐ 50 pts  🔊 │
├─────────────────────────────────────────────────────────────┤
│ 🎯 CRITERIO DE EVALUACIÓN (CE.CN.5.2)                       │
│ "Identificar las relaciones tróficas en los ecosistemas..." │
│                                                             │
│ 🦊 GUARDABOSQUES MAYOR                                      │
│ "Si desaparecieran las águilas del parque, ¿qué ocurriría   │
│  a corto plazo con la población de conejos?"               │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ [ A ]  Aumentaría, al reducirse su depredador natural │  │
│  ├───────────────────────────────────────────────────────┤  │
│  │ [ B ]  Disminuiría de inmediato                       │  │
│  ├───────────────────────────────────────────────────────┤  │
│  │ [ C ]  No cambiaría en absoluto                       │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│ 💡 FEEDBACK DIDÁCTICO:                                      │
│ ✅ ¡Correcto! Al faltar el depredador ápice, la población    │
│ de herbívoros experimenta un crecimiento temporal.          │
│ Saber Básico: Dinámica de poblaciones y redes tróficas.     │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. Pautas de Diseño para Alumnos de Primaria

- **Tamaño de Toque Táctil (Touch Targets)**: Los botones deben medir al menos 50px de altura y tener márgenes generosos para evitar pulsaciones erróneas en tablets escolares.
- **Iconografía Específica**: Emplear símbolos temáticos (`🌿` Ciencias, `📖` Lengua, `🔢` Matemáticas, `🎨` Arte, `⚽` Educación Física, `🌍` Geografía) para facilitar la orientación de los alumnos más pequeños.
- **Retroalimentación Motivadora**: Textos de error constructivos que animen a intentarlo de nuevo sin generar frustración.
