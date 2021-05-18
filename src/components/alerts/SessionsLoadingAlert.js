/* This example requires Tailwind CSS v2.0+ */
import { ExclamationIcon } from '@heroicons/react/solid'

export default function SessionsLoadingAlert () {
  return (
    <div className='bg-yellow-50 border-l-4 border-yellow-400 p-4'>
      <div className='flex'>
        <div className='flex-shrink-0'>
          <ExclamationIcon className='h-5 w-5 text-yellow-400' aria-hidden='true' />
        </div>
        <div className='ml-3'>
          <p className='text-sm text-yellow-700'>
            The sessions are loading. This can take some time. Thanks for your patience and sorry for the delay
          </p>
        </div>
      </div>
    </div>
  )
}
