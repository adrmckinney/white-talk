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
import ViewForm from './components/ViewForm'

const useUsername = createPersistedState('username')
const useToken = createPersistedState('token')

function App () {
  const [username, setUsername] = useUsername(null)
  const [token, setToken] = useToken(null)
  const isLoggedIn = (username && token)
  const [isEditing, setIsEditing] = useState(false)
  const [showRegSuccessfulAlert, setShowRegSuccessfulAlert] = useState(false)
  const [sessions, setSessions] = useState([])
  const [sessionToRegister, setSessionToRegister] = useState(null)
  const [dropdownSelectorMode, setDropdownSelectorMode] = useState('')
  const [showModal, setShowModal] = useState('')

  function setAuth (username, token) {
    setUsername(username)
    setToken(token)
  }

  return (
    <Router>
      <div className='min-h-screen bg-blueGray-50'>

        <div className='bg-lilac pb-32'>
          <Nav token={token} setToken={setToken} username={username} setUsername={setUsername} isLoggedIn={isLoggedIn} setIsEditing={setIsEditing} setShowModal={setShowModal} />
          <Header />
        </div>
        <Switch>
          <Route path='/registeradmin'>
            <Register token={token} isEditing={isEditing} showModal={showModal} setShowModal={setShowModal} />
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
              <Sessions token={token} isLoggedIn={isLoggedIn} sessions={sessions} setSessions={setSessions} setSessionToRegister={setSessionToRegister} showRegSuccessfulAlert={showRegSuccessfulAlert} setShowRegSuccessfulAlert={setShowRegSuccessfulAlert} setShowModal={setShowModal} />
            </Route>
            <Route path='/connect'>
              <Connect />
            </Route>
            <Route path='/session-register'>
              <SessionRegister sessions={sessions} sessionToRegister={sessionToRegister} setShowRegSuccessfulAlert={setShowRegSuccessfulAlert} showModal={showModal} setShowModal={setShowModal} />
            </Route>
            <Route path='/create-session'>
              <CreateSession token={token} showModal={showModal} setShowModal={setShowModal} />
            </Route>
            <Route path='/view-session-registrants'>
              <ViewSessionRegistrants token={token} isLoggedIn={isLoggedIn} dropdownSelectorMode={dropdownSelectorMode} setDropdownSelectorMode={setDropdownSelectorMode} />
            </Route>
            <Route path='/view-form'>
              <ViewForm token={token} isLoggedIn={isLoggedIn} setIsEditing={setIsEditing} showModal={showModal} setShowModal={setShowModal} />
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
