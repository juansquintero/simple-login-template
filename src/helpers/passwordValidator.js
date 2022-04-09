export function passwordValidator(password) {
  if (!password) return "La contraseña no puede estar vacia"
  if (password.length < 5) return 'La contraseña debe ser de minimo 5 caracteres'
  return ''
}
