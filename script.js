const precioProductoString = document.getElementById("precioProducto")
const elegirProducto = document.getElementById("elegirProducto")
const calcular = document.getElementById('calcular')
const reiniciar = document.getElementById('reinicio')
const mostrarCalculo = document.getElementById('calculo')

reiniciar.disabled = true
let productosLista = []
console.log(elegirProducto)

calcular.addEventListener('click', () => validarInput())
elegirProducto.addEventListener('change', () => mostrarProductoAnterior())
reiniciar.addEventListener('click', () => LimpiarHTML())


//Validar input
function validarInput() {
    const precioProducto = parseInt(precioProductoString.value)
    console.log(precioProducto, typeof (precioProducto))

    if (precioProducto === '' || precioProducto <= 0 || isNaN(precioProducto)) {
        console.log("ingrese un precio válido")
    } else {
        calculo(precioProducto)
    }
}

//Calculo de precios
function calculo(precio) {
    const sinIva = precio - (precio * 0.21)
    const seisCuotas = Math.ceil((precio / 6))
    const doceCuotas = Math.ceil((precio + (precio * 0.3)) / 12)
    const totalEnDoce = doceCuotas * 12

    agregarAlHTML(precio, sinIva, seisCuotas, doceCuotas, totalEnDoce)
}

//Agregar al html
function agregarAlHTML(precio, sinIva, seisCuotas, doceCuotas, totalEnDoce) {
    const parrafo = document.createElement('div');
    parrafo.innerHTML = `<p>El precio sin IVA es: $${sinIva}</p> 
                         <p>El precio en 6 cuotas es: $${seisCuotas}. El total es el mismo </p>
                         <p>El precio en 12 cuotas con recargo es: $${doceCuotas}. El total es de $${totalEnDoce}</p>`
    mostrarCalculo.appendChild(parrafo);
    calcular.disabled = true
    reiniciar.disabled = false
    agregarAlArray(precio)
}

//Agregar al Array
function agregarAlArray(precioProducto) {

    const nombreProducto = document.getElementById('nombreProducto').value

    const productoObj = {
        id: Date.now(),
        producto: nombreProducto,
        precio: precioProducto
    }

    productosLista = [...productosLista, productoObj]

    console.log(productosLista)

    while (elegirProducto.firstChild) {
        elegirProducto.removeChild(elegirProducto.firstChild)
    }

    agregarAlSelect()
}

//Agregar producto al select
function agregarAlSelect() {
    productosLista.forEach(producto => {
        const elem = document.createElement('option');
        elem.innerHTML = `
             ${producto.producto}
        `;
        elegirProducto.appendChild(elem);
    });


}

function mostrarProductoAnterior() {
    LimpiarHTML()
    const elegirProductoValue = document.getElementById("elegirProducto").value
    console.log(elegirProductoValue)

    let mostrarProd = productosLista.filter(prod => prod.producto == `${elegirProductoValue}`)
    console.log(mostrarProd);

    const parrafo = document.createElement('div');
    parrafo.innerHTML = `<p>Producto: $${}</p> 
                         <p>El precio en 6 cuotas es: $${seisCuotas}. El total es el mismo </p>
                         <p>El precio en 12 cuotas con recargo es: $${doceCuotas}. El total es de $${totalEnDoce}</p>`
    mostrarCalculo.appendChild(parrafo);
}

//Limpiar formulario
function LimpiarHTML() {
    while (mostrarCalculo.firstChild) {
        mostrarCalculo.removeChild(mostrarCalculo.firstChild);
    }

    reiniciar.disabled = true
    precioProductoString.value = ''
    document.getElementById('nombreProducto').value = ''
    calcular.disabled = false
}