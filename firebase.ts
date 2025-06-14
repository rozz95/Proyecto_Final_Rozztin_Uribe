import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAClqVG0MGDcg9XiDaIKdpzJnJpXxLxruA",
  authDomain: "luckyapp-e843f.firebaseapp.com",
  projectId: "luckyapp-e843f",
  storageBucket: "luckyapp-e843f.appspot.com",
  messagingSenderId: "51191418125",
  appId: "1:51191418125:web:3f1250a6499ade3e793444",
  measurementId: "G-WTF8WLFJLB"
};

// Inicializar Firebase (solo si aún no está inicializado)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

console.log('🔥 Conectando a Firebase Storage Emulator');
connectStorageEmulator(storage, '127.0.0.1', 9199);

export { auth, db, storage };

