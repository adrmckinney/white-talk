
const SessionDescription = ({ description, setDescription, handleFilterSession, filterInput }) => {
  return (
    <>
      <label
        htmlFor='description'
        className='block text-sm sm:text-lg font-medium text-gray-700 text-left mt-4'
      >
        Description
      </label>
      <div className='mt-1'>
        <textarea
          className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md'
          name='description'
          id='description'
          rows='3'
          value={filterInput.description}
        //   onChange={e => setDescription(e.target.value)}
          onChange={(e) => handleFilterSession(e)}
        />
      </div>
    </>
  )
}

export default SessionDescription
