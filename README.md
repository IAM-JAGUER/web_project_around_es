# Around The U.S.

Galería de viajes conectada a una API. La aplicación permite consultar y editar el perfil, cambiar
la foto de perfil, agregar tarjetas con nuevos lugares, marcar favoritos, eliminar tarjetas propias
y ampliar las imágenes en una ventana emergente.

## Funcionalidad

- Carga inicial del perfil y de las tarjetas desde la API con `Promise.all`.
- Edición del nombre, la descripción y la foto de perfil.
- Validación de los formularios con los mensajes nativos del navegador.
- Botones de envío deshabilitados mientras haya campos inválidos.
- Mensajes de error debajo de cada campo, con los estilos definidos en el diseño.
- Texto "Guardando..." en los botones mientras se envían los formularios.
- Cierre de las ventanas emergentes con el botón de cierre, al hacer clic fuera del contenido o
  con la tecla `Esc`.
- Galería generada a partir de un `<template>` y de las tarjetas recibidas del servidor.
- Acciones para dar "Me gusta", eliminar tarjetas y abrir cada imagen en tamaño ampliado.
- Confirmación antes de eliminar una tarjeta y papelera visible solo en las tarjetas propias.
- Diseño adaptable a distintas medidas de pantalla.

## Tecnologías

- HTML5
- CSS3 con metodología BEM, Flexbox y Grid
- TypeScript
- Programación orientada a objetos: clases, encapsulamiento y herencia
- Módulos ES
- Fetch API, REST y `async`/`await`
- Git y GitHub

## Cómo ejecutar

El proyecto compilado se encuentra en la carpeta `public`, por lo que debe abrirse desde un
servidor local:

```bash
git clone https://github.com/iam-jaguer/web_project_around_es.git
cd web_project_around_es
python3 -m http.server 8000 --directory public
```

Después, abre `http://localhost:8000` en el navegador. También puedes usar la extensión Live
Server de Visual Studio Code.

Para compilar los archivos de `src` después de modificarlos, ejecuta:

```bash
npx --yes -p typescript@5 tsc
```

## Estructura

```text
├── public/
│   ├── index.html
│   ├── index.js
│   ├── blocks/
│   ├── images/
│   ├── pages/
│   └── vendor/
├── src/
│   ├── index.ts
│   ├── components/
│   │   ├── Api.ts
│   │   ├── Card.ts
│   │   ├── FormValidator.ts
│   │   ├── Popup.ts
│   │   ├── PopupWithConfirmation.ts
│   │   ├── PopupWithForm.ts
│   │   ├── PopupWithImage.ts
│   │   ├── Section.ts
│   │   └── UserInfo.ts
│   └── utils/
│       └── constants.ts
├── tsconfig.json
└── README.md
```

Proyecto académico del programa de desarrollo web de TripleTen.
