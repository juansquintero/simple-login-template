export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/
  if (!email) return 'El correo no puede estar vacio'
  if (!re.test(email)) return 'Ooops! Necesitamos una correo valido'
  return ''
}
