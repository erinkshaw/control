import React from 'react'
import Main from '../Main/Main'
import { Provider } from 'react-redux'
import store from '../../redux/store'

const App = () =>
  <Provider store={store}>
    <Main />
  </Provider>

export default App
