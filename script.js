const precioProductoString = document.getElementById("precioProducto");
const elegirProducto = document.getElementById("elegirProducto");
const calcular = document.getElementById("calcular");
const reiniciar = document.getElementById("reinicio");
const mostrarCalculo = document.querySelector("#calculo");

reiniciar.disabled = true;
// elegirProducto.disabled = true;

let productosLista = [];

eventListeners()

function eventListeners() {
  calcular.addEventListener("click", validarInput);
  elegirProducto.addEventListener("change", mostrarProductoAnterior);
  elegirProducto.addEventListener("click", verificacionUnSoloProducto);
  mostrarCalculo.addEventListener("click", eliminarProducto);
  reiniciar.addEventListener("click", limpiarHTML);

  document.addEventListener('DOMContentLoaded', () => {
    productosLista = JSON.parse(localStorage.getItem('productos')) || [];
    productosLista.length === 0 ? elegirProducto.disabled = true : elegirProducto.disabled = false;
    agregarAlSelect()
  });
}



//Validar input
function validarInput() {
  const precioProducto = parseInt(precioProductoString.value);

  if (
    precioProducto === "" ||
    precioProducto <= 0 ||
    isNaN(precioProducto) ||
    document.getElementById("nombreProducto").value == ""
  ) {
    mostrarError('Falta ingresar nombre o precio', 1);
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
    fecha: new Date().toLocaleDateString()
  };

  productosLista = [...productosLista, productoObj];

  localStorage.setItem('productos', JSON.stringify(productosLista));
  limpiarSelect();
  agregarAlSelect();
}

//Agregar producto al select
function agregarAlSelect() {
  limpiarSelect()
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
  console.log(elegirProductoValue)
  let mostrarProd = productosLista.filter(
    (prod) => prod.producto == `${elegirProductoValue}`
  );

  if (mostrarProd.length >= 2) {
    mostrarError('Hay dos productos con el mismo nombre', 2)
  }

  const [prod] = mostrarProd
  const { producto, fecha, precio, id } = prod
  console.log()
  const parrafo = document.createElement("div");
  parrafo.classList.add("prodAnterior");
  parrafo.innerHTML = `<p>Producto: <strong>${producto}</strong></p> 
                       <p>Agregado el dia: <strong>${fecha}</strong></p>
                       <p>El precio es: <strong>$${precio}</strong></p>
                       <a href="#" class="btn eliminar-btn" id="eliminar" data-id="${id}">Borrar</a>`;
  mostrarCalculo.appendChild(parrafo);
}

//Si tengo un solo producto agregado al select, mostrarlo al hacer click
function verificacionUnSoloProducto() {
  if (productosLista.length === 1) {
    mostrarProductoAnterior();
  }
}

//Eliminar producto guardado en el array, que se muestra en el select del html
function eliminarProducto(e) {
  e.preventDefault()

  if (e.target.classList.contains('eliminar-btn')) {
    const producto = e.target.parentElement.parentElement;
    const productoId = producto.querySelector('a').getAttribute('data-id');
    localStorage.removeItem('productos'); //Remuevo el array entero del LS
    productosLista = productosLista.filter(producto => producto.id != productoId);
    localStorage.setItem('productos', JSON.stringify(productosLista)); //Seteo el nuevo array sin el producto elegido para borrar
    productosLista.length === 0 ? elegirProducto.disabled = true : elegirProducto.disabled = false;
    limpiarProductoAnterior();
    agregarAlSelect();
  }
}

//Mostrar error si falta nombre de producto o precio
function mostrarError(mensaje, ubicacion) {
  const errorUnoDiv = document.querySelector(".error-uno");
  const errorDosDiv = document.querySelector(".error-dos");
  const error = document.createElement("div");
  error.innerHTML = `${mensaje} `;

  if (ubicacion === 1) {

    errorUnoDiv.appendChild(error);
    setTimeout(() => {
      errorUnoDiv.removeChild(error);
    }, 3000);

  } else {
    errorDosDiv.appendChild(error)
    setTimeout(() => {
      errorDosDiv.removeChild(error);
    }, 3000);
  }
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

//Borrar texto de producto anterior al presionar btn Calcular
function limpiarProductoAnterior() {
  if (document.querySelector(".prodAnterior")) {
    while (document.querySelector(".prodAnterior").firstChild) {
      document
        .querySelector(".prodAnterior")
        .removeChild(document.querySelector(".prodAnterior").firstChild);
    }
  }
}

//Funcion para limpiar el Select del HTML
function limpiarSelect() {
  while (elegirProducto.firstChild) {
    elegirProducto.removeChild(elegirProducto.firstChild);
  }
}
