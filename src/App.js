import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import createPersistedState from 'use-persisted-state'
import './App.css'
import { getUser } from './api'
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
import ViewForm from './components/ViewForm'

const useUsername = createPersistedState('username')
const useToken = createPersistedState('token')

function App () {
  const [username, setUsername] = useUsername(null)
  const [loggedInName, setLoggedInName] = useState('')
  const [token, setToken] = useToken(null)
  const isLoggedIn = (username && token)
  const [showRegSuccessfulAlert, setShowRegSuccessfulAlert] = useState(false)
  const [sessions, setSessions] = useState([])
  const [sessionToRegister, setSessionToRegister] = useState(null)
  const [dropdownSelectorMode, setDropdownSelectorMode] = useState('')
  const [showModal, setShowModal] = useState('')
  const [formToView, setFormToView] = useState('')
  const [sessionToView, setSessionToView] = useState([])

  function setAuth (username, token) {
    setUsername(username)
    setToken(token)
  }

  useEffect(() => {
    getUser(token)
      .then(data => setLoggedInName(data.first_name))
  }, [token])

  // DEBUGGER STATION
  console.log('formToView', formToView)

  return (
    <Router>
      <div className='min-h-screen bg-ghostWhite'>

        <div className='bg-mediumPurple pb-32'>
          <Nav token={token} setToken={setToken} username={username} setUsername={setUsername} isLoggedIn={isLoggedIn} setShowModal={setShowModal} loggedInName={loggedInName} showRegSuccessfulAlert={showRegSuccessfulAlert} setShowRegSuccessfulAlert={setShowRegSuccessfulAlert} setFormToView={setFormToView} />
          <Header />
        </div>
        <Switch>
          <Route path='/registeradmin'>
            <Register token={token} showModal='admin-registration-form' setShowModal={setShowModal} />
          </Route>
          <Route path='/login'>
            <LoginModal setAuth={setAuth} showModal={showModal} setShowModal={setShowModal} />
          </Route>
        </Switch>
        <main className='-mt-32'>
          <Switch>
            <Route path='/book-study'>
              <BookStudy />
            </Route>
            <Route path='/sessions'>
              <Sessions token={token} isLoggedIn={isLoggedIn} sessions={sessions} setSessions={setSessions} setSessionToRegister={setSessionToRegister} setShowModal={setShowModal} setFormToView={setFormToView} setSessionToView={setSessionToView} />
            </Route>
            <Route path='/connect'>
              <Connect />
            </Route>
            <Route path='/session-register'>
              <SessionRegister sessions={sessions} sessionToRegister={sessionToRegister} setShowRegSuccessfulAlert={setShowRegSuccessfulAlert} showModal={showModal} setShowModal={setShowModal} />
            </Route>
            <Route path='/create-session'>
              <CreateSession token={token} showModal={showModal} setShowModal={setShowModal} formToView={formToView} setFormToView={setFormToView} />
            </Route>
            <Route path='/view-session-registrants'>
              <ViewSessionRegistrants token={token} isLoggedIn={isLoggedIn} dropdownSelectorMode={dropdownSelectorMode} setDropdownSelectorMode={setDropdownSelectorMode} />
            </Route>
            <Route path='/view-form'>
              <ViewForm token={token} isLoggedIn={isLoggedIn} showModal={showModal} setShowModal={setShowModal} formToView={formToView} setFormToView={setFormToView} sessionToView={sessionToView} />
            </Route>
            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  )
}

export default App
