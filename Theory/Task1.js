//Task 1: Callbacks y el Problema del Callback Hell (8 minutos)
//JavaScript es single-threaded pero puede realizar operaciones asíncronas. Los callbacks fueron la primera solución, pero pueden crear código difícil de mantener.

//¿Qué es la Asincronía?
console.log("Inicio");

// Operación síncrona
const resultado = 2 + 2;
console.log(resultado); // 4

// Operación asíncrona
setTimeout(() => {
  console.log("Esto se ejecuta después");
}, 1000);

console.log("Fin");
// Output: Inicio, 4, Fin, "Esto se ejecuta después"


//Callbacks Básicos

// Función que simula una operación asíncrona
function obtenerDatos(callback) {
  setTimeout(() => {
    const datos = { nombre: "Ana", edad: 25 };
    callback(datos);
  }, 1000);
}

// Uso del callback
obtenerDatos((datos) => {
  console.log("Datos recibidos:", datos);
});

/*-------------------------------------------------------------*/
// El Problema del Callback Hell
// Ejemplo de callback hell
function obtenerUsuario(id, callback) {
  setTimeout(() => {
    callback({ id, nombre: "Usuario " + id });
  }, 500);
}

function obtenerPostsUsuario(userId, callback) {
  setTimeout(() => {
    callback([
      { id: 1, titulo: "Post 1", userId },
      { id: 2, titulo: "Post 2", userId }
    ]);
  }, 500);
}

function obtenerComentariosPost(postId, callback) {
  setTimeout(() => {
    callback([
      { id: 1, texto: "Comentario 1", postId },
      { id: 2, texto: "Comentario 2", postId }
    ]);
  }, 500);
}

// Callback hell en acción
obtenerUsuario(1, (usuario) => {
  console.log("Usuario:", usuario);
  obtenerPostsUsuario(usuario.id, (posts) => {
    console.log("Posts:", posts);
    obtenerComentariosPost(posts[0].id, (comentarios) => {
      console.log("Comentarios:", comentarios);
      // Más callbacks aquí... ¡callback hell!
    });
  });
});


//Problemas del callback hell:

//Código difícil de leer y mantener
//Error handling complicado
//Debugging complejo
//Flujo de ejecución no lineal