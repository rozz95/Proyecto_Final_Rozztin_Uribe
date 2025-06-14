📚 Aplicación de Libros - React Native + Firebase
Aplicación móvil desarrollada en React Native usando Expo, que permite a los usuarios visualizar libros desde una API, iniciar sesión, y guardar libros favoritos en su perfil mediante integración con Firebase.

🚀 Tecnologías Utilizadas
React Native

Expo

Firebase Authentication

Firebase Firestore

Axios

API de Libros

Storage Emulator

📥 Instalación y Configuración
1. Clonar el repositorio
bash
Copiar
Editar
git clone https://github.com/rozz95/Proyecto_Final_Rozztin_Uribe.git
cd Proyecto_Final_Rozztin_Uribe
2. Instalar dependencias
npm install
3. Instalar Firebase
npm install firebase
Emulator
firebase emulator:start
Storage Port 9199

4. Ejecutar la aplicación

npx expo start

🖼️ Descripción de las Vistas
🔐 LoginScreen
Pantalla inicial para iniciar sesión o registrarse con correo y contraseña (Firebase Auth).

Manejo de errores y detección de problemas de conexión a internet.

🏠 HomeScreen
Muestra libros obtenidos desde la API con imagen, título y subtítulo.

Permite agregar libros a la lista personal del usuario.

📖 DetailsScreen
Vista detallada del libro seleccionado con información ampliada.

👤 ProfileScreen
Muestra información del usuario autenticado.

Lista los libros guardados por el usuario.

Foto de Usuario funcion guardar

⚙️ Manejo de Errores
Captura de errores en autenticación, conexión y carga de datos.

Alertas para informar al usuario de fallos en la aplicación o en la red.
