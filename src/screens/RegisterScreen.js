import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import { getDocs, setDoc, doc } from 'firebase/firestore'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator } from '../helpers/nameValidator'
import { phoneValidator } from '../helpers/phoneValidator'
import { auth, db } from '../database/firebase'
import { emailValidator } from '../helpers/emailValidator'

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' })
  const [number, setNumber] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [mail, setMail] = useState({ value: '', error: '' })

  const onSignUpPressed = async () => {
    const nameError = nameValidator(name.value)
    const numberError = phoneValidator(number.value)
    const passwordError = passwordValidator(password.value)
    const mailError = emailValidator(mail.value)
    if (numberError || passwordError || nameError || mailError) {
      setName({ ...name, error: nameError })
      setNumber({ ...number, error: numberError })
      setPassword({ ...password, error: passwordError })
      setMail({ ...mail, error: mailError })
      return
    }

    await auth
      .createUserWithEmailAndPassword(mail.value, password.value)
      .then((userCredentials) => {
        const user = userCredentials.user
        console.log('Usuario registrado', user.email, user.uid)
        setDoc(doc(db, 'users', user.uid), {
          name: name.value,
          mail: mail.value,
          number: number.value,
        })
      })
      .catch((error) => alert(error.message))
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    })
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Nuevo Registro</Header>
      <TextInput
        label="Nombre"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Correo"
        returnKeyType="next"
        value={mail.value}
        onChangeText={(text) => setMail({ value: text, error: '' })}
        error={!!number.error}
        errorText={number.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Numero telefonico"
        returnKeyType="next"
        value={number.value}
        onChangeText={(text) => setNumber({ value: text, error: '' })}
        error={!!number.error}
        errorText={number.error}
        autoCapitalize="none"
        autoCompleteType="tel"
        textContentType="telephoneNumber"
        keyboardType="phone-pad"
      />
      <TextInput
        label="Contraseña"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Registro
      </Button>
      <View style={styles.row}>
        <Text>¿Ya tiene una cuenta? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Inicie sesion</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
