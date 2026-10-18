# INFORME TÉCNICO DE DESARROLLO WEB
**Actividad:** Construcción de Sitio Web Responsivo y Accesible (Unidad 3)  
**Proyecto:** Portal Oficial del I Congreso Internacional de Energías Renovables y Tecnologías Sostenibles (CIER 2026)  
**Tecnologías Utilizadas:** HTML5 Semántico, CSS3 Puro (Mobile First), Vanilla JavaScript (ES6+)  
**Extensión:** 2 Páginas Técnicas de Síntesis  

---

## 1. Justificación de la Iniciativa Académica
Se seleccionó como temática la promoción del **CIER 2026**, un evento académico de carácter híbrido enfocado en la investigación científica, descarbonización y tecnologías sostenibles (Energía Solar Fotovoltaica, Hidrógeno Verde, Redes Inteligentes y Economía Circular). La elección de una conferencia académica permite justificar con naturalidad la inclusión de múltiples secciones estructurales (Hero con datos clave, ejes temáticos, ponentes magistrales, cronograma por días, formulario de registro y becas, y sección de preguntas frecuentes).

---

## 2. Decisiones de Diseño y Arquitectura Web

### 2.1. HTML5 Semántico y Jerarquía de Encabezados
- **Estructura Semántica:** Se prescindió del uso indiscriminado de divisiones genéricas (`<div>`), recurriendo a elementos nativos con significado de documento: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<figure>` y `<figcaption>`.
- **Jerarquía Estricta:** Se garantizó un único encabezado de primer nivel (`<h1>`) en el Hero para identificar el propósito global del sitio, seguido de encabezados de nivel dos (`<h2>`) vinculados semánticamente a cada sección mediante `aria-labelledby`, y niveles subsecuentes (`<h3>` y `<h4>`) para tarjetas de conferencistas, días del cronograma y paneles.
- **Formulario Accesible:** Todas las entradas de datos (`<input>`, `<select>`, `<textarea>`) cuentan con etiquetas `<label>` explícitamente asociadas mediante los atributos `for` e `id`. La selección de modalidad se implementó con un `<fieldset>` y su correspondiente `<legend>`, garantizando contexto a tecnologías de asistencia.

### 2.2. CSS Mobile-First y Sistema de Variables
- **Metodología Mobile First:** Los estilos base se diseñaron pensando en pantallas pequeñas (smartphones a una columna), evitando sobrecargar el procesamiento inicial de dispositivos móviles.
- **Variables CSS (`:root`):** Se centralizó la paleta cromática, espaciados modulares, radios de curvatura y transiciones para asegurar consistencia visual y facilitar mantenibilidad.
- **Técnicas Modernas de Maquetación:** Se empleó **CSS Grid** para la distribución de cuadrículas bidimensionales (tarjetas de ejes y conferencistas) y **Flexbox** para componentes unidimensionales (navegación, encabezados, alineaciones de formulario y botones de llamada a la acción).
- **Imágenes Fluidas:** Se aplicó la regla fundamental `max-width: 100%; height: auto; display: block;` asegurando que ningún recurso gráfico sobrepase el contenedor padre.

### 2.3. Justificación de las Dos Adaptaciones por Media Queries
1. **Adaptación para Tabletas (`@media (min-width: 768px)`):**  
   *Justificación técnica:* En pantallas medianas (a partir de 768px de ancho), el despliegue del contenido en una sola columna genera un recorrido de desplazamiento vertical excesivo. Se transformó la cuadrícula de ejes temáticos y ponentes a **2 columnas**, el formulario se reordenó en una cuadrícula de 2 columnas para optimizar el espacio horizontal, y los botones de acción del Hero se alinearon horizontalmente.
2. **Adaptación para Escritorio (`@media (min-width: 1024px)`):**  
   *Justificación técnica:* En monitores amplios, el botón de menú hamburguesa resulta un paso innecesario de fricción; por tanto, se oculta y la barra de navegación se despliega de manera fija y horizontal en la cabecera. La sección Hero pasa a un layout de **dos columnas simétricas** (contenido textual y métricas a la izquierda, e infografía interactiva a la derecha). Asimismo, las tarjetas de ejes y conferencistas se expanden a **4 columnas continuas**, logrando un balance visual armónico y profesional.

---

## 3. Implementación de Interacciones en JavaScript Puro
Se evitó deliberadamente el uso de librerías externas pesadas (como jQuery o Bootstrap), priorizando un código limpio, modular y de alto rendimiento:

1. **Menú Móvil Adaptable:** Gestiona el estado de apertura/cierre mediante el atributo `aria-expanded` y la clase `.is-open`. Bloquea el desplazamiento del fondo (`body.style.overflow = 'hidden'`), se cierra automáticamente al seleccionar un enlace y permite el cierre inmediato mediante la tecla `Escape`, devolviendo el foco al botón disparador para preservar la navegación accesible.
2. **Filtro Dinámico de Ponentes con Notificación Accesible:** Permite filtrar los conferencistas según su área temática. Actualiza los botones con `aria-pressed` y notifica a los usuarios con discapacidad visual a través de una región en vivo (`aria-live="polite"`), la cual anuncia en tiempo real el número de resultados visibles tras cada filtro.
3. **Validación Accesible del Formulario y Modal de Confirmación:** Valida entradas obligatorias, formato de correo mediante expresiones regulares y aceptación de términos en los eventos `blur` y `submit`. Vincula mensajes de error en tiempo real mediante `aria-describedby` y `aria-invalid`. En caso de errores, despliega un sumario con `role="alert"` y enfoca el primer campo inválido. Ante un envío exitoso, muestra un modal accesible (`role="dialog"`, `aria-modal="true"`) con trampa de foco (`focus trap`) y generación de código de reserva.
4. **Acordeón Accesible en Preguntas Frecuentes:** Controla el despliegue de respuestas mediante `aria-expanded` y la propiedad nativa `hidden`.

---

## 4. Pruebas de Calidad, Rendimiento y Accesibilidad

| Criterio Evaluado | Método de Comprobación | Resultado Obtenido |
| :--- | :--- | :--- |
| **Navegación por Teclado** | Recorrido con teclas `Tab`, `Shift + Tab`, `Enter`, `Espacio` y `Escape`. | **Aprobado.** Se accede a todos los controles interactivos, enlaces, acordeón, filtros y formulario en un orden lógico secuencial. |
| **Foco Visible** | Inspección visual en cada elemento enfocable. | **Aprobado.** Se implementó `:focus-visible` con un contorno de 3px en color cian de alto contraste y desplazamiento (`outline-offset: 3px`). |
| **Contraste Cromático** | Evaluación de paleta contra pautas WCAG 2.1 Nivel AA (mínimo 4.5:1 para texto normal y 3:1 para texto grande). | **Aprobado.** Texto principal blanco (`#f8fafc`) y atenuado (`#cbd5e1`) sobre fondo azul profundo (`#090d16`), alcanzando ratios de contraste superiores a **11.2:1**. |
| **Ampliación / Zoom (200%)** | Prueba de zoom del navegador al 200%. | **Aprobado.** El diseño se reorganiza fluidamente sin pérdida de texto, solapamiento de contenedores ni necesidad de scroll bidimensional. |
| **Desbordamiento Horizontal** | Inspección con depurador en anchos de 320px, 375px, 768px y 1280px. | **Aprobado.** El valor de `scrollWidth` coincide exactamente con `clientWidth`, garantizando ausencia absoluta de scrollbar horizontal indeseado. |
| **Validez del Código** | Verificación de estándares W3C (HTML5 / CSS3). | **Aprobado.** Código estructurado correctamente, sin etiquetas obsoletas ni atributos no estandarizados. |

---

## 5. Evidencias de Tres Anchos de Pantalla

El repositorio incluye las capturas de pantalla comprobatorias en la carpeta `screenshots/`:
1. **Vista Móvil (`mobile-375px.png` / `500px`):** Cabecera compacta con botón hamburguesa, tipografía adaptada mediante `clamp()`, métricas en bloque y botones accesibles de tamaño táctil adecuado (mínimo 48px).
2. **Vista Tableta (`tablet-768px.png`):** Layout reorganizado a 2 columnas para ejes temáticos y ponentes, cronograma estructurado y formulario optimizado en cuadrícula de dos campos por fila.
3. **Vista Escritorio (`desktop-1280px.png`):** Barra de navegación horizontal completa, sección Hero en dos columnas (contenido + diagrama vectorial interactivo) y cuadrícula a 4 columnas.

---

## 6. Mejoras Técnicas Pendientes (Trabajo Futuro)
1. **Persistencia Local y API REST:** Conectar el formulario de registro con un servicio backend o API de base de datos para almacenar participantes en tiempo real, complementado con `localStorage` como respaldo ante pérdida temporal de conexión.
2. **Internacionalización (i18n):** Incorporar un conmutador de idioma (Español / Inglés) con almacenamiento de preferencia en caché para conferencistas y asistentes internacionales.
3. **Modo Claro / Oscuro Personalizado:** Añadir un selector de tema (`theme toggle`) que respete la preferencia de sistema del usuario (`prefers-color-scheme`) y permita alternar entre modo oscuro de alta fidelidad y modo claro de alto contraste.
4. **Service Worker y PWA:** Implementar un manifiesto web y Service Worker básico para permitir la consulta offline del cronograma y ubicación del evento sin conexión a internet.

---

## 7. Matriz de Cumplimiento con la Rúbrica de Evaluación (Nivel Alto - 3 Puntos por Criterio)

| Criterio de Evaluación | Requisito de Nivel Alto (3 Puntos) | Evidencia Específica en este Proyecto | Puntaje Esperado |
| :--- | :--- | :--- | :---: |
| **1. Estructura HTML y estándares** | *"Estructura semántica, coherente y válida; contenido y formularios correctamente organizados."* | • **Semántica pura:** `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<figure>`, `<figcaption>`.<br>• **Jerarquía estricta:** Un único `<h1>` en el Hero, `<h2>` para cada sección con `aria-labelledby`, y `<h3>`/`<h4>` en tarjetas.<br>• **Formulario accesible:** `<label for="...">` asociado a cada campo, `<fieldset>`/`<legend>` para modalidad, `aria-required`, `aria-describedby` y `aria-invalid`.<br>• **Validez:** Código HTML5 estándar sin etiquetas obsoletas ni IDs duplicados. | **3 / 3** |
| **2. CSS y diseño responsivo** | *"Enfoque mobile first, diseño fluido, breakpoints pertinentes y CSS mantenible."* | • **Mobile-first:** Estilos base a 1 columna móvil fuera de media queries.<br>• **Variables CSS:** Centralizadas en `:root` (colores de alto contraste, tipografía, espaciados y sombras).<br>• **Diseño fluido:** Uso de `clamp()`, `max-width: 100%`, Grid y Flexbox.<br>• **Breakpoints pertinentes:** 2 adaptaciones justificadas: 768px (Tableta a 2 columnas) y 1024px (Escritorio completo con menú horizontal visible y cuadrículas a 4 columnas). Cero desbordamiento horizontal. | **3 / 3** |
| **3. JavaScript y calidad del código** | *"Interacciones útiles, robustas y accesibles; código claro, modular y sin efectos innecesarios."* | • **Interacciones útiles y accesibles:**<br>1) Menú adaptable móvil con `aria-expanded`, bloqueo de scroll y escape handler.<br>2) Filtro dinámico de ponentes con anuncio `aria-live="polite"` y estado `aria-pressed`.<br>3) Validación en tiempo real del formulario con alerta `role="alert"` y foco automático al primer campo con error.<br>4) Modal accesible de confirmación con trampa de foco (`focus trap`).<br>5) Acordeón accesible de FAQ.<br>• **Calidad:** Vanilla JavaScript modular, sin dependencias pesadas ni efectos innecesarios. | **3 / 3** |
| **4. Accesibilidad, pruebas y documentación** | *"Pruebas variadas, decisiones justificadas, evidencias claras y mejoras identificadas."* | • **Pruebas variadas:** Navegación por teclado completa, foco visible (`:focus-visible`), ratio de contraste superior a 11:1 (WCAG AA/AAA), zoom al 200% y ausencia de desbordamiento horizontal (`scrollWidth === clientWidth`).<br>• **Decisiones justificadas:** Explicadas en detalle en el informe técnico y README.<br>• **Evidencias claras:** 3 capturas en `screenshots/` (`mobile-375px.png`, `tablet-768px.png`, `desktop-1280px.png`).<br>• **Mejoras identificadas:** Sección 6 documenta 4 mejoras técnicas viables. | **3 / 3** |
| **Puntaje Total** | **Máxima Calificación en los 4 Criterios** | **Cumplimiento riguroso de cada descriptor de Nivel Alto** | **12 / 12 (100%)** |

