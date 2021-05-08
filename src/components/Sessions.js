import { useCallback, useEffect, useState } from 'react'
import { Popover } from '@headlessui/react'
import UpcomingSessions from './UpcomingSessions'
import MobileUpcomingSessions from './MobileUpcomingSessions'
import { listSessions, deleteSession, updateSession } from '../api'
import DeleteAlert from './alerts/DeleteAlert'
import SessionRegister from './sessionForms/SessionRegister'
import CreateSession from './CreateSession'

const Sessions = ({ token, isLoggedIn, showModal, setShowModal, sessions, setSessions, sessionToRegister, setSessionToRegister, setFormToView, setSessionToView, registered, setRegistered }) => {
  const [isDeleting, setIsDeleting] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [isEditing, setIsEditing] = useState('')
  const [sessionToDelete, setSessionToDelete] = useState([])
  const [sessionToEdit, setSessionToEdit] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    listSessions()
      .then(data => {
        setSessions(data)
      })
  }, [setSessions])

  // Had to use useCallback here because the handleEditSession without
  // it was causing the useEffect below to run on every render
  const handleEditSession = useCallback((token, pk, input) => {
    updateSession(token, pk, input)
      .then(data => {
        listSessions()
          .then(data => setSessions(data))
        setIsLoading(false)
        setIsEditing('')
        setShowModal('')
      })
  }, [setSessions, setShowModal])

  useEffect(() => {
    sessions.forEach(session => {
      if (session.session_registrants.length >= session.number_of_registrants && session.session_status === true) {
        const input = {
          title: session.title,
          start_date: session.start_date,
          end_date: session.end_date,
          start_time: session.start_time,
          end_time: session.end_time,
          description: session.description,
          session_status: 'false',
          number_of_registrants: session.number_of_registrants
        }
        console.log('input', input)
        handleEditSession(token, session.pk, input)
      }
    })
  }, [sessions, handleEditSession, token])

  const handleDelete = (pk) => {
    deleteSession(token, pk)
      .then(data => {
        listSessions()
          .then(data => setSessions(data))
      })
  }

  const renderSessionStatus = (session) => {
    if (session.session_status) {
      return (
        <button
          className='w-full sm:w-3/4 inline-flex justify-center rounded-md border border-transparent shadow-sm px-3 py-1 bg-lavenderBlue text-base font-medium text-coolGray-600 hover:text-ghostWhite hover:bg-bluePurple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm'
          onClick={() => {
            setIsRegistering(true)
            setSessionToRegister(session)
          }}
        >Sign up
        </button>
      )
    } else {
      return (
        <span className='whitespace-nowrap text-md text-center text-red-300 font-bold'>Closed</span>
      )
    }
  }

  if (isRegistering) {
    return (
      <SessionRegister sessions={sessions} sessionToRegister={sessionToRegister} setSessionToRegister={setSessionToRegister} setRegistered={setRegistered} showModal='session-registration-form' setShowModal={setShowModal} setIsRegistering={setIsRegistering} />
    )
  }

  if (isDeleting) {
    return (
      <DeleteAlert isDeleting={isDeleting} setIsDeleting={setIsDeleting} handleDelete={handleDelete} dataToDelete={sessionToDelete} />
    )
  }

  if (isEditing === 'edit-session') {
    return (
      <span className=''>
        <CreateSession isEditing='edit-session' token={token} showModal='create-session-form' setShowModal={setShowModal} setIsEditing={setIsEditing} sessionToEdit={sessionToEdit} handleEditSession={handleEditSession} isLoading={isLoading} setIsLoading={setIsLoading} />
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
                  <span className='block xl:inline'>Get Engaged</span>{' '}
                  <span className='block text-mediumPurple xl:inline'>Sign up for a Session</span>
                </h1>
                <p
                  className='mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0'
                >
                  White talk sessions are opportunities to spend intentional time each week digging deeper into our understanding of racism and whiteness. Each session lasts 5 weeks, with a 1 hour meeting each week.
                </p>
                <div className='mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start'>
                  {/* <div className='rounded-md shadow'>
                  <a
                    href='#'
                    className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10'
                  >
                    Get started
                  </a>
                </div>
                <div className='mt-3 sm:mt-0 sm:ml-3'>
                  <a
                    href='#'
                    className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10'
                  >
                    Live demo
                  </a>
                </div> */}
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className='lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-mediumPurple flex justify-end'>
          <div className='flex flex-col items-center justify-end xl:justify-center w-full h-full space-y-4 xl:space-y-8 pb-2 xl:pb-0 font-nunito'>
            <div className='bg-darkerPurple w-full lg:flex lg:flex-col lg:items-end mt-4'>
              <h2 className='font-bold text-lg text-ghostWhite text-center lg:w-7/12 xl:w-full'>Meeting 1</h2>
              <p className='text-white text-md text-center px-3 lg:w-7/12 xl:w-full'> Let's talk about race and racism and how it works</p>
            </div>
            <div className='bg-darkerPurple w-full lg:flex lg:flex-col lg:items-end'>
              <h2 className='font-bold text-lg text-ghostWhite text-center lg:w-7/12 xl:w-full'>Meeting 2</h2>
              <p className='text-white text-md text-center px-3 lg:w-7/12 xl:w-full'> Community and the importance of meeting as a white collective</p>
            </div>
            <div className='bg-darkerPurple w-full lg:flex lg:flex-col lg:items-end'>
              <h2 className='font-bold text-lg text-ghostWhite text-center lg:w-7/12 xl:w-full'>Meeting 3</h2>
              <p className='text-white text-md text-center px-3 lg:w-7/12 xl:w-full'> Strategies to disrupt racism</p>
            </div>
            <div className='bg-darkerPurple w-full lg:flex lg:flex-col lg:items-end'>
              <h2 className='font-bold text-lg text-ghostWhite text-center lg:w-7/12 xl:w-full'>Meeting 4</h2>
              <p className='text-white text-md text-center px-3 lg:w-7/12 xl:w-full'> Characteristics and antidotes of white supremacy culture</p>
            </div>
            <div className='bg-darkerPurple w-full lg:flex lg:flex-col lg:items-end'>
              <h2 className='font-bold text-lg text-ghostWhite text-center lg:w-7/12 xl:w-full'>Meeting 5</h2>
              <p className='text-white text-md text-center px-3 lg:w-7/12 xl:w-full'> Continuing the work for racial justice and the healing of racial injustices</p>
            </div>
          </div>
        </div>
      </div>
      <div className='sm:mt-32 pb-20 sm:pb-0'>
        <span className='hidden sm:block'>
          <UpcomingSessions token={token} sessions={sessions} setSessions={setSessions} isLoggedIn={isLoggedIn} showModal={showModal} setShowModal={setShowModal} sessionToRegister={sessionToRegister} setSessionToRegister={setSessionToRegister} setFormToView={setFormToView} setSessionToView={setSessionToView} setRegistered={setRegistered} setIsRegistering={setIsRegistering} setSessionToEdit={setSessionToEdit} setIsEditing={setIsEditing} setSessionToDelete={setSessionToDelete} setIsDeleting={setIsDeleting} renderSessionStatus={renderSessionStatus} />
        </span>
        <span className='sm:hidden'>
          <MobileUpcomingSessions token={token} sessions={sessions} setSessions={setSessions} isLoggedIn={isLoggedIn} showModal={showModal} setShowModal={setShowModal} sessionToRegister={sessionToRegister} setSessionToRegister={setSessionToRegister} setFormToView={setFormToView} setSessionToView={setSessionToView} setRegistered={setRegistered} setIsRegistering={setIsRegistering} setSessionToEdit={setSessionToEdit} setIsEditing={setIsEditing} setSessionToDelete={setSessionToDelete} setIsDeleting={setIsDeleting} renderSessionStatus={renderSessionStatus} />
        </span>
      </div>
    </>
  )
}

export default Sessions
