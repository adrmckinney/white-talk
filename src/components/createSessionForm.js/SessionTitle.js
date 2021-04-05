
const SessionTitle = ({ title, setTitle, handleFilterSession, filterInput }) => {
  return (
    <>
      <label
        className='block text-sm sm:text-lg font-medium text-gray-700 text-left mt-4'
        htmlFor='title'
      >
        Title
      </label>
      <input
        className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
        type='text'
        name='title'
        id='title'
        value={filterInput.title}
        // onChange={e => setTitle(e.target.value)}
        onChange={(e) => handleFilterSession(e)}
      />
    </>
  )
}

export default SessionTitle
