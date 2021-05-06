import { Fragment, useRef, useState } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import { Dialog, Transition } from '@headlessui/react'
import { confirmChangeUsername } from '../api'
import { RefreshIcon } from '@heroicons/react/outline'

export default function UsernameResetConfirm () {
  const [open, setOpen] = useState(true)
  const [username, setUsername] = useState('')
  const { uid } = useParams()
  const { token } = useParams()
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const cancelButtonRef = useRef()

  const handleConfirmChangeUsername = () => {
    setIsLoading(true)
    confirmChangeUsername(uid, token, username)
      .then(data => {
        setIsLoading(false)
        history.push('/')
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
                    Enter New Username
                  </Dialog.Title>
                  <div className='rounded-md shadow-sm -space-y-px'>
                    <div>
                      <label htmlFor='username' className='sr-only'>Username</label>
                      <input
                        id='username'
                        name='username'
                        type='username'
                        autoComplete='current-username'
                        required className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                        placeholder='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense'>
                {isLoading
                  ? <button
                      type='button'
                      required
                      className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 btn-color focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm'
                    >
                    <RefreshIcon className='h-4 w-4 mr-4 self-center animate-spin' />
                    Processing
                    </button>
                  : <button
                      type='button'
                      className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 btn-color focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm'
                      onClick={() => {
                        handleConfirmChangeUsername()
                        setOpen(false)
                      }}
                    >
                    Submit
                    </button>}

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
