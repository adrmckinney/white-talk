import { Link } from 'react-router-dom'

const MobileNavBtns = ({ isLoggedIn }) => {
  return (
    <div className='px-2 pt-2 pb-3 space-y-1'>
      {/* <!-- Current: "bg-indigo-700 text-white", Default: "text-white hover:bg-indigo-500 hover:bg-opacity-75" --> */}

      <Link to='/' className='text-white hover:bg-indigo-500 hover:bg-opacity-75 block rounded-md py-2 px-3 text-base font-medium'>
        Home
      </Link>

      <Link to='/sessions' className='text-white hover:bg-indigo-500 hover:bg-opacity-75 block rounded-md py-2 px-3 text-base font-medium'>
        Sessions
      </Link>

      {/* <Link to='#' className='text-white hover:bg-indigo-500 hover:bg-opacity-75 block rounded-md py-2 px-3 text-base font-medium'>
        Connect
      </Link> */}

      {/* <Link to='/book-study' className='text-white hover:bg-indigo-500 hover:bg-opacity-75 block rounded-md py-2 px-3 text-base font-medium'>
        Book Study
      </Link> */}

      {isLoggedIn &&
        <Link to='/view-session-registrants' className='text-isabelline hover:bg-mediumPurple hover:bg-opacity-75 rounded-md py-2 px-3 text-sm font-medium'>
          Session Registrants
        </Link>}

    </div>
  )
}

export default MobileNavBtns
