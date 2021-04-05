
const SessionStatus = ({ statusOpen, setStatusOpen }) => {
  console.log('statusOpen', statusOpen)
  return (
    <>
      <div className='flex items-center justify-around'>
        <span
          className={`${statusOpen ? 'bg-none' : 'bg-red-300 rounded-lg'} px-3 py-2 ml-3`}
          id='session-status'
        >
          <span className='text-sm font-medium text-gray-900'>Session Closed</span>
        </span>
        <button
          type='button'
          className='bg-gray-200 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          aria-pressed='false'
          aria-labelledby='session-status'
          onClick={() => setStatusOpen(statusOpen => !statusOpen)}
        >
          <span className='sr-only'>Use setting</span>
          <span
            aria-hidden='true'
            className={`${statusOpen ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
          />
        </button>
        <span
          className={`${statusOpen ? 'bg-green-300 rounded-lg' : 'bg-none'} px-3 py-2 ml-3`}
          id='session-status'
        >
          <span className='text-sm font-medium text-gray-900'>Session Open</span>
        </span>
      </div>
    </>
  )
}

export default SessionStatus
