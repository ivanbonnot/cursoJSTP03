const precioProductoString = document.getElementById("precioProducto");
const elegirProducto = document.getElementById("elegirProducto");
const calcular = document.getElementById("calcular");
const reiniciar = document.getElementById("reinicio");
const mostrarCalculo = document.getElementById("calculo");

reiniciar.disabled = true;
elegirProducto.disabled = true;

let productosLista = [];

calcular.addEventListener("click", () => validarInput());
elegirProducto.addEventListener("change", () => mostrarProductoAnterior());
elegirProducto.addEventListener("click", () => verificacionUnSoloProducto());
reiniciar.addEventListener("click", () => limpiarHTML());

//Validar input
function validarInput() {
  const precioProducto = parseInt(precioProductoString.value);

  if (
    precioProducto === "" ||
    precioProducto <= 0 ||
    isNaN(precioProducto) ||
    document.getElementById("nombreProducto").value == ""
  ) {
    console.log("ingrese un precio válido");
    mostrarError();
  } else {
    calculo(precioProducto);
  }
}

//Calculo de precios
function calculo(precio) {
  const sinIva = precio - precio * 0.21;
  const seisCuotas = Math.ceil(precio / 6);
  const doceCuotas = Math.ceil((precio + precio * 0.3) / 12);
  const totalEnDoce = doceCuotas * 12;

  limpiarProductoAnterior();
  agregarAlHTML(precio, sinIva, seisCuotas, doceCuotas, totalEnDoce);
}

//Agregar al html
function agregarAlHTML(precio, sinIva, seisCuotas, doceCuotas, totalEnDoce) {
  const parrafo = document.createElement("div");
  parrafo.innerHTML = `<p>El precio <strong>sin IVA</strong> es: $${sinIva}</p> 
                         <p>El precio en <strong>6 cuotas</strong> es: $${seisCuotas}. El total es el mismo </p>
                         <p>El precio en <strong>12 cuotas</strong> con recargo es: $${doceCuotas}. El total es de $${totalEnDoce}</p>`;
  mostrarCalculo.appendChild(parrafo);
  calcular.disabled = true;
  reiniciar.disabled = false;
  elegirProducto.disabled = false;

  agregarAlArray(precio);
}

//Agregar el nombre del prod y el precio al Array
function agregarAlArray(precioProducto) {
  const nombreProducto = document.getElementById("nombreProducto").value;

  const productoObj = {
    id: Date.now(),
    producto: nombreProducto,
    precio: precioProducto,
  };

  productosLista = [...productosLista, productoObj];

  console.log(productosLista);

  while (elegirProducto.firstChild) {
    elegirProducto.removeChild(elegirProducto.firstChild);
  }

  agregarAlSelect();
}

//Agregar producto al select
function agregarAlSelect() {
  productosLista.forEach((producto) => {
    const elem = document.createElement("option");
    elem.innerHTML = `
             ${producto.producto}
        `;
    elegirProducto.appendChild(elem);
  });
}

//Mostrar el producto seleccionado en el select
function mostrarProductoAnterior() {
  limpiarHTML();
  const elegirProductoValue = document.getElementById("elegirProducto").value;
  console.log(elegirProductoValue);

  let mostrarProd = productosLista.filter(
    (prod) => prod.producto == `${elegirProductoValue}`
  );

  const parrafo = document.createElement("div");
  parrafo.classList.add("prodAnterior");
  parrafo.innerHTML = `<p>Producto: <strong>${mostrarProd[0].producto}</strong></p> 
                         <p>El precio es: <strong>$${mostrarProd[0].precio}</strong></p>`;
  mostrarCalculo.appendChild(parrafo);
}

//Si tengo un solo producto agregado al select, mostrarlo al hacer click
function verificacionUnSoloProducto() {
  if (productosLista.length === 1) {
    console.log("un solo elem");
    mostrarProductoAnterior();
  }
}

//Mostrar error si falta nombre de producto o precio
function mostrarError() {
  const errorDiv = document.querySelector(".error");
  const error = document.createElement("div");
  error.innerHTML = `Falta ingresar nombre o precio `;
  errorDiv.appendChild(error);

  setTimeout(() => {
    errorDiv.removeChild(error);
  }, 3000);
}

//Limpiar formulario
function limpiarHTML() {
  while (mostrarCalculo.firstChild) {
    mostrarCalculo.removeChild(mostrarCalculo.firstChild);
  }

  reiniciar.disabled = true;
  document.getElementById("nombreProducto").value = "";
  precioProductoString.value = "";
  calcular.disabled = false;
}

function limpiarProductoAnterior() {
  //Borrar texto de producto anterior al presionar btn Calcular
  if (document.querySelector(".prodAnterior")) {
    console.log(document.querySelector(".prodAnterior"));

    while (document.querySelector(".prodAnterior").firstChild) {
      document
        .querySelector(".prodAnterior")
        .removeChild(document.querySelector(".prodAnterior").firstChild);
    }
  }
}
