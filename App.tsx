import React from 'react'
import { NativeBaseProvider } from 'native-base'
import TimezoneClock from './modules/TimezoneClock'
import CountDownsList from './modules/CountDownsList'

const App = () => {
  return (
    <NativeBaseProvider>
      <TimezoneClock />
      {/*<CountDownsList/>*/}
    </NativeBaseProvider>
  )
}

export default App