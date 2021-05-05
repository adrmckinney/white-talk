import { handleFormFilter } from '../functions'

const Email = ({ filterInput, setFilterInput }) => {
  return (
    <>
      <label
        htmlFor='email'
        className='block text-sm sm:text-lg font-medium text-gray-700 text-left mt-4'
      >
        Email
      </label>
      <div className='mt-1 relative rounded-md shadow-sm'>
        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
          <svg className='h-5 w-5 text-gray-400' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
            <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
            <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
          </svg>
        </div>
        <input
          type='email'
          name='email'
          required
          id='email'
          className='focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md text-sm sm:text-lg border-gray-300 border pl-10'
          placeholder='you@example.com'
          value={filterInput.email}
          onChange={(e) => handleFormFilter('email', e.target.value, setFilterInput)}
        />
      </div>
    </>
  )
}

export default Email
