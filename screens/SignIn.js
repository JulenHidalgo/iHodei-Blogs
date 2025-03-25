import React, { useState } from "react";
import { TextInput } from "react-native-paper";
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

const SignIn = () => {
  const [user, setUser] = useState("");
  const [passwd, setPasswd] = useState("");

  const navigation = useNavigation(); // Hook para manejar la navegación

  const guardarDatosUsuario = async (user, url, imagen) => {
    try {
      const datos = { user, url, imagen };
      await AsyncStorage.setItem("datosUsuario", JSON.stringify(datos));
      console.log("Datos guardados correctamente");
    } catch (error) {
      console.error("Error al guardar los datos:", error);
    }
  };

  const login = async () => {
    if (user === "" || passwd === "") {
      Alert.alert("Error", "Los campos no pueden estar vacíos");
    } else {
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

      const jsonString = JSON.stringify(post);
      try {
        const respuesta = await fetch(Propiedades.URL_MAKE, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: jsonString,
        });

        if (respuesta.status === 200) {
          const resultado = await respuesta.json();
          const { url, imagen } = resultado;

          guardarDatosUsuario(user, url, imagen);

          Alert.alert(
            "Éxito",
            "Aplicación configurada correctamente, no necesitarás volver a iniciar sesión en este dispositivo."
          );

          navigation.replace("Selector");
        } else if (respuesta.status === 400) {
          console.warn("Error: Solicitud incorrecta (400)");
          Alert.alert("Error", "El usuario o la contraseña son incorrectos.");
        } else {
          console.error(`Error inesperado: ${respuesta.status}`);
          Alert.alert("Error", `Error desconocido: ${respuesta.status}`);
        }
      } catch (error) {
        console.error("Error en la petición:", error);
        Alert.alert("Error", "No se pudieron enviar los datos.");
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
            <Image
              source={require("../assets/HodeiBLANCO72.png")} // Ruta de la imagen por defecto
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
