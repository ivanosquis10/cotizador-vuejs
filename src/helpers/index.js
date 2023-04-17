const calcularTotalPagar = (cantidad, plazo) => {
  let total
  // mientras mayor sea la cantidad, menor es el interés
  if (cantidad < 5000) {
    total = cantidad * 1.5 // seria el 50%
  } else if (cantidad >= 5000 && cantidad < 10000) {
    total = cantidad * 1.4
  } else if (cantidad >= 10000 && cantidad < 15000) {
    total = cantidad * 1.4
  } else {
    total = cantidad * 1.3
  }

  // mientras mas plazo, mayor el interes
  if (plazo === 6) {
    total *= 1.1
  } else if (plazo === 12) {
    total *= 1.2
  } else {
    total *= 1.3
  }

  return total
}

const formatearDinero = (valor) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  return formatter.format(valor)
}

export { calcularTotalPagar }
