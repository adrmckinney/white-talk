import { useCallback, useContext, useEffect, useState } from 'react'
import UpcomingSessions from './UpcomingSessions'
import MobileUpcomingSessions from './MobileUpcomingSessions'
import { listSessions, deleteSession, updateSession } from '../api/api'
import DeleteAlert from './alerts/DeleteAlert'
import SessionRegister from './sessionForms/SessionRegister'
import SessionRegisterOverlay from './sessionForms/SessionRegisterOverlay'
import CreateSession from './CreateSession'
import SessionsLoadingAlert from './alerts/SessionsLoadingAlert'
import Button from './customComponents/Button'
import { SessionsContext } from './useContextSessions'

const Sessions = ({
  token,
  isLoggedIn,
  showModal,
  setShowModal,
  setSessionToView,
  registered,
  setRegistered,
  prepSessionRegistrationForm,
}) => {
  const [isDeleting, setIsDeleting] = useState('')
  const [isRegistering, setIsRegistering] = useState('')
  const [isEditing, setIsEditing] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionsAreLoading, setSessionsAreLoading] = useState(false)
  const { sessions, setSessions } = useContext(SessionsContext)

  // DEBUGGER STATION
  // console.log('isRegistering', isRegistering)
  // console.log('sessionsControls.sessions', sessionsControls.sessions)
  // console.log('sessions', sessions)

  // Had to use useCallback here because the handleEditSession without
  // it was causing the useEffect below to run on every render
  const handleEditSession = useCallback(
    (token, pk, input) => {
      updateSession(token, pk, input).then(data => {
        listSessions().then(data => setSessions(data))
        setIsLoading(false)
        setIsEditing('')
        setShowModal('')
      })
    },
    [setSessions, setShowModal]
  )

  useEffect(() => {
    sessions.forEach(session => {
      if (
        session.session_registrants.length >= session.number_of_registrants_allowed &&
        session.session_status === true
      ) {
        const input = {
          title: session.title,
          start_date: session.start_date,
          end_date: session.end_date,
          start_time: session.start_time,
          end_time: session.end_time,
          description: session.description,
          session_status: 'false',
          number_of_registrants_allowed: session.number_of_registrants_allowed,
        }
        // console.log('input', input)
        handleEditSession(token, session.pk, input)
      }
    })
  }, [sessions, handleEditSession, token])

  const handleDelete = pk => {
    deleteSession(token, pk).then(data => {
      listSessions().then(data => setSessions(data))
    })
  }

  const renderSessionStatus = (session, mode) => {
    if (session.session_status) {
      return (
        <Button
          type={'link'}
          to={'/session-register'}
          buttonLabel={'Sign up'}
          buttonSize={'small'}
          buttonStatus={'secondary'}
          icon={'edit'}
          overrideIconStyle={{ marginRight: '10px' }}
          onClick={() => {
            setIsRegistering(mode)
            prepSessionRegistrationForm(session)
          }}
        />
      )
    } else {
      return (
        <span className='whitespace-nowrap text-md text-center text-red-300 font-bold'>Closed</span>
      )
    }
  }

  const getConfirmationCount = session => {
    const confirmationStatuses = session.session_registrants.map(reg => reg.confirm)
    const confirmed = []
    confirmationStatuses.forEach(status => {
      if (status) {
        confirmed.push(status)
      }
    })
    return confirmed.length
  }

  if (isRegistering === 'register-modal') {
    return (
      <SessionRegister
        sessions={sessions}
        setRegistered={setRegistered}
        showModal='session-registration-form'
        setShowModal={setShowModal}
        setIsRegistering={setIsRegistering}
      />
    )
  }

  if (isRegistering === 'register-overlay') {
    return (
      <SessionRegisterOverlay
        sessions={sessions}
        setRegistered={setRegistered}
        showModal='session-registration-form'
        setShowModal={setShowModal}
        setIsRegistering={setIsRegistering}
      />
    )
  }

  if (isDeleting) {
    return (
      <DeleteAlert
        isDeleting={isDeleting}
        setIsDeleting={setIsDeleting}
        handleDelete={handleDelete}
      />
    )
  }

  if (isEditing === 'edit-session') {
    return (
      <span className=''>
        <CreateSession
          isEditing='edit-session'
          token={token}
          showModal='create-session-form'
          setShowModal={setShowModal}
          setIsEditing={setIsEditing}
          handleEditSession={handleEditSession}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </span>
    )
  }

  return (
    <>
      <div className='relative bg-ghostWhite overflow-hidden'>
        <div className='max-w-7xl mx-auto'>
          <div className='relative z-10 pb-8 bg-ghostWhite sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32'>
            <svg
              className='hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-ghostWhite transform translate-x-1/2'
              fill='currentColor'
              viewBox='0 0 100 100'
              preserveAspectRatio='none'
              aria-hidden='true'
            >
              <polygon points='50,0 100,0 50,100 0,100' />
            </svg>

            {/* Have to keep this for style */}
            <div className='relative pt-6 px-4 sm:px-6 lg:px-8' />

            <main className='mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28'>
              <div className='text-center lg:text-left'>
                <h1 className='flex flex-col text-4xl tracking-tight font-extrabold text-davysGray sm:text-5xl md:text-6xl space-y-2 lg:space-y-0 pt-10 sm:pt-4 lg:pt-0'>
                  <span className='block xl:inline'>Get Engaged</span>{' '}
                  <span className='block text-mediumPurple xl:inline'>Sign up for a Session</span>
                </h1>
                <p className='mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0'>
                  White talk sessions are opportunities to spend intentional time each week digging
                  deeper into our understanding of racism and whiteness. Each session lasts 5 weeks,
                  with a 1 hour meeting each week.
                </p>
                <p className='mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0'>
                  For more information about sessions, contact Rachael Gigliotti at&nbsp;
                  <a
                    href='mailto:rachgigliotti@yahoo.com'
                    rel='noreferrer'
                    target='_blank'
                    className='text-blue-500'
                  >
                    rachgigliotti@yahoo.com
                  </a>
                </p>
              </div>
            </main>
          </div>
        </div>
        <div className='lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-mediumPurple flex justify-end'>
          <div className='flex flex-col items-center justify-end xl:justify-center w-full h-full space-y-4 xl:space-y-8 pb-2 xl:pb-0 font-nunito'>
            <div className='bg-darkerPurple w-full lg:flex lg:flex-col lg:items-end mt-4'>
              <h2 className='font-bold text-lg text-ghostWhite text-center lg:w-7/12 xl:w-full'>
                Meeting 1
              </h2>
              <p className='text-white text-md text-center px-3 lg:w-7/12 xl:w-full'>
                {' '}
                Let's talk about race and racism and how it works
              </p>
            </div>
            <div className='bg-darkerPurple w-full lg:flex lg:flex-col lg:items-end'>
              <h2 className='font-bold text-lg text-ghostWhite text-center lg:w-7/12 xl:w-full'>
                Meeting 2
              </h2>
              <p className='text-white text-md text-center px-3 lg:w-7/12 xl:w-full'>
                {' '}
                Community and the importance of meeting as a white collective
              </p>
            </div>
            <div className='bg-darkerPurple w-full lg:flex lg:flex-col lg:items-end'>
              <h2 className='font-bold text-lg text-ghostWhite text-center lg:w-7/12 xl:w-full'>
                Meeting 3
              </h2>
              <p className='text-white text-md text-center px-3 lg:w-7/12 xl:w-full'>
                {' '}
                Strategies to disrupt racism
              </p>
            </div>
            <div className='bg-darkerPurple w-full lg:flex lg:flex-col lg:items-end'>
              <h2 className='font-bold text-lg text-ghostWhite text-center lg:w-7/12 xl:w-full'>
                Meeting 4
              </h2>
              <p className='text-white text-md text-center px-3 lg:w-7/12 xl:w-full'>
                {' '}
                Characteristics and antidotes of white supremacy culture
              </p>
            </div>
            <div className='bg-darkerPurple w-full lg:flex lg:flex-col lg:items-end'>
              <h2 className='font-bold text-lg text-ghostWhite text-center lg:w-7/12 xl:w-full'>
                Meeting 5
              </h2>
              <p className='text-white text-md text-center px-3 lg:w-7/12 xl:w-full'>
                {' '}
                Continuing the work for racial justice and the healing of racial injustices
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <HomeDivider /> */}
      <div className='pb-20 sm:pb-10 lg:pb-0'>
        {sessionsAreLoading ? (
          <span className='pt-32 pb-10'>
            <SessionsLoadingAlert />
          </span>
        ) : (
          <>
            <span className='hidden lg:block'>
              <UpcomingSessions
                token={token}
                sessions={sessions}
                setSessions={setSessions}
                isLoggedIn={isLoggedIn}
                showModal={showModal}
                setShowModal={setShowModal}
                setSessionToView={setSessionToView}
                setRegistered={setRegistered}
                setIsRegistering={setIsRegistering}
                setIsEditing={setIsEditing}
                setIsDeleting={setIsDeleting}
                renderSessionStatus={renderSessionStatus}
                getConfirmationCount={getConfirmationCount}
              />
            </span>
            <span className='lg:hidden'>
              <MobileUpcomingSessions
                token={token}
                sessions={sessions}
                setSessions={setSessions}
                isLoggedIn={isLoggedIn}
                showModal={showModal}
                setShowModal={setShowModal}
                setSessionToView={setSessionToView}
                setRegistered={setRegistered}
                setIsRegistering={setIsRegistering}
                setIsEditing={setIsEditing}
                setIsDeleting={setIsDeleting}
                renderSessionStatus={renderSessionStatus}
                getConfirmationCount={getConfirmationCount}
              />
            </span>
          </>
        )}
      </div>
    </>
  )
}

export default Sessions
