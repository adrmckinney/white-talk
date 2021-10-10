/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState, useReducer } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { RefreshIcon, XIcon } from '@heroicons/react/outline'
import ConfirmationStatus from './ConfirmationStatus'
import Comments from './Comments'
import Email from './Email'
import Pronouns from './Pronouns'
import Name from './Name'
import SessionToRegister from './SessionToRegister'
import { sessionRegister } from '../../api'

export default function SessionRegisterOverlay({
  token,
  sessions,
  setRegistered,
  showModal,
  setShowModal,
  isEditing,
  setIsEditing,
  registrantToEdit,
  setIsRegistering,
  handleRegistrantUpdate,
  setRegistrantsToRender,
}) {
  const [open, setOpen] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const [filterInput, setFilterInput] = useReducer((name, value) => ({ ...name, ...value }), {
    first_name: '',
    last_name: '',
    pronouns: '',
    email: '',
    comment: '',
    session: null,
    confirm: false,
  })

  // DEBUGGER STATION
  // console.log('sessions in SessionRegister', sessions)
  // console.log('sessionToRegister', sessionToRegister)
  // console.log('registrantToEdit', registrantToEdit)
  console.log('filterInput', filterInput)

  useEffect(() => {
    if (isEditing === 'edit-registrant' && registrantToEdit.pk) {
      setFilterInput({
        first_name: registrantToEdit.first_name,
        last_name: registrantToEdit.last_name,
        pronouns: registrantToEdit.pronouns,
        email: registrantToEdit.email,
        comment: registrantToEdit.comment,
        session: registrantToEdit.session,
      })
    }
  }, [isEditing, registrantToEdit])

  const handleSubmit = () => {
    // e.preventDefault()
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
        })
        .catch()
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        static
        className='fixed inset-0 overflow-hidden z-50'
        open={open}
        onClose={setOpen}
      >
        <div className='absolute inset-0 overflow-hidden'>
          <Dialog.Overlay className='absolute inset-0' />

          <div className='fixed inset-y-0 right-0 pl-10 max-w-full flex'>
            <Transition.Child
              as={Fragment}
              enter='transform transition ease-in-out duration-500 sm:duration-700'
              enterFrom='translate-x-full'
              enterTo='translate-x-0'
              leave='transform transition ease-in-out duration-500 sm:duration-700'
              leaveFrom='translate-x-0'
              leaveTo='translate-x-full'
            >
              <div className='w-screen max-w-md'>
                <div className='h-full flex flex-col bg-white shadow-xl overflow-y-scroll'>
                  <div className='py-6 px-4 bg-indigo-700 sm:px-6'>
                    <div className='flex items-center justify-between'>
                      <Dialog.Title className='text-lg font-medium text-white'>
                        Session Registration
                      </Dialog.Title>
                      <div className='ml-3 h-7 flex items-center'>
                        <button
                          className='bg-indigo-700 rounded-md text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white'
                          onClick={() => {
                            setOpen(false)
                            if (isEditing) {
                              setIsEditing('')
                            } else {
                              setIsRegistering('')
                            }
                          }}
                        >
                          <span className='sr-only'>Close panel</span>
                          <XIcon className='h-6 w-6' aria-hidden='true' />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className='relative flex-1 py-6 px-4 sm:px-6'>
                    {/* Replace with your content */}
                    <div className='absolute inset-0 py-6 px-4 sm:px-6'>
                      {/* <form onSubmit={handleSubmit}> */}
                      <div
                        className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6'
                        role='dialog'
                        aria-modal='true'
                        aria-labelledby='modal-headline'
                      >
                        <div>
                          <div className='mt-2 mb-5 text-center'>
                            <h3
                              className='text-lg leading-6 font-medium text-gray-900'
                              id='modal-headline'
                            >
                              {isEditing ? 'Update Registrant Info' : 'Session Registration'}
                            </h3>
                          </div>
                          <span className='space-y-4'>
                            <div>
                              <SessionToRegister
                                filterInput={filterInput}
                                setFilterInput={setFilterInput}
                                sessions={sessions}
                              />
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
                            {isEditing && (
                              <div>
                                <ConfirmationStatus
                                  filterInput={filterInput}
                                  setFilterInput={setFilterInput}
                                />
                              </div>
                            )}
                          </span>
                        </div>
                        <div className='mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense'>
                          {isLoading ? (
                            <button
                              type='submit'
                              disabled
                              className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 btn-color focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm'
                            >
                              <RefreshIcon className='h-4 w-4 mr-4 self-center animate-spin' />
                              Processing
                            </button>
                          ) : (
                            <button
                              type='submit'
                              className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 btn-color focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm'
                              onClick={() => handleSubmit()}
                            >
                              {isEditing ? 'Update' : 'Register'}
                            </button>
                          )}
                          <button
                            type='button'
                            className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm'
                            onClick={() => {
                              setOpen(false)
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
                      {/* </form> */}
                    </div>
                    {/* /End replace */}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
