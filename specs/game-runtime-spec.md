# Especificación Técnica: Motor de Juego Vanilla JS (game-runtime-spec)

Esta especificación detalla el diseño del motor de videojuego ligero en JavaScript Vanilla y CSS puro, incluyendo el **conmutador entre el Formulario de Creación de Retos y el botón "RUN" de Previsualización en Vivo**, junto con el reconocimiento de autoría del alumnado.

---

## 1. Principios del Motor

1. **Doble Modo (Creación / Run)**:
   - **Modo Creación (`VIEW_FORM`)**: Los estudiantes o docentes pueden redactar un nuevo reto, asociarlo a un Criterio de Evaluación y enviarlo a Google Sheets como propuesta con estado `PENDIENTE`.
   - **Modo Previsualización (`VIEW_PLAY` o botón `▶️ RUN`)**: Ejecuta el videojuego al instante con los datos vigentes, simulando la experiencia de partida real.
2. **Filtrado de Calidad en Tiempo de Ejecución**:
   - Por defecto, el botón "RUN" solo ejecuta los retos con `Estado_Revision === 'APROBADO'`.
   - Incluye una casilla opcional para pruebas docentes: *"Previsualizar también retos pendientes"*.
3. **Reconocimiento de Autoría Estudiantil**:
   - Cada reto superado muestra el nombre de su creador: `💡 Reto diseñado por: [Autor_O_Equipo]`.
4. **Cero Dependencias y Sonido Nativo**:
   - Web Audio API sintética para pitidos, fanfarrias y errores sin descargas de audio externas.
   - Pila tipográfica del sistema e iconografía temática basada en emojis y SVG puros.

---

## 2. Máquina de Estados y Modos de la Interfaz

```
┌─────────────────────────────────────────────────────────────┐
│ 🎮 open-game-edu            [✏️ Enviar Reto] [▶️ RUN JUEGO] │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  SI SE PULSA [✏️ Enviar Reto]:                               │
│  Muestra el formulario: Materia, Criterio, Autor, Pregunta, │
│  Opciones A/B/C, Respuesta Correcta y Feedback Didáctico.   │
│  Botón: [🚀 Enviar a Revisión de Profesores]                │
│                                                             │
│  SI SE PULSA [▶️ RUN JUEGO]:                                 │
│  Carga datos de Sheets, filtra 'APROBADO' y arranca:        │
│  TITLE ➔ HUB (Selector) ➔ ENCOUNTER ➔ FEEDBACK ➔ VICTORIA   │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Componentes Visuales del Modo RUN

### Tarjeta de Reto con Criterio y Autoría:
```
┌─────────────────────────────────────────────────────────────┐
│ 🌿 La Eco-Patrulla                   ❤️ x4   ⭐ 50 pts  🔊 │
├─────────────────────────────────────────────────────────────┤
│ 🎯 CRITERIO DE EVALUACIÓN (CE.CMN.5.2)                      │
│ "Identificar las relaciones tróficas en los ecosistemas..." │
│                                                             │
│ 💡 RETO CREADO POR: Equipo 3 - Los Linces de Doñana        │
│                                                             │
│ 🦊 GUARDABOSQUES LEO                                        │
│ "¿Quiénes son los productores de esta cadena trófica?"     │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ [ A ]  Los robles y plantas (seres autótrofos)          │ │
│ ├─────────────────────────────────────────────────────────┤ │
│ │ [ B ]  Las orugas herbívoras                            │ │
│ ├─────────────────────────────────────────────────────────┤ │
│ │ [ C ]  Los pájaros carboneros                           │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Adaptabilidad y Accesibilidad

- **Educación Primaria**: Botones táctiles de al menos 52px de altura, vocabulario accesible y colores de alto contraste.
- **Educación Secundaria**: Tarjetas con mayor soporte de texto, fórmulas matemáticas o referencias documentales históricas.
- **Envío Asíncrono**: El formulario se conecta a `google.script.run.guardarPropuestaReto(...)` permitiendo insertar filas sin refrescar la ventana.
