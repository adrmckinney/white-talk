import { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { MailIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { ChevronDoubleRightSolid } from '@graywolfai/react-heroicons'
import Moment from 'react-moment'
import { listSessions, deleteRegistrant, updateRegistrant } from '../api'
import SelectionElement from './SelectionElement'
import StaticMenu from './dropdownMenus/StaticMenu'
import DeleteAlert from './alerts/DeleteAlert'
import SessionRegister from './sessionForms/SessionRegister'

const ViewSessionRegistrants = ({ token, isLoggedIn, setShowModal, dropdownSelectorMode, setDropdownSelectorMode, setSessionToRegister }) => {
  const [sessions, setSessions] = useState([])
  const [registrantsToRender, setRegistrantsToRender] = useState([])
  const [allEmails, setAllEmails] = useState([])
  const [emails, setEmails] = useState([])
  const [selectedAction, setSelectedAction] = useState('')
  const [isDeleting, setIsDeleting] = useState('')
  const [isEditing, setIsEditing] = useState('')
  const [registrantToDelete, setRegistrantToDelete] = useState([])
  const [registrantToEdit, setRegistrantToEdit] = useState([])
  const [sessionToUpdate, setSessionToUpdate] = useState([])
  const [refreshAfterAction, setRefreshAfterAction] = useState([])

  // DEBUGGER STATION
  // console.log('allEmails', allEmails)
  // console.log('emails', emails)
  // console.log('isDeleting', isDeleting)
  // console.log('isEditing', isEditing)
  console.log('sessions', sessions)
  console.log('registrantsToRender', registrantsToRender)
  // console.log('registrantToEdit', registrantToEdit)
  // console.log('registrantToDelete', registrantToDelete)
  // console.log('sessions in ViewSessionReg', sessions)
  // console.log('sessionToUpate', sessionToUpdate)

  useEffect(() => {
    listSessions()
      .then(sessions => {
        setSessions(sessions)
        setDropdownSelectorMode('view-session-registrants')
      })
  }, [setDropdownSelectorMode])

  const handleClearAllActionState = () => {
    setSessionToUpdate([])
    setRegistrantToEdit([])
    setRegistrantToDelete([])
    setEmails([])
  }

  const handleEmails = (email) => {
    const checkEmails = [...emails]
    if (checkEmails.includes(email)) {
      setEmails(emails.filter(em => em !== email))
    } else {
      const newEmails = [...emails, email]
      setEmails(newEmails)
    }
  }

  const handleDeleteState = (e, registrant) => {
    if (!e.target.checked) {
      setRegistrantToDelete([])
    } else {
      setRegistrantToDelete(registrant)
    }
  }

  const handleEditState = (e, registrant) => {
    if (!e.target.checked) {
      setRegistrantToEdit([])
    } else {
      setRegistrantToEdit(registrant)
    }
  }

  // This function handles how the btn text and mail functions
  // are implemented based on the action dropdown selection
  const handleBtnText = () => {
    if (selectedAction === 'Email All') {
      return (
        <a
          href={`mailto:${allEmails}`}
          rel='noreferrer'
          target='_blank'
        >
          <span className='flex'>
            <MailIcon className='-ml-0.5 mr-2 h-4 w-4' aria-hidden='true' />
            {selectedAction}
          </span>
        </a>
      )
    } else if (selectedAction === 'Email Selected') {
      return (
        <a
          href={`mailto:${emails}`}
          rel='noreferrer'
          target='_blank'
        >
          <span className='flex'>
            <MailIcon className='-ml-0.5 mr-2 h-4 w-4' aria-hidden='true' />
            {selectedAction}
          </span>
        </a>
      )
    } else if (selectedAction === 'Update') {
      return (
        <span className='flex'>
          <PencilAltIcon className='-ml-0.5 mr-2 h-4 w-4' aria-hidden='true' />
          {selectedAction}
        </span>
      )
    } else if (selectedAction === 'Delete') {
      return (
        <span className='flex'>
          <TrashIcon className='-ml-0.5 mr-2 h-4 w-4' aria-hidden='true' />
          {selectedAction}
        </span>
      )
    }
  }

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
    sessions.map(session => {
      if (session.pk === registrantsToRender.pk) {
        setRegistrantsToRender(session)
      }
    })
  }

  if (isDeleting) {
    return (
      <DeleteAlert isDeleting={isDeleting} setIsDeleting={setIsDeleting} handleDelete={handleDelete} dataToDelete={registrantToDelete} handleClearAllActionState={handleClearAllActionState} />
    )
  }

  if (isEditing === 'edit-registrant' && registrantToEdit.pk) {
    return (
      <SessionRegister
        token={token} registrantToEdit={registrantToEdit} isEditing={isEditing} sessions={sessions} setIsEditing={setIsEditing} showModal='session-registration-form' setShowModal={setShowModal} sessionToRegister={sessionToUpdate} handleRegistrantUpdate={handleRegistrantUpdate}
      />
    )
  }

  if (!isLoggedIn) {
    <Redirect to='/' />
  }

  const setSessionTableTitle = () => {
    return (
      <span
        className='font-normal space-x-2 truncate flex'
      >
        <p>{registrantsToRender.title}</p>
        <span className='flex space-x-1'>
          <Moment format='MM/DD/YYYY'>{registrantsToRender.start_date}</Moment>
          <p>-</p>
          <Moment format='MM/DD/YYYY'>{registrantsToRender.end_date}</Moment>
        </span>
      </span>
    )
  }

  return (
    <>
      <div className='max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8'>
        <SelectionElement sessions={sessions} dropdownSelectorMode={dropdownSelectorMode} setRegistrantsToRender={setRegistrantsToRender} setAllEmails={setAllEmails} />
        <div className='flex flex-col pt-20'>
          <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
            <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
              <span>
                <span className='flex items-start'>
                  <h1 className='text-2xl flex flex-1 justify-center mb-10 shadow-sm rounded-lg'>{!registrantsToRender.pk ? 'Session' : setSessionTableTitle()}</h1>
                  {registrantsToRender.pk &&
                    <div className='flex flex-row space-x-2'>
                      <div className={`flex justify-center ${selectedAction && 'transform -translate-x-2 duration-700'}`}>
                        <StaticMenu dropdownSelectorMode='action' selectedAction={selectedAction} setSelectedAction={setSelectedAction} />
                      </div>
                      {selectedAction &&
                        <div className='flex items-center'>
                          <ChevronDoubleRightSolid className='-ml-0.5 mr-2 h-4 w-4 transition delay-1000 animate-pulse' aria-hidden='true' />
                        </div>}
                      {selectedAction &&
                        <span className='flex transition-all delay-1000 duration-500 ease-in-out'>
                          <button
                            type='button'
                            className='inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-coolGray-600 bg-lavenderBlue hover:bg-bluePurple hover:text-ghostWhite focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                            onClick={() => {
                              if (selectedAction === 'Delete') {
                                setIsEditing('')
                                setIsDeleting('delete-registrant')
                              } else if (selectedAction === 'Update') {
                                setIsDeleting('')
                                setIsEditing('edit-registrant')
                              }
                            }}
                          >
                            {handleBtnText()}
                          </button>
                        </span>}
                    </div>}
                </span>
                <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
                  <table className='min-w-full divide-y divide-gray-200'>
                    <thead className='bg-gray-50'>
                      <tr>
                        <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                          Name
                        </th>
                        <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                          Pronouns
                        </th>
                        <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                          Email
                        </th>
                        <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                          Comment
                        </th>
                        <th scope='col' className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                          <span className='space-y-1'>
                            <p>Action</p>
                          </span>
                        </th>
                      </tr>
                    </thead>

                    <tbody className='bg-white divide-y divide-gray-200'>
                      {!registrantsToRender.pk || registrantsToRender.session_registrants.map((registrant, idx) => (
                        <tr key={`${registrant.pk}-index-${idx}`}>
                          <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 space-x-1 flex'>
                            <p>{registrant.first_name}</p>
                            <p>{registrant.last_name}</p>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                            {registrant.pronouns}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                            {registrant.email}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                            {registrant.comment}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-center text-sm font-medium'>
                            <input
                              name={idx}
                              id={registrant.email}
                              type='checkbox'
                              value={registrant.email}
                              onChange={(e) => {
                                handleEmails(registrant.email)
                                handleSessionToEdit(registrant)
                                handleEditState(e, registrant)
                                handleDeleteState(e, registrant)
                              }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewSessionRegistrants
