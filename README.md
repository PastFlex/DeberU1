# CIER 2026 - I Congreso Internacional de Energías Renovables y Tecnologías Sostenibles

Sitio web accesible, responsivo y semántico desarrollado con **HTML5 Semántico**, **CSS3 (Mobile First)** y **Vanilla JavaScript puro** (sin dependencias ni librerías externas), creado para promocionar una iniciativa académica internacional de investigación y transferencia tecnológica en energías limpias.

---

## 📋 Tabla de Contenidos
1. [Descripción del Proyecto](#descripción-del-proyecto)
2. [Estructura del Repositorio](#estructura-del-repositorio)
3. [Características Técnicas Principales](#características-técnicas-principales)
4. [Interacciones en JavaScript](#interacciones-en-javascript)
5. [Criterios de Accesibilidad (WCAG 2.1 AA)](#criterios-de-accesibilidad-wcag-21-aa)
6. [Cómo Visualizar el Proyecto](#cómo-visualizar-el-proyecto)

---

## 🚀 Descripción del Proyecto
El sitio web promociona el **I Congreso Internacional de Energías Renovables y Tecnologías Sostenibles (CIER 2026)**, un evento académico híbrido que reúne a investigadores, docentes y estudiantes en torno a cuatro ejes temáticos:
1. Energía Solar Fotovoltaica y Eólica Avanzada.
2. Hidrógeno Verde y Almacenamiento Energético.
3. Ciudades Inteligentes y Movilidad Eléctrica Sostenible.
4. Economía Circular y Gestión de Recursos.

El sitio cuenta con cinco secciones semánticas completas:
- **Hero / Inicio:** Información clave, fechas, modalidad y métricas del evento.
- **Ejes Temáticos:** Artículos y tarjetas con los tópicos de investigación.
- **Ponentes Magistrales:** Directorio con filtrado interactivo por track temático.
- **Cronograma Académico:** Agenda detallada de las 3 jornadas.
- **Formulario de Registro:** Formulario accesible con validación en tiempo real.
- **Preguntas Frecuentes (FAQ):** Acordeón interactivo accesible.

---

## 📁 Estructura del Repositorio

```text
Deber U3/
├── index.html              # Estructura semántica en HTML5 puro
├── css/
│   └── styles.css          # Estilos CSS3 Mobile First con Variables y Grid/Flexbox
├── js/
│   └── main.js             # Lógica interactiva accesible en JavaScript Vanilla
├── assets/
│   └── images/             # Recursos vectoriales SVG escalables de alta resolución
│       ├── logo-ciate.svg
│       ├── hero-illustration.svg
│       ├── speaker-1.svg
│       ├── speaker-2.svg
│       ├── speaker-3.svg
│       └── speaker-4.svg   
│
├── INFORME_TECNICO.md      # Informe técnico académico (decisiones, pruebas y mejoras)
└── README.md               # Documentación general del repositorio
```

---

## 🎨 Características Técnicas Principales

### 1. HTML5 Semántico y Jerarquía de Encabezados
- Uso de etiquetas estructurales nativas: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<figure>`, `<figcaption>`.
- **Jerarquía rigurosa:** Un único encabezado `<h1>` en el Hero, seguido de `<h2>` para cada sección principal y `<h3>`/`<h4>` para tarjetas y subcomponentes.
- Imágenes fluidas con textos alternativos (`alt`) descriptivos y contextuales.
- Formulario accesible con etiquetas vinculadas mediante el atributo `for` e `id`, uso de `<fieldset>` y `<legend>` para grupos de opciones radiales.

### 2. CSS Mobile-First y Adaptaciones Justificadas
- **Variables CSS (`:root`):** Paleta de colores de alto contraste, tipografía modular, radios y sombras.
- **Mobile First:** Estilos base optimizados para dispositivos móviles a una sola columna.
- **Adaptación 1 (`@media (min-width: 768px)`):** Configuración para tabletas con cuadrícula de 2 columnas en ejes temáticos, ponentes y formulario, optimizando el espacio vertical.
- **Adaptación 2 (`@media (min-width: 1024px)`):** Configuración para escritorio con menú horizontal visible (ocultamiento de botón hamburguesa), layout Hero a 2 columnas simétricas, cuadrícula a 4 columnas y footer expandido.
- **Imágenes fluidas:** `max-width: 100%; height: auto; display: block;`.
- **Cero desbordamiento horizontal:** Control estricto del modelo de caja mediante `box-sizing: border-box`.

---

## ⚡ Interacciones en JavaScript (Vanilla JS)

1. **Menú adaptable (Mobile Navigation Drawer):**
   - Control de accesibilidad mediante `aria-expanded` y `aria-label`.
   - Cierre automático al presionar la tecla `Escape` con devolución del foco al botón disparador.
   - Bloqueo de desplazamiento de fondo mientras el menú se encuentra desplegado.
2. **Filtro dinámico de ponentes por área temática:**
   - Botones con estado accesible `aria-pressed`.
   - Región en vivo (`aria-live="polite"`) que anuncia a los lectores de pantalla cuántos resultados están visibles tras aplicar un filtro.
3. **Validación accesible en tiempo real del formulario:**
   - Detección inmediata en eventos `blur` e `input`.
   - Marcado de campos erróneos con `aria-invalid="true"`.
   - Mensajes descriptivos enlazados semánticamente mediante `aria-describedby`.
   - Caja de resumen de errores accesible (`role="alert"` / `aria-live="assertive"`).
4. **Modal accesible de confirmación:**
   - Diálogo modal con `role="dialog"`, `aria-modal="true"`, trampa de foco (`focus trap`) y soporte para cierre con tecla `Escape`.
5. **Acordeón accesible de preguntas frecuentes (FAQ):**
   - Botones con atributos `aria-expanded` y paneles con el atributo nativo `hidden`.

---

## ♿ Criterios de Accesibilidad (WCAG 2.1 AA)

- **Salto al contenido principal (`.skip-link`):** Permite a usuarios de teclado y lectores de pantalla omitir la barra de navegación.
- **Foco visible (`:focus-visible`):** Anillos de enfoque notorios de 3px con alto contraste en todos los elementos interactivos.
- **Contraste de color:** Relaciones de contraste superiores a 4.5:1 en textos normales y 3:1 en encabezados sobre fondos oscuros.
- **Soporte de ampliación:** El diseño soporta zoom de hasta 200% sin pérdida de funcionalidad ni solapamiento de contenido.

---

## 🖥️ Cómo Visualizar el Proyecto

Al tratarse de código estático estándar sin dependencias:
1. Abra directamente el archivo `index.html` en cualquier navegador web moderno (Edge, Chrome, Firefox, Safari).
2. O bien, utilice un servidor local estático (por ejemplo la extensión *Live Server* de VS Code o cualquier servidor HTTP simple).

---

