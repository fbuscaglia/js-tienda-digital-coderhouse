const contenedorProductos = document.getElementById("contenedor-productos");
const contenedorCarrito = document.getElementById("carrito-contenedor");
const contadorCarrito = document.getElementById("contadorCarrito");
const precioTotal = document.getElementById("precioTotal");

let carrito = [];

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: false,
});

let stockProductos = [
  {
    id: 1,
    nombre: "Conjunto rosa",
    tipo: "lenceria",
    descripcion: "Pieza de lenceria",
    precio: 1200,
    cantidad: 1,
    img: "/assets/conjunto.jfif",
  },
  {
    id: 2,
    nombre: "Pantuflas negras",
    tipo: "calzado",
    descripcion: "Pantuflas ideales para el invierno",
    precio: 1000,
    cantidad: 1,
    img: "/assets/conjunto.jfif",
  },
  {
    id: 3,
    nombre: "Conjunto rojo",
    tipo: "lenceria",
    descripcion: "Pieza de lenceria",
    precio: 1200,
    cantidad: 1,
    img: "/assets/conjunto.jfif",
  },
  {
    id: 4,
    nombre: "Pantuflas rosas",
    tipo: "calzado",
    descripcion: "Pantuflas ideales para el invierno",
    precio: 1000,
    cantidad: 1,
    img: "/assets/conjunto.jfif",
  },
  {
    id: 5,
    nombre: "Pantuflas verdes",
    tipo: "calzado",
    descripcion: "Pantuflas ideales para el invierno",
    precio: 1000,
    cantidad: 1,
    img: "/assets/conjunto.jfif",
  },
  {
    id: 6,
    nombre: "Conjunto negro",
    tipo: "lenceria",
    descripcion: "Pieza de lenceria",
    precio: 1200,
    cantidad: 1,
    img: "/assets/conjunto.jfif",
  },
];

stockProductos.forEach((producto) => {
  const div = document.createElement("span");
  div.classList.add("producto");
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

const agregarAlCarrito = (productoId) => {
  const producto = stockProductos.find((prodId) => prodId.id === productoId);
  carrito.push(producto);
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Producto Agregado",
    showConfirmButton: false,
    timer: 1500,
  });
  actualizarCarrito();
};
let total = 0;

const actualizarCarrito = () => {
  contenedorCarrito.innerHTML = "";
  carrito.forEach((prod) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <p>${prod.nombre}</p>
    <p>${prod.precio}</p>
    <p>Cantidad: <span id='cantidad'>${prod.cantidad}</span></p>
    <button onClick="eliminarItem(${prod.id})" class="btn btn-danger"> Eliminar </button>
    `;

    contenedorCarrito.appendChild(div);
  });
  precioTotal.innerText = carrito
    .map((item) => item.precio)
    .reduce((prev, current) => prev + current, total);

  contadorCarrito.innerText = carrito.length;
};

const eliminarItem = (prodId) => {
  const item = carrito.find((prod) => prod.id === prodId);
  const indice = carrito.indexOf(item);
  Swal.fire({
    title: "Estas seguro?",
    text: "Despues podes volver a agregarlo.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Borrar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Listo!", "Articulo borrado.", "success");
      carrito.splice(indice, 1);
      actualizarCarrito();
    }
  });
  

};

const pagar = (carrito) => {
  let inicial = 0;
  const costoTotal = carrito.reduce((prev, current) => prev + current, inicial);
  console.log(`El precio total es: $${costoTotal}`);

  swalWithBootstrapButtons
    .fire({
      title: `Total a pagar ${costoTotal}`,
      text: "Desea continuar?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: "Sigo mirando",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          "Compra confirmada!",
          "Vuelva pronto!",
          "success"
        );
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          "Cancelado",
          "Segui mirando tranquilo y despues compras",
          "error"
        );
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
    title: "Estas seguro?",
    text: "Estas a punto de vaciar el carrito.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Borrar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Listo!", "Tu carrito esta vacio.", "success");
      carrito.length = 0;
      actualizarCarrito();
    }
  });
};
