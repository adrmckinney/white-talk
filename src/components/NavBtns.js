import { Link } from 'react-router-dom'

const NavBtns = ({ isLoggedIn, navBtnClass }) => {
  return (
    <div className='flex space-x-4 font-nunito'>
      {/* <!-- Current: "bg-indigo-700 text-white", Default: "text-white hover:bg-indigo-500 hover:bg-opacity-75" --> */}

      <Link to='/' className={navBtnClass()}>
        Home
      </Link>

      <Link to='/sessions' className={navBtnClass()}>
        Sessions
      </Link>

      <Link to='/about' className={navBtnClass()}>
        About
      </Link>

      {/* <Link to='/book-study' className='text-isabelline hover:bg-mediumPurple hover:bg-opacity-75 rounded-md py-2 px-3 text-sm font-medium'>
        Book Study
      </Link> */}

      {isLoggedIn &&
        <Link to='/view-session-registrants' className={navBtnClass()}>
          Session Registrants
        </Link>}

      {/* debugger for window size breakpoints */}
      <div className='hidden sm:block md:hidden text-red-700'>
        small
      </div>
      <div className='hidden md:block lg:hidden text-red-700'>
        medium
      </div>
      <div className='hidden lg:block text-red-700'>
        large
      </div>
    </div>
  )
}

export default NavBtns
