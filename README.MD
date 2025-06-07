Herramientas

*React Native
*Expo
*Firebase
*Api Libros
*FireStore
*axios 

Descripcion

La aplicacion consiste de 4 vistas 

DetailsScreen.tsx
HomeScreen.tsx
LoginScreen.tsx
ProfileScreen.tsx

Componentes

BookCard.tsx

Interfaz Api

types.ts

Servicio para DB y Api

firebase.ts
api.ts

Estos Documentos son los que se realizaron para el estructurar el proyecto, el login es la primera vista
que tiene un llenado de correo y contraseña para registrar o iniciar sesion

La vista Home tiene los libros de la api con una imagen titulo y subtitulo, con una funcion para agregar libros a una lista de perfil

La vista Details, da un pantallazo mas grande a un libro seleccionado

La vista Profile muestra el usuario logueado y una lista de los libros que el usuario agrego previamente.

Navegabilidad 

Usando la aplicacion tiene captura de errores, para advertir la falla o el error, asi mismo para la conexion de internet
tenemos codigo que captura ese error en el login.