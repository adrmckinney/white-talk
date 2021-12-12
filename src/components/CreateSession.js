import { useReducer, useEffect, useContext } from 'react'
import { Transition } from '@headlessui/react'
import moment from 'moment'
import { createSession, listSessions } from '../api/api'
import SessionTitle from './createSessionForm.js/SessionTitle'
import SessionDescription from './createSessionForm.js/SessionDescription'
import SessionDates from './createSessionForm.js/SessionDates'
import SessionStatus from './createSessionForm.js/SessionStatus'
import FacilitatorEmail from './createSessionForm.js/FacilitatorEmail'
import SessionTime from './createSessionForm.js/SessionTime'
import NumberOfRegistrants from './createSessionForm.js/NumberOfRegistrants'
import SessionFacilitator from './createSessionForm.js/SessionFacilitator'
import SessionComplete from './createSessionForm.js/SessionComplete'
import Button from './customComponents/Button'
import { SessionsContext } from './useContextSessions'

const CreateSession = ({
  token,
  showModal,
  setShowModal,
  isEditing,
  setIsEditing,
  handleEditSession,
  setIsCreatingSession,
  isLoading,
  setIsLoading,
}) => {
  const { setSessions, sessionToEdit } = useContext(SessionsContext)
  const [filterInput, setFilterInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      title: '',
      start_date: '',
      end_date: '',
      start_time: '',
      end_time: '',
      description: '',
      session_status: false,
      number_of_registrants_allowed: 8,
      facilitator: '',
      facilitator_email: '',
      session_complete: false,
    }
  )

  const handleFilterSession = (name, value) => {
    setFilterInput({ [name]: value })
  }

  useEffect(() => {
    if (isEditing === 'edit-session' && sessionToEdit) {
      // for the existing dates to populate the datepicker fields they have to
      // run through this function that formats them correctly.
      const convertDate = date => {
        return moment(date)
      }

      setFilterInput({
        title: sessionToEdit.title,
        start_date: convertDate(sessionToEdit.start_date).toDate(),
        end_date: convertDate(sessionToEdit.end_date).toDate(),
        start_time: convertDate(sessionToEdit.start_time).toDate(),
        end_time: convertDate(sessionToEdit.end_time).toDate(),
        description: sessionToEdit.description,
        session_status: sessionToEdit.session_status,
        number_of_registrants_allowed: sessionToEdit.number_of_registrants_allowed,
        facilitator: sessionToEdit.facilitator,
        facilitator_email: sessionToEdit.facilitator_email,
        session_complete: sessionToEdit.session_complete,
      })
    }
  }, [isEditing, sessionToEdit])

  // DEBUGGER STATION
  console.log('sessionToEdit', sessionToEdit)
  console.log('filterInput', filterInput)
  // console.log('isEditing', isEditing)
  // console.log('showModal', showModal)
  // console.log('isLoading', isLoading)

  const handleSubmit = e => {
    e.preventDefault()
    setIsLoading(true)
    if (isEditing === 'edit-session') {
      handleEditSession(token, sessionToEdit.pk, filterInput)
    } else {
      createSession(token, filterInput).then(data => {
        setShowModal('')
        setIsCreatingSession(false)
        listSessions().then(data => setSessions(data))
        setIsLoading(false)
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
          <span
            className='sm:inline-block sm:align-middle sm:h-screen w-1/2 sm:w-full'
            aria-hidden='true'
          >
            &#8203;
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
              <form
                onSubmit={e => {
                  e.preventDefault()
                  handleSubmit(e)
                }}
              >
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
                        {isEditing ? 'Update Session' : 'Create a new session'}
                      </h3>
                    </div>
                    <span className='flex flex-col space-y-8'>
                      <div>
                        <SessionTitle
                          handleFilterSession={handleFilterSession}
                          filterInput={filterInput}
                        />
                      </div>
                      <div>
                        <SessionFacilitator
                          handleFilterSession={handleFilterSession}
                          filterInput={filterInput}
                        />
                      </div>
                      <div>
                        <FacilitatorEmail
                          handleFilterSession={handleFilterSession}
                          filterInput={filterInput}
                        />
                      </div>
                      <span className='flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between'>
                        <div>
                          <SessionDates
                            handleFilterSession={handleFilterSession}
                            filterInput={filterInput}
                          />
                        </div>
                        <div>
                          <SessionTime
                            handleFilterSession={handleFilterSession}
                            filterInput={filterInput}
                          />
                        </div>
                      </span>
                      <span className='flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between'>
                        <div>
                          <NumberOfRegistrants
                            handleFilterSession={handleFilterSession}
                            filterInput={filterInput}
                          />
                        </div>
                        <div>
                          <SessionStatus
                            handleFilterSession={handleFilterSession}
                            filterInput={filterInput}
                          />
                        </div>
                      </span>
                      <div>
                        <SessionDescription
                          handleFilterSession={handleFilterSession}
                          filterInput={filterInput}
                        />
                      </div>
                      <div>
                        <SessionComplete
                          handleFilterSession={handleFilterSession}
                          filterInput={filterInput}
                        />
                      </div>
                    </span>
                  </div>
                  <span className=''>
                    <div className='mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense'>
                      <Button
                        type={'button'}
                        buttonLabel={'Cancel'}
                        buttonSize={'medium'}
                        buttonStatus={'cancel'}
                        onClick={() => {
                          if (isEditing) {
                            setIsEditing('')
                          } else {
                            setShowModal('')
                            setIsLoading(false)
                            setIsCreatingSession(false)
                          }
                        }}
                      />
                      <Button
                        type={isLoading ? 'button' : 'submit'}
                        buttonLabel={
                          isLoading
                            ? 'Processing'
                            : isEditing === 'edit-session'
                            ? 'Update'
                            : 'Create'
                        }
                        buttonSize={'medium'}
                        icon={isLoading ? 'refresh' : ''}
                        buttonStatus={'primary'}
                      />
                    </div>
                  </span>
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
