import { useEffect, useState } from 'react'
import { Transition } from '@headlessui/react'
import { useHistory } from 'react-router-dom'
import { getUser } from '../api'
import { handleFormFilter } from './functions'
import Register from './Register'

const ViewForm = ({ token, showModal, setShowModal }) => {
  const [loginProfile, setLoginProfile] = useState([])
  const [isEditing, setIsEditing] = useState('')
  const history = useHistory()

  useEffect(() => {
    getUser(token)
      .then(data => setLoginProfile(data))
  }, [token])

  if (loginProfile && isEditing === 'register') {
    // history.push('/registeradmin')
    // setShowModal('admin-registration-form')
    console.log('isEditing in viewform', isEditing)
    return (
      <Register
        loginProfile={loginProfile}
        isEditing={isEditing}
        showModal='admin-registration-form'
        token={token}
      />
    )
  }

  return (
    <>
      <div className='fixed z-20 inset-0 overflow-y-auto'>
        <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>

          {/* Background overlay, show/hide based on modal state. */}
          <Transition
            show={showModal === 'view-form'}
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
          <span className='hidden sm:inline-block sm:align-middle sm:h-screen sm:w-1/3' aria-hidden='true'>&#8203;

            {/* Modal panel, show/hide based on modal state. */}
            <Transition
              show={showModal === 'view-form'}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <div
                className='mt-8 space-y-6'
              >
                <div className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6' role='dialog' aria-modal='true' aria-labelledby='modal-headline'>
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
                      className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2
                    sm:text-sm'
                      onClick={() => {
                        // history.push('/registeradmin')
                        // setShowModal('admin-registration-form')
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
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </Transition>
          </span>
        </div>
      </div>
    </>
  )
}

export default ViewForm
