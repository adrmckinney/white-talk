import { Fragment, useEffect, useState } from 'react'
import { Popover } from '@headlessui/react'
import { Redirect } from 'react-router-dom'
import Moment from 'react-moment'
import { listSessions, deleteRegistrant, updateRegistrant } from '../api'
import SelectionElement from './SelectionElement'
import DeleteAlert from './alerts/DeleteAlert'
// import SessionRegister from './sessionForms/SessionRegister'
import RenderRegistrants from './RenderRegistrants'
import SessionsLoadingAlert from './alerts/SessionsLoadingAlert'

const ViewSessionRegistrants = ({ token, isLoggedIn, setShowModal, dropdownSelectorMode, setDropdownSelectorMode, setSessionToRegister, prepEmailForm, prepSessionRegistrationForm }) => {
  const [sessions, setSessions] = useState([])
  const [registrantsToRender, setRegistrantsToRender] = useState([])
  const [isDeleting, setIsDeleting] = useState('')
  const [isEditing, setIsEditing] = useState('')
  const [registrantToDelete, setRegistrantToDelete] = useState([])
  const [sessionToUpdate, setSessionToUpdate] = useState([])
  const [dataIsLoading, setDataIsLoading] = useState(true)
  const [confirmedEmailData, setConfirmedEmailData] = useState({
    names_emails: [],
    session_facilitator: '',
    facilitator_email: ''
  })

  // DEBUGGER STATION
  // console.log('confirmedEmailData', confirmedEmailData)
  // console.log('emails', emails)
  // console.log('isDeleting', isDeleting)
  // console.log('isEditing', isEditing)
  // console.log('sessions', sessions)
  // console.log('registrantsToRender', registrantsToRender)
  // console.log('registrantToEdit', registrantToEdit)
  // console.log('registrantToDelete', registrantToDelete)
  // console.log('sessions in ViewSessionReg', sessions)
  // console.log('sessionToUpate', sessionToUpdate)

  useEffect(() => {
    listSessions()
      .then(sessions => {
        setSessions(sessions)
        setDropdownSelectorMode('view-session-registrants')
        setDataIsLoading(false)
      })
  }, [setDropdownSelectorMode])

  const getConfirmationCount = () => {
    const confirmationStatuses = registrantsToRender.session_registrants.map(reg => reg.confirm)
    const confirmed = []
    confirmationStatuses.forEach(status => {
      if (status) {
        confirmed.push(status)
      }
    })
    return confirmed.length
  }

  const handleClearAllActionState = () => {
    setSessionToUpdate([])
    setRegistrantToDelete([])
  }

  const extractConfirmedEmailData = (session) => {
    const emailObjects = []
    session.session_registrants.forEach(reg => {
      if (reg.confirm === true) {
        const name = `${reg.first_name} ${reg.last_name}`
        const email = reg.email
        emailObjects.push({ name: name, email: email })
      }
      setConfirmedEmailData(state => ({
        ...state,
        names_emails: emailObjects,
        session_facilitator: session.facilitator,
        facilitator_email: session.facilitator_email
      }))
    })
  }

  const handleSelectedEmails = (selectedEmails) => {
    console.log('selectedEmails', selectedEmails)
    setConfirmedEmailData(state => ({ ...state, names_emails: selectedEmails }))
    prepEmailForm(confirmedEmailData, 'registrants')
  }

  const handleDeleteState = (registrant) => {
    setRegistrantToDelete(registrant)
    setIsEditing('')
    setIsDeleting('delete-registrant')
  }

  // const handleEditState = (registrant) => {
  //   sessions.forEach(session => {
  //     if (session.pk === registrant.session) {
  //       setSessionToUpdate(session)
  //     }
  //   })
  //   setRegistrantToEdit(registrant)
  //   setIsDeleting('')
  //   setIsEditing('edit-registrant')
  // if (!e.target.checked) {
  //   setRegistrantToEdit([])
  // } else {
  // }
  // }

  // This function handles getting the session ready to
  // be passed to SessionRegister.js. It is passed as
  // 'sessionToRegister' because that is already
  // working on the receiving end.
  const handleSessionToEdit = (registrant) => {
    sessions.forEach(session => {
      if (session.pk === registrant.session) {
        setSessionToUpdate(session)
      }
    })
  }

  const handleDelete = (pk) => {
    deleteRegistrant(token, pk)
      .then(data => {
        listSessions()
          .then(sessions => {
            setSessions(sessions)
            handleRefreshAfterEdit(sessions)
            setDropdownSelectorMode('view-session-registrants')
          })
      })
  }

  const handleRegistrantUpdate = (token, pk, input) => {
    updateRegistrant(token, pk, input)
      .then(data => {
        listSessions()
          .then(sessions => {
            setSessions(sessions)
            handleRefreshAfterEdit(sessions)
            setIsEditing('')
            setDropdownSelectorMode('view-session-registrants')
          })
      })
  }

  const handleRefreshAfterEdit = (sessions) => {
    sessions.forEach(session => {
      if (session.pk === registrantsToRender.pk) {
        setRegistrantsToRender(session)
        extractConfirmedEmailData(session)
      }
    })
  }

  if (isDeleting) {
    return (
      <DeleteAlert isDeleting={isDeleting} setIsDeleting={setIsDeleting} handleDelete={handleDelete} dataToDelete={registrantToDelete} handleClearAllActionState={handleClearAllActionState} />
    )
  }

  // if (isEditing === 'edit-registrant' && registrantToEdit.pk) {
  //   return (
  //     <SessionRegister
  //       token={token} registrantToEdit={registrantToEdit} isEditing={isEditing} sessions={sessions} setIsEditing={setIsEditing} showModal='session-registration-form' setShowModal={setShowModal} sessionToRegister={sessionToUpdate} handleRegistrantUpdate={handleRegistrantUpdate}
  //     />
  //   )
  // }

  // USE THIS WHEN MOBILE VIEW REGISTRANTS IS WORKING
  // if (isEditing === 'edit-registrant-overlay' && registrantToEdit.pk) {
  //   return (
  //     <SessionRegister
  //       token={token} registrantToEdit={registrantToEdit} isEditing={isEditing} sessions={sessions} setIsEditing={setIsEditing} showModal='session-registration-form' setShowModal={setShowModal} sessionToRegister={sessionToUpdate} handleRegistrantUpdate={handleRegistrantUpdate}
  //     />
  //   )
  // }

  if (!isLoggedIn) {
    <Redirect to='/' />
  }

  const setSessionTableTitle = () => {
    return (
      <span
        className='text-3xl font-bold font-nunito space-x-2 break-words flex'
      >
        <p>{registrantsToRender.title}</p>
      </span>
    )
  }

  return (
    <>
      <div className='relative bg-white overflow-hidden'>
        <div className='max-w-7xl mx-auto'>
          <div className='relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32'>
            <svg
              className='hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2'
              fill='currentColor'
              viewBox='0 0 100 100'
              preserveAspectRatio='none'
              aria-hidden='true'
            >
              <polygon points='50,0 100,0 50,100 0,100' />
            </svg>

            {/* Have to keep this for style */}
            <Popover>
              {({ open }) => (
                <>
                  <div className='relative pt-6 px-4 sm:px-6 lg:px-8' />
                </>
              )}
            </Popover>

            <main
              className='mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28'
            >
              <div
                className='text-center lg:text-left'
              >
                <h1 className='flex flex-col text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl space-y-2 lg:space-y-0 pt-4 lg:pt-0'>
                  <span className='block xl:inline'>Admin Hub</span>{' '}
                  <span className='block text-mediumPurple xl:inline'>See Who's Registered</span>
                </h1>
                <SelectionElement sessions={sessions} dropdownSelectorMode={dropdownSelectorMode} setRegistrantsToRender={setRegistrantsToRender} extractConfirmedEmailData={extractConfirmedEmailData} />
                {dataIsLoading &&
                  <span>
                    <SessionsLoadingAlert />
                  </span>}
                <div className='mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start' />
              </div>
            </main>
          </div>
        </div>
        <div className='lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-mediumPurple flex justify-center'>
          <div className='flex flex-col items-end justify-center w-full h-72 sm:h-64 lg:h-full space-y-4 xl:space-y-8 pb-2 xl:pb-0 font-nunito'>
            <div className='bg-darkerPurple w-full flex justify-center lg:justify-end lg:pr-8 lg:pl-14 xl:justify-center xl:pr-0'>
              <span className='text-white font-nunito text-md xl:text-xl lg:max-w-xs xl:max-w-none'>
                <h1 className='text-3xl font-bold flex justify-start shadow-sm rounded-lg'>{!registrantsToRender.pk ? 'Session Dashboard' : setSessionTableTitle()}</h1>
                {registrantsToRender.pk &&
                  <>
                    <div className='flex space-x-2'>
                      <p className='font-bold text-coolGray-100'>Date:</p>
                      <span className='flex space-x-1'>
                        <Moment format='MMM DD, YYYY'>{registrantsToRender.start_date}</Moment>
                        <p>-</p>
                        <Moment format='MMM DD, YYYY'>{registrantsToRender.end_date}</Moment>
                      </span>
                    </div>
                    <div className='flex space-x-2'>
                      <p className='font-bold text-coolGray-100'>Time:</p>
                      <span className='flex space-x-1'>
                        <Moment format='h:mm a'>{registrantsToRender.start_time}</Moment>
                        <p>-</p>
                        <Moment format='h:mm a'>{registrantsToRender.end_time}</Moment>
                      </span>
                    </div>
                    <div className='flex space-x-2'>
                      <p className='font-bold text-coolGray-100'>Number of registrants:</p>
                      <p>{!registrantsToRender.pk || registrantsToRender.session_registrants.length}</p>
                    </div>
                    <div className='flex space-x-2'>
                      <p className='font-bold text-coolGray-100'>Number confirmed:</p>
                      <p>{!registrantsToRender.pk || getConfirmationCount()}</p>
                    </div>
                  </>}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className=''>
        <RenderRegistrants token={token} isLoggedIn={isLoggedIn} sessions={sessions} setShowModal={setShowModal} dropdownSelectorMode={dropdownSelectorMode} setDropdownSelectorMode={setDropdownSelectorMode} setSessionToRegister={setSessionToRegister} registrantsToRender={registrantsToRender} setRegistrantsToRender={setRegistrantsToRender} confirmedEmailData={confirmedEmailData} handleDeleteState={handleDeleteState} handleSessionToEdit={handleSessionToEdit} handleDelete={handleDelete} handleRegistrantUpdate={handleRegistrantUpdate} handleRefreshAfterEdit={handleRefreshAfterEdit} setIsDeleting={setIsDeleting} setIsEditing={setIsEditing} prepEmailForm={prepEmailForm} handleSelectedEmails={handleSelectedEmails} prepSessionRegistrationForm={prepSessionRegistrationForm} />
      </div>
    </>
  )
}

export default ViewSessionRegistrants
