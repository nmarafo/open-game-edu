# Especificación Técnica: Motor de Juego Vanilla JS (game-runtime-spec)

Esta especificación detalla el diseño del motor de videojuego ligero en JavaScript Vanilla y CSS puro. Está diseñado para ejecutarse directamente dentro del navegador del estudiante sin librerías externas (sin React, Phaser, Tailwind ni CDNs de audio o fuentes).

---

## 1. Principios del Motor

1. **Inmunidad a Filtros Escolares**: Al no cargar recursos de dominios externos, funciona incluso en redes educativas con políticas estrictas de filtrado de contenidos.
2. **Sonido Sintetizado Nativo**: Utiliza la **Web Audio API** del navegador para generar efectos de sonido y fanfarrias melódicas mediante osciladores, sin necesidad de archivos `.mp3` o `.wav`.
3. **Consumo Dinámico de Pestañas**: El motor no tiene contenido cableado (*hardcoded*). Lee la variable `window.GAME_DATA`, descubre qué asignaturas están activas y genera la experiencia de juego automáticamente.
4. **Diseño Adaptativo (Mobile-First)**: Funciona con la misma fluidez en un smartphone de un alumno, una tablet de aula o un ordenador de sobremesa.

---

## 2. Máquina de Estados del Motor

El flujo de juego sigue una máquina de estados finita:

```
  ┌───────────────┐
  │     TITLE     │ ◄── [Pantalla de Inicio y Sinopsis]
  └───────┬───────┘
          │ (Botón Iniciar)
          ▼
  ┌───────────────┐
  │      HUB      │ ◄── [Selector de Asignaturas / Mapa de Misiones]
  └───────┬───────┘
          │ (Elegir reto de materia)
          ▼
  ┌───────────────┐
  │   ENCOUNTER   │ ◄── [Planteamiento didáctico / Diálogo / Reto]
  └───────┬───────┘
          │ (Seleccionar opción A, B o C / Ingresar cálculo)
          ▼
  ┌───────────────┐
  │   FEEDBACK    │ ◄── [Evaluación: Sonido + Explicación Didáctica]
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

## 3. Síntesis de Sonido con Web Audio API

El motor debe incluir un sintetizador ultra-ligero:

```javascript
var AudioEngine = (function() {
  var ctx = null;

  function initCtx() {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  function playTone(freq, type, duration, delay) {
    try {
      initCtx();
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.type = type || 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + (delay || 0));
      
      gain.gain.setValueAtTime(0.15, ctx.currentTime + (delay || 0));
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (delay || 0) + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + (delay || 0));
      osc.stop(ctx.currentTime + (delay || 0) + duration);
    } catch(e) {
      // Silencioso si el navegador bloquea audio antes del primer clic
    }
  }

  return {
    click: function() { playTone(440, 'triangle', 0.05); },
    success: function() {
      playTone(523.25, 'sine', 0.1, 0);      // Do
      playTone(659.25, 'sine', 0.1, 0.1);    // Mi
      playTone(783.99, 'sine', 0.25, 0.2);   // Sol
    },
    error: function() {
      playTone(220, 'sawtooth', 0.15, 0);
      playTone(180, 'sawtooth', 0.25, 0.12);
    },
    victory: function() {
      var notas = [523.25, 659.25, 783.99, 1046.50];
      notas.forEach(function(n, i) {
        playTone(n, 'triangle', 0.3, i * 0.15);
      });
    }
  };
})();
```

---

## 4. Estructura de Componentes en la Interfaz

```
┌─────────────────────────────────────────────────────────────┐
│ [LOGO] Las Crónicas del Galeón        ❤️ x3  ⭐ 40 pts  🔊 │  <-- Barra de Estado
├─────────────────────────────────────────────────────────────┤
│ 🗺️ ETAPA: EL PUERTO DE SEVILLA                              │
│                                                             │
│  ┌─────────┐  "¡Capitán! Para zarpar debemos calcular      │
│  │ 👤 NPC  │   la ración de agua según el porcentaje de     │
│  │ Retrato │   marineros a bordo."                          │
│  └─────────┘                                                │
│                                                             │
│  [ Reto Matemáticas / Historia ]                            │
│  Si 3 de cada 5 barriles están llenos, ¿qué fracción falta? │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ [ A ]  Faltan 2/5 del cargamento                     │  │
│  ├───────────────────────────────────────────────────────┤  │
│  │ [ B ]  Faltan 3/5 del cargamento                     │  │
│  ├───────────────────────────────────────────────────────┤  │
│  │ [ C ]  Falta 1/2 del cargamento                      │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│  [ MODAL DE RETROALIMENTACIÓN DOCENTE ]                     │
│  ✅ ¡Correcto! La fracción complementaria es 1 - 3/5 = 2/5. │
│  Explicación: El total del cargamento representa la unidad. │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. Accesibilidad y Estilos Visuales

- **Paleta de Colores de Alto Contraste**:
  - Fondo: `#0F172A` (Azul medianoche oscuro)
  - Tarjetas / Contenedores: `#1E293B` (Gris pizarra)
  - Bordes y Acentos: `#38BDF8` (Azul celeste) y `#F59E0B` (Oro)
  - Texto Principal: `#F8FAFC` (Blanco suave)
  - Éxito: `#10B981` (Verde esmeralda)
  - Error: `#EF4444` (Rojo carmesí)
- **Tipografía**: Pila de fuentes del sistema (`system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`) para garantizar renderizado nítido e instantáneo sin peticiones de red.
- **Botones**: Altura mínima de 48px con bordes redondeados y efecto `:hover` y `:active` para retroalimentación táctil inmediata.
