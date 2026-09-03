/* =========================================
HOME DAY - JAVASCRIPT
========================================= */

/* =========================================
PRODUCTOS
========================================= */

const productos = [

    {
        id: 1,
        nombre: "Cobija Sencilla",
        categoria: "Cobijas",
        precio: 50000,
        descripcion: "Cobija suave y cómoda para descansar.",
        imagen: "cobija sencilla.png"
    },

    {
        id: 2,
        nombre: "Cobija doble",
        categoria: "Cobijas",
        precio: 70000,
        descripcion: "Cobija de mayor tamaño y excelente calidad.",
        imagen: "cobija doble.png"
    },

    {
        id: 3,
        nombre: "Cobertor Clásico",
        categoria: "Cobertores",
        precio: 50000,
        descripcion: "Cobertor ideal para darle mayor comodidad a tu cama.",
        imagen: "covertor.png"
    },

    {
        id: 4,
        nombre: "Ruana Niño",
        categoria: "Ruanas",
        precio: 38000,
        descripcion: "Ruana cómoda y abrigadora para días fríos.",
        imagen: "ruana niño.jpeg"
    },
    
    {
        id: 5,
        nombre: "Ruana Adulto",
        categoria: "Ruanas",
        precio: 50000,
        descripcion: "Ruana de estilo elegante y gran comodidad.",
        imagen: "ruana adulto.jpeg"
    },

    {
        id: 6,
        nombre: "Buzo De Osito",
        categoria: "Buzos",
        precio: 35000,
        descripcion: "Buzo cómodo para utilizar todos los días.",
        imagen: "buzo osito.jpeg"
    }

];

/* =========================================
CARRITO
========================================= */

let carrito = [];

/* =========================================
MOSTRAR PRODUCTOS
========================================= */

function mostrarProductos(lista = productos) {


const contenedor = document.getElementById("lista-productos");

if (!contenedor) return;

contenedor.innerHTML = "";

if (lista.length === 0) {

    contenedor.innerHTML = `
        <div class="sin-productos">
            <h3>No encontramos productos</h3>
            <p>Intenta buscar otro producto.</p>
        </div>
    `;

    return;
}

lista.forEach(producto => {

    const tarjeta = document.createElement("div");

    tarjeta.className = "producto";

    tarjeta.innerHTML = `

        <div class="producto-imagen">
            ${
    producto.imagen.includes(".")
        ? `<img src="${producto.imagen}" alt="${producto.nombre}">`
        : producto.imagen
}
        </div>

        <div class="producto-info">

            <span class="producto-categoria">
                ${producto.categoria}
            </span>

            <h3>
                ${producto.nombre}
            </h3>

            <p class="producto-descripcion">
                ${producto.descripcion}
            </p>

            <div class="producto-precio">
                ${formatearPrecio(producto.precio)}
            </div>

            <button
                class="boton-agregar"
                onclick="agregarAlCarrito(${producto.id})"
            >
                🛒 Agregar al carrito
            </button>

        </div>
    `;

    contenedor.appendChild(tarjeta);

});


}

/* =========================================
FORMATO DE PRECIO
========================================= */

function formatearPrecio(precio) {


return precio.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
});


}

/* =========================================
AGREGAR AL CARRITO
========================================= */

function agregarAlCarrito(id) {


const producto = productos.find(p => p.id === id);

if (!producto) return;

const productoExistente = carrito.find(p => p.id === id);

if (productoExistente) {

    productoExistente.cantidad++;

} else {

    carrito.push({
        ...producto,
        cantidad: 1
    });

}

actualizarCarrito();

abrirCarrito();


}

/* =========================================
ACTUALIZAR CARRITO
========================================= */

function actualizarCarrito() {


const contenedor = document.getElementById("productos-carrito");
const contador = document.getElementById("contador-carrito");
const totalElemento = document.getElementById("total-carrito");

if (!contenedor) return;

contenedor.innerHTML = "";

let total = 0;
let cantidadTotal = 0;

if (carrito.length === 0) {

    contenedor.innerHTML = `
        <p class="carrito-vacio">
            Tu carrito está vacío.
        </p>
    `;

} else {

    carrito.forEach(producto => {

        total += producto.precio * producto.cantidad;

        cantidadTotal += producto.cantidad;

        const elemento = document.createElement("div");

        elemento.className = "producto-carrito";

        elemento.innerHTML = `

            <div class="producto-carrito-info">

                <h4>
                    ${producto.nombre}
                </h4>

                <p>
                    ${formatearPrecio(producto.precio)}
                </p>

            </div>

            <div class="controles-cantidad">

                <button
                    onclick="cambiarCantidad(${producto.id}, -1)"
                >
                    −
                </button>

                <span>
                    ${producto.cantidad}
                </span>

                <button
                    onclick="cambiarCantidad(${producto.id}, 1)"
                >
                    +
                </button>

            </div>

            <button
                class="eliminar-producto"
                onclick="eliminarDelCarrito(${producto.id})"
                title="Eliminar"
            >
                🗑️
            </button>

        `;

        contenedor.appendChild(elemento);

    });

}

contador.textContent = cantidadTotal;

totalElemento.textContent = formatearPrecio(total);


}

/* =========================================
CAMBIAR CANTIDAD
========================================= */

function cambiarCantidad(id, cambio) {


const producto = carrito.find(p => p.id === id);

if (!producto) return;

producto.cantidad += cambio;

if (producto.cantidad <= 0) {

    carrito = carrito.filter(p => p.id !== id);

}

actualizarCarrito();


}

/* =========================================
ELIMINAR PRODUCTO
========================================= */

function eliminarDelCarrito(id) {


carrito = carrito.filter(producto => producto.id !== id);

actualizarCarrito();


}

/* =========================================
ABRIR CARRITO
========================================= */

function abrirCarrito() {


const fondo = document.getElementById("fondo-carrito");

if (fondo) {

    fondo.classList.add("activo");

    document.body.style.overflow = "hidden";

}


}

/* =========================================
CERRAR CARRITO
========================================= */

function cerrarCarrito() {


const fondo = document.getElementById("fondo-carrito");

if (fondo) {

    fondo.classList.remove("activo");

    document.body.style.overflow = "auto";

}


}

/* =========================================
FILTRAR CATEGORÍA
========================================= */

function filtrarCategoria(categoria) {


const productosFiltrados = productos.filter(
    producto => producto.categoria === categoria
);

mostrarProductos(productosFiltrados);

document.getElementById("productos").scrollIntoView({
    behavior: "smooth"
});


}

/* =========================================
BUSCADOR
========================================= */

function buscarProducto() {


const buscador = document.getElementById("buscador");

if (!buscador) return;

const texto = buscador.value.toLowerCase().trim();

const resultados = productos.filter(producto =>

    producto.nombre.toLowerCase().includes(texto) ||

    producto.categoria.toLowerCase().includes(texto) ||

    producto.descripcion.toLowerCase().includes(texto)

);

mostrarProductos(resultados);


}

/* =========================================
PEDIDO POR WHATSAPP
========================================= */

function enviarPedidoWhatsApp() {


if (carrito.length === 0) {

    alert("Tu carrito está vacío.");

    return;

}

const nombre =
    document.getElementById("nombre-cliente").value.trim();

const direccion =
    document.getElementById("direccion-cliente").value.trim();

const ciudad =
    document.getElementById("ciudad-cliente").value.trim();


if (!nombre || !direccion || !ciudad) {

    alert(
        "Por favor completa tu nombre, dirección y ciudad."
    );

    return;

}


let mensaje = "🛍️ *NUEVO PEDIDO - HOME DAY*%0A%0A";

mensaje += "👤 *Cliente:* " + nombre + "%0A";

mensaje += "📍 *Dirección:* " + direccion + "%0A";

mensaje += "🏙️ *Ciudad:* " + ciudad + "%0A%0A";

mensaje += "🛒 *PRODUCTOS:*%0A";


let total = 0;


carrito.forEach(producto => {

    const subtotal =
        producto.precio * producto.cantidad;

    total += subtotal;

    mensaje +=
        "• " +
        producto.nombre +
        " x" +
        producto.cantidad +
        " - " +
        formatearPrecio(subtotal) +
        "%0A";

});


mensaje += "%0A💰 *TOTAL: " +
    formatearPrecio(total);


const numeroWhatsApp = "573042368566";


const url =
    "https://wa.me/" +
    numeroWhatsApp +
    "?text=" +
    mensaje;


window.open(url, "_blank");


}

/* =========================================
CERRAR CARRITO AL HACER CLIC AFUERA
========================================= */

document.addEventListener("DOMContentLoaded", function () {


mostrarProductos();

actualizarCarrito();


const fondo =
    document.getElementById("fondo-carrito");


if (fondo) {

    fondo.addEventListener("click", function (evento) {

        if (evento.target === fondo) {

            cerrarCarrito();

        }

    });

}


});
