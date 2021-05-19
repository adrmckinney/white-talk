const MobileNavMenu = ({ setToken, username, setUsername, isLoggedIn, setShowMenu, setIsCreatingSession, setIsRegistering, setIsEditingAdmin }) => {
  return (
    <div className='pt-4 pb-3 border-t border-indigo-700'>
      <div className='px-5 flex items-center'>
        {/* <div className='flex-shrink-0'>
          <img className='rounded-full h-10 w-10' src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=F3sxs144tE&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' alt='' />
        </div> */}
      </div>
      <div className='mt-3 px-2 space-y-1'>
        {isLoggedIn &&
          <>
            <button
              className='block rounded-md py-2 px-3 text-base font-medium hover:bg-indigo-500 hover:bg-opacity-75'
              role='menuitem'
              onClick={() => {
                setShowMenu(false)
                setIsCreatingSession(true)
              }}
            >
              Create New Session
            </button>

            <button
              type='button'
              className='block rounded-md py-2 px-3 text-base font-medium hover:bg-indigo-500 hover:bg-opacity-75'
              role='menuitem'
              disabled={username === 'testUser'}
              onClick={() => {
                setShowMenu(false)
                setIsRegistering(true)
              }}
            >
              Register New Admin
            </button>

            <button
              className='block rounded-md py-2 px-3 text-base font-medium hover:bg-indigo-500 hover:bg-opacity-75'
              role='menuitem'
              disabled={username === 'testUser'}
              onClick={() => {
                setShowMenu(false)
                setIsEditingAdmin(true)
              }}
            >
              Update User Settings
            </button>
          </>}

      </div>
    </div>
  )
}

export default MobileNavMenu
