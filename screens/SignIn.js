import React, { useState } from "react";
import { TextInput, Button } from "react-native-paper";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Para la navegación
import AsyncStorage from "@react-native-async-storage/async-storage";
import Post from "../model/Post";
import Propiedades from "../config/Propiedades";

// Pantalla de inicio de sesión
const SignIn = () => {
  const [user, setUser] = useState(""); // Nombre de usuario
  const [passwd, setPasswd] = useState(""); // Contraseña
  const navigation = useNavigation(); // Hook para la navegación

  // Metodo para guardar los datos del usuario en la AsyncStorage
  const guardarDatosUsuario = async (user, url, imagen) => {
    try {
      const datos = {
        user,
        url,
        imagen,
      };
      // Se guardan los datos en formato de JSON
      await AsyncStorage.setItem("datosUsuario", JSON.stringify(datos));
      console.log("Datos guardados correctamente");
    } catch (error) {
      console.error("Error al guardar los datos:", error);
    }
  };

  // Metodo para iniciar sesión
  const login = async () => {
    // Se comprueba que los campos no estén vacíos
    if (user === "" || passwd === "") {
      // Se notifica si están vacíos
      Alert.alert("Error", "Los campos no pueden estar vacios");
    } else {
      // Se crea un objeto Post con los datos del usuario
      const post = new Post(
        user,
        passwd,
        null,
        null,
        null,
        null,
        null,
        "LOG_IN"
      );
      // Se convierte el objeto a JSON
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

        //Si la respuesta es un 200, se guarfan los datos del usuario y se redirige a la pantalla de selección
        if (respuesta.status === 200) {
          const resultado = await respuesta.json();
          const { url, imagen } = resultado;

          guardarDatosUsuario(user, url, imagen);

          Alert.alert(
            "Éxito",
            "Aplicación configurada correctamente, no necesitarás volver a iniciar sesión en este dispositivo."
          );

          navigation.replace("Selector");

          // Si la respuesta es un 400, se notifica que los datos son incorrectos
        } else if (respuesta.status === 400) {
          console.warn("Error: Solicitud incorrecta (400)");
          Alert.alert("Error", "El usuario o la contraseña son incorrectos.");
        } else {
          // Si la respuesta es otro código de error, se notifica
          console.error(`Error inesperado: ${respuesta.status}`);
          Alert.alert("Error", `Error desconocido: ${respuesta.status}`);
        }
      } catch (error) {
        // Si hay un error en la petición, se notifica
        console.error("Error en la petición:", error);
        Alert.alert("Error", "No se pudieron enviar los datos.");
      }
    }
  };

  // Se define el diseño de la pantalla
  return (
    // Se crea un contenedor que se ajusta al teclado, para qe se vean bien los campos al escribir
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.fullScreen}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/HodeiBLANCO72.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <View style={styles.formContainer}>
            <TextInput
              mode="outlined"
              label="Usuario"
              left={<TextInput.Icon icon="account" />}
              value={user}
              onChangeText={setUser}
              style={styles.input}
            />
            <TextInput
              mode="outlined"
              label="Contraseña"
              secureTextEntry
              left={<TextInput.Icon icon="lock" />}
              value={passwd}
              onChangeText={setPasswd}
              style={styles.input}
            />
            <TouchableOpacity style={styles.button} onPress={login}>
              <Text style={styles.buttonText}>Iniciar sesión</Text>
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
    marginBottom: 20,
    marginTop: 50,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginVertical: 70,
  },
  formContainer: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    width: "85%",
    elevation: 5,
    marginTop: 100,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#005A9C",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default SignIn;
