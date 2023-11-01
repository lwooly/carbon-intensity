import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import store from './app/store'
import { Provider } from 'react-redux'

console.log(`hello`)
let age:number = 14;
age = '15'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
  </Provider>,
  </React.StrictMode>,
)
