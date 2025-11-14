//Task 2: Promises - La Solución Moderna (10 minutos)
//Las Promises representan el resultado futuro de una operación asíncrona, permitiendo encadenar operaciones de manera más legible.

//Creación de Promises
// Función que retorna una Promise
function obtenerUsuario(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id, nombre: "Usuario " + id });
      } else {
        reject(new Error("ID de usuario inválido"));
      }
    }, 500);
  });
}

function obtenerPostsUsuario(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        { id: 1, titulo: "Post 1", userId },
        { id: 2, titulo: "Post 2", userId }
      ]);
    }, 500);
  });
}


//Consumo de Promises
// Uso básico
obtenerUsuario(1)
  .then((usuario) => {
    console.log("Usuario obtenido:", usuario);
    return obtenerPostsUsuario(usuario.id);
  })
  .then((posts) => {
    console.log("Posts obtenidos:", posts);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });

// Promise.all - ejecutar múltiples promises en paralelo
const promises = [
  obtenerUsuario(1),
  obtenerUsuario(2),
  obtenerUsuario(3)
];

Promise.all(promises)
  .then((usuarios) => {
    console.log("Todos los usuarios:", usuarios);
  })
  .catch((error) => {
    console.error("Error en alguna promise:", error);
  });

// Promise.race - primera promise que se resuelva
Promise.race([
  obtenerUsuario(1), // 500ms
  new Promise(resolve => setTimeout(() => resolve("Timeout"), 100)) // 100ms
])
.then((resultado) => {
  console.log("Primera en resolverse:", resultado);
});


//Estados de una Promise
//Pending: Estado inicial, ni fulfilled ni rejected
//Fulfilled: Operación completada exitosamente
//Rejected: Operación falló
const promise = new Promise((resolve, reject) => {
  // Pending inicialmente
  setTimeout(() => {
    const exito = Math.random() > 0.5;
    if (exito) {
      resolve("¡Éxito!"); // Fulfilled
    } else {
      reject(new Error("Falló")); // Rejected
    }
  }, 1000);
});