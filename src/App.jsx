import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Navbar>

        </Navbar>
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route exact path='/users/:userId' component={User}> </Route>
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App
