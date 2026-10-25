# Around The U.S.

Galería de viajes con un perfil editable. La aplicación permite actualizar el nombre y la
descripción del usuario, agregar tarjetas con nuevos lugares, marcar favoritos, eliminar tarjetas
y ampliar las imágenes en una ventana emergente.

## Funcionalidad

- Edición del perfil mediante un formulario modal.
- Validación de los formularios con los mensajes nativos del navegador.
- Botones de envío deshabilitados mientras haya campos inválidos.
- Mensajes de error debajo de cada campo, con los estilos definidos en el diseño.
- Cierre de las ventanas emergentes con el botón de cierre, al hacer clic fuera del contenido o
  con la tecla `Esc`.
- Galería generada a partir de un `<template>` y un arreglo de tarjetas.
- Acciones para dar "Me gusta", eliminar tarjetas y abrir cada imagen en tamaño ampliado.
- Diseño adaptable a distintas medidas de pantalla.

## Tecnologías

- HTML5
- CSS3 con metodología BEM, Flexbox y Grid
- JavaScript con módulos ES
- Git y GitHub

## Cómo ejecutar

El proyecto utiliza módulos de JavaScript, por lo que debe abrirse desde un servidor local.

```bash
git clone https://github.com/iam-jaguer/web_project_around_es.git
cd web_project_around_es
python3 -m http.server 8000
```

Después, abre `http://localhost:8000` en el navegador. También puedes usar la extensión Live
Server de Visual Studio Code. No requiere instalación de dependencias.

## Estructura

```text
├── index.html
├── pages/
│   └── index.css
├── blocks/
│   ├── card.css
│   ├── cards.css
│   ├── content.css
│   ├── footer.css
│   ├── header.css
│   ├── page.css
│   ├── popup.css
│   └── profile.css
├── scripts/
│   ├── index.js
│   └── validate.js
├── images/
└── vendor/
```

Proyecto académico del programa de desarrollo web de TripleTen.
