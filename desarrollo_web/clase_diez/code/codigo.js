function crear_producto_nuevo(_nombre, _precio, _cantidad_disponible, _imagen) {
    return {
        nombre: _nombre,
        precio: _precio,
        cantidad_disponible: _cantidad_disponible,
        imagen: _imagen
    };
}

function crear_tarjeta(nombre, precio, cantidad_disponible, imagen) {
    let div = document.createElement("div");
    div.className = "producto";

    let _nombre = document.createElement("h3");
    _nombre.innerText = nombre;
    div.appendChild(_nombre);

    let img = document.createElement("img");
    img.src = imagen; 
    img.alt = nombre;
    img.className = "producto-imagen";
    div.appendChild(img);

    let _precio = document.createElement("p");
    _precio.innerText = "Precio: $" + precio;
    div.appendChild(_precio);

    let _cantidad_disponible = document.createElement("p");
    _cantidad_disponible.innerText = "Cantidad disponible: " + cantidad_disponible;
    div.appendChild(_cantidad_disponible);

    let boton = document.createElement("button");
    boton.innerText = "Agregar al carrito";

    boton.addEventListener("click", function () {
        if (cantidad_disponible > 0) {
            agregar_al_carrito(nombre, precio);
            cantidad_disponible --; 
            _cantidad_disponible.innerText = "Cantidad disponible: " + cantidad_disponible;

            let mensajeExistente = div.querySelector(".mensaje");
            if (!mensajeExistente) {
                let mensaje = document.createElement("h3");
                mensaje.innerText = "¡Producto agregado!";
                mensaje.className = "mensaje";
                div.appendChild(mensaje);

                boton.innerText = "Agregado";

                setTimeout(function () {
                    mensaje.remove();
                    boton.innerText = "Agregar al carrito";
                }, 2000);
            }
        }
    });

    div.appendChild(boton);
    document.getElementById("contenedor").appendChild(div);
}

function agregar_al_carrito(nombre, precio) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push({ nombre, precio });
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizar_carrito();
}

function actualizar_carrito() {
    const carritoContenido = document.getElementById("carrito-contenido");
    if (!carritoContenido) return; 

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carritoContenido.innerHTML = ""; 

    if (carrito.length === 0) {
        carritoContenido.innerHTML = "<p>El carrito está vacío.</p>";
    } else {
        carrito.forEach((item) => {
            let div = document.createElement("div");
            div.innerHTML = `<p>${item.nombre} - $${item.precio}</p>`;
            carritoContenido.appendChild(div);
        });
    }

    let total = carrito.reduce((acc, item) => acc + item.precio, 0);
    const totalElemento = document.getElementById("total");
    if (totalElemento) totalElemento.innerText = "Total: $" + total;
}

function vaciar_carrito() {
    if (confirm("¿Estás seguro de que deseas vaciar el carrito?")) {
        localStorage.removeItem('carrito');
        actualizar_carrito(); 
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes("carrito.html")) {
        actualizar_carrito();

        const vaciarButton = document.getElementById("vaciar-carrito");
        if (vaciarButton) {
            vaciarButton.addEventListener("click", vaciar_carrito);
        }
    }
});

let productos = [
    crear_producto_nuevo("Collar de perlas", 20000, 5, "../img/collarPerlas.jpg"),
        crear_producto_nuevo("Anillo de plata", 20000, 3, "../img/anilloPlata.jpg"),
        crear_producto_nuevo("Pulsera de oro", 30000, 8, "../img/pulseraOro.avif"),
        crear_producto_nuevo("Aretes de diamante", 50000, 10, "../img/aretesDiamante.avif"),
        crear_producto_nuevo("Tiara de diamantes", 100000, 4, "../img/tiaraDiamante.jpg"),
        crear_producto_nuevo("Reloj de oro blanco", 18000, 4, "../img/relojOroB.jpg"),
        crear_producto_nuevo("Broche de oro rosa", 20000, 4, "../img/brocheOroR.jpg"),
        crear_producto_nuevo("Collar de diamantes", 100000, 4, "../img/collarDiamante.jpg"),
    

        
        crear_producto_nuevo("Tiara de esmeraldas", 80000, 4, "../img/tiaraEsmeralda.webp"),
        crear_producto_nuevo("Collar de rubíes", 45000, 7, "../img/collarRubi.jpg"),
        crear_producto_nuevo("Anillo de esmeralda", 60000, 5, "../img/anilloEsmeralda.avif"),
        crear_producto_nuevo("Pulsera de zafiros", 35000, 10, "../img/pulseraZafiro.jpg")

];

productos.forEach(function (producto) {
    crear_tarjeta(producto.nombre, producto.precio, producto.cantidad_disponible, producto.imagen);
});

document.addEventListener("DOMContentLoaded", () => {
    const carruselItems = document.querySelector(".carrusel-items");
    let index = 0;

    setInterval(() => {
        index = (index + 1) % carruselItems.children.length;
        carruselItems.style.transform = `translateX(-${index * 100}%)`;
    }, 3000); 
});
