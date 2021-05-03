/* This example requires Tailwind CSS v2.0+ */
import { XCircleIcon } from '@heroicons/react/solid'

export default function PasswordAlert ({ validLength, hasNumber, upperCase, lowerCase, match, specialChar, falseCount }) {
  if (!match) {
    return (
      <div className='rounded-md bg-red-50 p-4 mt-2'>
        <div className='flex'>
          <div className='flex-shrink-0'>
            <XCircleIcon className='h-5 w-5 text-red-400' aria-hidden='true' />
          </div>
          <div className='ml-3'>
            <h3 className='text-sm font-medium text-red-800'>Your passwords must match</h3>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className='rounded-md bg-red-50 p-4'>
      <div className='flex'>
        <div className='flex-shrink-0'>
          <XCircleIcon className='h-5 w-5 text-red-400' aria-hidden='true' />
        </div>
        <div className='ml-3'>
          <h3 className='text-sm font-medium text-red-800'>{`There were ${falseCount} errors with your submission`}</h3>
          <div className='mt-2 text-sm text-red-700'>
            <ul className='list-disc pl-5 space-y-1'>
              {!validLength &&
                <li>Your password must be at least 8 characters</li>}
              {!hasNumber &&
                <li>Your password must include at least one number</li>}
              {!upperCase &&
                <li>Your password must include at least one capital letter</li>}
              {!lowerCase &&
                <li>Your password must include at least one lower case letter</li>}
              {!specialChar &&
                <li>Your password must include at least one special character (! @ # $ % ^ & * ( ) _ +)</li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
