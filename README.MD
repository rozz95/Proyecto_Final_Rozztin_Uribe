📚 Aplicación de Libros - React Native + Firebase
Aplicación móvil desarrollada en React Native usando Expo, que permite a los usuarios visualizar libros desde una API, iniciar sesión, y guardar libros favoritos en su perfil mediante integración con Firebase.

🚀 Tecnologías Utilizadas
React Native

Expo

Firebase Authentication

Firebase Firestore

Axios

API de Libros

📥 Instalación y Configuración
1. Clonar el repositorio
bash
Copiar
Editar
git clone https://github.com/rozz95/Proyecto_Final_Rozztin_Uribe.git
cd Proyecto_Final_Rozztin_Uribe
2. Instalar dependencias
bash
Copiar
Editar
npm install
3. Instalar Firebase
bash
Copiar
Editar
npm install firebase
Asegúrate de configurar tu proyecto en Firebase y actualizar el archivo firebase.ts con las credenciales correspondientes.

4. Ejecutar la aplicación
bash
Copiar
Editar
npx expo start
🧭 Estructura del Proyecto
bash
Copiar
Editar
.
├── components/
│   └── BookCard.tsx         # Componente para mostrar libros
├── screens/
│   ├── DetailsScreen.tsx    # Vista de detalles del libro
│   ├── HomeScreen.tsx       # Vista principal con lista de libros
│   ├── LoginScreen.tsx      # Pantalla de login y registro
│   └── ProfileScreen.tsx    # Perfil del usuario con lista de libros guardados
├── services/
│   ├── api.ts               # Servicios para consumir API de libros
│   └── firebase.ts          # Configuración y servicios Firebase
├── types.ts                 # Tipos e interfaces del proyecto
└── App.tsx                  # Entrada principal de la app
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

⚙️ Manejo de Errores
Captura de errores en autenticación, conexión y carga de datos.

Alertas para informar al usuario de fallos en la aplicación o en la red.
