import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Linking,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Ayuda = () => {
  const enlaces = {
    instagram: "https://www.instagram.com/ihodei_/",
    tiktok: "https://www.tiktok.com/@ihodeicloud",
    linkedin: "https://es.linkedin.com/company/ihodeicloud",
    web: "https://ihodei.com/",
    whatsapp: "https://api.whatsapp.com/send?phone=34602216188",
    email: "hodeicloud2020@gmail.com",
    facebook: "https://www.facebook.com/iHodei/",
    youtube: "https://www.youtube.com/channel/UCXu9csa1KbvWv62vx7cCsVA",
    android:
      "https://play.google.com/store/apps/dev?id=5086017462633538535&hl=es&",
    ios: "https://apps.apple.com/es/developer/hodeicloud-sociedad-limitada/id1803574185",
  };

  const navigation = useNavigation();

  const abrirEnlace = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Error al abrir el enlace:", err)
    );
  };

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

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Volver</Text>
          </TouchableOpacity>
        </View>

        {/* Sección Más sobre Nosotros */}
        <View style={styles.contentContainer}>
          <Text style={styles.subtitle}>Más sobre nosotros</Text>
          <View style={styles.socialIconsContainer}>
            <TouchableOpacity onPress={() => abrirEnlace(enlaces.instagram)}>
              <Image
                source={require("../assets/instagram.png")}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => abrirEnlace(enlaces.tiktok)}>
              <Image
                source={require("../assets/tiktok.png")}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => abrirEnlace(enlaces.linkedin)}>
              <Image
                source={require("../assets/linkedin.png")}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => abrirEnlace(enlaces.youtube)}>
              <Image
                source={require("../assets/youtube.png")}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => abrirEnlace(enlaces.facebook)}>
              <Image
                source={require("../assets/facebook.png")}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sección Visita nuestra web */}
        <View style={styles.contentContainer}>
          <TouchableOpacity onPress={() => abrirEnlace(enlaces.web)}>
            <Text style={styles.subtitle}>Visita nuestra web</Text>
          </TouchableOpacity>
        </View>

        {/* Sección Más aplicaciones */}
        <View style={styles.contentContainer}>
          <TouchableOpacity
            onPress={() =>
              abrirEnlace(
                Platform.OS === "android" ? enlaces.android : enlaces.ios
              )
            }
          >
            <Text style={styles.subtitle}>Más aplicaciones</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

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
