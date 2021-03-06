import { Fragment, useContext, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'
import Moment from 'react-moment'
import { SessionsContext } from '../useContextSessions'

export default function DeleteAlert({
  isDeleting,
  setIsDeleting,
  handleDelete,
  handleClearAllActionState,
}) {
  const [open, setOpen] = useState(true)
  const cancelButtonRef = useRef()
  const { sessionToDelete: dataToDelete } = useContext(SessionsContext)

  const handleMessage = () => {
    if (dataToDelete.length === 0) {
      return (
        <p className='text-sm text-gray-500'>
          There is nothing selected to delete. If a box is checked, please unckeck and check again.
        </p>
      )
    } else {
      return (
        <p className='text-sm text-gray-500'>
          Are you sure you want to delete{' '}
          <strong>
            {dataToDelete.first_name} {dataToDelete.last_name}
          </strong>{' '}
          from this session? This action cannot be undone.
        </p>
      )
    }
  }

  const handleAlertContent = () => {
    if (isDeleting === 'delete-session') {
      return (
        <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
          <Dialog.Title as='h3' className='text-lg leading-6 font-medium text-gray-900'>
            Delete Session
          </Dialog.Title>
          <div className='mt-2'>
            <p className='text-sm text-gray-500'>
              <p className='text-sm text-gray-500'>
                Are you sure you want to delete the session{' '}
                <strong>
                  {dataToDelete.title}{' '}
                  <Moment format='MM/DD/YYYY'>{dataToDelete.start_date}</Moment>-
                  <Moment format='MM/DD/YYYY'>{dataToDelete.end_date}</Moment>
                </strong>
                ? This action cannot be undone.
              </p>
            </p>
          </div>
        </div>
      )
    } else if (isDeleting === 'delete-registrant') {
      return (
        <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
          <Dialog.Title as='h3' className='text-lg leading-6 font-medium text-gray-900'>
            Delete Registrant
          </Dialog.Title>
          <div className='mt-2'>{handleMessage()}</div>
        </div>
      )
    }
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
              <div className='sm:flex sm:items-start'>
                <div className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
                  <ExclamationIcon className='h-6 w-6 text-red-600' aria-hidden='true' />
                </div>
                {handleAlertContent()}
              </div>
              <div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse'>
                <button
                  type='button'
                  className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm'
                  onClick={() => {
                    handleDelete(dataToDelete.pk)
                    setIsDeleting('')
                    setOpen(false)
                  }}
                >
                  Delete
                </button>
                <button
                  type='button'
                  className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm'
                  onClick={() => {
                    setOpen(false)
                    if (isDeleting === 'delete-registrant') {
                      handleClearAllActionState()
                    }
                    setIsDeleting('')
                  }}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
