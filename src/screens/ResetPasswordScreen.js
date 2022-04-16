import React, { useState } from 'react'
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import Logo from '../components/Logo'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import { emailValidator } from '../helpers/emailValidator'
import { auth, db } from '../database/firebase'

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })

  const sendResetPasswordMail = async () => {
    const emailError = emailValidator(email.value)
    if (emailError) {
      setEmail({ ...email, error: emailError })
    } else {
      await auth.sendPasswordResetEmail(email.value)
      navigation.navigate('LoginScreen')
    }
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Recuperar constraseña</Header>
      <TextInput
        label="Correo electronico"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description="Recibira un link para la recuperacion de su correo"
      />
      <Button
        mode="contained"
        onPress={sendResetPasswordMail}
        style={{ marginTop: 16 }}
      >
        Enviar Instrucciones
      </Button>
    </Background>
  )
}
