import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'
import { Fragment, useRef, useState, useEffect } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import { Dialog, Transition } from '@headlessui/react'
import { confirmChangePassword } from '../api'
import PasswordAlert from './alerts/PasswordAlert'
import PasswordMatchAlert from './alerts/PasswordMatchAlert'
import UsePasswordValidation from './UsePasswordValidation'
import Errors from './Errors'

export default function PasswordResetConfirm () {
  const [open, setOpen] = useState(true)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { uid } = useParams()
  const { token } = useParams()
  const history = useHistory()
  const cancelButtonRef = useRef()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordBlur, setPasswordBlur] = useState(false)
  const [passwordMatchBlur, setPasswordMatchBlur] = useState(false)
  const [enableBtn, setEnableBtn] = useState(0)
  const [errors, setErrors] = useState('')

  const [validLength, hasNumber, upperCase, lowerCase, match, specialChar, falseCount] = UsePasswordValidation({
    password: password,
    confirmPassword: confirmPassword
  })

  console.log('match', match)

  useEffect(() => {
    setEnableBtn(falseCount)
  }, [falseCount, setEnableBtn])

  const handlePasswordAlert = () => {
    if (passwordBlur) {
      return (
        <span>
          <PasswordAlert validLength={validLength} hasNumber={hasNumber} upperCase={upperCase} lowerCase={lowerCase} specialChar={specialChar} falseCount={falseCount} setEnableBtn={setEnableBtn} />
        </span>
      )
    }
  }

  const handlePasswordMatchAlert = () => {
    if (passwordMatchBlur) {
      return (
        <PasswordMatchAlert match={match} />
      )
    }
  }

  const handleConfirmChangePassword = () => {
    confirmChangePassword(uid, token, password, confirmPassword)
      .then(data => {
        setOpen(false)
        history.push('/')
      })
      .catch(error => {
        console.log('error', error)
        setErrors(error.message)
      })
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        static
        className='fixed z-10 inset-0 overflow-y-auto'
        initialFocus={cancelButtonRef}
        open={open}
        onClose={setOpen}
      >
        <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6'>
              <div>
                <div className='mt-3 text-center sm:mt-3'>
                  <Dialog.Title as='h3' className='mb-5 text-lg leading-6 font-medium text-gray-900'>
                    Enter New Password
                  </Dialog.Title>
                  <div className='rounded-md shadow-sm -space-y-px'>
                    {errors && (
                      <div>
                        <Errors errors={errors} setErrors={setErrors} />
                      </div>
                    )}
                    <div>

                      <label
                        className='block text-sm sm:text-lg font-medium text-gray-700 text-left mt-4'
                        htmlFor='password'
                      >
                        Password
                      </label>
                      <span className='flex'>
                        <input
                          id='password'
                          name='password'
                          onBlur={e => setPasswordBlur(true)}
                          type={`${showPassword ? 'text' : 'password'}`}
                          autoComplete='current-password'
                          required className='appearance-none rounded-md rounded-r-none relative block w-full px-3 py-2 border border-gray-300 border-r-0 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-darkerPurple focus:darkerPurple focus:z-10 sm:text-sm'
                          placeholder='Password'
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                          type='button'
                          className='px-3 py-2 border border-gray-300 border-l-0 rounded-md rounded-l-none focus:outline-none'
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword
                            ? <EyeOffIcon className='w-4 h-4' />
                            : <EyeIcon className='w-4 h-4' />}
                        </button>
                      </span>

                      {falseCount > 0 && <span>{handlePasswordAlert()}</span>}

                      <label
                        className='block text-sm sm:text-lg font-medium text-gray-700 text-left mt-4'
                        htmlFor='confirm password'
                      >
                        Re-type Password
                      </label>
                      <span className='flex'>
                        <input
                          id='confirm password'
                          name='confirmPassword'
                          onBlur={e => setPasswordMatchBlur(true)}
                          type={`${showConfirmPassword ? 'text' : 'password'}`}
                          required
                          className='appearance-none rounded-md rounded-r-none relative block w-full px-3 py-2 border border-gray-300 border-r-0 placeholder-gray-500 focus:outline-none focus:ring-darkerPurple focus:darkerPurple focus:z-10 sm:text-sm'
                          placeholder='Confirm Password'
                          value={confirmPassword}
                          onChange={(e) => {
                            setConfirmPassword(e.target.value)
                          }}
                        />
                        <button
                          type='button'
                          className='px-3 py-2 border border-gray-300 border-l-0 rounded-md rounded-l-none focus:outline-none'
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword
                            ? <EyeOffIcon className='w-4 h-4' />
                            : <EyeIcon className='w-4 h-4' />}
                        </button>
                      </span>
                      {!match && handlePasswordMatchAlert()}
                    </div>
                  </div>
                </div>
              </div>
              <div className='mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense'>
                <button
                  type='button'
                  disabled={enableBtn > 0 || !match}
                  className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 btn-color focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm'
                  onClick={() => {
                    handleConfirmChangePassword()
                    // setOpen(false)
                  }}
                >
                  Submit
                </button>
                <Link
                  to='/'
                  className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm'
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                >
                  Cancel
                </Link>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
