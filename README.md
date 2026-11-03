# Prototipo · Tú eres UNACEM Ecuador

Estructura
- `index.html`  página y contenedores
- `css/styles.css`  estilos y colores (tema claro/oscuro)
- `js/data.js`  roles, rutas de botones, pestañas y recorridos (aquí se edita casi todo)
- `js/app.js`  lógica de navegación
- `screens/*.html`  una pantalla por archivo (390×844 para teléfono, 1100 de ancho para el panel web)

Cómo abrirlo en tu computador
Las pantallas se cargan con `fetch`, así que no funciona con doble clic. Desde esta carpeta:

    python3 -m http.server 8000

y abre http://localhost:8000

Cómo modificar
- Cambiar un texto o diseño: edita el archivo en `screens/`.
- Cambiar a dónde lleva un botón: edita `routes` en `js/data.js` (la clave es el texto del botón).
- Agregar una pantalla: crea `screens/Nombre.html`, agrégala a `screens` y `names` en `data.js`.
- Agregar un recorrido: añade un objeto a `tours` en `data.js`.
- Colores de marca: `--brand` en `css/styles.css`.
