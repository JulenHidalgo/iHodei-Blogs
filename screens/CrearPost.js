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

// Pantalla para crear un post
const CrearPost = ({ route }) => {
  const [contenido, setContenido] = useState(""); // Contenido sobre el que se va a crear el post, el enlace o la pregunta
  const [base64Image, setBase64Image] = useState(null); // Imagen del usuario
  const navigation = useNavigation(); // Hook para la navegación
  const [categorias, setCategorias] = useState([]); // Categorías guardadas en el blog
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null); // Categoría seleccionada
  const [menuVisible, setMenuVisible] = useState(false); // Boolean para saber si se está mostrando el menú modal de categorias
  const [inputCategoria, setInputCategoria] = useState(""); // Input para la categoría
  const { origen } = route.params || {}; // Origen del post, si es para crear desde URL o una pregunta
  const [urlWeb, setUrlWeb] = useState(""); // URL de la web del usuario
  const [user, setUser] = useState(""); // Nombre de usuario

  useEffect(() => {
    // Se obtienen los datos del usuario guardados en la AsyncStorage y se guardan en sus respectivas variables
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
    // Solo se obtienen las categorías si urlWeb tiene información, se espera a que se reciba la informacion de la AsyncStorage
    // para prevenir errores
    if (urlWeb) {
      obtenerCategorias();
    }
  }, [urlWeb]);

  // Se obtienen los datos del usuario guardados en la AsyncStorage
  const obtenerDatosUsuario = async () => {
    const datosGuardados = await AsyncStorage.getItem("datosUsuario");

    if (datosGuardados !== null) {
      const datos = JSON.parse(datosGuardados);
      return datos;
    }

    return null;
  };

  // Método para manejar el cambio de la categoría
  const manejarCambioCategoria = (texto) => {
    setInputCategoria(texto);
    setCategoriaSeleccionada(new Categoria(null, texto));
  };

  // Método para seleccionar una categoría
  const seleccionarCategoria = (categoria) => {
    setCategoriaSeleccionada(categoria);
    setInputCategoria(categoria.name);
    setMenuVisible(false);
  };

  // Método para obtener las categorías del blog
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

      // Verifica que `datos` es un array y extrae únicamente `id` y `name` de cada elemento
      if (Array.isArray(datos)) {
        const categoriasRecibidas = datos.map((item) => ({
          id: item.id,
          name: item.name,
        }));

        // Guardar las categorías en la variable Categorias
        setCategorias(categoriasRecibidas);
      } else {
        console.error("Error: La estructura de datos no es un array.");
      }
    } catch (error) {
      // Si sucede algún error, se muestra en consola
      console.error("Error al obtener categorías:", error);
      Alert.alert(
        "Error",
        "No se pudieron obtener las categorías, intenta cerrar y abrir de nuevo la aplicación."
      );
    }
  };

  // Método para crear un post
  const crearPost = async () => {
    // Si la categoría no existe, se crea una nueva
    const nuevaCategoria =
      categorias.find((c) => c.id === categoriaSeleccionada?.id) ||
      new Categoria(null, inputCategoria);

    // Se comprueba que los campos no estén vacíos
    if (categoriaSeleccionada.name === "" || contenido === "") {
      Alert.alert("Error", "Los dos campos tienen que contener información.");
    } else {
      // Se crea un objeto Post con los datos del usuario
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
      // Se añade el contenido del post dependiendo de el origen, si es una URL o una pregunta
      if (origen === "url") {
        post.url_post = contenido;
      } else {
        post.pregunta = contenido;
      }

      const jsonString = JSON.stringify(post);
      try {
        // Se realiza la petición POST a el webhook de Make
        const respuesta = await fetch(Propiedades.URL_MAKE, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: jsonString,
        });

        // Si la respuesta no es un 200, se muestra un error
        if (!respuesta.ok) {
          throw new Error(`Error en la petición: ${respuesta.status}`);
        }
        // Si todo ha ido correctamente se notifica al usuario y se le redirige a la pantalla de selección
        const resultado = await respuesta.text();
        Alert.alert(
          "Éxito",
          "El post se ha creado correctamente, puedes verlo en tu web."
        );
        navigation.navigate("Selector");
      } catch (error) {
        // Si sucede cualquier error se notifica al usuario
        console.error("Error al enviar los datos:", error);
        Alert.alert(
          "Error",
          "No se pudieron enviar los datos, intentalo más tarde."
        );
      }
    }
  };

  // Estructura de la pantalla
  return (
    <KeyboardAvoidingView
      // Se ajusta el teclado para que no tape los campos de texto
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.fullScreen}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          // Si se pulsa fuera de los campos de texto, se cierra el teclado
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.logoContainer}>
            {base64Image ? (
              // Si se encuentra la base64 en AsyncStorage, se carga la imagen personalizada
              <Image
                source={{ uri: `data:image/png;base64,${base64Image}` }}
                style={styles.logo}
              />
            ) : (
              // Si no se encuentra la base64 en AsyncStorage, se carga la imagen por defecto desde assets
              <Image
                source={require("../assets/HodeiBLANCO72.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            )}
          </View>
          <View style={styles.formContainer}>
            <TextInput
              mode="outlined"
              // Se customiza la ventana en base a el origen, si se quiere desde url o pregunta
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
                onPress={() => setMenuVisible(true)}
              />
            </View>

            <Modal visible={menuVisible} transparent animationType="fade">
              <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                  <FlatList
                    data={categorias}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.optionItem}
                        onPress={() => seleccionarCategoria(item)}
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
                    onPress={() => setMenuVisible(false)}
                  >
                    <Text style={styles.closeButtonText}>Cerrar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <TouchableOpacity style={styles.button} onPress={crearPost}>
              <Text style={styles.buttonText}>CREAR POST</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

// Estilos de la pantalla
const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#044F8B",
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
