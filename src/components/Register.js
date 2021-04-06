import { useEffect, useReducer, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Transition } from '@headlessui/react'
import { getUser, register } from '../api'
import Errors from './Errors'

const Register = ({ token, isEditing, showRegistrationModal, setShowRegistrationModal }) => {
  // const [loginProfile, setLoginProfile] = useState([])
  const [errors, setErrors] = useState('')
  const history = useHistory()

  // useEffect(() => {
  //   getUser(token)
  //     .then(data => setLoginProfile(data))
  // }, [])

  const [filterAdminRegister, setFilterAdminRegister] = useReducer(
    (name, value) => ({ ...name, ...value }),
    {
      username: '',
      password: ''
    }
  )

  const handleAdminRegFilter = (name, value) => {
    setFilterAdminRegister({ [name]: value })
  }

  // if (isEditing) {
  //   setFilterAdminRegister('username', loginProfile.username)
  // }

  const handleRegister = (e) => {
    e.preventDefault()
    register(filterAdminRegister.username, filterAdminRegister.password)
      .then(data => {
        // setUsername(data.username)
        // setPassword(data.password)
        history.push('/')
      })
      .catch(error => {
        setErrors(error.message)
      })
  }

  return (
    <div className='fixed z-0 inset-0 overflow-y-auto'>
      <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>

        {/* Background overlay, show/hide based on modal state. */}
        <Transition
          show={showRegistrationModal}
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
        {/* <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>&#8203;</span> */}

        {/* Modal panel, show/hide based on modal state. */}
        <Transition
          show={showRegistrationModal}
          enter='ease-out duration-300'
          enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          enterTo='opacity-100 translate-y-0 sm:scale-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100 translate-y-0 sm:scale-100'
          leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
        >
          <form
            className='mt-8 space-y-6'
            onSubmit={handleRegister}
          >
            <div className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6' role='dialog' aria-modal='true' aria-labelledby='modal-headline'>
              <div>
                <div className='mt-2 mb-5 text-center'>
                  <h3 className='text-lg leading-6 font-medium text-gray-900' id='modal-headline'>
                    Register New Admin
                  </h3>
                </div>

                {errors && (
                  <div>
                    <Errors errors={errors} />
                  </div>
                )}
                <input type='hidden' name='remember' value='true' />
                <div className='rounded-md shadow-sm -space-y-px'>
                  <div>
                    <label htmlFor='username' className='sr-only'>Username</label>
                    <input
                      id='username'
                      name='username'
                      type='text'
                      autoComplete='username'
                      required
                      className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                      placeholder='Username'
                      value={filterAdminRegister.username}
                      onChange={(e) => handleAdminRegFilter('username', e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor='password' className='sr-only'>Password</label>
                    <input
                      id='password'
                      name='password'
                      type='password'
                      autoComplete='current-password'
                      required className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                      placeholder='Password'
                      value={filterAdminRegister.password}
                      onChange={(e) => handleAdminRegFilter('password', e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className='mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense'>
                <button type='submit' className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm'>
                  Register
                </button>
                <button
                  type='button'
                  className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm'
                  onClick={() => {
                    history.goBack()
                    setShowRegistrationModal(false)
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
  )
}

export default Register
