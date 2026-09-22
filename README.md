# Around The U.S. (Alrededor de los EE. UU.)

Red social de perfil con galería de fotos de lugares de los Estados Unidos. El usuario puede
editar su perfil (nombre y descripción), agregar nuevas tarjetas y ampliar las imágenes desde
ventanas emergentes. Desarrollado con JavaScript puro, sin librerías ni frameworks.

## ✨ Funcionalidad

- Edición del perfil: nombre y "Acerca de mí" se actualizan en vivo mediante un modal.
- Ventanas emergentes (modales) reutilizables y rellenadas con los datos actuales del usuario.
- Galería de tarjetas generada a partir de un `<template>` HTML y un array de datos.
- Agregar nuevas tarjetas desde el modal "Nuevo lugar" (aparecen como primer elemento).
- Botones "Me gusta" (♥) que cambian de color al hacer clic y botón de eliminación de tarjetas.
- Ampliación de imágenes: al hacer clic en una foto se abre un modal con la imagen y su título.
- Código orientado a funciones de propósito único y manipulación del DOM con `textContent`
  (sin `innerHTML`, previniendo la inyección de datos no seguros).

## 🛠 Stack

| Tecnología | Uso |
| --- | --- |
| **HTML5** | Estructura semántica y accesible (ARIA en botones) |
| **CSS3** | Diseño responsive, metodología **BEM** (`blocks/`), Flexbox |
| **JavaScript (ES6)** | Manipulación del DOM, eventos, arrays (`forEach`, objetos) |
| **Git / GitHub** | Control de versiones y despliegue |

## 🧠 Habilidades demostradas

- Manejo del DOM: `querySelector`, `classList`, `textContent`, `value`.
- Eventos: `click` y `submit` con `addEventListener` y `preventDefault`.
- Funciones reutilizables de una sola responsabilidad (`openModal`, `closeModal`).
- Estilo de código limpio: `camelCase`, nombres descriptivos y constantes `const`.
- Arquitectura escalable con CSS modular por bloques (`block/block__element_modifier`).

## 🚀 Cómo ejecutar

```bash
# Clona el repositorio
git clone https://github.com/iam-jaguer/web_project_around_es.git

# Abre el proyecto
cd web_project_around_es
```

Abre `index.html` en tu navegador (idealmente con [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
de VS Code para live preview). No requiere instalación de dependencias.

## 🗂 Estructura del proyecto

```
├── index.html          # Estructura de la página y modales
├── pages/index.css     # Hoja principal (imports de bloques)
├── blocks/             # Estilos BEM por bloque (profile, cards, popup…)
├── scripts/index.js    # Lógica: datos, modales y envío del formulario
├── images/             # Recursos visuales
└── vendor/             # Normalize.css y tipografías

---

*Proyecto desarrollado como parte del programa de desarrollo web de TripleTen.*