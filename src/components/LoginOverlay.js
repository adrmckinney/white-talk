import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { RefreshIcon, XIcon } from '@heroicons/react/outline'
import { handleFormFilter } from './functions'
import ForgotPasswordRequest from './ForgotPasswordRequest'
import Errors from './Errors'
import { login } from '../api'

export default function LoginOverlay ({ showModal, setShowModal, setAuth, setIsSigningIn, filterLogin, setFilterLogin, isLoading, setIsLoading, errors, setErrors }) {
  const [open, setOpen] = useState(true)
  const [isForgotPassword, setIsForgotPassword] = useState(false)

  console.log('filterLogin', filterLogin)
  console.log('isLoading', isLoading)

  if (isForgotPassword) {
    return (
      <ForgotPasswordRequest setIsForgotPassword={setIsForgotPassword} />
    )
  }

  const handleLoginOverlay = (e) => {
    setIsLoading(true)
    e.preventDefault()
    login(filterLogin.username, filterLogin.password)
      .then(data => {
        if (data && data.auth_token) {
          setAuth(filterLogin.username, data.auth_token)
          setShowModal('')
          setIsLoading(false)
          setIsSigningIn('')
        }
      })
      .catch(error => {
        setErrors(error.message)
      })
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' static className='fixed inset-0 overflow-hidden z-50' open={open} onClose={setOpen}>
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
                  <div className='py-6 px-4 bg-mediumPurple sm:px-6'>
                    <div className='flex items-center justify-between'>
                      <Dialog.Title className='text-lg font-medium text-white'>Admin Login</Dialog.Title>
                      <div className='ml-3 h-7 flex items-center'>
                        <button
                          className='bg-indigo-700 rounded-md text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white'
                          onClick={() => {
                            setIsSigningIn('')
                            setIsLoading(false)
                            setFilterLogin({
                              username: '',
                              password: ''
                            })
                            setOpen(false)
                          }}
                        >
                          <span className='sr-only'>Close panel</span>
                          <XIcon className='h-6 w-6' aria-hidden='true' />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className='relative flex-1 py-6 px-4 sm:px-6'>
                    <div className='absolute inset-0 py-6 px-4 sm:px-6'>
                      <form
                        className='mt-8 space-y-6'
                        // onSubmit={handleLoginOverlay}
                      >
                        {errors && (
                          <div>
                            <Errors errors={errors} setErrors={setErrors} />
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
                              value={filterLogin.username}
                              onChange={(e) => handleFormFilter(e.target.name, e.target.value, setFilterLogin)}
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
                              value={filterLogin.password}
                              onChange={(e) => handleFormFilter(e.target.name, e.target.value, setFilterLogin)}
                            />
                          </div>
                        </div>

                        <div className='flex items-center justify-between mt-2'>
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
                        <div className='mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense'>
                          {isLoading
                            ? <button type='submit' disabled className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 btn-color focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm'>
                              <RefreshIcon className='h-4 w-4 mr-4 self-center animate-spin' />
                              Processing
                              </button>
                            : <button
                                type='submit'
                                className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 btn-color focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm'
                                onClick={(e) => handleLoginOverlay(e)}
                              >
                              Login
                              </button>}

                          <button
                            type='button'
                            className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm'
                            onClick={() => {
                              setIsSigningIn('')
                              setIsLoading(false)
                              setFilterLogin({
                                username: '',
                                password: ''
                              })
                              setOpen(false)
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
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
