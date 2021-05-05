import { handleFormFilter } from '../functions'

const Name = ({ filterInput, setFilterInput }) => {
  return (
    <>
      <div className='flex space-x-4'>
        <div className='w-full'>
          <label
            className='block text-sm sm:text-lg font-medium text-gray-700 text-left mt-4'
            htmlFor='first_name'
          >
            First Name
          </label>
          <input
            className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
            type='text'
            name='first_name'
            required
            id='name'
            value={filterInput.first_name}
            onChange={e => handleFormFilter('first_name', e.target.value, setFilterInput)}
          />
        </div>
        <div className='w-full'>
          <label
            className='block text-sm sm:text-lg font-medium text-gray-700 text-left mt-4'
            htmlFor='last_name'
          >
            Last Name
          </label>
          <input
            className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
            type='text'
            name='name'
            required
            id='last_name'
            value={filterInput.last_name}
            onChange={e => handleFormFilter('last_name', e.target.value, setFilterInput)}
          />
        </div>
      </div>
    </>
  )
}

export default Name
