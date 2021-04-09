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
import SessionRegister from './components/sessionForms/SessionRegister'
import CreateSession from './components/CreateSession'
import ViewSessionRegistrants from './components/ViewSessionRegistrants'

const useUsername = createPersistedState('username')
const useToken = createPersistedState('token')

function App () {
  const [username, setUsername] = useUsername(null)
  const [token, setToken] = useToken(null)
  const isLoggedIn = (username && token)
  const [isEditing, setIsEditing] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegistrationModal, setShowRegistrationModal] = useState(false)
  const [showSessionRegModal, setShowSessionRegModal] = useState(false)
  const [showCreateSessionModal, setShowCreateSessionModal] = useState(false)
  const [showRegSuccessfulAlert, setShowRegSuccessfulAlert] = useState(false)
  const [sessions, setSessions] = useState([])
  const [sessionToRegister, setSessionToRegister] = useState(null)
  const [dropdownSelectorMode, setDropdownSelectorMode] = useState('')

  function setAuth (username, token) {
    setUsername(username)
    setToken(token)
  }

  return (
    <Router>
      <div className='min-h-screen bg-blueGray-50'>

        <div className='bg-lilac pb-32'>
          <Nav token={token} setToken={setToken} username={username} setUsername={setUsername} isLoggedIn={isLoggedIn} setIsEditing={setIsEditing} showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} setShowCreateSessionModal={setShowCreateSessionModal} setShowRegistrationModal={setShowRegistrationModal} />
          <Header />
        </div>
        <Switch>
          <Route path='/registeradmin'>
            <Register token={token} isEditing={isEditing} showRegistrationModal={showRegistrationModal} setShowRegistrationModal={setShowRegistrationModal} />
          </Route>
          <Route path='/login'>
            <LoginModal setAuth={setAuth} showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} />
          </Route>
        </Switch>
        <main className='-mt-32'>
          <div className='max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8'>
            <Switch>
              <Route path='/book-study'>
                <BookStudy />
              </Route>
              <Route path='/sessions'>
                <Sessions token={token} isLoggedIn={isLoggedIn} sessions={sessions} setSessions={setSessions} setSessionToRegister={setSessionToRegister} showRegSuccessfulAlert={showRegSuccessfulAlert} setShowRegSuccessfulAlert={setShowRegSuccessfulAlert} showSessionRegModal={showSessionRegModal} setShowSessionRegModal={setShowSessionRegModal} />
              </Route>
              <Route path='/connect'>
                <Connect />
              </Route>
              <Route path='/session-register'>
                <SessionRegister sessions={sessions} sessionToRegister={sessionToRegister} setShowRegSuccessfulAlert={setShowRegSuccessfulAlert} showSessionRegModal={showSessionRegModal} setShowSessionRegModal={setShowSessionRegModal} />
              </Route>
              <Route path='/create-session'>
                <CreateSession token={token} showCreateSessionModal={showCreateSessionModal} setShowCreateSessionModal={setShowCreateSessionModal} />
              </Route>
              <Route path='/view-session-registrants'>
                <ViewSessionRegistrants token={token} isLoggedIn={isLoggedIn} showCreateSessionModal={showCreateSessionModal} setShowCreateSessionModal={setShowCreateSessionModal} dropdownSelectorMode={dropdownSelectorMode} setDropdownSelectorMode={setDropdownSelectorMode} />
              </Route>
              <Route path='/'>
                <Home />
              </Route>
            </Switch>
          </div>
        </main>
      </div>
    </Router>
  )
}

export default App
