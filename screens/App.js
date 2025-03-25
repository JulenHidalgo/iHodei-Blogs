import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack"; // Asegúrate de que esta importación esté correcta
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import SignIn from "./SignIn";
import Selector from "./Selector";
import CrearPost from "./CrearPost";
import Ayuda from "./Ayuda";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Definir el tema global para React Native Paper
const theme = {
  ...DefaultTheme,
  dark: false, // Forzar modo claro
  colors: {
    ...DefaultTheme.colors,
    background: "#FFFFFF", // Fondo blanco
    text: "#000000", // Texto negro
    placeholder: "#666666", // Placeholder gris
    primary: "#005A9C", // Color del borde al enfocar
  },
};

// Función para obtener los datos del usuario desde AsyncStorage
const obtenerDatosUsuario = async () => {
  const datosGuardados = await AsyncStorage.getItem("datosUsuario");

  if (datosGuardados !== null) {
    const datos = JSON.parse(datosGuardados);
    return datos;
  }

  return null;
};

// Crear la pila de navegación
const Stack = createStackNavigator(); // Definir la variable Stack correctamente

// Pantalla de bienvenida (SplashScreen)
const SplashScreen = ({ navigation }) => {
  const [base64Image, setBase64Image] = useState(null);

  useEffect(() => {
    const obtenerImagen = async () => {
      const datos = await obtenerDatosUsuario();
      if (datos?.imagen) {
        // Usar la base64 directamente sin descompresión
        setBase64Image(datos.imagen);
      }
    };

    obtenerImagen();
  }, []);

  useEffect(() => {
    const verificarSesion = async () => {
      try {
        const datos = await obtenerDatosUsuario();
        if (datos) {
          navigation.replace("Selector");
        } else {
          navigation.replace("SignIn");
        }
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
        navigation.replace("SignIn"); // En caso de error, ir a la pantalla de SignIn
      }
    };

    setTimeout(verificarSesion, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      {base64Image ? (
        <Image
          source={{ uri: `data:image/png;base64,${base64Image}` }} // Usar la base64 directamente
          style={styles.logo}
          resizeMode="contain"
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
  );
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <StatusBar hidden={true} />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="Selector" component={Selector} />
          <Stack.Screen name="CrearPost" component={CrearPost} />
          <Stack.Screen name="Ayuda" component={Ayuda} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#044F8B",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
  },
});
