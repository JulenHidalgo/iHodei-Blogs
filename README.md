# iHodeiBlogs App

Aplicación móvil desarrollada en **React Native** para la automatización y gestión de publicaciones desde Make.com hacia la plataforma de HodeiCloud.  
Permite visualizar, revisar y mantener actualizado el contenido vinculado a los flujos creados en Make, ofreciendo una experiencia optimizada para móviles.

Este proyecto ha sido desarrollado por **JulenHidalgo** durante su periodo de prácticas en **HodeiCloud**, cumpliendo con los requisitos técnicos del equipo de desarrollo.

**GitHub:** https://github.com/JulenHidalgo/

---

## ⚙️ Configuración necesaria

> Esta aplicación requiere un archivo de configuración personalizado para funcionar correctamente.  
> Este archivo no se encuentra incluido en el repositorio y debe crearse manualmente.

### 📁 1. Crear carpeta `config`

En la raíz del proyecto, crea una carpeta llamada:

```
config
```

### 📄 2. Crear archivo `Propiedades.js`

Dentro de esa carpeta, crea el archivo:

```
Propiedades.js
```

Y añade el siguiente contenido:

```javascript
const Propiedades = {
  URL_MAKE: "AQUÍ_DEBES_PONER_TU_URL_DEL_WEBHOOK", // Sustituye este valor por tu URL real
};

export default Propiedades;
```

> Asegúrate de mantener esta URL actualizada si cambias el webhook en Make.com.

---

## 🚀 Instalación y ejecución

1. Clona este repositorio:

```bash
git clone https://github.com/JulenHidalgo/ihodei-blogs.git
cd ihodei-blogs
```

2. Instala las dependencias del proyecto:

```bash
npm install
```

3. Inicia la app en modo desarrollo:

```bash
npx expo start
```

> Asegúrate de tener instalado Expo CLI (`npm install -g expo-cli`) y una cuenta activa para poder visualizar la app en tu dispositivo físico o emulador.

---

## 📂 Estructura del proyecto

```
ihodei-blogs/
├── assets/              # Imágenes y recursos gráficos
├── components/          # Componentes reutilizables de la interfaz
├── config/              # Archivo Propiedades.js (personalizable)
├── screens/             # Pantallas principales de la aplicación
├── App.js               # Punto de entrada de la app
├── app.json             # Configuración del proyecto Expo
└── package.json         # Dependencias y scripts
```

---

## 🌐 Requisitos

- Node.js >= 18
- Expo CLI
- Cuenta en [Make.com](https://make.com) con el webhook configurado correctamente
- Acceso al repositorio privado de HodeiCloud (si es necesario para referencias cruzadas)

---

## 📡 Funcionalidad

- Llama automáticamente al webhook de Make para actualizar datos de publicaciones.
- Visualización rápida y ordenada de contenido desde el móvil.
- Sistema modular preparado para futuras integraciones.

---

## 🛡️ Seguridad

- No compartas el archivo `Propiedades.js` con tu webhook públicamente.
- Se recomienda añadir la carpeta `config/` a `.gitignore` si se desea mantener en privado en producción.

---

¿Tienes dudas o necesitas soporte?  
Contacta con el equipo de **HodeiCloud** o consulta la documentación interna del proyecto.
