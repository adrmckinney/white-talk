import { useReducer, useEffect } from 'react'
import moment from 'moment'
import { createSession, listSessions } from '../api'
import SessionTitle from './createSessionForm.js/SessionTitle'
import SessionDescription from './createSessionForm.js/SessionDescription'
import SessionDates from './createSessionForm.js/SessionDates'
import SessionStatus from './createSessionForm.js/SessionStatus'
import FacilitatorEmail from './createSessionForm.js/FacilitatorEmail'
import SessionTime from './createSessionForm.js/SessionTime'
import NumberOfRegistrants from './createSessionForm.js/NumberOfRegistrants'
import { RefreshIcon } from '@heroicons/react/outline'
import SessionFacilitator from './createSessionForm.js/SessionFacilitator'

const CreateSession2 = ({
  token,
  showModal,
  setShowModal,
  isEditing,
  setIsEditing,
  sessionToEdit,
  handleEditSession,
  setIsCreatingSession,
  setSessions,
  isLoading,
  setIsLoading,
}) => {
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
    }
  )

  const handleFilterSession = (name, value) => {
    setFilterInput({ [name]: value })
  }

  useEffect(() => {
    if (isEditing === 'edit-session' && sessionToEdit) {
      // for the existing dates to populate the datepicker fields that have to
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
      })
    }
  }, [isEditing, sessionToEdit])

  // DEBUGGER STATION
  // console.log('sessionToEdit', sessionToEdit.pk)
  // console.log('filterInput', filterInput)
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
        setIsLoading(true)
      })
    }
  }

  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault()
          handleSubmit(e)
        }}
        className='space-y-8 divide-y divide-gray-200 mt-32'
      >
        <div className='space-y-8 divide-y divide-gray-200'>
          <div>
            <div>
              <div className='mt-2 mb-5 text-center'>
                <h3 className='text-lg leading-6 font-medium text-gray-900' id='modal-headline'>
                  {isEditing ? 'Update Session' : 'Create a new session'}
                </h3>
              </div>
            </div>

            <div className='pt-8'>
              <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                {/* <div className='flex flex-col'> */}
                <div className='sm:col-span-4 sm:col-start-2'>
                  <SessionTitle
                    handleFilterSession={handleFilterSession}
                    filterInput={filterInput}
                  />
                </div>

                <div className='sm:col-span-4 sm:col-start-2'>
                  <SessionFacilitator
                    handleFilterSession={handleFilterSession}
                    filterInput={filterInput}
                  />
                </div>

                <div className='sm:col-span-4 sm:col-start-2'>
                  <FacilitatorEmail
                    handleFilterSession={handleFilterSession}
                    filterInput={filterInput}
                  />
                </div>

                <div className='sm:col-span-full sm:col-start-2 flex justify-between'>
                  {/* <span className='flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between'>
                    <div> */}
                  <SessionDates
                    handleFilterSession={handleFilterSession}
                    filterInput={filterInput}
                  />
                  <SessionTime
                    handleFilterSession={handleFilterSession}
                    filterInput={filterInput}
                  />
                  {/* </div>
                  </span> */}
                </div>

                {/* <div className='sm:col-span-auto sm:col-start-2'> */}
                {/* <span className='flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between'>
                    <div> */}
                {/* <SessionTime handleFilterSession={handleFilterSession} filterInput={filterInput} /> */}
                {/* </div>
                  </span> */}
                {/* </div> */}

                <div className='sm:col-span-3'>
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
                </div>

                <div className='sm:col-span-6'>
                  <SessionDescription
                    handleFilterSession={handleFilterSession}
                    filterInput={filterInput}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='pt-5'>
            <div className='flex justify-end'>
              {isLoading ? (
                <button
                  type='submit'
                  className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 btn-color focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm'
                >
                  <RefreshIcon className='h-4 w-4 mr-4 self-center animate-spin' />
                  Processing
                </button>
              ) : (
                <button
                  type='submit'
                  className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 btn-color focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm'
                >
                  {isEditing === 'edit-session' ? 'Update' : 'Create'}
                </button>
              )}
              <button
                type='button'
                className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm'
                onClick={() => {
                  if (isEditing) {
                    setIsEditing('')
                  } else {
                    setShowModal('')
                    setIsLoading(false)
                    setIsCreatingSession(false)
                  }
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
      )
    </>
  )
}

export default CreateSession2
