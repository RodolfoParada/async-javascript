// Ejercicio: Crea un sistema de sincronización de datos que descargue información de múltiples APIs, la procese,
//  y la guarde localmente. Implementa reintentos automáticos en caso de fallos, logging detallado de progreso, y 
// manejo de timeouts. Compara la implementación usando callbacks vs Promises vs async/await.

// Simulación de una API
function apiSimulada(nombre, datos, tiempo, debeFallar = false) {
  return (callback) => {
    const limite = setTimeout(() => {
      callback(new Error(`TIMEOUT EN API ${nombre}`));
    }, 1500);

    setTimeout(() => {
      clearTimeout(limite);
      if (debeFallar) {
        callback(new Error(`ERROR AL DESCARGAR ${nombre}`));
      } else {
        callback(null, datos);
      }
    }, tiempo);
  };
}

//Apis
const apiUsuarios = apiSimulada("Usuarios", [{ id: 1, nombre: "Ana" }], 500);
const apiProductos = apiSimulada("Productos", [{ id: 10, nombre: "Mouse" }], 700);
const apiVentas = apiSimulada("Ventas", [{ id: 100, total: 5000 }], 2000, true); // esta falla

// Simula guardado local
const baseLocal = { usuarios: [], productos: [], ventas: [] };


// Version con Callbacks
function sincronizarConCallbacks(api, destino, reintentos, callback) {
  console.log(`DESCARGANDO ${destino}...`);

  api((err, datos) => {
    if (err) {
      if (reintentos > 0) {
        console.log(`ERROR: ${err.message} — Reintentando (${reintentos})`);
        return sincronizarConCallbacks(api, destino, reintentos - 1, callback);
      }
      return callback(err);
    }

    baseLocal[destino] = datos;
    console.log(`GUARDADO ${destino} correctamente.`);
    callback(null, datos);
  });
}

sincronizarConCallbacks(apiUsuarios, "usuarios", 2, () => {
  sincronizarConCallbacks(apiProductos, "productos", 2, () => {
    sincronizarConCallbacks(apiVentas, "ventas", 2, (err) => {
      if (err) console.log("ERROR FINAL:", err.message);
      console.log("CALLBACKS LISTO\n", baseLocal);
    });
  });
});


// Version con Promises

function sincronizarConPromises(api, destino, reintentos) {
  return new Promise((resolve, reject) => {
    api((err, datos) => {
      if (err) {
        if (reintentos > 0) {
          console.log(`ERROR EN ${destino}: ${err.message} — Reintentando`);
          return resolve(sincronizarConPromises(api, destino, reintentos - 1));
        }
        return reject(err);
      }

      baseLocal[destino] = datos;
      console.log(`GUARDADO ${destino} correctamente.`);
      resolve(datos);
    });
  });
}

// Ejecución
sincronizarConPromises(apiUsuarios, "usuarios", 2)
  .then(() => sincronizarConPromises(apiProductos, "productos", 2))
  .then(() => sincronizarConPromises(apiVentas, "ventas", 2))
  .catch((err) => console.log("ERROR FINAL PROMISES:", err.message))
  .finally(() => console.log("PROMISES LISTO\n", baseLocal));


// Version con async/await
function sincronizarConAwait(api, destino, reintentos) {
  return new Promise((resolve, reject) => {
    api((err, datos) => {
      if (err) {
        if (reintentos > 0) {
          console.log(`ERROR EN ${destino}: ${err.message} — Reintentando`);
          return resolve(sincronizarConAwait(api, destino, reintentos - 1));
        }
        return reject(err);
      }
      baseLocal[destino] = datos;
      resolve(datos);
    });
  });
}

async function ejecutarSync() {
  try {
    console.log("\n=== SINCRONIZACIÓN CON ASYNC/AWAIT ===");

    await sincronizarConAwait(apiUsuarios, "usuarios", 2);
    await sincronizarConAwait(apiProductos, "productos", 2);
    await sincronizarConAwait(apiVentas, "ventas", 2);

  } catch (e) {
    console.log("ERROR FINAL ASYNC/AWAIT:", e.message);
  } finally {
    console.log("ASYNC/AWAIT LISTO\n", baseLocal);
  }
}

ejecutarSync();