import {Routes, Route} from 'react-router-dom'

import Home from './components/Home'
import LoginAndRegister from './components/LoginAndRegister'

import './App.css'

const App = () => {
  return (
    <Routes>
      <Route path='/' exact Component={Home} />
      <Route path='/login' exact Component={LoginAndRegister} />
    </Routes>
  )
}

export default App;