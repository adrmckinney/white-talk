import { handleFormFilter } from '../functions'

const Pronouns = ({ filterInput, setFilterInput }) => {
  return (
    <>
      <div className='flex space-x-4'>
        <div className='w-full'>
          <label
            className='block text-sm sm:text-lg font-medium text-gray-700 text-left mt-4'
            htmlFor='first_name'
          >
            Pronouns
          </label>
          <input
            className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
            type='text'
            name='pronouns'
            id='pronouns'
            value={filterInput.pronouns}
            onChange={e => handleFormFilter(e.target.name, e.target.value, setFilterInput)}
          />
        </div>
      </div>
    </>
  )
}

export default Pronouns
