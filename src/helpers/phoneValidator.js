export function phoneValidator(number) {
  const phonenum = /^\d{10}$/
  if (!number) return '¡El numero no puede estar vacio!'
  if (!phonenum.test(number)) return '¡Ooops! Necesitamos un numero valido.'
  return ''
}
