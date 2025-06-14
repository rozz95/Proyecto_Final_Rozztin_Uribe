import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Button } from 'react-native';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface Favorito {
  id: string;
  titulo: string;
  imagen: string;
}

export default function ProfileScreen() {
  const [fotoPerfil, setFotoPerfil] = useState<string | null>(null);
  const [favoritos, setFavoritos] = useState<Favorito[]>([]);
  const user = getAuth().currentUser;

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        // Obtener favoritos
        const favRef = collection(db, 'usuarios', user.uid, 'favoritos');
        const favSnap = await getDocs(favRef);
        const favList: Favorito[] = favSnap.docs.map(doc => ({
          id: doc.id,
          titulo: doc.data().titulo,
          imagen: doc.data().imagen,
        }));
        setFavoritos(favList);

        // Obtener foto de perfil
        const userDocRef = doc(db, 'usuarios', user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const data = userDocSnap.data();
          setFotoPerfil(data?.fotoPerfil ?? null);
        }
      } catch (error) {
        console.error('Error cargando datos de usuario:', error);
      }
    };

    fetchData();
  }, [user]);

  const pickAndUploadImage = async () => {
    if (!user) {
      alert('Usuario no autenticado');
      return;
    }

    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Se requieren permisos para acceder a la galería.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        alert('No se seleccionó ninguna imagen.');
        return;
      }

      const uri = result.assets[0].uri;
      const response = await fetch(uri);
      const blob = await response.blob();

      const storageRef = ref(storage, `profilePictures/${user.uid}.jpg`);
      await uploadBytes(storageRef, blob);

      const downloadURL = await getDownloadURL(storageRef);
      setFotoPerfil(downloadURL);

      const userDoc = doc(db, 'usuarios', user.uid);
      await setDoc(userDoc, { fotoPerfil: downloadURL }, { merge: true });

      alert('✅ Imagen subida y guardada con éxito');
    } catch (error) {
      console.error('❌ Error al subir la imagen:', error);
      alert('Error al subir la imagen:\n' + JSON.stringify(error));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.email}>Correo del Perfil: {user?.email}</Text>

      {fotoPerfil ? (
        <Image
          source={{ uri: fotoPerfil }}
          style={styles.profileImage}
        />
      ) : (
        <View style={[styles.profileImage, styles.placeholder]}>
          <Text style={styles.placeholderText}>Sin foto</Text>
        </View>
      )}

      <Button title="Subir foto de perfil" onPress={pickAndUploadImage} />

      <FlatList
        data={favoritos}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imagen }} style={styles.image} />
            <Text style={styles.title}>{item.titulo}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hay favoritos guardados.</Text>}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  email: {
    fontSize: 16,
    marginBottom: 12,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 16,
  },
  placeholder: {
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#666',
  },
  card: {
    flex: 1,
    margin: 8,
    alignItems: 'center',
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 12,
  },
  title: {
    marginTop: 8,
    fontSize: 14,
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#999',
  },
  list: {
    paddingBottom: 20,
  },
});
