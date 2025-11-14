//Task 3: Async/Await - Sintaxis Moderna (8 minutos)
//Async/await hace que el código asíncrono se vea y comporte como código síncrono, mejorando significativamente la legibilidad.

//Sintaxis Básica
// Función async
async function obtenerDatosUsuario(id) {
  try {
    // await pausa la ejecución hasta que la promise se resuelva
    const usuario = await obtenerUsuario(id);
    console.log("Usuario:", usuario);

    const posts = await obtenerPostsUsuario(usuario.id);
    console.log("Posts:", posts);

    return { usuario, posts };
  } catch (error) {
    console.error("Error:", error.message);
    throw error; // Re-lanzar para que el caller pueda manejarlo
  }
}

// Uso
async function main() {
  try {
    const resultado = await obtenerDatosUsuario(1);
    console.log("Resultado completo:", resultado);
  } catch (error) {
    console.error("Error en main:", error);
  }
}

main();


//Comparación: Callbacks vs Promises vs Async/Await
// Callbacks (callback hell)
obtenerUsuario(1, (usuario) => {
  obtenerPostsUsuario(usuario.id, (posts) => {
    obtenerComentariosPost(posts[0].id, (comentarios) => {
      console.log("Todo listo!");
    }, (error) => console.error(error));
  }, (error) => console.error(error));
}, (error) => console.error(error));

// Promises
obtenerUsuario(1)
  .then(usuario => obtenerPostsUsuario(usuario.id))
  .then(posts => obtenerComentariosPost(posts[0].id))
  .then(comentarios => console.log("Todo listo!"))
  .catch(error => console.error(error));

// Async/await
async function procesarDatos() {
  try {
    const usuario = await obtenerUsuario(1);
    const posts = await obtenerPostsUsuario(usuario.id);
    const comentarios = await obtenerComentariosPost(posts[0].id);
    console.log("Todo listo!");
  } catch (error) {
    console.error(error);
  }
}

//Paralelización con Async/Await
// Serie (una después de otra) - más lento
async function serie() {
  const usuario1 = await obtenerUsuario(1);
  const usuario2 = await obtenerUsuario(2);
  const usuario3 = await obtenerUsuario(3);
  return [usuario1, usuario2, usuario3];
}

// Paralelo (todas al mismo tiempo) - más eficiente
async function paralelo() {
  const [usuario1, usuario2, usuario3] = await Promise.all([
    obtenerUsuario(1),
    obtenerUsuario(2),
    obtenerUsuario(3)
  ]);
  return [usuario1, usuario2, usuario3];
}