import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import { getAuth } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

interface Favorito {
  id: string;
  titulo: string;
  imagen: string;
}

export default function ProfileScreen() {
  const [favoritos, setFavoritos] = useState<Favorito[]>([]);
  const user = getAuth().currentUser;

  useEffect(() => {
    const fetchFavoritos = async () => {
      if (!user) return;

      const favRef = collection(db, 'usuarios', user.uid, 'favoritos');
      const favSnap = await getDocs(favRef);

      const favList: Favorito[] = favSnap.docs.map(doc => ({
        id: doc.id,
        titulo: doc.data().titulo,
        imagen: doc.data().imagen,
      }));

      setFavoritos(favList);
    };

    fetchFavoritos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.email}>Correo del Perfil: {user?.email}</Text>
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
    paddingTop: 16,
    backgroundColor: '#fff',
  },
  email: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  list: {
    paddingHorizontal: 8,
  },
  card: {
    width: '48%',
    margin: '1%',
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 4,
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
});
