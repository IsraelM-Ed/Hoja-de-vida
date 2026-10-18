# Hoja de vida web

Landing page interactiva de **Israel Mujia Del Castillo**, estudiante de Ingeniería en Sistemas de la Universidad Católica Boliviana “San Pablo”. El sitio presenta su perfil, formación, proyectos, habilidades, idiomas y un formulario de contacto.

## Estructura

```text
tarea2708/
├── index.html
├── assets/
│   └── foto-perfil.jpg
├── css/
│   └── styles.css
└── js/
    └── script.js
```

## Arquitectura y características

- `index.html`: estructura semántica HTML5, navegación accesible y contenido del portafolio.
- `css/styles.css`: tokens de diseño, reset universal, tema claro/oscuro y diseño mobile-first con Flexbox, Grid y breakpoints móvil, tablet (768–1024 px) y escritorio (desde 1025 px).
- `js/script.js`: interacciones del menú responsivo, tema persistente en `localStorage`, filtro inmutable de proyectos, validación del formulario y carga asíncrona de repositorios desde la API REST de GitHub.
- El módulo de GitHub permite consultar hasta tres repositorios públicos de cualquier usuario por su nombre, anuncia sus estados de carga, éxito y error en una región `aria-live` y diferencia respuestas HTTP comunes.
- El formulario valida los campos y muestra el resultado localmente. No transmite ni almacena mensajes porque este proyecto no tiene un servicio backend.
- Imágenes y estilos están alojados localmente; la consulta de GitHub requiere conexión a Internet.

## Ejecución local

No se requieren dependencias ni compilación. Abre `index.html` en un navegador moderno. Si el navegador restringe las solicitudes de red al abrir archivos locales, ejecuta un servidor HTTP estático desde esta carpeta, por ejemplo:

```bash
python -m http.server 8000
```

Después visita `http://localhost:8000`.

## Publicación

Para publicar en GitHub Pages, sube esta carpeta a un repositorio público y configura **Settings → Pages → Deploy from a branch**, seleccionando la rama principal y la carpeta raíz. La URL de producción depende del usuario y del nombre final del repositorio; añádela aquí después de habilitar Pages:

- **Repositorio:** pendiente de publicación.
- **Sitio:** pendiente de despliegue en GitHub Pages.
