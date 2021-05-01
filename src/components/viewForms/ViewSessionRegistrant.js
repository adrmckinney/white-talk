import { useHistory } from 'react-router-dom'

const ViewSessionRegistrant = ({ token, showModal, setShowModal, setFormToView, setIsEditing, loginProfile, setLoginProfile }) => {
  const history = useHistory()

  console.log('showModal', showModal)

  return (
    <>
      <div>
        <div className='mt-2 mb-5 text-center'>
          <h3 className='text-lg leading-6 font-medium text-coolGray-900' id='modal-headline'>
            View Admin Registration Profile
          </h3>
        </div>
        <div className='rounded-md shadow-sm space-y-4'>
          <div>
            <div className='text-coolGray-800 text-xl'>Name</div>
            <div
              className='flex relative space-x-1 w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md sm:text-sm'
            >
              <p>
                {loginProfile.first_name}
              </p>
              <p>

                {loginProfile.last_name}
              </p>
            </div>
          </div>
          <div>
            <div className='text-coolGray-800 text-xl'>Email</div>
            <div
              required className='flex relative space-x-1 w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md sm:text-sm'
            >{loginProfile.email}
            </div>
          </div>
          <div>
            <div className='text-coolGray-800 text-xl'>Username</div>
            <div
              className='flex relative space-x-1 w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md sm:text-sm'
            >{loginProfile.username}
            </div>
          </div>
        </div>
      </div>
      <div className='mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense'>
        <button
          type='submit'
          className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 btn-color focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2
                    sm:text-sm'
          onClick={() => {
            setIsEditing('register')
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

export default ViewSessionRegistrant
