import { useHistory } from 'react-router-dom'
import Moment from 'react-moment'

const ViewCreateSessionForm = ({ token, setShowModal, sessionToView, setFormToView, setIsEditing }) => {
  console.log('sessionToView', sessionToView)
  const history = useHistory()

  return (
    <>
      <div>
        <div className='mt-2 mb-5 text-center'>
          <h3 className='text-lg leading-6 font-medium text-coolGray-900' id='modal-headline'>
            Selected Session
          </h3>
        </div>
        <div className='rounded-md shadow-sm space-y-4'>
          <div>
            <div className='text-coolGray-800 text-xl'>Title</div>
            <div
              className='flex relative space-x-1 w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md sm:text-sm'
            >
              <p>
                {sessionToView.title}
              </p>
            </div>
          </div>
          <div>
            <div className='text-coolGray-800 text-xl'>Dates</div>
            <div
              className='flex relative space-x-1 w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md sm:text-sm'
            >
              <span className='flex space-x-1'>
                <Moment format='MM/DD/YYYY'>{sessionToView.start_date}</Moment>
                <p>-</p>
                <Moment format='MM/DD/YYYY'>{sessionToView.end_date}</Moment>
              </span>
            </div>
          </div>
          <div>
            <div className='text-coolGray-800 text-xl'>Description</div>
            <div
              required className='flex relative space-x-1 w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md sm:text-sm'
            >{sessionToView.description}
            </div>
          </div>
          <div>
            <div className='text-coolGray-800 text-xl'>Session Status</div>
            <div
              className='flex relative space-x-1 w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md sm:text-sm'
            >{sessionToView.session_status
              ? 'Open'
              : 'Closed'}
            </div>
          </div>
        </div>
      </div>
      <div className='mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense'>
        <button
          type='submit'
          className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2
                    sm:text-sm'
          onClick={() => {
            setIsEditing('create-session')
          }}
        >
          Edit
        </button>
        <button
          type='button'
          className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm'
          onClick={() => {
            history.goBack()
            setShowModal('')
            setIsEditing('')
            setFormToView('')
          }}
        >
          Cancel
        </button>
      </div>
    </>
  )
}

export default ViewCreateSessionForm
