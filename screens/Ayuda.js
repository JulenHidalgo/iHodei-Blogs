import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Pantalla de Ayuda
const Ayuda = () => {
  const navigation = useNavigation(); // Hook para la navegación

  // Método para abrir enlaces en la aplicación correspondiente, o en el navegador
  const abrirEnlace = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Error al abrir el enlace:", err)
    );
  };

  // Estructura de la pantalla
  return (
    <View style={styles.fullScreen}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/HodeiBLANCO72.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.title}>Manual de Usuario</Text>
          <Text style={styles.text}>
            Bienvenido/a a la aplicación HodeiCloud. Aquí encontrarás
            información sobre cómo utilizar la aplicación y solucionar problemas
            comunes.
          </Text>

          <Text style={styles.subtitle}>Funcionalidades</Text>
          <Text style={styles.text}>- Creación de posts desde una URL.</Text>
          <Text style={styles.text}>
            - Creación de posts mediante preguntas.
          </Text>
          <Text style={styles.text}>
            - Asignación de categorías a los posts.
          </Text>

          <Text style={styles.subtitle}>Uso de la Aplicación</Text>
          <Text style={styles.text}>
            1. Inicia sesión con tus credenciales.
          </Text>
          <Text style={styles.text}>
            2. Selecciona el método de creación de post.
          </Text>
          <Text style={styles.text}>3. Ingresa la información requerida.</Text>
          <Text style={styles.text}>
            4. Publica y revisa tu post en el blog.
          </Text>

          <Text style={styles.subtitle}>Solución de Problemas</Text>
          <Text style={styles.text}>
            - No carga la imagen personalizada: Verifica tu conexión.
          </Text>
          <Text style={styles.text}>
            - No se genera contenido desde URL: Revisa que sea válida.
          </Text>
          <Text style={styles.text}>
            - No puedes iniciar sesión: Verifica tus credenciales.
          </Text>

          <Text style={styles.subtitle}>Preguntas Frecuentes</Text>
          <Text style={styles.question}>¿Cómo creo una nueva categoría?</Text>
          <Text style={styles.text}>
            Para crear una nueva categoría, pincha en el campo de categoría (no
            en el icono del desplegable). Esto te permitirá escribir y, al crear
            el post, se generará la nueva categoría.
          </Text>

          <Text style={styles.question}>
            ¿Puedo editar un post después de publicarlo?
          </Text>
          <Text style={styles.text}>
            No, actualmente la aplicación solo permite la creación de posts.
            Para modificar un post publicado, deberás hacerlo directamente en el
            blog de tu página web.
          </Text>

          <Text style={styles.question}>
            ¿Por qué no aparecen algunas categorías en la lista?
          </Text>
          <Text style={styles.text}>
            Asegúrate de que la aplicación está sincronizada correctamente y
            prueba a reiniciar la aplicación.
          </Text>

          <Text style={styles.subtitle}>Contacto</Text>
          <View style={styles.contactContainer}>
            <Text style={styles.text}>
              Si necesitas ayuda, contacta con nuestro soporte en
            </Text>
            <TouchableOpacity
              onPress={() =>
                abrirEnlace("https://api.whatsapp.com/send?phone=34602216188")
              }
            >
              <Image
                source={require("../assets/whatsapp.png")}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Volver</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.subtitle}>Más sobre nosotros</Text>
          <View style={styles.socialIconsContainer}>
            <TouchableOpacity
              onPress={() =>
                abrirEnlace("https://www.instagram.com/ihodeicloud")
              }
            >
              <Image
                source={require("../assets/instagram.png")}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => abrirEnlace("https://www.tiktok.com/@ihodeicloud")}
            >
              <Image
                source={require("../assets/tiktok.png")}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                abrirEnlace("https://es.linkedin.com/company/ihodeicloud")
              }
            >
              <Image
                source={require("../assets/linkedin.png")}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <TouchableOpacity
            onPress={() => abrirEnlace("https://hodeicloud.com/")}
          >
            <Text style={styles.subtitle}>Visita nuestra web</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

// Estilos de la pantalla
const styles = StyleSheet.create({
  question: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  fullScreen: { flex: 1, backgroundColor: "#044F8B" },
  scrollContainer: { alignItems: "center", paddingBottom: 40 },
  logoContainer: { alignItems: "center", marginVertical: 50 },
  logo: { width: 200, height: 200 },
  contentContainer: {
    width: "85%",
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
  socialIconsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  contactContainer: {
    display: "flex",
    alignItems: "center",
  },
  socialIcon: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#044F8B",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#044F8B",
    marginVertical: 5,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    color: "#333333",
    marginBottom: 10,
    textAlign: "center",
  },
  correo: {
    fontSize: 16,
    color: "#333333",
    marginBottom: 10,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  button: {
    backgroundColor: "#D7E7FA",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: { color: "#044F8B", fontWeight: "bold", fontSize: 16 },
});

export default Ayuda;
