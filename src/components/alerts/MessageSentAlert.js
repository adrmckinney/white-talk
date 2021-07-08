/* This example requires Tailwind CSS v2.0+ */
import { XIcon } from '@heroicons/react/outline'
import { CheckCircleIcon } from '@heroicons/react/solid'

export default function MessageSentAlert ({ closeAlert }) {
  return (
    <div className='max-w-4xl w-full mx-auto px-0 sm:pr-6 lg:pr-8'>
      <div className='p-2 rounded-lg bg-davysGray shadow-lg sm:p-3'>
        <div className='flex items-center justify-between flex-wrap'>
          <div className='w-0 flex-1 flex items-center'>
            <span className='flex p-2 rounded-lg bg-forestGreen'>
              <CheckCircleIcon className='h-6 w-6 text-white' aria-hidden='true' />
            </span>
            <p className='ml-3 font-medium text-white'>
              <span className='md:hidden'>Message Sent</span>
              <span className='hidden md:inline'>Thanks for reaching out! We will get back to you as soon as we are able.</span>
            </p>
          </div>
          <div className='order-2 flex-shrink-0 sm:order-3 sm:ml-2'>
            <button
              type='button'
              className='-mr-1 flex p-2 rounded-md hover:bg-forestGreen focus:outline-none focus:ring-2 focus:ring-white'
              onClick={() => closeAlert()}
            >
              <span className='sr-only'>Dismiss</span>
              <XIcon className='h-6 w-6 text-white' aria-hidden='true' />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
