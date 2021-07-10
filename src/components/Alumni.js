import { MailIcon, PencilAltIcon } from '@heroicons/react/outline'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { listSessions } from '../api'
import { sortSessions } from './functions'

// function arrayUnique (array) {
//   const a = array.concat()
//   for (let i = 0; i < a.length; ++i) {
//     for (let j = i + 1; j < a.length; ++j) {
//       if (a[i] === a[j]) { a.splice(j--, 1) }
//     }
//   }

//   return a
// }

const Alumni = ({ token, isLoggedIn, showModal, setShowModal, prepEmailForm }) => {
  const [completedSessions, setCompletedSession] = useState([])
  const [numberOfAlumni, setnumberOfAlumni] = useState()
  const [isEditing, setIsEditing] = useState('')
  const [alumniEmails, setAlumniEmails] = useState([])
  const [alumniNames, setAlumniNames] = useState([])
  //   const [isLoading, setIsLoading] = useState(false)
  //   const [sessionToEdit, setSessionToEdit] = useState([])
  //   const [sessionsAreLoading, setSessionsAreLoading] = useState(false)

  // DEBUGGER STATION
  // console.log('isRegistering', isRegistering)
  // console.log('completedSessions', completedSessions)
  // console.log('sessions', sessions)
  // console.log('numberOfAlumni', numberOfAlumni)
  console.log('isEditing', isEditing)
  console.log('alumniEmails', alumniEmails)
  console.log('alumniNames', alumniNames)

  useEffect(() => {
    // setSessionsAreLoading(true)
    listSessions(token)
      .then(sessions => {
        const completeSessions = []
        const emails = []
        const names = []
        let alumni = 0
        sessions.forEach(session => {
          if (session.session_complete === true) {
            completeSessions.push(session)
            emails.push(session.session_registrants.map(reg => reg.email))
            names.push(session.session_registrants.map(reg => `${reg.first_name} ${reg.last_name}`))
            alumni = alumni + session.session_registrants.length
          }
        })
        console.log('completeSessions', completeSessions)
        setCompletedSession(completeSessions)
        setnumberOfAlumni(alumni)
        setAlumniEmails(emails)
        setAlumniNames(names)
        // setSessionsAreLoading(false)
        // setSessions(data)
      })
  }, [token])

  //   useEffect(() => {
  //     sessions.forEach(session => {
  //       if (session.session_complete === true) {
  //         setCompletedSession(session)
  //       }
  //     })
  //   }, [sessions])

  // Had to use useCallback here because the handleEditSession without
  // it was causing the useEffect below to run on every render
  //   const handleEditSession = useCallback((token, pk, input) => {
  //     updateSession(token, pk, input)
  //       .then(data => {
  //         listSessions()
  //           .then(data => setSessions(data))
  //         setIsLoading(false)
  //         setIsEditing('')
  //         setShowModal('')
  //       })
  //   }, [setSessions, setShowModal, setIsLoading])

  //   if (isEditing === 'edit-session') {
  //     return (
  //       <span className=''>
  //         <CreateSession isEditing='edit-session' token={token} showModal='create-session-form' setShowModal={setShowModal} setIsEditing={setIsEditing} sessionToEdit={sessionToEdit} handleEditSession={handleEditSession} isLoading={isLoading} setIsLoading={setIsLoading} />
  //       </span>
  //     )
  //   }

  return (
    <>
      <div className='flex flex-col pt-20 bg-ghostWhite w-full h-screen border-b-4 border-coolGray-500'>
        <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='py-1 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
            <span>
              {/* <h1 className='text-6xl text-center text-davysGray font-extrabold font-sans mb-10 rounded-lg'>Alumni</h1> */}

              <div className='bg-gray-50 pt-12 sm:pt-16'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                  <div className='max-w-4xl mx-auto text-center'>
                    <h2 className='text-3xl font-extrabold text-gray-900 sm:text-4xl'>
                      Alumni
                    </h2>
                    {/* <p className='mt-3 text-xl text-gray-500 sm:mt-4'>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus repellat laudantium.
                    </p> */}
                  </div>
                </div>
                <div className='mt-10 pb-12 bg-white sm:pb-16'>
                  <div className='relative'>
                    <div className='absolute inset-0 h-1/2 bg-gray-50' />
                    <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                      <div className='max-w-4xl mx-auto'>
                        <dl className='rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3'>
                          <div className='flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r'>
                            <dt className='order-2 mt-2 text-lg leading-6 font-medium text-gray-500'>Sessions Completed</dt>
                            <dd className='order-1 text-5xl font-extrabold text-darkerPurple'>{completedSessions.length}</dd>
                          </div>
                          <div className='flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r'>
                            <dt className='order-2 mt-2 text-lg leading-6 font-medium text-gray-500'>Alumni</dt>
                            <dd className='order-1 text-5xl font-extrabold text-darkerPurple'>{numberOfAlumni}</dd>
                          </div>
                          <div className='flex flex-col border-t border-gray-100 p-6 sm:border-0 sm:border-l justify-center items-center'>
                            <Link
                              to='/alumni-reg-contact'
                              className='btn-color w-3/4 inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                              onClick={() => prepEmailForm(alumniEmails, alumniNames, 'alumni')}
                            >
                              <MailIcon className='-ml-0.5 mr-2 h-4 w-4' aria-hidden='true' />
                              Email Alumni
                            </Link>

                            {/* <dt className='order-2 mt-2 text-lg leading-6 font-medium text-gray-500'>Calories</dt>
                            <dd className='order-1 text-5xl font-extrabold text-darkerPurple'>100k</dd> */}
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mx-8'>
                <table className='min-w-full divide-y-8 divide-mediumPurple font-nunito'>
                  <thead className='bg-magnolia'>
                    <tr>
                      <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Name
                      </th>
                      <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Pronouns
                      </th>
                      <th scope='col' className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Email
                      </th>
                      <th scope='col' className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Session Attended
                      </th>
                      <th scope='col' className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Session Date
                      </th>
                      <th scope='col' className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Edit/Delete
                      </th>
                    </tr>
                  </thead>

                  {sortSessions(completedSessions).map(session => (
                    session.session_registrants.map(registrant =>
                      <tbody
                        key={`registrant-${registrant.pk}`}
                        className='bg-ghostWhite divide-y-8 divide-lavenderWebb'
                      >
                        <tr>
                          <td className=' px-6 py-4 break-words text-sm font-medium text-coolGray-900'>
                            {registrant.first_name} {registrant.last_name}
                          </td>
                          <td className=' px-6 py-4 break-words text-sm font-medium text-coolGray-900'>
                            {registrant.pronouns}
                          </td>
                          <td className={`${isLoggedIn ? 'whitespace-nowrap truncate max-w-sm' : 'break-words'} px-6 py-4 text-sm text-coolGray-500 space-x-1 text-center`}>
                            {registrant.email}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-center text-sm text-coolGray-500'>
                            {session.title}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-coolGray-500'>
                            <span className='space-y-2'>
                              <span className='flex justify-between'>
                                <span className='text-gray-800'>First Mtg:&nbsp;</span>
                                <Moment format='MMM DD, YYYY'>{session.start_date}</Moment>
                              </span>
                              <span className='flex justify-between'>
                                <span className='text-gray-800'> Last Mtg:&nbsp;</span>
                                <Moment format='MMM DD, YYYY'>{session.end_date}</Moment>
                              </span>
                            </span>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-center text-sm text-coolGray-500'>
                            <span className='flex flex-col space-y-4'>
                              <button
                                className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-3 py-1 bg-lavenderBlue text-base font-medium text-coolGray-600 hover:text-ghostWhite hover:bg-bluePurple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm'
                                onClick={() => {
                                  // setSessionToEdit(alum)
                                  setIsEditing('edit-alum')
                                }}
                              >
                                <PencilAltIcon className='-ml-0.5 mr-2 h-4 w-4' aria-hidden='true' />
                                Edit
                              </button>
                              {/* <button
                                      className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-3 py-1 bg-lavenderBlue text-base font-medium text-coolGray-600 hover:text-ghostWhite hover:bg-bluePurple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm'
                                      onClick={() => {
                                        setIsDeleting('delete-session')
                                        setSessionToDelete(session)
                                      }}
                                    >
                                      <TrashIcon className='-ml-0.5 mr-2 h-4 w-4' aria-hidden='true' />
                                      Delete
                                    </button> */}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    )
                  ))}
                </table>
              </div>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Alumni
