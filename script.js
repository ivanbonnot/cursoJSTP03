const precioProductoString = document.getElementById("precioProducto")
const calcular = document.getElementById('calcular')
const reiniciar = document.getElementById('reinicio')
const mostrarCalculo = document.getElementById('calculo')

reiniciar.disabled = true

calcular.addEventListener('click', () => validarInput())
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


//Precio sin iva
function calculo(precio) {
    const sinIva = precio - (precio * 0.21)
    const seisCuotas = Math.ceil((precio / 6))
    const doceCuotas = Math.ceil((precio + (precio * 0.3)) / 12)
    const totalEnDoce = doceCuotas * 12

    agregarAlHTML(sinIva, seisCuotas, doceCuotas, totalEnDoce)
}

//Agregar al html
function agregarAlHTML(sinIva, seisCuotas, doceCuotas, totalEnDoce) {
    const parrafo = document.createElement('div');
    parrafo.innerHTML = `<p>El precio sin IVA es: $${sinIva}</p> 
                         <p>El precio en 6 cuotas es: $${seisCuotas}. El total es el mismo </p>
                         <p>El precio en 12 cuotas con recargo es: $${doceCuotas}. El total es de $${totalEnDoce}</p>`
    mostrarCalculo.appendChild(parrafo);
    calcular.disabled = true
    reiniciar.disabled = false
}


//Limpiar formulario
function LimpiarHTML() {
    while (mostrarCalculo.firstChild) {
        mostrarCalculo.removeChild(mostrarCalculo.firstChild);
    }
    reiniciar.disabled = true
    precioProductoString.value = ''
    calcular.disabled = false
}