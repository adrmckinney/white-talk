import { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { MailIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import Moment from 'react-moment'
import { listSessions, deleteRegistrant } from '../api'
import SelectionElement from './SelectionElement'
import StaticMenu from './dropdownMenus/StaticMenu'
import DeleteAlert from './alerts/DeleteAlert'

const ViewSessionRegistrants = ({ token, isLoggedIn, dropdownSelectorMode, setDropdownSelectorMode }) => {
  const [sessions, setSessions] = useState([])
  const [registrantsToRender, setRegistrantsToRender] = useState([])
  const [allEmails, setAllEmails] = useState([])
  const [emails, setEmails] = useState([])
  const [selectedAction, setSelectedAction] = useState('')
  const [isDeleting, setIsDeleting] = useState('')
  const [registrantToDelete, setRegistrantToDelete] = useState([])
  // This state was for when I was trying to have a box that
  // would check all boxes. This was to get the checked
  // value from the each of the boxes.
  // const [checked, setChecked] = useReducer(
  //   (idx, value) => ({ ...idx, ...value })
  // )

  console.log('allEmails', allEmails)
  console.log('emails', emails)

  useEffect(() => {
    listSessions()
      .then(sessions => {
        setSessions(sessions)
        setDropdownSelectorMode('view-session-registrants')
        // setAllEmails(sessions.map(session => session.email))
      })
  }, [setDropdownSelectorMode])

  const handleEmails = (email) => {
    const checkEmails = [...emails]

    if (checkEmails.includes(email)) {
      setEmails(emails.filter(em => em !== email))
    } else {
      const newEmails = [...emails, email]
      setEmails(newEmails)
    }
  }

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

  const handleDelete = (pk) => {
    deleteRegistrant(token, pk)
      .then(data => {
        listSessions()
          .then(sessions => {
            setSessions(sessions)
            setDropdownSelectorMode('view-session-registrants')
            // setAllEmails(sessions.map(session => session.email))
          })
      })
  }

  if (isDeleting) {
    return (
      <DeleteAlert isDeleting={isDeleting} setIsDeleting={setIsDeleting} handleDelete={handleDelete} dataToDelete={registrantToDelete} />
    )
  }

  // const handleBtnClick = () => {
  //   if (selectedAction === 'Email All') {

  //   }
  // }

  // These functions were for when I was trying to have a box that
  // would check all boxes. This was to get the checked
  // value from the each of the boxes.

  // const handleChecked = (idx, email) => {
  //   // const checkChecked = [...checked]
  //   if (!checked) {
  //     setChecked({ [idx]: email })
  //   } else {
  //     let match = false
  //     console.log('match before', match)
  //     checked.forEach(check => {
  //       if (check.idx === idx) {
  //         match = true
  //       }
  //     })

  //     if (match === false) {
  //       setChecked({ [idx]: email })
  //     } else {
  //       console.log('match after', match)
  //     }
  //   }

  //   setChecked(checked.filter(ch => ch !== idx))
  // } else {
  //   setChecked({ [idx]: email })
  // }
  // }

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
              {/* {sessions.map(session => ( */}
              <span>
                <span className='flex items-start'>
                  <h1 className='text-2xl flex flex-1 justify-center mb-10 shadow-sm rounded-lg'>{!registrantsToRender.pk ? 'Session' : setSessionTableTitle()}</h1>
                  {registrantsToRender.pk &&
                    <>
                      <div className='flex flex-1 justify-center'>
                        <StaticMenu dropdownSelectorMode='action' selectedAction={selectedAction} setSelectedAction={setSelectedAction} />
                      </div>
                      {selectedAction &&
                        <span className='flex flex-1/2 items-start'>
                          <button
                            type='button'
                            className='inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-coolGray-600 bg-lavenderBlue hover:bg-bluePurple hover:text-ghostWhite focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                            onClick={() => setIsDeleting('delete-registrant')}
                          >
                            {handleBtnText()}
                          </button>
                        </span>}
                    </>}
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
                                // handleCheckAll(idx, e.target.checked)
                                handleEmails(registrant.email)
                                setRegistrantToDelete(registrant)
                              }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </span>
              {/* ))} */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewSessionRegistrants
