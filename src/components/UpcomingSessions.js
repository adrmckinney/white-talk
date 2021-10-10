import { useContext } from 'react'
import Moment from 'react-moment'
import Button from './customComponents/Button'
import { sortSessions } from './functions'
import { SessionsContext } from './useContextSessions'

const UpcomingSessions = ({
  token,
  sessions,
  setSessions,
  isLoggedIn,
  showModal,
  setShowModal,
  setSessionToView,
  setRegistered,
  isDeleting,
  setIsDeleting,
  isRegistering,
  setIsRegistering,
  isEditing,
  setIsEditing,
  isLoading,
  setIsLoading,
  renderSessionStatus,
}) => {
  // DEBUGGER STATION
  // console.log('isRegistering', isRegistering)
  // console.log('sessions', sessions)
  // console.log('reg who completed session', sessions.map(session => session.session_registrants.map(regs => regs)))
  // console.log('reg completed status', sessions.map(session => session.session_registrants.map(regs => regs.completed)))
  const { setSessionToEdit, setSessionToDelete } = useContext(SessionsContext)

  return (
    <>
      <div className='flex flex-col pt-10 bg-ghostWhite w-full h-screen border-b-4 border-coolGray-500'>
        <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='py-1 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
            <span>
              <h1 className='text-6xl text-center text-davysGray font-extrabold font-sans mb-10 rounded-lg'>
                Upcoming Sessions
              </h1>
              <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mx-8'>
                <table className='min-w-full divide-y-8 divide-mediumPurple font-nunito'>
                  <thead className='bg-magnolia'>
                    <tr>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Title
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Facilitator
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Date/Time
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 w-96 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Description
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Status
                      </th>
                      {isLoggedIn && (
                        <>
                          <th
                            scope='col'
                            className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                          >
                            Registered
                          </th>
                          <th
                            scope='col'
                            className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                          >
                            Edit/Delete
                          </th>
                        </>
                      )}
                    </tr>
                  </thead>

                  <tbody className='bg-ghostWhite divide-y-8 divide-lavenderWebb'>
                    {sortSessions(sessions).map(session => (
                      <tr key={`session-${session.pk}`}>
                        {session.session_complete === false && (
                          <>
                            <td className=' px-6 py-4 break-words text-sm font-medium text-coolGray-900'>
                              {session.title}
                            </td>
                            <td className=' px-6 py-4 break-words text-sm font-medium text-coolGray-900'>
                              {session.facilitator}
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm text-coolGray-500'>
                              <span className='space-y-2'>
                                <span className='flex justify-between'>
                                  <span className='text-gray-800'>First Mtg:</span>
                                  <Moment format='MMM DD, YYYY'>{session.start_date}</Moment>
                                </span>
                                <span className='flex justify-between'>
                                  <span className='text-gray-800'> Last Mtg:</span>
                                  <Moment format='MMM DD, YYYY'>{session.end_date}</Moment>
                                </span>
                                <span className='flex space-x-2'>
                                  <span className='text-gray-800'> From:</span>
                                  <span className='space-x-1'>
                                    <Moment format='h:mm a'>{session.start_time}</Moment>
                                    <span>-</span>
                                    <Moment format='h:mm a'>{session.end_time}</Moment>
                                  </span>
                                </span>
                              </span>
                            </td>
                            <td
                              className={`${
                                isLoggedIn ? 'whitespace-nowrap truncate max-w-sm' : 'break-words'
                              } px-6 py-4 text-sm text-coolGray-500 space-x-1 text-center`}
                            >
                              {session.description}
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap text-center text-sm text-coolGray-500'>
                              {renderSessionStatus(session, 'register-modal')}
                            </td>
                            {isLoggedIn && (
                              <>
                                <td className='px-6 py-4 whitespace-nowrap text-center text-sm text-coolGray-500'>
                                  {session.session_registrants.length}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-center text-sm text-coolGray-500'>
                                  <span className='flex flex-col space-y-4'>
                                    <Button
                                      type={'button'}
                                      buttonLabel={'Edit'}
                                      buttonSize={'small'}
                                      buttonStatus={'secondary'}
                                      icon={'edit'}
                                      customIconStyle={'-ml-4'}
                                      onClick={() => {
                                        setSessionToEdit(session)
                                        setIsEditing('edit-session')
                                      }}
                                    />
                                    <Button
                                      type={'button'}
                                      buttonLabel={'Delete'}
                                      buttonSize={'small'}
                                      buttonStatus={'secondary'}
                                      icon={'delete'}
                                      onClick={() => {
                                        setIsDeleting('delete-session')
                                        setSessionToDelete(session)
                                      }}
                                    />
                                  </span>
                                </td>
                              </>
                            )}
                          </>
                        )}
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
