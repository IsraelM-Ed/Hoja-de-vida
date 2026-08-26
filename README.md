# Hoja de Vida Web

Página web personal de **Israel Mujia Del Castillo**, estudiante de Ingeniería en Sistemas de la Universidad Católica Boliviana "San Pablo".

El proyecto está elaborado con HTML5 semántico y presenta información personal, formación académica, experiencia en proyectos, habilidades, idiomas y un formulario de contacto.

## Estructura del proyecto

```text
tarea2708/
├── index1.html          # Página principal de la hoja de vida
├── README.md            # Documentación del proyecto
├── assets/              # Imágenes y archivos multimedia
│   ├── images/          # Fotografías y capturas de proyectos
│   ├── video/           # Videos demostrativos
│   ├── audio/           # Audios o presentaciones grabadas
│   └── docs/            # Certificados, CV u otros documentos
├── css/                 # Hojas de estilo
└── js/                  # Scripts JavaScript
```

## Secciones de la página

- **Perfil profesional:** presentación, fortalezas y objetivo profesional.
- **Formación académica:** estudios universitarios y escolares.
- **Experiencia y proyectos:** participación en Welcome to Terrifier, Stargazers y su adaptación web.
- **Habilidades técnicas:** lenguajes, herramientas y habilidades profesionales.
- **Cursos y certificaciones:** información sobre cursos y certificados.
- **Idiomas:** tabla con los niveles de dominio.
- **Proyectos destacados:** descripción resumida de los principales proyectos.
- **Contacto:** formulario para enviar datos y mensajes.

## Organización de imágenes y multimedia

Los archivos multimedia deben guardarse dentro de `assets`, separados por tipo:

```text
assets/
├── images/
│   ├── foto-perfil.jpg
│   ├── terrifier.png
│   └── stargazers.png
├── video/
│   └── demostracion.mp4
├── audio/
│   └── presentacion.mp3
└── docs/
    └── certificado.pdf
```

### Imagen de perfil

La imagen de perfil se coloca en el encabezado de `index1.html` usando una ruta relativa:

```html
<img src="assets/images/foto-perfil.jpg"
     alt="Fotografía profesional de Israel Mujia Del Castillo"
     width="200"
     height="200">
```

Las rutas relativas son recomendables porque funcionan aunque el proyecto se copie a otra computadora. No se deben utilizar rutas absolutas como `C:\Trabajos Uni\...`.

### Imágenes de proyectos

Las capturas de pantalla pueden agregarse dentro de los artículos de **Experiencia y proyectos** o **Proyectos destacados**:

```html
<figure>
    <img src="assets/images/terrifier.png"
         alt="Captura del videojuego Welcome to Terrifier"
         width="500">
    <figcaption>Captura del proyecto Welcome to Terrifier.</figcaption>
</figure>
```

### Video

Los videos demostrativos pueden incorporarse dentro del artículo del proyecto correspondiente:

```html
<video controls width="500">
    <source src="assets/video/demostracion.mp4" type="video/mp4">
    Tu navegador no admite videos.
</video>
```

### Audio

Los audios, narraciones o presentaciones pueden agregarse en la sección de proyectos o en una sección multimedia nueva:

```html
<audio controls>
    <source src="assets/audio/presentacion.mp3" type="audio/mpeg">
    Tu navegador no admite audio.
</audio>
```

### Documentos

Los certificados o documentos pueden enlazarse desde **Cursos y certificaciones**:

```html
<a href="assets/docs/certificado.pdf" target="_blank" rel="noopener">
    Ver certificado
</a>
```

## Cómo visualizar el proyecto

1. Abre `index1.html` en un navegador moderno.
2. También puedes abrir la carpeta con VS Code y utilizar una extensión como **Live Server**.
3. Comprueba que los archivos multimedia estén dentro de `assets` y que sus nombres coincidan exactamente con las rutas del HTML.

No se requieren dependencias externas ni un proceso de compilación.

## Tecnologías utilizadas

- HTML5 semántico
- Formularios HTML5
- Elementos multimedia nativos: `img`, `audio` y `video`
- Accesibilidad básica mediante textos alternativos, etiquetas y navegación interna
