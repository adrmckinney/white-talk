import { useEffect } from 'react'
import { listSessions, deleteSession } from '../api'
import RegSuccessfulAlert from './RegSuccessfulAlert'
import UpcomingSessions from './UpcomingSessions'

const Sessions = ({ token, isLoggedIn, setShowModal, showRegSuccessfulAlert, setShowRegSuccessfulAlert, sessions, setSessions, setSessionToRegister }) => {
  useEffect(() => {
    listSessions()
      .then(data => setSessions(data))
  }, [])

  const handleDelete = (pk) => {
    deleteSession(token, pk)
      .then(data => {
        listSessions()
          .then(data => setSessions(data))
      })
  }

  console.log('sessions', sessions)

  return (
    <>
      <div className='max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8'>
        <div className='bg-mellowApricot rounded-lg shadow px-5 py-6 sm:px-6'>
          <div className='h-96 border-4 border-gray-400 rounded-lg flex flex-col justify-center overflow-auto pl-4'>
            {showRegSuccessfulAlert &&
              <RegSuccessfulAlert setShowRegSuccessfulAlert={setShowRegSuccessfulAlert} />}
            <h3 className='text-xl font-bold text-center'>
              What are white Talk Sessions?
            </h3>
            <br />
            <p>White talk sessions are opportunities to spend intentional time each week digging deeper into our understanding of racism and whiteness. Each session lasts 5 weeks, with a 1 hour meeting each week.</p>
            <p>Meeting topics are:</p>
            <li className='ml-6'><strong>Meeting 1</strong> Let's talk about race and racism and how it works</li>
            <li className='ml-6'><strong>Meeting 2</strong> Community and the importance of meeting in white spaces</li>
            <li className='ml-6'><strong>Meeting 3</strong> Strategies to disrupt racism - calling in and calling out</li>
            <li className='ml-6'><strong>Meeting 4</strong> Characteristics and antidotes of white supremacy culture</li>
            <li className='ml-6'><strong>Meeting 5</strong> Continuing the work, both for racial justice and for the healing of racial injustices</li>
            <p>These sessions are most successful with a commitment of regular attendance and participation.</p>
            <br />
          </div>
        </div>
      </div>
      <UpcomingSessions sessions={sessions} isLoggedIn={isLoggedIn} setShowModal={setShowModal} setSessionToRegister={setSessionToRegister} handleDelete={handleDelete} />
    </>
  )
}

export default Sessions
