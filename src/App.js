import {Routes, Route} from 'react-router-dom'

import Home from './components/Home'
import LoginAndRegister from './components/LoginAndRegister'
import Cart from './components/Cart'
import MainItemsCont from './components/MainItemsCont'


import './App.css'

const App = () => {
  return (
    <Routes>
      <Route path='/' exact Component={Home} />
      <Route path='/login' exact Component={LoginAndRegister} />
      <Route path='/cart' exact Component={Cart} />
      <Route path='/items/:category/:subCategory' Component={MainItemsCont} />

    </Routes>
  )
}

export default App;