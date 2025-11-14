//Task 4: Manejo de Errores en Código Asíncrono (4 minutos)
//El manejo de errores es crucial en operaciones asíncronas.

//Errores con Callbacks
function operacionAsincrona(callback) {
  setTimeout(() => {
    const exito = Math.random() > 0.5;
    if (exito) {
      callback(null, "Éxito");
    } else {
      callback(new Error("Falló"), null);
    }
  }, 500);
}

// Patrón error-first callback
operacionAsincrona((error, resultado) => {
  if (error) {
    console.error("Error:", error.message);
    return;
  }
  console.log("Resultado:", resultado);
});


//Errores con Promises
function operacionAsincrona() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const exito = Math.random() > 0.5;
      if (exito) {
        resolve("Éxito");
      } else {
        reject(new Error("Falló"));
      }
    }, 500);
  });
}

operacionAsincrona()
  .then(resultado => console.log("Resultado:", resultado))
  .catch(error => console.error("Error:", error.message));


 // Errores con Async/Await

 async function operacionAsincrona() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const exito = Math.random() > 0.5;
      if (exito) {
        resolve("Éxito");
      } else {
        reject(new Error("Falló"));
      }
    }, 500);
  });
}

async function main() {
  try {
    const resultado = await operacionAsincrona();
    console.log("Resultado:", resultado);
  } catch (error) {
    console.error("Error:", error.message);
    // Manejo específico de errores
    if (error.message.includes("Falló")) {
      console.log("Reintentando...");
      // Lógica de reintento
    }
  }
}