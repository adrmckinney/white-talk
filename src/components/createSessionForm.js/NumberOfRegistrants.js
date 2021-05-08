
const NumberOfRegistrants = ({ handleFilterSession, filterInput }) => {
  return (
    <>
      <label
        className='block text-sm sm:text-lg font-medium text-gray-700 text-center sm:text-left'
        htmlFor='number_of_registrants_allowed'
      >
        Max number of registrants
      </label>
      <input
        className='appearance-none relative block w-3/4 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
        type='number'
        name='number_of_registrants_allowed'
        id='number_of_registrants_allowed'
        value={filterInput.number_of_registrants_allowed}
        onChange={(e) => handleFilterSession('number_of_registrants_allowed', e.target.value)}
      />
    </>
  )
}

export default NumberOfRegistrants
