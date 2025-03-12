class Post {
  constructor(
    user,
    password,
    url,
    url_post,
    pregunta,
    id_categoria,
    nombre_categoria,
    metodo
  ) {
    this.user = user;
    this.password = password;
    this.url = url;
    this.url_post = url_post;
    this.pregunta = pregunta;
    this.id_categoria = id_categoria;
    this.nombre_categoria = nombre_categoria;
    this.metodo = metodo;
  }
}

export default Post;
