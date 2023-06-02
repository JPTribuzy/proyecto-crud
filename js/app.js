// variable creada para la edicion de productos
let indiceEdicion = -1;

// Aqui puedo obtener los productos almacenados en el localStorage
function obtenerProductos() {
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  return productos;
}

// Aqui puedo guardar los productos en el localStorage
function guardarProductos(productos) {
  localStorage.setItem("productos", JSON.stringify(productos));
}

// Función para mostrar una notificación
function mostrarNotificacion(mensaje, tipo) {
  // Crea un elemento de notificación
  const notificacion = document.createElement("div");
  notificacion.classList.add("notificacion", tipo);
  notificacion.textContent = mensaje;

  // Agrega la notificación al cuerpo de la página
  document.body.appendChild(notificacion);

  // Desaparece la notificación después de 3 segundos
  setTimeout(function () {
    notificacion.remove();
  }, 3000);
}

// Con esta funcion puedo agregar un nuevo producto
function agregarProducto() {
  const tipoInput = document.getElementById("tipoInput");
  const productoInput = document.getElementById("productoInput");
  const precioInput = document.getElementById("precioInput");
  const stockInput = document.getElementById("stockInput");
  const nuevoProducto = {
    tipo: tipoInput.value,
    nombre: productoInput.value,
    precio: parseFloat(precioInput.value),
    stock: parseInt(stockInput.value),
  };

  // Verificar si los datos son correctos
  if (
    nuevoProducto.tipo &&
    nuevoProducto.nombre &&
    !isNaN(nuevoProducto.precio) &&
    nuevoProducto.stock
  ) {
    // Aqui leo los productos existentes del localStorage
    const productos = obtenerProductos();

    if (indiceEdicion !== -1) {
      // Actualizar producto existente
      productos[indiceEdicion] = nuevoProducto;
      indiceEdicion = -1;

      // Cambiar el botón a "Agregar" después de actualizar un producto
      const botonAgregarActualizar = document.getElementById(
        "botonAgregarActualizar"
      );
      botonAgregarActualizar.textContent = "Agregar producto";
    } else {
      // Agregar nuevo producto a la lista
      productos.push(nuevoProducto);
    }

    // Guardar los productos actualizados en el localStorage
    guardarProductos(productos);

    // Actualiza la tabla de productos en la página
    mostrarProductos();

    // Limpia los campos de entrada
    tipoInput.value = tipoInput.options[0].value;
    productoInput.value = "";
    precioInput.value = "";
    stockInput.value = "";

     // Mostrar notificación de cambios aplicados
  mostrarNotificacion("Guardado Exitoso");

  } else {
    alert("Ingresa un dato o valor válido para cada campo.");
  }
}


// Función para eliminar un producto de la lista
function eliminarProducto(index) {
  // Obtén los productos del localStorage
  const productos = obtenerProductos();

  // Elimina el producto del array de productos
  productos.splice(index, 1);

  // Guarda la lista de productos actualizada en el localStorage
  guardarProductos(productos);

  // Actualiza la tabla de productos en la página
  mostrarProductos();

  // Mostrar notificación de eliminación exitosa
mostrarNotificacion("Objeto Eliminado");

}

// Función para editar un producto de la lista
function editarProducto(index) {
  // Obtén los productos del localStorage
  const productos = obtenerProductos();

  // Obtén el producto específico a editar
  const producto = productos[index];

  // Actualiza los campos de entrada con los valores del producto
  const tipoInput = document.getElementById("tipoInput");
  const productoInput = document.getElementById("productoInput");
  const precioInput = document.getElementById("precioInput");
  const stockInput = document.getElementById("stockInput");

  tipoInput.value = producto.tipo;
  productoInput.value = producto.nombre;
  precioInput.value = producto.precio;
  stockInput.value = producto.stock;

  // Establece el índice de edición
  indiceEdicion = index;

  // Cambia el botón a "Actualizar" al editar
  const botonAgregarActualizar = document.getElementById(
    "botonAgregarActualizar"
  );
  botonAgregarActualizar.textContent = "Actualizar";
}


// Función para mostrar los productos en la tabla
function mostrarProductos() {
  const productoLista = document.getElementById("productoLista");

  // Obtén los productos del localStorage
  const productos = obtenerProductos();

  // Limpia la tabla de productos en la página
  productoLista.innerHTML = "";

  // Agrega cada producto como una fila en la tabla
  productos.forEach(function (producto, index) {
    const tr = document.createElement("tr");

    // Dentro de la función mostrarProductos()
    // Verificar que tipo de producto es y le asigno un icono de identificacion de bootstrap

    const tipoTd = document.createElement("td");

    switch (producto.tipo) {
      case "Audifonos":
        const audifonosIcono = document.createElement("i");
        audifonosIcono.classList.add("bi", "bi-headset");
        tipoTd.appendChild(audifonosIcono);
        tipoTd.appendChild(document.createTextNode(" Audifonos"));
        break;
      case "Mouse":
        const mouseIcono = document.createElement("i");
        mouseIcono.classList.add("bi", "bi-mouse");
        tipoTd.appendChild(mouseIcono);
        tipoTd.appendChild(document.createTextNode(" Mouse"));
        break;
      case "Monitores":
        const monitoresIcono = document.createElement("i");
        monitoresIcono.classList.add("bi", "bi-display");
        tipoTd.appendChild(monitoresIcono);
        tipoTd.appendChild(document.createTextNode(" Monitores"));
        break;
      case "Sillas":
        const sillasIcono = document.createElement("i");
        sillasIcono.classList.add("bi", "bi-train-lightrail-front-fill");
        tipoTd.appendChild(sillasIcono);
        tipoTd.appendChild(document.createTextNode(" Sillas"));
        break;
      case "Teclados":
        const tecladosIcono = document.createElement("i");
        tecladosIcono.classList.add("bi", "bi-keyboard");
        tipoTd.appendChild(tecladosIcono);
        tipoTd.appendChild(document.createTextNode(" Teclados"));
        break;
      default:
        tipoTd.textContent = producto.tipo;
    }

    tr.appendChild(tipoTd);

    const productoTd = document.createElement("td");
    productoTd.textContent = producto.nombre;
    tr.appendChild(productoTd);

    const precioTd = document.createElement("td");
    precioTd.textContent = "$ " + producto.precio.toFixed(2);
    tr.appendChild(precioTd);

    const stockTd = document.createElement("td");
    stockTd.textContent = producto.stock + " uds";
    tr.appendChild(stockTd);

    const accionesTd = document.createElement("td");

    // Opcion para editar botones de la tabla y agregar iconos de bootstrap

    const botonEditar = document.createElement("button");
    botonEditar.classList.add("editar-btn");

    const iconoEditar = document.createElement("i");
    iconoEditar.classList.add("bi", "bi-pencil");

    botonEditar.appendChild(iconoEditar);
    botonEditar.insertAdjacentText("beforeend", " Editar");

    botonEditar.addEventListener("click", function () {
      editarProducto(index);
    });

    accionesTd.appendChild(botonEditar);

    const botonEliminar = document.createElement("button");
    botonEliminar.classList.add("eliminar-btn");

    const iconoEliminar = document.createElement("i");
    iconoEliminar.classList.add("bi", "bi-trash");

    botonEliminar.appendChild(iconoEliminar);
    botonEliminar.insertAdjacentText("beforeend", " Eliminar");

    botonEliminar.addEventListener("click", function () {
      eliminarProducto(index);
    });

    accionesTd.appendChild(botonEliminar);

    tr.appendChild(accionesTd);
    productoLista.appendChild(tr);
  });
}

// Mostrar los productos al cargar la página
mostrarProductos();
