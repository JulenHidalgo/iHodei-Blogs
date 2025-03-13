import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";
import SignIn from "./SignIn";
import Selector from "./Selector";
import CrearPost from "./CrearPost";
import Ayuda from "./Ayuda";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Se comprueba si hay datos guardados en la AsyncStore
const obtenerDatosUsuario = async () => {
  const datosGuardados = await AsyncStorage.getItem("datosUsuario");

  // Si hay datos significa que ya está registrado el usuario
  if (datosGuardados !== null) {
    const datos = JSON.parse(datosGuardados);
    return datos;
  }

  // Si no está registrado tiene que iniciar sesión
  return null;
};

// Crear la pila de navegación
const Stack = createStackNavigator();

// Se crea la pantalla de "carga" que se ejecuta drante tres segundos al iniciar la app
const SplashScreen = ({ navigation }) => {
  const [base64Image, setBase64Image] = useState(null);

  useEffect(() => {
    // Si el dispositivo ya está registrado se utiliza su imagen
    const obtenerImagen = async () => {
      const datos = await obtenerDatosUsuario();
      if (datos?.imagen) {
        setBase64Image(datos.imagen);
      }
    };

    obtenerImagen();
  }, []);

  useEffect(() => {
    // Si ya está registrado, se le llevara directamente al Selector de opciones, si no, se le pedirá que se registre
    const verificarSesion = async () => {
      try {
        const datos = await obtenerDatosUsuario();
        if (datos) {
          navigation.replace("Selector");
        } else {
          navigation.replace("SignIn");
        }
      } catch (error) {
        //En caso de cualquier error, se le redirige a la ventana de inicio de sesión
        navigation.replace("SignIn");
      }
    };

    // Durante tres segundos aparece la SplashScreen
    setTimeout(verificarSesion, 3000);
  }, []);

  // Se define el diseño de la ventana
  return (
    <View style={styles.container}>
      {base64Image ? (
        // Si se encuentra la imagen en AsyncStorage, se carga la imagen personalizada
        <Image
          source={{ uri: `data:image/png;base64,${base64Image}` }}
          style={styles.logo}
          resizeMode="contain"
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
  );
};

// Se define la función principal de la aplicación, que contiene la pila de navegación
export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
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

// Se le asigna el estilo a la ventana
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
