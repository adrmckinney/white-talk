
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { listSessions, deleteSession } from '../api'
import RegSuccessfulAlert from './RegSuccessfulAlert'

const Sessions = ({ token, isLoggedIn, showRegSuccessfulAlert, setShowRegSuccessfulAlert, showSessionRegModal, setShowSessionRegModal }) => {
  const [sessions, setSessions] = useState([])

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
    <div className='bg-mellowApricot rounded-lg shadow px-5 py-6 sm:px-6'>
      <div className='h-96 border-4 border-kobi rounded-lg flex flex-col justify-center overflow-auto pl-4'>
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
        <div>
          <h3 className='text-xl font-bold text-center'>
            Upcoming Sessions
          </h3>
          {sessions.map(session => (
            <div key={`session-${session.pk}`} className='flex space-x-1'>
              <div>
                {session.title}
              </div>
              <div className='flex space-x-1'>
                <div>
                  <Moment format='MM/DD/YYYY'>{session.start_date}</Moment>
                </div>
                <div> - </div>
                <div>
                  <Moment format='MM/DD/YYYY'>{session.end_date}</Moment>
                </div>
                {session.session_status &&
                  <div>
                    <Link
                      to='/session-register'
                      className='pt-40'
                      onClick={() => setShowSessionRegModal(true)}
                    >
                      <button
                        className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-3 py-1 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm'
                      >Sign up
                      </button>
                    </Link>
                  </div>}
                {isLoggedIn &&
                  <div>
                    <button
                      className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-3 py-1 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm'
                      onClick={() => handleDelete(session.pk)}
                    >Delete
                    </button>
                  </div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sessions
