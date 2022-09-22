// DEFINICION DE VARIABLES

const contenedorProductos = document.getElementById("contenedor-productos");
const contenedorCarrito = document.getElementById("carrito-contenedor");
const contadorCarrito = document.getElementById("contadorCarrito");
const precioTotal = document.getElementById("precioTotal");
const subTotal = document.getElementById("subtotal");
const botonCarrito = document.getElementById("boton-carrito");
const carritoCerrar = document.getElementById("carritoCerrar");
const carritoVaciar = document.getElementById("vaciar-carrito");
const continuarCompra = document.getElementById("continuar-compra");
const buttonGroup = document.getElementById("button-group");

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
    destacado: 1,
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
    destacado: 1,
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
    destacado: 1,
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
    destacado: 0,
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
    destacado: 0,
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
    destacado: 1,
    ventas: 2320,
  },
  {
    id: 7,
    nombre: "Conjunto negro",
    tipo: "lenceria",
    descripcion: "Pieza de lenceria",
    precio: 1100,
    cantidad: 1,
    img: "assets/conjunto.jfif",
    destacado: 1,
    ventas: 2380,
  },
  {
    id: 8,
    nombre: "Conjunto negro",
    tipo: "lenceria",
    descripcion: "Pieza de lenceria",
    precio: 1100,
    cantidad: 1,
    img: "assets/conjunto.jfif",
    destacado: 0,
    ventas: 21350,
  },
  {
    id: 9,
    nombre: "Conjunto negro",
    tipo: "lenceria",
    descripcion: "Pieza de lenceria",
    precio: 1100,
    cantidad: 1,
    img: "assets/conjunto.jfif",
    destacado: 1,
    ventas: 2399,
  },
  {
    id: 10,
    nombre: "Conjunto negro",
    tipo: "lenceria",
    descripcion: "Pieza de lenceria",
    precio: 4100,
    cantidad: 1,
    img: "assets/conjunto.jfif",
    destacado: 0,
    ventas: 2000,
  },
  {
    id: 11,
    nombre: "Conjunto negro",
    tipo: "lenceria",
    descripcion: "Pieza de lenceria",
    precio: 200,
    cantidad: 1,
    img: "assets/conjunto.jfif",
    destacado: 0,
    ventas: 7230,
  },
  {
    id: 12,
    nombre: "Conjunto negro",
    tipo: "lenceria",
    descripcion: "Pieza de lenceria",
    precio: 100,
    cantidad: 1,
    img: "assets/conjunto.jfif",
    destacado: 1,
    ventas: 2390,
  },
];
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: false,
});

// TODO FILTRAR POR DESTACADOS

const filtroPorPrecioAsc = (a, b) => a.precio - b.precio;
const filtroPorPrecioDesc = (a, b) => b.precio - a.precio;
const filtroPorMasVendidos = (a, b) => b.ventas - a.ventas;
const filtroPorDestacado = (a, b) => b.destacado - a.destacado;

let botonesFiltro = [
  { valor: "Más Vendidos", filtro: filtroPorMasVendidos },
  { valor: "Mayor Precio", filtro: filtroPorPrecioDesc },
  { valor: "Menor Precio", filtro: filtroPorPrecioAsc },
  { valor: "Destacados", filtro: filtroPorDestacado },
];

// LOCALSTORAGE

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    actualizarCarrito();
  }
});

// ORDENAR ARTICULOS

botonesFiltro.forEach((boton) => {
  const bot = document.createElement("div");
  bot.classList.add();
  bot.innerHTML = `
  <div>
    <button class="btn btn-secondary" onclick="ordenar(${boton.filtro})"> ${boton.valor}</button>
  </div>
 `;
  buttonGroup.appendChild(bot);
});

const ordenar = (opcion) => {
  while (contenedorProductos.firstChild) {
    contenedorProductos.removeChild(contenedorProductos.firstChild);
  }
console.log(opcion)
  stockProductos.sort(opcion).forEach((producto) => {
    const div = document.createElement("span");
    div.classList.add("my-2", "col-6", "col-md-4", "col-lg-3");
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
  div.classList.add("my-2", "col-6", "col-md-4", "col-lg-3");
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
    localStorage.setItem("carrito", JSON.stringify(carrito));
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
          timer: 1000,
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
      timer: 1000,
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
      localStorage[0] = 1 ? localStorage.removeItem("carrito") : "";
      carrito.length < 1
        ? (cerrarCarrito(), actualizarCarrito())
        : actualizarCarrito();
    }
  });
};

const abrirCarrito = () => {
  let x = document.getElementById("carrito");
  let boton = document.getElementById("boton-carrito");

  Swal.fire({
    title: "Carrito",
    text: "Estas a punto de vaciar el carrito.",

    showCancelButton: true,
    confirmButtonColor: "green",
    cancelButtonColor: "red",
    confirmButtonText: "Comprar",
    cancelButtonText: "Cancelar",
  });

  if (carrito.length > 0) {
    if (x.style.display === "none") {
      x.style.display = "block";
      boton.style.zIndex = 0;
    } else {
      x.style.display = "none";
      boton.style.zIndex = 10;
    }
  } else {
    x.style.display = "none";
    boton.style.zIndex = 10;
  }
};

const cerrarCarrito = () => {
  let x = document.getElementById("carrito");
  let boton = document.getElementById("boton-carrito");

  if (x.style.display !== "none") {
    x.style.display = "none";
    boton.style.zIndex = 1;
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
      localStorage.removeItem("carrito");
      actualizarCarrito();
      cerrarCarrito();
    }
    actualizarCarrito();
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
        cerrarCarrito();
        carrito.length = 0;
        localStorage.removeItem("carrito");
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

const pago = () => {
  pagar(carrito);
};

// EVENTOS

botonCarrito.addEventListener("click", abrirCarrito);
carritoCerrar.addEventListener("click", cerrarCarrito);
carritoVaciar.addEventListener("click", vaciarCarrito);
continuarCompra.addEventListener("click", pago);
