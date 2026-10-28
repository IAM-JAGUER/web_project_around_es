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
- TypeScript
- Programación orientada a objetos: clases, encapsulamiento y herencia
- Módulos ES
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
npx tsc
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
│   ├── Card.ts
│   ├── FormValidator.ts
│   ├── Popup.ts
│   ├── PopupWithForm.ts
│   ├── PopupWithImage.ts
│   ├── Section.ts
│   ├── UserInfo.ts
│   └── utils/
│       └── constants.ts
├── tsconfig.json
└── README.md
```

Proyecto académico del programa de desarrollo web de TripleTen.
