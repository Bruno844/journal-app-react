import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import {Provider} from 'react-redux'
import JournalApp from './JournalApp.jsx'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>

      <BrowserRouter>
        <JournalApp />
      </BrowserRouter>

    </Provider>
   
   
  </React.StrictMode>,
)
