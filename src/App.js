import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import createPersistedState from 'use-persisted-state'
import './App.css'
import { getUser } from './api'
import Nav from './components/Nav'
import BookStudy from './components/BookStudy'
import Sessions from './components/Sessions'
import ViewSessionRegistrants from './components/ViewSessionRegistrants'
import ViewForm from './components/ViewForm'
import PasswordResetConfirm from './components/PasswordResetConfirm'
import UsernameResetConfirm from './components/UsernameResetConfirm'
import Home from './components/Home'
// import About from './components/About'
import About2 from './components/About2'

const useUsername = createPersistedState('username')
const useToken = createPersistedState('token')

function App () {
  const [username, setUsername] = useUsername(null)
  const [loggedInName, setLoggedInName] = useState('')
  const [token, setToken] = useToken(null)
  const isLoggedIn = (username && token)
  const [registered, setRegistered] = useState(false)
  const [sessions, setSessions] = useState([])
  const [sessionToRegister, setSessionToRegister] = useState([])
  const [dropdownSelectorMode, setDropdownSelectorMode] = useState('')
  const [showModal, setShowModal] = useState('')
  const [formToView, setFormToView] = useState('')
  const [sessionToView, setSessionToView] = useState([])

  function setAuth (username, token) {
    setUsername(username)
    setToken(token)
  }

  useEffect(() => {
    if (isLoggedIn) {
      getUser(token)
        .then(data => setLoggedInName(data.first_name))
    }
  }, [token, isLoggedIn])

  // DEBUGGER STATION
  // console.log('formToView', formToView)
  // console.log('token', token)

  return (
    <Router>
      <div className='min-h-screen bg-ghostWhite'>

        <div className='bg-mediumPurple pb-32'>
          <Nav token={token} setToken={setToken} username={username} setUsername={setUsername} isLoggedIn={isLoggedIn} setAuth={setAuth} showModal={showModal} setShowModal={setShowModal} loggedInName={loggedInName} setFormToView={setFormToView} setSessions={setSessions} />
        </div>
        <main className='-mt-32'>
          <Switch>
            <Route path='/book-study'>
              <BookStudy />
            </Route>
            <Route path='/sessions'>
              <Sessions token={token} isLoggedIn={isLoggedIn} sessions={sessions} setSessions={setSessions} sessionToRegister={sessionToRegister} setSessionToRegister={setSessionToRegister} showModal={showModal} setShowModal={setShowModal} setFormToView={setFormToView} setSessionToView={setSessionToView} registered={registered} setRegistered={setRegistered} />
            </Route>
            <Route path='/about'>
              <About2 />
            </Route>
            <Route path='/view-session-registrants'>
              <ViewSessionRegistrants token={token} isLoggedIn={isLoggedIn} dropdownSelectorMode={dropdownSelectorMode} setDropdownSelectorMode={setDropdownSelectorMode} setSessionToRegister={setSessionToRegister} setShowModal={setShowModal} sessions={sessions} />
            </Route>
            <Route path='/view-form'>
              <ViewForm token={token} isLoggedIn={isLoggedIn} showModal={showModal} setShowModal={setShowModal} formToView={formToView} setFormToView={setFormToView} sessionToView={sessionToView} />
            </Route>
            <Route exact path='/password/reset/confirm/:uid/:urlToken'>
              <PasswordResetConfirm token={token} setToken={setToken} setUsername={setUsername} />
            </Route>
            <Route exact path='/username/reset/confirm/:uid/:urlToken'>
              <UsernameResetConfirm token={token} setToken={setToken} setUsername={setUsername} />
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
