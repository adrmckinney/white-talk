import { Link } from 'react-router-dom'

const NavBtns = () => {
  return (
    <div className='flex space-x-4'>
      {/* <!-- Current: "bg-indigo-700 text-white", Default: "text-white hover:bg-indigo-500 hover:bg-opacity-75" --> */}

      <Link to='/' className='text-white hover:bg-mediumPurple hover:bg-opacity-75 rounded-md py-2 px-3 text-sm font-medium'>
        Home
      </Link>

      <Link to='/sessions' className='text-white hover:bg-mediumPurple hover:bg-opacity-75 rounded-md py-2 px-3 text-sm font-medium'>
        Sessions
      </Link>

      <Link to='/connect' className='text-white hover:bg-mediumPurple hover:bg-opacity-75 rounded-md py-2 px-3 text-sm font-medium'>
        Connect
      </Link>

      <Link to='/book-study' className='text-white hover:bg-mediumPurple hover:bg-opacity-75 rounded-md py-2 px-3 text-sm font-medium'>
        Book Study
      </Link>
    </div>
  )
}

export default NavBtns
