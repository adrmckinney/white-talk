import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MailIcon } from '@heroicons/react/solid'
import Button from './customComponents/Button'

const RenderRegistrants = ({ token, sessions, isLoggedIn, setShowModal, dropdownSelectorMode, setDropdownSelectorMode, setSessionToRegister, registrantsToRender, setRegistrantsToRender, confirmedEmailData, handleDeleteState, handleSessionToEdit, handleDelete, handleRegistrantUpdate, handleRefreshAfterEdit, setIsDeleting, setIsEditing, prepEmailForm, handleSelectedEmails, prepSessionRegistrationForm }) => {
  const [selectedEmails, setSelectedEmails] = useState([])

  // DEBUGGER STATION
  // console.log('confirmedEmails', confirmedEmails)
  // console.log('selectedEmails', selectedEmails)
  // console.log('isDeleting', isDeleting)
  // console.log('isEditing', isEditing)
  // console.log('sessions', sessions)
  // console.log('registrantsToRender', registrantsToRender)
  // console.log('registrantToEdit', registrantToEdit)
  // console.log('registrantToDelete', registrantToDelete)
  // console.log('sessions in ViewSessionReg', sessions)
  // console.log('sessionToUpate', sessionToUpdate)

  const handleEmails = (e, registrant) => {
    const pk = registrant.pk
    const name = `${registrant.first_name} ${registrant.last_name}`
    const email = registrant.email

    const { checked } = e.currentTarget

    if (checked) {
      setSelectedEmails([...selectedEmails, { pk: pk, name: name, email: email }])
    } else {
      selectedEmails.forEach(obj => {
        if (obj.pk === parseInt(e.currentTarget.id)) {
          setSelectedEmails(selectedEmails.filter(obj => obj.pk !== parseInt(e.currentTarget.id)))
        }
      })
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
                    <div className='flex flex-row space-x-2 mb-6'>
                      <div className='flex justify-center space-x-4'>
                        <Link
                          to='/alumni-reg-contact'
                          className='inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-coolGray-600 bg-lavenderBlue hover:bg-bluePurple hover:text-ghostWhite focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkerPurple'
                          onClick={() => prepEmailForm(confirmedEmailData, 'registrants')}
                        >
                          <span className='flex'>
                            <MailIcon className='-ml-0.5 mr-2 h-4 w-4' aria-hidden='true' />
                            Email All

                          </span>
                        </Link>
                        <Link
                          to='/alumni-reg-contact'
                          className='inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-coolGray-600 bg-lavenderBlue hover:bg-bluePurple hover:text-ghostWhite focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkerPurple'
                          // onClick={() => handleSelectedEmails(selectedEmails)}
                          onClick={() => prepEmailForm(confirmedEmailData, 'registrants', selectedEmails)}
                        >
                          <span className='flex'>
                            <MailIcon className='-ml-0.5 mr-2 h-4 w-4' aria-hidden='true' />
                            Email Selected

                          </span>
                        </Link>
                      </div>

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
                        <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                          Update/Delete
                        </th>
                        <th scope='col' className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody className='bg-white divide-y-8 divide-lavenderWebb font-nunito'>
                      {!registrantsToRender.pk || registrantsToRender.session_registrants.map((registrant, idx) => (
                        <tr key={`${registrant.pk}-index-${idx}`}>
                          <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                            <span className='flex space-x-1'>
                              <p className=''>{registrant.first_name}</p>
                              <p>{registrant.last_name}</p>
                            </span>
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
                          <td className='px-6 py-4 whitespace-nowrap text-center text-sm text-coolGray-500'>
                            <span className='flex flex-col space-y-4'>
                              <Button 
                                type={'link'}
                                to={'/session-register'}
                                buttonLabel={'Edit'}
                                buttonSize={'small'}
                                buttonStatus={'secondary'}
                                icon={'edit'}
                                onClick={() => prepSessionRegistrationForm('', registrant)}
                              />
                              <Button 
                                type={'button'}
                                buttonLabel={'Delete'}
                                buttonSize={'small'}
                                buttonStatus={'secondary'}
                                icon={'delete'}
                                onClick={() => handleDeleteState(registrant)}
                              />
                            </span>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-center text-sm font-medium'>
                            <input
                              id={registrant.pk}
                              type='checkbox'
                              onChange={(e) => {
                                handleEmails(e, registrant)
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
