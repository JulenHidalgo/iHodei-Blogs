import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Post from "../model/Post";
import config from "../config/propiedades.json";

const API_URL = config.URL_MAKE; // URL del Webhook

const BuscarBlogs = () => {
  const [posts, setPosts] = useState([]); // Estado para almacenar los posts
  const [search, setSearch] = useState(""); // Estado para la búsqueda
  const [loading, setLoading] = useState(true); // Estado para mostrar el loader

  // 🔹 useEffect para obtener datos al cargar la pantalla
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ method: "GET" }), // Enviamos la petición en formato JSON
        });

        const data = await response.json(); // Convertimos la respuesta en JSON
        console.log("Datos recibidos:", data); // Ver datos en la consola

        // Mapeamos los datos para crear objetos de la clase Post
        const postsList = data.map(
          (item) =>
            new Post(
              item.id,
              item.titulo,
              item.contenido,
              Base64Decoder.decode(item.imagen), // Descodificar imagen Base64
              item.keyWords,
              item.urlEnlace
            )
        );

        setPosts(postsList); // Guardamos los posts en el estado
        setLoading(false); // Ocultamos el loader
      } catch (error) {
        console.error("Error al recibir los posts:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // 🔹 Filtrar blogs según el texto ingresado en la barra de búsqueda
  const filteredPosts = posts.filter((post) =>
    post.titulo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Encabezado con el logo */}
      <View style={styles.header}>
        <Image
          source={require("../assets/logoA1.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Barra de búsqueda */}
      <TextInput
        style={styles.searchBar}
        placeholder="Filtrar por titular"
        value={search}
        onChangeText={setSearch}
      />

      {/* Cargando datos */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : (
        <FlatList
          data={filteredPosts}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2} // Mostrar en cuadrícula
          renderItem={({ item }) => (
            <View style={styles.blogCard}>
              <TouchableOpacity
                style={styles.blogCard}
                onPress={() => navigation.navigate("Detalles", { id: item.id })}
              ></TouchableOpacity>
              {/* 🔹 Convertir Base64 a imagen con la clase Base64Decoder */}
              <Image source={{ uri: item.imagen }} style={styles.blogImage} />
              <Text style={styles.blogTitle}>{item.titulo}</Text>
            </View>
          )}
        />
      )}

      {/* Menú de navegación inferior */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="person-circle-outline" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="create-outline" size={28} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// 🔹 Estilos
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  logo: { width: 120, height: 50 },
  searchBar: {
    margin: 15,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f1f1f1",
  },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  blogCard: {
    flex: 1,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  blogImage: { width: 150, height: 150, borderRadius: 10 },
  blogTitle: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  navButton: { padding: 10 },
});

export default BuscarBlogs;
