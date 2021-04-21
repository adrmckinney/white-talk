import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Transition } from '@headlessui/react'
import { login } from '../api'
import Errors from './Errors'

const LoginModal = ({ showModal, setShowModal, setAuth }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState('')
  const history = useHistory()

  const handleLogin = (e) => {
    e.preventDefault()
    login(username, password)
      .then(data => {
        if (data && data.auth_token) {
          setAuth(username, data.auth_token)
          setShowModal('')
          history.push('/')
        }
      })
      .catch(error => {
        setErrors(error.message)
      })
  }

  return (
    <div className='fixed z-20 inset-0 overflow-y-auto'>
      <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>

        {/* Background overlay, show/hide based on modal state. */}
        <Transition
          show={showModal === 'login-form'}
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
            show={showModal === 'login-form'}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <form
              className='mt-8 space-y-6'
              onSubmit={handleLogin}
            >
              <div className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6' role='dialog' aria-modal='true' aria-labelledby='modal-headline'>
                <div>
                  <div className='mt-2 mb-5 text-center'>
                    <h3 className='text-lg leading-6 font-medium text-gray-900' id='modal-headline'>
                      Admin Login
                    </h3>
                  </div>

                  {errors && (
                    <div>
                      <Errors errors={errors} setErrors={setErrors} />
                    </div>
                  )}
                  <input type='hidden' name='remember' value='true' />
                  <div className='rounded-md shadow-sm -space-y-px'>
                    <div>
                      <label htmlFor='email-address' className='sr-only'>Username</label>
                      <input
                        id='email-address'
                        name='email'
                        type='text'
                        autoComplete='email'
                        required
                        className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className='mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense'>
                  <button type='submit' className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm'>
                    Login
                  </button>
                  <button
                    type='button'
                    className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm'
                    onClick={() => {
                      history.goBack()
                      setShowModal('')
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

  )
}

export default LoginModal
