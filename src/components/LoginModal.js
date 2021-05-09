import { useState } from 'react'
import { Transition } from '@headlessui/react'
import { login } from '../api'
import Errors from './Errors'
import ForgotPasswordRequest from './ForgotPasswordRequest'
import { RefreshIcon } from '@heroicons/react/outline'

const LoginModal = ({ showModal, setShowModal, setAuth, setIsSigningIn }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState('')
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const [isloading, setIsloading] = useState(false)

  const handleLogin = (e) => {
    setIsloading(true)
    e.preventDefault()
    login(username, password)
      .then(data => {
        if (data && data.auth_token) {
          setAuth(username, data.auth_token)
          setShowModal('')
          setIsloading(false)
          setIsSigningIn(false)
        }
      })
      .catch(error => {
        setErrors(error.message)
      })
  }

  if (isForgotPassword) {
    return (
      <ForgotPasswordRequest setIsForgotPassword={setIsForgotPassword} />
    )
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
        <span className='inline-block align-middle h-screen w-3/4 sm:w-1/2 md:w-1/3' aria-hidden='true'>&#8203;

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

                  <div className='flex items-center justify-between mt-2'>
                    {/* <div className='flex items-center'>
                      <input
                        id='remember_me'
                        name='remember_me'
                        type='checkbox'
                        className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
                      />
                      <label htmlFor='remember_me' className='ml-2 block text-sm text-gray-900'>
                        Remember me
                      </label>
                    </div> */}

                    <div className='text-sm'>
                      <button
                        type='button'
                        className='font-medium text-indigo-600 hover:text-indigo-500'
                        onClick={() => setIsForgotPassword(true)}
                      >
                        Forgot your password?
                      </button>
                    </div>
                  </div>

                </div>
                <div className='mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense'>
                  {isloading
                    ? <button type='submit' disabled className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 btn-color focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm'>
                      <RefreshIcon className='h-4 w-4 mr-4 self-center animate-spin' />
                      Processing
                    </button>
                    : <button type='submit' className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 btn-color focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm'>
                      Login
                    </button>}

                  <button
                    type='button'
                    className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm'
                    onClick={() => {
                      setIsSigningIn(false)
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
