import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { passwordValidator } from '../helpers/passwordValidator'
import { phoneValidator } from '../helpers/phoneValidator'
import firebase from '../database/firebase'

export default function LoginScreen({ navigation }) {
  const [number, setNumber] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const onLoginPressed = async () => {
    const numberError = phoneValidator(number.value)
    const passwordError = passwordValidator(password.value)
    if (numberError || passwordError) {
      setNumber({ ...number, error: numberError })
      setPassword({ ...password, error: passwordError })
      return
    }
    try {
      await firebase.auth().signInWithPhoneNumber(number.value, password.value).then((res) => {
        console.log(res)
        console.log('Inicio Sesion')
        navigation.reset({
          index: 0,
          routes: [{ name: 'Dashboard' }],
      })
    }
    }catch (error) {
      console.log(error)
    }
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Bienvenido de vuelta</Header>
      <TextInput
        label="Numero de telefono"
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
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>¿Olvido su contraseña?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Incio de sesion
      </Button>
      <View style={styles.row}>
        <Text>¿No tiene una cuenta? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Registrese</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
