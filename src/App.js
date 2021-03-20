import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import Home from './Home'

function App () {
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route>
            <Register />
          </Route>
          <Route>
            <Login />
          </Route>
          <Route>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
