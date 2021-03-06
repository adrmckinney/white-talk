import { useRef, useEffect } from 'react'
import { pageClickEvent } from './functions'

const Errors = ({ errors, setErrors }) => {
  const errorRef = useRef(null)

  // This useEffect calls the function (inside functions.js) that hides menues on window click.
  // It needs the useRef Variable, menu state variable, and the menu setState function.
  useEffect(() => {
    pageClickEvent(errorRef, errors, setErrors)
  }, [errors, setErrors])

  return (
    <div ref={errorRef}>
      <div className='rounded-md bg-red-50 p-4'>
        <div className='flex'>
          <div className='flex-shrink-0'>
            {/* <!-- Heroicon name: solid/x-circle --> */}
            <button
              onClick={() => setErrors('')}
            >
              <svg className='h-5 w-5 text-red-400' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
                <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z' clipRule='evenodd' />
              </svg>
            </button>
          </div>
          <div className='ml-3'>
            <h3 className='text-sm font-medium text-red-800'>
              Error
            </h3>
            <div className='mt-2 text-sm text-red-700'>
              <ul className='list-disc pl-5 space-y-1'>
                <li>
                  {errors}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Errors
