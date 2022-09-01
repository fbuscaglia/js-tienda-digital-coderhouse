const contenedorProductos = document.getElementById("contenedor-productos");

let carrito = []

let stockProductos = [
  {
    id: 1,
    nombre: "Conjunto rosa",
    tipo: "lenceria",
    descripcion: "Pieza de lenceria",
    precio: 1200,
    img: "/assets/conjunto.jfif",
  },
  {
    id: 2,
    nombre: "Pantuflas negras",
    tipo: "calzado",
    descripcion: "Pantuflas ideales para el invierno",
    precio: 1000,
    img: "/assets/conjunto.jfif",
  },
  {
    id: 3,
    nombre: "Conjunto rojo",
    tipo: "lenceria",
    descripcion: "Pieza de lenceria",
    precio: 1200,
    img: "/assets/conjunto.jfif",
  },
  {
    id: 4,
    nombre: "Pantuflas rosas",
    tipo: "calzado",
    descripcion: "Pantuflas ideales para el invierno",
    precio: 1000,
    img: "/assets/conjunto.jfif",
  },
  {
    id: 5,
    nombre: "Pantuflas verdes",
    tipo: "calzado",
    descripcion: "Pantuflas ideales para el invierno",
    precio: 1000,
    img: "/assets/conjunto.jfif",
  },
  {
    id: 6,
    nombre: "Conjunto negro",
    tipo: "lenceria",
    descripcion: "Pieza de lenceria",
    precio: 1200,
    img: "/assets/conjunto.jfif",
  },
];

stockProductos.forEach((producto) => {
  const div = document.createElement("div");
  div.classList.add("producto");
  div.innerHTML = `
        <div class="inline-block card">
          <img
            class="card-img-top"
            src=${producto.img}
            alt=""
          />
          <div class="card-body">
            <h4 class="card-title">${producto.nombre}</h4>
            <p class="card-text">${producto.descripcion}</p>
            <p>$${producto.precio}</p>
            <button
              id='agregar${producto.id}'
              onClick='formaDePago(${producto.id})'
              class="btn btn-primary float-right"
              >Comprar <i class="fa fa-shopping-cart></i>"</button
            >
          </div>
        </div>
  `;
  contenedorProductos.appendChild(div);

  // const boton = document.getElementById('agregar${producto.id}')

  // boton.addEventListener('click', () => {
  //   formaDePago(producto.id)
  // })
});

const formaDePago = (productoId) => {
  const producto = stockProductos.find((prodId) => prodId.id === productoId);

  let valor = producto.precio;
  let nombre = producto.nombre;

  let paymentMethod = prompt(
    `${nombre} cuesta $${valor}. Como quieres abonar? Los metodos validos son Tarjeta, Transferencia o Efectivo`
  ).toLowerCase();

  switch (paymentMethod) {
    case "tarjeta":
      return alert(
        (text = `El precio sobre la compra de tu ${nombre} se mantiene igual. El costo es $${valor}`)
      );

    case "transferencia":
      return alert(
        (text = `Tenés un descuento del 10% sobre la compra de tu ${nombre}. El precio pasa a ser $${
          valor * 0.9
        }`)
      );

    case "efectivo":
      return alert(
        (text = `Tenés un descuento del 20% sobre la compra de tu ${nombre}. El precio pasa a ser $${
          valor * 0.8
        }`)
      );

    default:
      return alert((text = "No conozco ese metodo de pago."));
  }
};

// console.log(formaDePago())
