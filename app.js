// DEFINICION DE VARIABLES

const contenedorProductos = document.getElementById("contenedor-productos");
const contenedorCarrito = document.getElementById("carrito-contenedor");
const contadorCarrito = document.getElementById("contadorCarrito");
const precioTotal = document.getElementById("precioTotal");
const subTotal = document.getElementById("subtotal");

let carrito = [];
let total = 0;
let stockProductos = [
  {
    id: 1,
    nombre: "Conjunto rosa",
    tipo: "lenceria",
    descripcion: "Pieza de lenceria",
    precio: 1200,
    cantidad: 1,
    img: "assets/conjunto.jfif",
    destacado: true,
    ventas: 23,
  },
  {
    id: 2,
    nombre: "Pantuflas negras",
    tipo: "calzado",
    descripcion: "Pantuflas ideales para el invierno",
    precio: 1500,
    cantidad: 1,
    img: "assets/pantuflas3.png",
    destacado: false,
    ventas: 29,
  },
  {
    id: 3,
    nombre: "Conjunto rojo",
    tipo: "lenceria",
    descripcion: "Pieza de lenceria",
    precio: 1200,
    cantidad: 1,
    img: "assets/conjunto.jfif",
    destacado: true,
    ventas: 24,
  },
  {
    id: 4,
    nombre: "Pantuflas rosas",
    tipo: "calzado",
    descripcion: "Pantuflas ideales para el invierno",
    precio: 1800,
    cantidad: 1,
    img: "assets/pantuflas3.png",
    destacado: false,
    ventas: 22,
  },
  {
    id: 5,
    nombre: "Pantuflas verdes",
    tipo: "calzado",
    descripcion: "Pantuflas ideales para el invierno",
    precio: 2000,
    cantidad: 1,
    img: "assets/pantuflas3.png",
    destacado: false,
    ventas: 13,
  },
  {
    id: 6,
    nombre: "Conjunto negro",
    tipo: "lenceria",
    descripcion: "Pieza de lenceria",
    precio: 1100,
    cantidad: 1,
    img: "assets/conjunto.jfif",
    destacado: true,
    ventas: 230,
  },
];
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: false,
});

const filtroPorPrecioAsc = (a, b) => a.precio - b.precio;
const filtroPorPrecioDesc = (a, b) => b.precio - a.precio;
const filtroPorMasVendidos = (a, b) => b.ventas - a.ventas;

const ordenDeArticulos = {
  precioAsc: filtroPorPrecioAsc,
  precioDesc: filtroPorPrecioDesc,
  masVendidos: filtroPorMasVendidos
};

// ORDENAR ARTICULOS

const ordenarAsc = () => {
  while (contenedorProductos.firstChild) {
    contenedorProductos.removeChild(contenedorProductos.firstChild);
  }
  stockProductos.sort(ordenDeArticulos.precioAsc).forEach((producto) => {
    const div = document.createElement("span");
    div.classList.add("my-2");
    div.classList.add("col-6");
    div.classList.add("col-md-4");
    div.classList.add("col-lg-3");
    div.innerHTML = `
          <span class="card">
            <img
              class="card-img-top"
              src=${producto.img}
              alt=""
            />
            <div class="card-body">
              <h4 class="card-title">${producto.nombre}</h4>
              <p class="card-text">${producto.descripcion}</p>
              <p class="card-text">$${producto.precio}</p>
              <button
                id='agregar${producto.id}'
                onClick='agregarAlCarrito(${producto.id})'
                class="btn btn-primary float-right"
                >Agregar <i class="fa-solid fa-plus ml-1"></i></button
              >
            </div>
          </span>
    `;
    contenedorProductos.appendChild(div);
  });
};

const ordenarMasVendidos = () => {
  while (contenedorProductos.firstChild) {
    contenedorProductos.removeChild(contenedorProductos.firstChild);
  }
  stockProductos.sort(ordenDeArticulos.masVendidos).forEach((producto) => {
    const div = document.createElement("span");
    div.classList.add("my-2");
    div.classList.add("col-6");
    div.classList.add("col-md-4");
    div.classList.add("col-lg-3");
    div.innerHTML = `
          <span class="card">
            <img
              class="card-img-top"
              src=${producto.img}
              alt=""
            />
            <div class="card-body">
              <h4 class="card-title">${producto.nombre}</h4>
              <p class="card-text">${producto.descripcion}</p>
              <p class="card-text">$${producto.precio}</p>
              <button
                id='agregar${producto.id}'
                onClick='agregarAlCarrito(${producto.id})'
                class="btn btn-primary float-right"
                >Agregar <i class="fa-solid fa-plus ml-1"></i></button
              >
            </div>
          </span>
    `;
    contenedorProductos.appendChild(div);
  });
};
const ordenarDesc = () => {
  while (contenedorProductos.firstChild) {
    contenedorProductos.removeChild(contenedorProductos.firstChild);
  }
  stockProductos.sort(ordenDeArticulos.precioDesc).forEach((producto) => {
    const div = document.createElement("span");
    div.classList.add("my-2");
    div.classList.add("col-6");
    div.classList.add("col-md-4");
    div.classList.add("col-lg-3");
    div.innerHTML = `
          <span class="card">
            <img
              class="card-img-top"
              src=${producto.img}
              alt=""
            />
            <div class="card-body">
              <h4 class="card-title">${producto.nombre}</h4>
              <p class="card-text">${producto.descripcion}</p>
              <p class="card-text">$${producto.precio}</p>
              <button
                id='agregar${producto.id}'
                onClick='agregarAlCarrito(${producto.id})'
                class="btn btn-primary float-right"
                >Agregar <i class="fa-solid fa-plus ml-1"></i></button
              >
            </div>
          </span>
    `;
    contenedorProductos.appendChild(div);
  });
};

// CREACION DE ITEMS

stockProductos.forEach((producto) => {
  const div = document.createElement("span");
  div.classList.add("my-2");
  div.classList.add("col-6");
  div.classList.add("col-md-4");
  div.classList.add("col-lg-3");
  div.innerHTML = `
        <span class="card">
          <img
            class="card-img-top"
            src=${producto.img}
            alt=""
          />
          <div class="card-body">
            <h4 class="card-title">${producto.nombre}</h4>
            <p class="card-text">${producto.descripcion}</p>
            <p class="card-text">$${producto.precio}</p>
            <button
              id='agregar${producto.id}'
              onClick='agregarAlCarrito(${producto.id})'
              class="btn btn-primary float-right"
              >Agregar <i class="fa-solid fa-plus ml-1"></i></button
            >
          </div>
        </span>
  `;
  contenedorProductos.appendChild(div);
});

// FUNCIONES DEL CARRITO

const actualizarCarrito = () => {
  contenedorCarrito.innerHTML = "";
  carrito.forEach((prod) => {
    const div = document.createElement("div");
    div.classList.add("col-12");
    div.classList.add("my-2");
    div.innerHTML = `
    <table style="width:100%">
      <tr class="d-flex column align-items-center justify-content-between" style="width:100%">
        <td>${prod.nombre}</td>
        <td>$${prod.precio}</td>
        <td><button onClick="restarItem(${prod.id})" class="btn btn-secondary">
        <i class="fa-solid fa-minus"></i> 
        </button> <span id='cantidad'>${prod.cantidad}</span>
        <button onClick="sumarItem(${prod.id})" class="btn btn-success">
        <i class="fa-solid fa-plus"></i>
        </button></td>
        <td><button onClick="eliminarItem(${prod.id})" class="btn btn-danger"> Eliminar </button></td>
      </tr>
    </table>
    `;

    contenedorCarrito.appendChild(div);
  });
  precioTotal.innerText = carrito
    .map((item) => item.precio * item.cantidad)
    .reduce((prev, current) => prev + current, total);

  contadorCarrito.innerText = carrito
    .map((item) => item.cantidad)
    .reduce((prev, current) => prev + current, total);

  subTotal.innerText = carrito
    .map((item) => item.precio * item.cantidad)
    .reduce((prev, current) => prev + current, total);
};

const agregarAlCarrito = (productoId) => {
  const existe = carrito.some((prod) => prod.id === productoId);

  if (existe) {
    carrito.map((prod) => {
      if (prod.id === productoId) {
        prod.cantidad++;
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Producto Agregado",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  } else {
    const producto = stockProductos.find((prodId) => prodId.id === productoId);
    carrito.push(producto);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Producto Agregado",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  actualizarCarrito();
};

const eliminarItem = (prodId) => {
  const item = carrito.find((prod) => prod.id === prodId);
  const indice = carrito.indexOf(item);
  Swal.fire({
    title: "Estas a punto de eliminar este articulo del carrito",
    text: "Despues podes volver a agregarlo.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Borrar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("¡Listo!", "Articulo borrado.", "success");
      carrito.splice(indice, 1);
      actualizarCarrito();
    }
  });
};

const abrirCarrito = () => {
  let x = document.getElementById("carrito");
  if (carrito.length > 0) {
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  } else {
    x.style.display = "none";
  }
};

const cerrarCarrito = () => {
  let x = document.getElementById("carrito");
  if (x.style.display !== "none") {
    x.style.display = "none";
  }
};

const vaciarCarrito = () => {
  Swal.fire({
    title: "¿Estas seguro?",
    text: "Estas a punto de vaciar el carrito.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Borrar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("¡Listo!", "Tu carrito esta vacio.", "success");
      carrito.length = 0;
      actualizarCarrito();
    }
  });
};

const sumarItem = (prodId) => {
  const item = carrito.find((prod) => prod.id === prodId);
  item.cantidad++;
  actualizarCarrito();
};

const restarItem = (prodId) => {
  const item = carrito.find((prod) => prod.id === prodId);
  if (item.cantidad > 1) {
    item.cantidad--;
    actualizarCarrito();
  }
};

const pagar = (carrito) => {
  let inicial = 0;
  const costoTotal = carrito
    .map((item) => item.precio * item.cantidad)
    .reduce((prev, current) => prev + current, inicial);

  swalWithBootstrapButtons
    .fire({
      title: `Total a pagar $${costoTotal}`,
      text: "¿Desea continuar?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: "Sigo mirando",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          "¡Compra confirmada!",
          "¡Vuelva pronto!",
          "success"
        );
        carrito.length = 0;
        actualizarCarrito();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          "Cancelado",
          "Segui mirando tranquilo y despues compras",
          "error"
        );
      }
    });
};
