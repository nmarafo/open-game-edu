# Catálogo Curricular de Mecánicas de Juego (catalogo-mecanicas)

Este catálogo actúa como la **matriz de diseño lúdico-pedagógico** para el modelo de lenguaje y el profesorado. Describe cómo traducir los saberes básicos de cualquier asignatura de Secundaria o Bachillerato a mecánicas jugables operativas en Google Sheets.

---

## 1. Matriz de Traducción: Asignatura ↔ Mecánica de Videojuego

| Asignatura | Mecánica Lúdica en el Motor | Equivalente en la Hoja de Sheets | Rol en el Videojuego |
| :--- | :--- | :--- | :--- |
| **Lengua Castellana y Literatura** | Diálogos narrativos, acertijos de rima, descifrado de figuras retóricas, detección de falacias. | Columnas de opciones múltiples con citas literarias, versos o fragmentos teatrales. | Desbloqueo de puertas, persuasión de NPCs, diplomacia. |
| **Matemáticas** | Cálculo de probabilidades en combates/tormentas, proporciones de recursos, economía comercial. | Columnas con fórmulas esperadas, porcentajes, márgenes de tolerancia numérica. | Gestión de inventario, supervivencia económica, apuestas de éxito. |
| **Geografía e Historia** | Mapa de rutas, eventos cronológicos, dilemas históricos, relaciones con facciones. | Columnas de etapas/ciudades, costes de viaje en oro/tiempo, facciones aliadas. | Navegación espacial/geográfica, progresión temporal del mundo. |
| **Biología y Geología** | Bestiario de criaturas, relaciones tróficas, resistencia a estados (veneno, clima), estratigrafía. | Columnas con taxonomía de seres vivos, debilidades biológicas, hábitats. | Combate táctico contra criaturas, recolección de plantas curativas. |
| **Física y Química** | Sistema de crafteo/alquimia, balance de energía, leyes del movimiento, circuitos. | Columnas de recetas: Reactivo A + Reactivo B = Producto + Calor/Energía. | Elaboración de pociones, reparación de motores o naves, resolución de puzzles. |
| **Lengua Extranjera (Inglés/Francés)** | Mensajes cifrados de radio, contraseñas idiomáticas, traducción de pistas críticas. | Columnas en idioma meta con glosario o preguntas de comprensión auditiva/lectora. | Comunicación con aliados extranjeros, desactivación de trampas con palabras clave. |
| **Filosofía / Valores Éticos** | Árboles de dilemas morales, medidor de karma o reputación de facciones. | Columnas de decisiones sin respuesta única correcta, pero con impacto en estadísticas. | Definición del final de la historia (héroe, diplomático, tirano). |
| **Educación Plástica y Dibujo** | Identificación de estilos artísticos, teoría del color, perspectiva y proporciones. | Columnas con códigos cromáticos, descripción de murales y símbolos heráldicos. | Inspección de artefactos antiguos, puzzles visuales y heráldica. |
| **Música** | Puzzles rítmicos, secuencias de intervalos, afinación de mecanismos antiguos. | Columnas de secuencias sonoras reproducidas por la Web Audio API (Do-Re-Mi). | Apertura de cajas fuertes melódicas, conjuros sonoros. |
| **Educación Física** | Gestión de fatiga/estamina, cálculo de calorías, planificación de rutas saludables. | Columnas de coste de energía por acción y recuperación mediante descanso/alimentos. | Medidor de resistencia para evitar el agotamiento físico. |

---

## 2. Ejemplos de Sinergias Interdepartamentales

### Sinergia 1: "La Expedición del Siglo de Oro" (3.º ESO)
- **Lengua**: Declamar versos de Lope o Quevedo para convencer al corregidor de que firme el permiso de zarpar.
- **Historia**: Elegir la ruta del comercio triangular evitando puertos hostiles y tormentas estacionales.
- **Matemáticas**: Calcular la ración de víveres por tripulante y la probabilidad de motín si escasea el agua.

### Sinergia 2: "El Puesto Científico en Marte" (1.º Bachillerato / 4.º ESO)
- **Física y Química**: Ajustar la presión de los tanques de oxígeno y calcular la energía solar captada.
- **Biología**: Cultivar plantas en el biorreactor controlando el ciclo del nitrógeno y plagas bacterianas.
- **Inglés**: Leer y descifrar los manuales técnicos de la estación espacial enviados por el centro de control en Houston.
- **Filosofía**: Decidir cómo distribuir los suministros médicos limitados entre la tripulación (utilitarismo vs. deontología).

### Sinergia 3: "El Misterio de la Catedral Gótica" (2.º ESO)
- **Geografía e Historia**: Descubrir la influencia de los gremios medievales y la peste negra en la ciudad.
- **Matemáticas**: Calcular las alturas y proporciones de los arcos apuntados y rosetones.
- **Plástica**: Reconocer los símbolos religiosos y los colores de los vitrales.
- **Música**: Resolver un enigma armónico en el órgano de la catedral para encontrar un pasadizo secreto.

---

## 3. Instrucción para el Modelo al Generar Semillas Curriculares

Al generar las filas iniciales en `inicializarEcosistema()`:
1. **Rigor Curricular**: El contenido no debe ser ficticio o infantil si el nivel es secundaria; debe corresponderse con los estándares reales de aprendizaje (LOMLOE u homólogos internacionales).
2. **Explicación Pedagógica Obligatoria**: Cada reto debe incluir una justificación educativa clara en la columna `Feedback_Didactico` para que el error sea una oportunidad de aprendizaje guiado.
