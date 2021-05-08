import { useState } from 'react'
import { MailIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { ChevronDoubleRightSolid } from '@graywolfai/react-heroicons'
import StaticMenu from './dropdownMenus/StaticMenu'

const RenderRegistrants = ({ token, sessions, isLoggedIn, setShowModal, dropdownSelectorMode, setDropdownSelectorMode, setSessionToRegister, registrantsToRender, setRegistrantsToRender, allEmails, handleAllEmails, handleDeleteState, handleEditState, handleSessionToEdit, handleDelete, handleRegistrantUpdate, handleRefreshAfterEdit, setIsDeleting, setIsEditing }) => {
  const [emails, setEmails] = useState([])
  const [selectedAction, setSelectedAction] = useState('')

  // DEBUGGER STATION
  // console.log('allEmails', allEmails)
  // console.log('emails', emails)
  // console.log('isDeleting', isDeleting)
  // console.log('isEditing', isEditing)
  // console.log('sessions', sessions)
  // console.log('registrantsToRender', registrantsToRender)
  // console.log('registrantToEdit', registrantToEdit)
  // console.log('registrantToDelete', registrantToDelete)
  // console.log('sessions in ViewSessionReg', sessions)
  // console.log('sessionToUpate', sessionToUpdate)

  const handleEmails = (email) => {
    const checkEmails = [...emails]
    if (checkEmails.includes(email)) {
      setEmails(emails.filter(em => em !== email))
    } else {
      const newEmails = [...emails, email]
      setEmails(newEmails)
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

  return (
    <>
      <div className='max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8'>
        <span className='flex justify-around' />
        <div className='flex flex-col'>
          <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
            <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
              <span>
                <span className='flex items-start justify-end pt-10'>
                  {registrantsToRender.pk &&
                    <div className='flex flex-row space-x-2 mb-2'>
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
                  <table className='min-w-full divide-y-8 divide-mediumPurple font-nunito'>
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
                          Confirmed
                        </th>
                        <th scope='col' className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody className='bg-white divide-y-8 divide-lavenderWebb font-nunito'>
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
                          <td className='px-6 py-4 break-words text-sm text-gray-500'>
                            {registrant.comment}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center'>
                            {registrant.confirm ? 'Yes' : 'No'}
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

export default RenderRegistrants
