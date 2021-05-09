import { Link } from 'react-router-dom'

const MobileNavBtns = ({ isLoggedIn, loggedInName, handleLogout, showMenu, setShowMenu, setIsSigningIn }) => {
  return (
    <div className='px-2 pt-2 pb-3 space-y-1'>
      {/* <!-- Current: "bg-indigo-700 text-white", Default: "text-white hover:bg-indigo-500 hover:bg-opacity-75" --> */}

      {isLoggedIn &&
        <div className=''>
          <div className='block rounded-md py-2 px-3 text-lg  hover:bg-indigo-500 hover:bg-opacity-75 font-bold'>Hello {loggedInName}</div>
        </div>}

      <Link to='/' className=' hover:bg-indigo-500 hover:bg-opacity-75 block rounded-md py-2 px-3 text-base font-medium'>
        Home
      </Link>

      <Link to='/sessions' className=' hover:bg-indigo-500 hover:bg-opacity-75 block rounded-md py-2 px-3 text-base font-medium'>
        Sessions
      </Link>

      {/* <Link to='#' className=' hover:bg-indigo-500 hover:bg-opacity-75 block rounded-md py-2 px-3 text-base font-medium'>
        Connect
      </Link> */}

      {/* <Link to='/book-study' className=' hover:bg-indigo-500 hover:bg-opacity-75 block rounded-md py-2 px-3 text-base font-medium'>
        Book Study
      </Link> */}

      {isLoggedIn &&
        <Link to='/view-session-registrants' className=' hover:bg-indigo-500 hover:bg-opacity-75 block rounded-md py-2 px-3 text-base font-medium'>
          Session Registrants
        </Link>}

      {isLoggedIn
        ? (
          <Link
            to='/'
            className='block rounded-md py-2 px-3 text-base font-medium  hover:bg-indigo-500 hover:bg-opacity-75'
            onClick={() => {
              handleLogout()
              // setToken(null)
              // setUsername('')
              // setShowMenu(false)
            }}
          >
            Sign out
          </Link>
          )
        : (
          <button
            className='block rounded-md py-2 px-3 text-base font-medium  hover:bg-indigo-500 hover:bg-opacity-75'
            role='menuitem'
            onClick={() => {
              setShowMenu(false)
              setIsSigningIn(true)
            }}
          >
            Sign in
          </button>)}

    </div>
  )
}

export default MobileNavBtns
