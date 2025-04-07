import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Alert,
} from "react-native";
import { TextInput, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Categoria from "../model/Categoria";
import Post from "../model/Post";
import Propiedades from "../config/Propiedades";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CrearPost = ({ route }) => {
  const [contenido, setContenido] = useState("");
  const [base64Image, setBase64Image] = useState(null);
  const navigation = useNavigation();
  const [categorias, setCategorias] = useState([]); // Estado para almacenar las categorías
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [inputCategoria, setInputCategoria] = useState("");
  const { origen } = route.params || {};
  const [urlWeb, setUrlWeb] = useState("");
  const [user, setUser] = useState("");
  const [creando, setCreando] = useState(false);

  useEffect(() => {
    const obtenerInfo = async () => {
      try {
        const datos = await obtenerDatosUsuario();
        if (datos?.imagen) setBase64Image(datos.imagen);
        if (datos?.url) {
          setUrlWeb(datos.url);
        }
        if (datos?.user) {
          setUser(datos.user);
        }
      } catch (error) {
        console.error("Error obteniendo datos del usuario:", error);
      }
    };

    obtenerInfo();
  }, []);

  useEffect(() => {
    if (urlWeb) {
      obtenerCategorias();
    }
  }, [urlWeb]);

  const obtenerDatosUsuario = async () => {
    const datosGuardados = await AsyncStorage.getItem("datosUsuario");

    if (datosGuardados !== null) {
      const datos = JSON.parse(datosGuardados);
      return datos;
    }

    return null;
  };

  const manejarCambioCategoria = (texto) => {
    setInputCategoria(texto);
    setCategoriaSeleccionada(new Categoria(null, texto));
  };

  const seleccionarCategoria = (categoria) => {
    setCategoriaSeleccionada(categoria);
    setInputCategoria(categoria.name); // Mostrar el nombre en el campo de entrada
    setMenuVisible(false);
  };

  const obtenerCategorias = async () => {
    try {
      const post = new Post(
        null,
        null,
        urlWeb,
        null,
        null,
        null,
        null,
        "GET_CATEGORIAS"
      );
      const jsonString = JSON.stringify(post);
      const respuesta = await fetch(Propiedades.URL_MAKE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonString,
      });

      if (!respuesta.ok) {
        throw new Error(`Error en la petición: ${respuesta.status}`);
      }

      const datos = await respuesta.json();

      // 🔹 Verifica que `datos` es un array y extrae `id` y `name`
      if (Array.isArray(datos)) {
        const categoriasRecibidas = datos.map((item) => ({
          id: item.id,
          name: item.name,
        }));

        // 🔹 Guardar las categorías en el estado
        setCategorias(categoriasRecibidas);
      } else {
        console.error("Error: La estructura de datos no es un array.");
      }
    } catch (error) {
      console.error("Error al obtener categorías:", error);
      Alert.alert(
        "Error",
        "No se pudieron obtener las categorías, intentalo más tarde."
      );
      navigation.navigate("Selector");
    }
  };

  const crearPost = async () => {
    const nuevaCategoria =
      categorias.find((c) => c.id === categoriaSeleccionada?.id) ||
      new Categoria(null, inputCategoria);

    if (categoriaSeleccionada.name === "" || contenido === "") {
      Alert.alert("Error", "Los dos campos tienen que contener información.");
    } else {
      setCreando(true); // ⬅️ Activamos el estado de carga

      const post = new Post(
        user,
        null,
        urlWeb,
        null,
        null,
        categoriaSeleccionada?.id,
        categoriaSeleccionada?.name,
        "CREATE_POST"
      );

      if (origen === "url") {
        post.url_post = contenido;
      } else {
        post.pregunta = contenido;
      }

      const jsonString = JSON.stringify(post);
      try {
        const respuesta = await fetch(Propiedades.URL_MAKE, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: jsonString,
        });

        if (!respuesta.ok) {
          throw new Error(`Error en la petición: ${respuesta.status}`);
        }

        const resultado = await respuesta.text();
        Alert.alert(
          "Éxito",
          "El post se ha creado correctamente, puedes verlo en tu web."
        );
        navigation.navigate("Selector");
      } catch (error) {
        console.error("Error al enviar los datos:", error);
        Alert.alert(
          "Error",
          "No se pudieron enviar los datos, intentalo más tarde."
        );
      } finally {
        setCreando(false); // ⬅️ Se desactiva el estado de carga
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "position"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -100}
      style={styles.fullScreen}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.logoContainer}>
            {base64Image ? (
              <Image
                source={{ uri: `data:image/png;base64,${base64Image}` }} // Usamos la base64 correctamente
                style={styles.logo}
              />
            ) : (
              // Si no se encuentra la base64 en AsyncStorage, se carga la imagen por defecto desde assets
              <Image
                source={require("../assets/HodeiBLANCO72.png")} // Ruta de la imagen por defecto
                style={styles.logo}
                resizeMode="contain"
              />
            )}
          </View>
          <View style={styles.formContainer}>
            <TextInput
              mode="outlined"
              label={origen === "url" ? "Enlace" : "Pregunta"}
              keyboardType={origen === "url" ? "url" : "default"}
              value={contenido}
              onChangeText={setContenido}
              style={styles.input}
            />
            <View style={styles.inputContainer}>
              <TextInput
                mode="flat"
                placeholder="Categoría"
                value={inputCategoria}
                onChangeText={manejarCambioCategoria}
                style={styles.inputCategoria}
              />
              <IconButton
                icon="chevron-down"
                size={24}
                onPress={() => setMenuVisible(true)} // Al hacer clic, se muestra el modal
              />
            </View>

            {/* Modal con las categorías */}
            <Modal visible={menuVisible} transparent animationType="fade">
              <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                  <FlatList
                    data={categorias}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.optionItem}
                        onPress={() => seleccionarCategoria(item)} // Al seleccionar una categoría, se cierra el modal
                      >
                        <Text
                          style={[styles.optionText, { textAlign: "center" }]}
                        >
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setMenuVisible(false)} // Cerrar el modal
                  >
                    <Text style={styles.closeButtonText}>Cerrar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <TouchableOpacity
              style={[styles.button, creando && { backgroundColor: "#ccc" }]}
              onPress={crearPost}
              disabled={creando}
            >
              <Text style={styles.buttonText}>
                {creando ? "Creando post..." : "CREAR POST"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#044F8B",
    paddingTop: 20,
  },
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 20,
    backgroundColor: "#044F8B",
  },
  logoContainer: {
    alignItems: "center",
    marginVertical: 75,
  },
  logo: {
    width: 200,
    height: 200,
  },
  formContainer: {
    width: "85%",
    marginTop: 100,
  },
  input: {
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    borderRadius: 5,
    marginVertical: 20,
  },
  inputCategoria: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "60%",
    maxHeight: "50%",
    alignContent: "center",
  },
  optionItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    width: "100%",
    borderBottomColor: "#ddd",
  },
  optionText: {
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 10,
  },
  closeButton: {
    backgroundColor: "#005A9C",
    borderRadius: 30,
    alignItems: "center",
    marginTop: 15,
    paddingVertical: 10,
    width: "80%",
    justifyContent: "center",
  },
  closeButtonText: {
    color: "#D7E7FA",
    fontWeight: "bold",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#D7E7FA",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 50,
  },
  buttonText: {
    color: "#044F8B",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default CrearPost;
