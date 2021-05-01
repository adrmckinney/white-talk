import { useReducer, useState, useEffect } from 'react'
import { Transition } from '@headlessui/react'
import moment from 'moment'
import { createSession, listSessions } from '../api'
import SessionTitle from './createSessionForm.js/SessionTitle'
import SessionDescription from './createSessionForm.js/SessionDescription'
import SessionDates from './createSessionForm.js/SessionDates'
import SessionStatus from './createSessionForm.js/SessionStatus'

const CreateSession = ({ token, showModal, setShowModal, isEditing, setIsEditing, sessionToEdit, handleEditSession, setIsCreatingSession, setSessions }) => {
  const [time, setTime] = useState('')
  const [filterInput, setFilterInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      title: '',
      start_date: '',
      end_date: '',
      description: '',
      session_status: false
    }
  )

  const handleFilterSession = (name, value) => {
    setFilterInput({ [name]: value })
  }

  useEffect(() => {
    if (isEditing === 'edit-session' && sessionToEdit) {
      // for the existing dates to populate the datepicker fields that have to
      // run through this function that formats them correctly.
      const convertDate = (date) => {
        return moment(date)
      }

      setFilterInput({
        title: sessionToEdit.title,
        start_date: convertDate(sessionToEdit.start_date).toDate(),
        end_date: convertDate(sessionToEdit.end_date).toDate(),
        description: sessionToEdit.description,
        session_status: sessionToEdit.session_status
      })
    }
  }, [isEditing, sessionToEdit])

  // DEBUGGER STATION
  // console.log('sessionToEdit', sessionToEdit.pk)
  // console.log('filterInput', filterInput)
  // console.log('isEditing', isEditing)
  // console.log('showModal', showModal)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isEditing === 'edit-session') {
      handleEditSession(token, sessionToEdit.pk, filterInput)
      setIsEditing('')
      setShowModal('')
    } else {
      createSession(token, filterInput)
        .then(data => {
          setShowModal('')
          setIsCreatingSession(false)
          listSessions()
            .then(data => setSessions(data))
        })
    }
  }

  return (
    <>
      <div className='fixed z-20 inset-0 overflow-y-auto'>
        <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>

          {/* Background overlay, show/hide based on modal state. */}
          <Transition
            show={showModal === 'create-session-form'}
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
          {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
          <span className='sm:inline-block sm:align-middle sm:h-screen w-3/4' aria-hidden='true'>&#8203;

            {/* Modal panel, show/hide based on modal state. */}
            <Transition
              show={showModal === 'create-session-form'}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <form onSubmit={e => {
                e.preventDefault()
                handleSubmit(e)
              }}
              >
                <div className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6' role='dialog' aria-modal='true' aria-labelledby='modal-headline'>
                  <div>
                    <div className='mt-2 mb-5 text-center'>
                      <h3 className='text-lg leading-6 font-medium text-gray-900' id='modal-headline'>
                        {isEditing ? 'Update Session' : 'Create a new session'}
                      </h3>
                    </div>
                    <div>
                      <SessionTitle handleFilterSession={handleFilterSession} filterInput={filterInput} />
                    </div>
                    <div>
                      <SessionDates time={time} setTime={setTime} handleFilterSession={handleFilterSession} filterInput={filterInput} />
                    </div>
                    <div>
                      <SessionDescription handleFilterSession={handleFilterSession} filterInput={filterInput} />
                    </div>
                    <div className='mt-4'>
                      <SessionStatus handleFilterSession={handleFilterSession} filterInput={filterInput} />
                    </div>
                  </div>
                  <div className='mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense'>
                    <button type='submit' className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 btn-color focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm'>
                      {isEditing === 'edit-session'
                        ? 'Update'
                        : 'Create'}
                    </button>
                    <button
                      type='button'
                      className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm'
                      onClick={() => {
                        if (isEditing) {
                          setIsEditing('')
                        } else {
                          setShowModal('')
                          setIsCreatingSession(false)
                        }
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </Transition>
          </span>
        </div>
      </div>
    </>
  )
}

export default CreateSession
