import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  Linking,
  Alert,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons"; // Importar iconos de Expo

const Selector = () => {
  const navigation = useNavigation();
  const [base64Image, setBase64Image] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false); // Estado para mostrar el menú

  useEffect(() => {
    const obtenerImagen = async () => {
      const datos = await obtenerDatosUsuario();
      if (datos?.imagen) {
        setBase64Image(datos.imagen);
      }
    };

    obtenerImagen();
  }, []);

  const obtenerDatosUsuario = async () => {
    try {
      const datosGuardados = await AsyncStorage.getItem("datosUsuario");
      return datosGuardados ? JSON.parse(datosGuardados) : null;
    } catch (error) {
      console.error("Error al obtener datos del usuario:", error);
      return null;
    }
  };

  const cerrarSesion = async () => {
    try {
      await AsyncStorage.removeItem("datosUsuario");
      console.log("✅ Sesión cerrada.");
      navigation.replace("SignIn"); // Navegar a la pantalla de inicio de sesión
    } catch (error) {
      console.error("❌ Error al cerrar sesión:", error);
    }
  };

  const abrirMiWeb = async () => {
    try {
      const datos = await obtenerDatosUsuario();
      if (datos?.url) {
        Linking.openURL(datos.url);
      } else {
        Alert.alert("Error", "No se pudo cargar la URL.");
      }
    } catch (error) {
      console.error("Error al recuperar la URL:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Ícono de Engranaje en la parte superior */}
      <TouchableOpacity
        style={styles.settingsIcon}
        onPress={() => setMenuVisible(true)}
      >
        <Ionicons name="settings-outline" size={30} color="white" />
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        {base64Image ? (
          <Image
            source={{ uri: `data:image/png;base64,${base64Image}` }}
            style={styles.logo}
          />
        ) : (
          <Image
            source={require("../assets/HodeiBLANCO72.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("CrearPost", { origen: "url" })}
        >
          <Text style={styles.buttonText}>ENLACE DE UNA PÁGINA</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("CrearPost", { origen: "pregunta" })
          }
        >
          <Text style={styles.buttonText}>MEDIANTE UNA PREGUNTA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={abrirMiWeb}>
          <Text style={styles.buttonText}>VER MI WEB</Text>
        </TouchableOpacity>
      </View>

      {/* Menú Modal */}
      <Modal visible={menuVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.menuOption}
              onPress={() => {
                setMenuVisible(false);
                navigation.navigate("Ayuda");
              }}
            >
              <Text style={styles.menuText}>Ayuda</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuOption}
              onPress={() => {
                setMenuVisible(false);
                cerrarSesion();
              }}
            >
              <Text style={styles.menuText}>Cerrar sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setMenuVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#044F8B",
    justifyContent: "center",
    alignItems: "center",
  },
  settingsIcon: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 10,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 150,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  buttonContainer: {
    width: "85%",
  },
  button: {
    backgroundColor: "#D7E7FA",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginVertical: 25,
  },
  buttonText: {
    color: "#044F8B",
    fontWeight: "bold",
    fontSize: 16,
  },

  // Estilos para el menú modal
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
  },
  menuOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    width: "100%",
    alignItems: "center",
  },
  menuText: {
    fontSize: 16,
    color: "#044F8B",
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "#044F8B",
    paddingVertical: 10,
    borderRadius: 30,
    width: "80%",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#D7E7FA",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Selector;
