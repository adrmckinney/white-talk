import { useReducer, useEffect, useState } from 'react'
import { Transition } from '@headlessui/react'
import { sendRegistrationEmail, sessionRegister } from '../../api'
import Comments from './Comments'
import Email from './Email'
import Name from './Name'
import Pronouns from './Pronouns'
import SessionToRegister from './SessionToRegister'
import ConfirmationStatus from './ConfirmationStatus'
import { RefreshIcon } from '@heroicons/react/outline'

const SessionRegister = ({ token, sessions, sessionToRegister, setSessionToRegister, setRegistered, showModal, setShowModal, isEditing, setIsEditing, registrantToEdit, setIsRegistering, handleRegistrantUpdate, setRegistrantsToRender }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [filterInput, setFilterInput] = useReducer(
    (name, value) => ({ ...name, ...value }),
    {
      first_name: '',
      last_name: '',
      pronouns: '',
      email: '',
      comment: '',
      session: null,
      confirm: false,
      // specifically for registration emails
      title: '',
      facilitator: '',
      facilitator_email: '',
      registrant_cue_number: null,
      number_of_registrants_allowed: null,
      description: ''
    }
  )
  const emailFacilitatorParams = ({
    first_name: filterInput.first_name,
    last_name: filterInput.last_name,
    pronouns: filterInput.pronouns,
    email: filterInput.email,
    comment: filterInput.comment,
    session: filterInput.title,
    to_name: filterInput.facilitator,
    reply_to: filterInput.email,
    facilitator: filterInput.facilitator,
    facilitator_email: filterInput.facilitator_email,
    registrant_cue_number: filterInput.registrant_cue_number + 1,
    number_of_registrants_allowed: filterInput.number_of_registrants_allowed
  })
  const emailRegistrantParams = ({
    first_name: filterInput.first_name,
    last_name: filterInput.last_name,
    email: filterInput.email,
    session: filterInput.title,
    reply_to: filterInput.facilitator_email,
    facilitator: filterInput.facilitator,
    description: filterInput.description
  })

  // DEBUGGER STATION
  // console.log('sessions in SessionRegister', sessions)
  // console.log('sessionToRegister', sessionToRegister)
  // console.log('registrantToEdit', registrantToEdit)
  console.log('filterInput', filterInput)
  console.log('emailFacilitatorParams', emailFacilitatorParams)
  // console.log('setEmailFacilitatorParams', setEmailFacilitatorParams)

  useEffect(() => {
    if (isEditing === 'edit-registrant' && registrantToEdit.pk) {
      setFilterInput({
        first_name: registrantToEdit.first_name,
        last_name: registrantToEdit.last_name,
        pronouns: registrantToEdit.pronouns,
        email: registrantToEdit.email,
        comment: registrantToEdit.comment,
        session: registrantToEdit.session
      })
    }
  }, [isEditing, registrantToEdit])

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    if (isEditing === 'edit-registrant') {
      handleRegistrantUpdate(token, registrantToEdit.pk, filterInput)
    } else {
      sessionRegister(filterInput)
        .then(data => {
          setIsLoading(false)
          setShowModal('')
          setIsRegistering('')
          setRegistered(true)
          sendRegistrationEmail(emailRegistrantParams, 'template_jthf4wi')
            .then(res => {
              console.log('success')
            }, function (error) {
              console.log('FAILED...', error)
            })
          sendRegistrationEmail(emailFacilitatorParams, 'template_45evc8x')
            .then(res => {
              console.log('success')
            }, function (error) {
              console.log('FAILED...', error)
            })
        })
        .catch()
    }
  }

  return (
    <>
      <div className='fixed z-20 inset-0 overflow-y-auto'>
        <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>

          <Transition
            show={showModal === 'session-registration-form'}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
              <div className='absolute inset-0 bg-gray-500 opacity-75' />
            </div>
          </Transition>

          <Transition
            show={showModal === 'session-registration-form'}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <form onSubmit={handleSubmit}>
              <div className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6' role='dialog' aria-modal='true' aria-labelledby='modal-headline'>
                <div>
                  <div className='mt-2 mb-5 text-center'>
                    <h3 className='text-lg leading-6 font-medium text-gray-900' id='modal-headline'>
                      {isEditing
                        ? 'Update Registrant Info'
                        : 'Session Registration'}
                    </h3>
                  </div>
                  <span className='space-y-4'>
                    <div>
                      <SessionToRegister filterInput={filterInput} setFilterInput={setFilterInput} sessions={sessions} sessionToRegister={sessionToRegister} />
                    </div>
                    <div>
                      <Name filterInput={filterInput} setFilterInput={setFilterInput} />
                    </div>
                    <div>
                      <Pronouns filterInput={filterInput} setFilterInput={setFilterInput} />
                    </div>
                    <div>
                      <Email filterInput={filterInput} setFilterInput={setFilterInput} />
                    </div>
                    <div>
                      <Comments filterInput={filterInput} setFilterInput={setFilterInput} />
                    </div>
                    {isEditing &&
                      <div>
                        <ConfirmationStatus filterInput={filterInput} setFilterInput={setFilterInput} />
                      </div>}
                  </span>
                </div>
                <div className='mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense'>
                  {isLoading
                    ? <button type='submit' disabled className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 btn-color focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm'>
                      <RefreshIcon className='h-4 w-4 mr-4 self-center animate-spin' />
                      Processing
                    </button>
                    : <button type='submit' className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 btn-color focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm'>
                      {isEditing
                        ? 'Update'
                        : 'Register'}
                    </button>}
                  <button
                    type='button'
                    className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm'
                    onClick={() => {
                      setShowModal('')
                      if (isEditing) {
                        setIsEditing('')
                      } else {
                        setIsRegistering('')
                      }
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </Transition>
        </div>
      </div>

    </>
  )
}

export default SessionRegister
