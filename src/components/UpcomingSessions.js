import Moment from 'react-moment'
import { sortSessions } from './functions'

const UpcomingSessions = ({ token, sessions, setSessions, isLoggedIn, showModal, setShowModal, sessionToRegister, setSessionToRegister, setFormToView, setSessionToView, setRegistered, isDeleting, setIsDeleting, isRegistering, setIsRegistering, isEditing, setIsEditing, sessionToDelete, setSessionToDelete, sessionToEdit, setSessionToEdit, isLoading, setIsLoading, renderSessionStatus }) => {
  // DEBUGGER STATION
  // console.log('isRegistering', isRegistering)
  // console.log('sessions', sessions)

  return (
    <>
      <div className='flex flex-col pt-10 bg-white w-full h-screen mt-6 relative -top-16 border-b-4 border-coolGray-500'>
        <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='py-1 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
            <span>
              <h1 className='text-6xl text-center text-gray-900 font-extrabold font-sans mb-10 rounded-lg'>Upcoming Sessions</h1>
              <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mx-8'>
                <table className='min-w-full divide-y-8 divide-mediumPurple font-nunito'>
                  <thead className='bg-magnolia'>
                    <tr>
                      <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Title
                      </th>
                      <th scope='col' className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Date
                      </th>
                      <th scope='col' className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Time
                      </th>
                      <th scope='col' className='px-6 py-3 w-96 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Description
                      </th>
                      <th scope='col' className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Status
                      </th>
                      {isLoggedIn &&
                        <th scope='col' className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                          Registered
                        </th>}
                      {isLoggedIn &&
                        <th scope='col' className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                          Edit
                        </th>}
                      {isLoggedIn &&
                        <th scope='col' className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                          Delete
                        </th>}
                    </tr>
                  </thead>

                  <tbody className='bg-ghostWhite divide-y-8 divide-lavenderWebb'>
                    {sortSessions(sessions).map(session => (
                      <tr key={`session-${session.pk}`}>
                        <td className=' px-6 py-4 whitespace-nowrap text-sm font-medium text-coolGray-900'>
                          {session.title}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-coolGray-500'>
                          <span className='flex justify-between'>
                            <span className='text-gray-700'>Start:</span>
                            <Moment format='MMM DD, YYYY'>{session.start_date}</Moment>
                          </span>
                          <span className='flex justify-between'>
                            <span className='text-gray-700'> End:</span>
                            <Moment format='MMM DD, YYYY'>{session.end_date}</Moment>
                          </span>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-coolGray-500 space-x-1 text-center'>
                          <Moment format='h:mm a'>{session.start_time}</Moment>
                          <span>-</span>
                          <Moment format='h:mm a'>{session.end_time}</Moment>
                        </td>
                        <td className='px-6 py-4 break-words text-sm text-coolGray-500 space-x-1 text-center'>
                          {session.description}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-center text-sm text-coolGray-500'>
                          {renderSessionStatus(session)}
                        </td>
                        {isLoggedIn &&
                          <>
                            <td className='px-6 py-4 whitespace-nowrap text-center text-sm text-coolGray-500'>
                              {session.session_registrants.length}
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                              <button
                                className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-3 py-1 bg-lavenderBlue text-base font-medium text-coolGray-600 hover:text-ghostWhite hover:bg-bluePurple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm'
                                onClick={() => {
                                  setSessionToEdit(session)
                                  setIsEditing('edit-session')
                                }}
                              >Edit
                              </button>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                              <button
                                className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-3 py-1 bg-lavenderBlue text-base font-medium text-coolGray-600 hover:text-ghostWhite hover:bg-bluePurple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm'
                                onClick={() => {
                                  setIsDeleting('delete-session')
                                  setSessionToDelete(session)
                                }}
                              >Delete
                              </button>
                            </td>
                          </>}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpcomingSessions
