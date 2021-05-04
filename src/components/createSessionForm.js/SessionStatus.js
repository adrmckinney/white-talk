
const SessionStatus = ({ handleFilterSession, filterInput }) => {
  return (
    <>
      <div className='flex flex-col h-full w-full items-center justify-between'>
        <span className='flex space-x-2 items-center'>
          <h1 className='block text-sm sm:text-lg font-medium text-gray-700 text-center sm:text-left'> Session Status:</h1>
          <span className={`${filterInput.session_status ? 'bg-green-300 rounded-lg' : 'bg-red-300 rounded-lg'} px-1 py-0.5 text-center`}>{filterInput.session_status ? 'Open' : 'Closed'}</span>
        </span>

        <button
          type='button'
          className='bg-gray-200 relative inline-flex flex-shrink-0 h-6 w-40 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          aria-pressed='false'
          aria-labelledby='session-status'
          value={filterInput.session_status}
          onClick={e => handleFilterSession('session_status', e.target.value === 'false')}
        >
          <span className='sr-only'>Use setting</span>
          <span
            aria-hidden='true'
            className={`${filterInput.session_status ? 'translate-x-32' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-500`}
          />
        </button>

      </div>
    </>
  )
}

export default SessionStatus
