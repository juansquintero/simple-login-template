import React from 'react'
import { Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { auth } from '../database/firebase'
import Button from '../components/Button'

const handleSignOut = ({ navigation }) => {
  auth.signOut()
  navigation.replace('StartScreen')
}

const HelloWorldApp = () => {
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>Hello, world!</Text>
      </View>
      <Button mode="contained" onPress={handleSignOut}>
        Log Out
      </Button>
    </>
  )
}
export default HelloWorldApp
