import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Post from "../model/Post";
import { Ionicons } from "@expo/vector-icons";

const blogsData = [
  new Post(
    1,
    "La Inteligencia Artificial Revoluciona la Medicina: Diagnósticos Más Precisos y Rápidos",
    "La Inteligencia Artificial (IA) está transformando la medicina, permitiendo diagnósticos más rápidos y precisos. Algoritmos avanzados pueden analizar imágenes médicas en segundos, detectando enfermedades como el cáncer con una precisión superior a la de los médicos tradicionales. Empresas tecnológicas han desarrollado herramientas de IA capaces de identificar anomalías en radiografías, resonancias magnéticas y tomografías computarizadas, ayudando a los profesionales a tomar decisiones más informadas. Además, la IA permite personalizar tratamientos basados en el historial clínico de cada paciente, mejorando la efectividad de los medicamentos. Aunque algunos temen que la automatización reemplace a los médicos, expertos coinciden en que la IA no sustituirá a los profesionales de la salud, sino que los complementará, optimizando su trabajo y reduciendo los errores. En el futuro, la combinación de IA y medicina seguirá avanzando, mejorando la calidad de vida y la esperanza de los pacientes en todo el mundo.",
    require("../assets/imagen_post1.webp"),
    "",
    ""
  ),
  new Post(
    2,
    "El Auge de los Coches Autónomos: ¿El Futuro de la Movilidad?",
    "Los coches autónomos están revolucionando la forma en que nos desplazamos. Empresas como Tesla, Waymo y Mercedes-Benz han desarrollado vehículos con inteligencia artificial avanzada que pueden circular sin intervención humana. Estos autos utilizan sensores, cámaras y algoritmos de aprendizaje profundo para detectar obstáculos, interpretar señales de tránsito y tomar decisiones en tiempo real. La tecnología promete reducir accidentes causados por errores humanos y optimizar el tráfico en las ciudades. Sin embargo, existen desafíos como la regulación, la ciberseguridad y la aceptación pública de esta innovación. A medida que los fabricantes mejoran sus sistemas, los coches autónomos podrían convertirse en la norma en las carreteras del futuro, transformando la movilidad y la industria del transporte.",
    require("../assets/imagen_post2.webp"),
    "",
    ""
  ),
  new Post(
    3,
    "Exploración Espacial: La Carrera por Colonizar Marte",
    "La humanidad ha soñado durante décadas con la colonización de Marte, y hoy estamos más cerca que nunca de hacerlo realidad. Empresas como SpaceX, Blue Origin y agencias espaciales como la NASA han desarrollado misiones para llevar humanos al planeta rojo. Con el desarrollo de cohetes reutilizables y hábitats autosuficientes, los científicos creen que en las próximas décadas podríamos establecer una base marciana. Sin embargo, los desafíos son enormes: la radiación cósmica, la falta de oxígeno y las temperaturas extremas ponen en riesgo cualquier misión tripulada. A pesar de esto, los avances tecnológicos en impresión 3D, energía solar y biotecnología están permitiendo soluciones innovadoras para la vida en Marte. Si logramos establecer una colonia en el planeta rojo, no solo cambiaría el destino de la humanidad, sino que sería el primer paso hacia la exploración interplanetaria.",
    require("../assets/imagen_post3.webp"),
    "",
    ""
  ),
  new Post(
    4,
    "Energía Renovable: ¿Puede la Energía Solar Sustituir a los Combustibles Fósiles?",
    "La energía solar se ha convertido en una de las principales alternativas a los combustibles fósiles en la lucha contra el cambio climático. Con el desarrollo de paneles solares más eficientes y baterías de almacenamiento avanzadas, muchas naciones están invirtiendo en infraestructuras para aprovechar esta fuente inagotable de energía. Grandes empresas han desarrollado proyectos de granjas solares capaces de suministrar electricidad a ciudades enteras, reduciendo la dependencia del petróleo y el gas. Sin embargo, los desafíos siguen presentes: la intermitencia de la luz solar y el costo de producción de baterías limitan su adopción masiva. A pesar de esto, los avances en tecnología fotovoltaica y en sistemas de almacenamiento sugieren que la energía solar podría convertirse en la principal fuente de energía del futuro, proporcionando un mundo más limpio y sostenible.",
    require("../assets/imagen_post4.webp"),
    "",
    ""
  ),
  new Post(
    5,
    "El Impacto de la Inteligencia Artificial en la Educación: ¿Beneficio o Riesgo?",
    "La Inteligencia Artificial (IA) está transformando la educación de manera radical. Gracias a plataformas con IA, los estudiantes pueden acceder a tutorías personalizadas, sistemas de aprendizaje adaptativo y asistentes virtuales que responden dudas en tiempo real. Herramientas como ChatGPT, Google Bard y sistemas de recomendación educativa están facilitando el acceso al conocimiento y mejorando la forma en que los alumnos aprenden. Sin embargo, este avance también plantea desafíos: el riesgo de dependencia tecnológica, la falta de pensamiento crítico y la posibilidad de que la IA sustituya la interacción con docentes. A pesar de esto, la clave parece estar en integrar la tecnología como una herramienta complementaria que potencie la educación sin reemplazar la enseñanza tradicional. Si se implementa correctamente, la IA podría revolucionar el aprendizaje y reducir la brecha educativa en todo el mundo.",
    require("../assets/imagen_post5.webp"),
    "",
    ""
  ),
];

// 🔹 Recibir navigation como prop
const BuscarBlogs_hc = ({ navigation }) => {
  const [search, setSearch] = useState("");

  // Filtrar blogs según el texto ingresado en la barra de búsqueda
  const filteredBlogs = blogsData.filter((blog) =>
    blog.titulo.toLowerCase().includes(search.toLowerCase())
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

      {/* Grid de blogs */}
      <FlatList
        data={filteredBlogs}
        keyExtractor={(item) => item.id}
        numColumns={2} // Hace que los elementos se muestren en dos columnas
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.blogCard} // 🔹 Toda la tarjeta es tocable ahora
            onPress={() =>
              navigation.navigate("Detalles", { id_recibido: item.id })
            }
          >
            <Image source={item.imagen} style={styles.blogImage} />
            <Text style={styles.blogTitle}>{item.titulo}</Text>
          </TouchableOpacity>
        )}
      />

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  logo: {
    width: 120,
    height: 50,
  },
  searchBar: {
    margin: 15,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f1f1f1",
  },
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
  blogImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
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
});

export default BuscarBlogs_hc;
