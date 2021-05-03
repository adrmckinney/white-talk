import { XCircleIcon } from '@heroicons/react/solid'

export default function PasswordAlert ({ validLength, hasNumber, upperCase, lowerCase, specialChar, falseCount, setEnableBtn }) {
  return (
    <div className='rounded-md bg-red-50 p-4'>
      <div className='flex flex-col'>
        {!validLength &&
          <span className='flex'>
            <div className='flex-shrink-0'>
              <XCircleIcon className='h-5 w-5 text-red-400' aria-hidden='true' />
            </div>
            <div className='ml-3'>
              <h3 className='text-sm font-medium text-red-800'>Your password must be at least 8 characters</h3>
            </div>
          </span>}
        {!hasNumber &&
          <span className='flex'>
            <div className='flex-shrink-0'>
              <XCircleIcon className='h-5 w-5 text-red-400' aria-hidden='true' />
            </div>
            <div className='ml-3'>
              <h3 className='text-sm font-medium text-red-800'>Your password must include at least one number</h3>
            </div>
          </span>}
        {!upperCase &&
          <span className='flex'>
            <div className='flex-shrink-0'>
              <XCircleIcon className='h-5 w-5 text-red-400' aria-hidden='true' />
            </div>
            <div className='ml-3'>
              <h3 className='text-sm font-medium text-red-800'>Your password must include at least one capital letter</h3>
            </div>
          </span>}
        {!lowerCase &&
          <span className='flex'>
            <div className='flex-shrink-0'>
              <XCircleIcon className='h-5 w-5 text-red-400' aria-hidden='true' />
            </div>
            <div className='ml-3'>
              <h3 className='text-sm font-medium text-red-800'>Your password must include at least one lower case letter</h3>
            </div>
          </span>}
        {!specialChar &&
          <span className='flex'>
            <div className='flex-shrink-0'>
              <XCircleIcon className='h-5 w-5 text-red-400' aria-hidden='true' />
            </div>
            <div className='ml-3'>
              <h3 className='text-sm font-medium text-red-800'>Your password must include at least one special character (! @ # $ % ^ & * ( ) _ +)</h3>
            </div>
          </span>}
      </div>
    </div>
  )
}
