import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import createPersistedState from 'use-persisted-state'
import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import Home from './Home'
import Header from './components/Header'
import Nav from './components/Nav'
import BookStudy from './components/BookStudy'

const useUsername = createPersistedState('username')
const useToken = createPersistedState('token')

function App () {
  const [username, setUsername] = useUsername(null)
  const [token, setToken] = useToken(null)
  const isLoggedIn = (username && token)

  function setAuth (username, token) {
    setUsername(username)
    setToken(token)
  }
  console.log('isLoggedIn', isLoggedIn)
  console.log('username, token', username, token)
  return (
    <Router>
      <div className='min-h-screen bg-blueGray-50'>

        <div className='bg-mediumPurple pb-32'>
          <Nav setToken={setToken} username={username} setUsername={setUsername} isLoggedIn={isLoggedIn} />
          <Header />
        </div>
        <Switch>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/login'>
            <Login setAuth={setAuth} />
          </Route>
        </Switch>
        <main className='-mt-32'>
          <div className='max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8'>
            {/* <!-- Replace with your content --> */}
            <Switch>
              <Route path='/book-study'>
                <BookStudy />
              </Route>
              <Route path='/'>
                <Home />
              </Route>
            </Switch>
            {/* <!-- /End replace --> */}
          </div>
        </main>

      </div>
    </Router>
  )
}

export default App
