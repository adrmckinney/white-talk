import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import createPersistedState from 'use-persisted-state'
import './App.css'
// import Login from './components/Login'
import Register from './components/Register'
import Home from './Home'
import Header from './components/Header'
import Nav from './components/Nav'
import BookStudy from './components/BookStudy'
import Sessions from './components/Sessions'
import LoginModal from './components/LoginModal'
import Connect from './components/Connect'

const useUsername = createPersistedState('username')
const useToken = createPersistedState('token')

function App () {
  const [username, setUsername] = useUsername(null)
  const [token, setToken] = useToken(null)
  const isLoggedIn = (username && token)
  const [showModal, setShowModal] = useState(false)

  console.log('showModal', showModal)
  function setAuth (username, token) {
    setUsername(username)
    setToken(token)
  }
  console.log('isLoggedIn', isLoggedIn)
  console.log('username, token', username, token)
  return (
    <Router>
      <div className='min-h-screen bg-blueGray-50'>

        <div className='bg-lilac pb-32'>
          <Nav setToken={setToken} username={username} setUsername={setUsername} isLoggedIn={isLoggedIn} showModal={showModal} setShowModal={setShowModal} />
          <Header />
        </div>
        <Switch>
          <Route path='/registeradmin'>
            <Register />
          </Route>
          <Route path='/login'>
            <LoginModal setAuth={setAuth} showModal={showModal} setShowModal={setShowModal} />
          </Route>
        </Switch>
        <main className='-mt-32'>
          <div className='max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8'>
            {/* <!-- Replace with your content --> */}
            <Switch>
              <Route path='/book-study'>
                <BookStudy />
              </Route>
              <Route path='/sessions'>
                <Sessions />
              </Route>
              <Route path='/connect'>
                <Connect />
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
