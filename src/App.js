import React, { useContext, useEffect, useMemo, useState } from 'react'
import { SessionsContext } from './components/useContextSessions'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import createPersistedState from 'use-persisted-state'
import './App.css'
import { authListAnnouncement, getUser, listSessions } from './api'
import Nav from './components/Nav'
import BookStudy from './components/BookStudy'
import Sessions from './components/Sessions'
import ViewSessionRegistrants from './components/ViewSessionRegistrants'
import ViewForm from './components/ViewForm'
import PasswordResetConfirm from './components/PasswordResetConfirm'
import UsernameResetConfirm from './components/UsernameResetConfirm'
import Home from './components/Home'
import RenderAnnouncements from './components/announcements/RenderAnnouncements'
import ModifyAnnouncements from './components/announcements/ModifyAnnouncements'
import PastSessions from './components/PastSessions'
import Alumni from './components/Alumni'
import About from './components/About'
import AlumniRegContact from './components/AlumniRegContact'
import SessionRegisterEditor from './components/sessionForms/SessionRegisterEditor'
import { ModalContext } from './components/context/useModalContext'
import Modal from './components/customComponents/Modal'
import TestSessionCreate from './components/TestSessionCreate'
import PageForm from './components/customComponents/customForms/formInputs/PageForm'
import {
  AnnouncementsContext,
  useContextAnnouncements,
} from './components/context/useContextAnnouncements'

const useUsername = createPersistedState('username')
const useToken = createPersistedState('token')

function App() {
  const [username, setUsername] = useUsername(null)
  const [loggedInName, setLoggedInName] = useState('')
  const [token, setToken] = useToken(null)
  const isLoggedIn = username && token
  const [registered, setRegistered] = useState(false)
  const [sessionRegistrationData, setSessionRegistrationData] = useState({
    sessions: [], // the editor's dropdown menu needs all sessions (SessionToRegister.js)
    session: [], // for new registration and editing registrant info
    registrant: [], // for editing registrants info
  })
  const [showModal, setShowModal] = useState('')
  const [formToView, setFormToView] = useState('')
  const [sessionToView, setSessionToView] = useState([])
  const [showTransparentNav, setShowTransparentNav] = useState(false)
  const [emailFormData, setEmailFormData] = useState({
    names_emails: [],
    origin: '',
    facilitator_name: '',
    facilitator_email: '',
  })
  const { setAnnouncements, announcements } = useContext(AnnouncementsContext)
  const { announcementControls } = useContextAnnouncements(token)

  const [sessions, setSessions] = useState([])
  const [sessionToEdit, setSessionToEdit] = useState([])
  const [sessionToDelete, setSessionToDelete] = useState([])
  const sessionsControls = useMemo(
    () => ({
      sessions,
      setSessions,
      sessionToEdit,
      setSessionToEdit,
      sessionToDelete,
      setSessionToDelete,
    }),
    [sessions, sessionToEdit, sessionToDelete]
  )
  const [modal, setModal] = useState(false)
  const [modalComponent, setModalComponent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const modalControls = useMemo(
    () => ({
      modal,
      setModal,
      modalComponent,
      setModalComponent,
      isLoading,
      setIsLoading,
    }),
    [modal, modalComponent, isLoading]
  )

  function setAuth(username, token) {
    setUsername(username)
    setToken(token)
  }

  useEffect(() => {
    if (isLoggedIn) {
      getUser(token).then(data => setLoggedInName(data.first_name))
    }
    listSessions().then(data => setSessions(data))
    authListAnnouncement(token).then(data => setAnnouncements(data))
  }, [token, isLoggedIn])

  const changeNavAnimation = value => {
    setShowTransparentNav(value)
  }

  const prepSessionRegistrationForm = (session, registrant) => {
    listSessions().then(sessions => {
      if (registrant) {
        sessions.forEach(sessionForEdit => {
          if (sessionForEdit.pk === registrant.session) {
            setSessionRegistrationData(state => ({
              ...state,
              sessions: sessions,
              session: sessionForEdit,
              registrant: registrant,
            }))
          }
        })
      } else {
        setSessionRegistrationData(state => ({
          ...state,
          sessions: sessions,
          session: session,
          registrant: '',
        }))
      }
    })
  }

  const prepEmailForm = (emailData, origin, selectedEmails) => {
    if (selectedEmails) {
      setEmailFormData(state => ({
        ...state,
        origin: origin,
        names_emails: selectedEmails,
        facilitator_name: emailData.session_facilitator,
        facilitator_email: emailData.facilitator_email,
      }))
    } else {
      setEmailFormData(state => ({
        ...state,
        origin: origin,
        names_emails: emailData.names_emails,
        facilitator_name: emailData.session_facilitator,
        facilitator_email: emailData.facilitator_email,
      }))
    }
  }

  // DEBUGGER STATION
  // console.log('formToView', formToView)
  // console.log('emailFormData', emailFormData)

  return (
    <SessionsContext.Provider value={sessionsControls}>
      <ModalContext.Provider value={modalControls}>
        <AnnouncementsContext.Provider value={announcementControls}>
          <Router>
            <div className='min-h-screen bg-ghostWhite'>
              <div className='bg-mediumPurple pb-32'>
                <Nav
                  token={token}
                  setToken={setToken}
                  username={username}
                  setUsername={setUsername}
                  isLoggedIn={isLoggedIn}
                  setAuth={setAuth}
                  showModal={showModal}
                  setShowModal={setShowModal}
                  loggedInName={loggedInName}
                  setFormToView={setFormToView}
                  showTransparentNav={showTransparentNav}
                />
              </div>
              <main className='-mt-32 h-screen overflow-x-hidden overflow-y-auto perspective'>
                <Modal />
                <Switch>
                  <Route path='/book-study'>
                    <BookStudy />
                  </Route>

                  <Route path='/sessions'>
                    <Sessions
                      token={token}
                      isLoggedIn={isLoggedIn}
                      showModal={showModal}
                      setShowModal={setShowModal}
                      setFormToView={setFormToView}
                      setSessionToView={setSessionToView}
                      registered={registered}
                      setRegistered={setRegistered}
                      prepSessionRegistrationForm={prepSessionRegistrationForm}
                    />
                  </Route>

                  <Route path='/session-register'>
                    <SessionRegisterEditor
                      token={token}
                      sessionRegistrationData={sessionRegistrationData}
                    />
                  </Route>

                  {/* <Route path='/test-session-create'>
                  <PageForm token={token} />
                </Route> */}

                  <Route path='/about'>
                    <About />
                  </Route>

                  <Route path='/view-session-registrants'>
                    <ViewSessionRegistrants
                      token={token}
                      isLoggedIn={isLoggedIn}
                      setShowModal={setShowModal}
                      prepEmailForm={prepEmailForm}
                      prepSessionRegistrationForm={prepSessionRegistrationForm}
                    />
                  </Route>

                  <Route path='/past-sessions'>
                    <PastSessions
                      token={token}
                      isLoggedIn={isLoggedIn}
                      showModal={showModal}
                      setShowModal={setShowModal}
                    />
                  </Route>

                  <Route path='/alumni'>
                    <Alumni token={token} isLoggedIn={isLoggedIn} prepEmailForm={prepEmailForm} />
                  </Route>

                  <Route path='/alumni-reg-contact'>
                    <AlumniRegContact prepEmailForm={prepEmailForm} emailFormData={emailFormData} />
                  </Route>

                  <Route path='/view-form'>
                    <ViewForm
                      token={token}
                      isLoggedIn={isLoggedIn}
                      showModal={showModal}
                      setShowModal={setShowModal}
                      formToView={formToView}
                      setFormToView={setFormToView}
                      sessionToView={sessionToView}
                    />
                  </Route>

                  <Route path='/render-announcements'>
                    <RenderAnnouncements
                      token={token}
                      // handleEditAnnouncements={handleEditAnnouncements}
                    />
                  </Route>

                  <Route path='/modify-announcements'>
                    <ModifyAnnouncements
                      token={token}
                      // announcementToEdit={announcementToEdit}
                      // handleEditAnnouncements={handleEditAnnouncements}
                    />
                  </Route>

                  <Route exact path='/password/reset/confirm/:uid/:urlToken'>
                    <PasswordResetConfirm
                      token={token}
                      setToken={setToken}
                      setUsername={setUsername}
                    />
                  </Route>

                  <Route exact path='/username/reset/confirm/:uid/:urlToken'>
                    <UsernameResetConfirm
                      token={token}
                      setToken={setToken}
                      setUsername={setUsername}
                    />
                  </Route>

                  <Route path='/'>
                    <Home changeNavAnimation={changeNavAnimation} />
                  </Route>
                </Switch>
              </main>
            </div>
          </Router>
        </AnnouncementsContext.Provider>
      </ModalContext.Provider>
    </SessionsContext.Provider>
  )
}

export default App
