# Especificación Técnica: Motor de Juego Vanilla JS y Modalidades (game-runtime-spec)

Esta especificación detalla la arquitectura del motor de videojuego ligero en JavaScript Vanilla y CSS puro, definiendo el **Catálogo de las 5 Modalidades de Juego**, el **Bucle Multijugador Sincronizado en Vivo** y la **Telemetría Educativa**.

---

## 1. Catálogo de los 5 Arquetipos de Juego

El motor es modular y soporta 5 modalidades configurables según lo solicite el docente a NotebookLM:

### Modalidad 1: Aventura Narrativa / RPG por Nodos (Por defecto)
- **Estructura**: Cuaderno de bitácora, retratos de personajes (NPCs), árbol de decisiones y progresión por enclaves.
- **Flujo**: Diálogo $\rightarrow$ Selección de opción A/B/C $\rightarrow$ Sonido de evaluación $\rightarrow$ Feedback pedagógico $\rightarrow$ Siguiente nodo.
- **Ideal para**: Letras, Humanidades, comprensión lectora, inmersión histórica y dilemas éticos.

### Modalidad 2: Tablero / Trivial Interdepartamental
- **Estructura**: Tablero de casillas temáticas (verde = ciencias, naranja = historia, azul = matemáticas, morado = lengua).
- **Flujo**: El jugador pulsa *"Lanzar Dado"* (generador 1 a 6 con sonido de rodillo), el peón avanza a la casilla correspondiente y se activa el reto de esa materia. Acertar otorga la "insignia" de la asignatura.
- **Ideal para**: Repasos trimestrales y evaluación lúdica de conocimientos generales.

### Modalidad 3: Escape Room Digital (Contrarreloj)
- **Estructura**: Habitación o laboratorio virtual con 3 a 5 "candados digitales" y un cronómetro visible regresivo (ej. 15 minutos).
- **Flujo**: Cada candado pertenece a una asignatura. Al resolver el cálculo matemático o el análisis sintáctico, se desbloquea un dígito de la clave maestra final para escapar de la sala.
- **Ideal para**: Presión temporal, trabajo en parejas y pensamiento lateral.

### Modalidad 4: Carrera Multijugador en Línea ("La Gran Regata")
- **Estructura**: Pista horizontal con carriles numerados (casillas 0 a 10) donde se muestran los avatares de todos los equipos del aula (⛵, 🚀, 🏎️, 🦅).
- **Flujo**: Cada alumno juega desde su tablet/móvil. Cada acierto en una materia avanza su avatar en la pista. La pantalla común del proyector o PDI actualiza las posiciones cada 3 segundos mediante *polling*.
- **Ideal para**: Competición sana, torneos interclases y dinámicas de activación rápida.

### Modalidad 5: Desafío Colaborativo ("Boss Raid")
- **Estructura**: Pantalla comunitaria con un "Jefe" o reto ecológico (ej. 1.000 HP de contaminación o amenaza planetaria).
- **Flujo**: Todos los alumnos colaboran a la vez. Las respuestas correctas en Lengua aportan "hechizos", en Matemáticas "escudos" y en Ciencias "daño crítico". La barra común se reduce con cada aportación hasta la victoria del grupo.
- **Ideal para**: Cohesión social, inclusión educativa y trabajo sin perdedores individuales.

---

## 2. Bucle Multijugador Sincronizado en Vivo (Modo Carrera)

Para visualizar a los demás jugadores sin librerías externas:

```javascript
// Bucle de sincronización periódica (Polling cada 3 segundos)
var MultiplayerLoop = (function() {
  var timer = null;
  var salaActiva = true;

  function iniciarSincronizacion(urlApp, callbackRenderPista) {
    detener();
    timer = setInterval(function() {
      if (!salaActiva) return;
      
      fetch(urlApp + '?action=lobby')
        .then(function(r) { return r.json(); })
        .then(function(lobby) {
          callbackRenderPista(lobby);
        })
        .catch(function(e) {
          // Silencioso ante pérdidas temporales de red escolar
        });
    }, 3000);
  }

  function detener() {
    if (timer) clearInterval(timer);
  }

  return {
    iniciar: iniciarSincronizacion,
    detener: detener
  };
})();
```

---

## 3. Renderizado de la Pista de Carrera (Avatares en Pantalla)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 🏁 GRAN REGATA DEL SIGLO DE ORO                     ⏱️ 02:45   🔊           │
├─────────────────────────────────────────────────────────────────────────────┤
│ Carril 1 [⛵ Los Galeones - 3.ºA]  ───────► [⛵]                   Casilla 6│
│ Carril 2 [🚀 Eco-Patrulla - 3.ºB]  ─────────────► [🚀]             Casilla 8│
│ Carril 3 [🦅 Halcones de Vegueta]  ──► [🦅]                        Casilla 3│
│ Carril 4 [🏎️ Matemáticos Radiact] ──────────────────► [🏎️] 🏆     Casilla 10│
├─────────────────────────────────────────────────────────────────────────────┤
│ 🎯 RETO ACTUAL (Lengua): Completa el verso de Góngora...                   │
│ [ A ] de oro y sol       [ B ] de sombra y nieve     [ C ] de lirio y rosa  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Telemetría y Cuaderno de Evaluación en Vivo

Al completarse cualquier partida (individual o multijugador), el cliente invoca:

```javascript
function enviarPuntuacionFinal(nombreJugador, puntos, vidas, tiempoTotal, aciertosMateria, resultado) {
  var payload = {
    jugador: nombreJugador,
    puntos: puntos,
    vidas: vidas,
    tiempo: tiempoTotal,
    desglose: aciertosMateria,
    resultado: resultado
  };

  if (typeof google !== 'undefined' && google.script && google.script.run) {
    google.script.run.registrarPartidaOnline(payload);
  }
}
```
Esto escribe una fila instantánea en la pestaña `Puntuaciones_Online` de la hoja de cálculo del profesorado.
