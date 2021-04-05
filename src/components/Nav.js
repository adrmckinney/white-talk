import { useEffect, useState, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Transition } from '@headlessui/react'
import NavBtns from './NavBtns'
import MobileNavBtns from './MobileNavBtns'
import MobileNavMenu from './MobileNavMenu'

// import Search from './Search'

const Nav = ({ token, setToken, username, setUsername, isLoggedIn, showLoginModal, setShowLoginModal, setShowCreateSessionModal }) => {
  const [showMenu, setShowMenu] = useState(false)
  const dropdownRef = useRef(null)
  const history = useHistory('')

  useEffect(() => {
    const pageClickEvent = (e) => {
      if (dropdownRef.current !== null && !dropdownRef.current.contains(e.target)) {
        setShowMenu(!showMenu)
      }
    }
    if (showMenu) {
      window.addEventListener('click', pageClickEvent)
    }
    return () => {
      window.removeEventListener('click', pageClickEvent)
    }
  }, [showMenu])

  const renderName = () => {
    if (username === 'adrmckinney') {
      return 'Dan'
    } else if (username === 'admin') {
      return 'Rachael'
    } else {
      return username
    }
  }

  return (
    <nav className='bg-lilac border-b border-indigo-300 border-opacity-25 lg:border-none'>
      <div className='max-w-7xl mx-auto px-2 sm:px-4 lg:px-8'>
        <div className='relative h-16 flex items-center justify-between lg:border-b lg:border-indigo-400 lg:border-opacity-25'>
          <div className='px-2 flex items-center lg:px-0'>
            {/* <div className='flex-shrink-0'>
              <img className='block h-8 w-8' src='https://tailwindui.com/img/logos/workflow-mark-indigo-300.svg' alt='Workflow' />
            </div> */}
            <div className='hidden lg:block lg:ml-10'>
              <NavBtns />
            </div>
          </div>
          {/* <Search /> */}
          <div className='flex lg:hidden'>
            {/* <!-- Mobile menu button --> */}
            <button
              type='button'
              className='bg-indigo-600 p-2 rounded-md inline-flex items-center justify-center text-indigo-200 hover:text-white hover:bg-indigo-500 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white'
              aria-controls='mobile-menu'
              aria-expanded='false'
              onClick={() => setShowMenu(showMenu => !showMenu)}
            >
              <span className='sr-only'>Open main menu</span>

              {/* Heroicon name: outline/menu */}

              <svg className={`${showMenu ? 'block' : 'hidden'} h-6 w-6`} xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16' />
              </svg>
              {/* Heroicon name: outline/x */}
              <svg className={`${showMenu ? 'hidden' : 'block'} h-6 w-6`} xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>
          <div className='hidden lg:block lg:ml-4'>
            <div className='flex items-center'>

              {/* <!-- Profile dropdown --> */}
              <div className='ml-3 relative flex-shrink-0'>
                <div>
                  <button
                    type='button'
                    className='bg-lilac rounded-full flex text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white'
                    id='user-menu'
                    aria-expanded='false'
                    aria-haspopup='true'
                    onClick={() => setShowMenu(showMenu => !showMenu)}
                  >
                    {isLoggedIn
                      ? `Hello ${renderName()}`
                      : 'admin login'}

                  </button>
                </div>

                {/* Dropdown menu, show/hide based on menu state. */}
                <Transition
                  show={showMenu}
                  enter='transition ease-out duration-100'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'
                >
                  <div
                    className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10'
                    role='menu'
                    aria-orientation='vertical'
                    aria-labelledby='user-menu'
                    ref={dropdownRef}
                  >
                    {token &&
                      <Link
                        to='/create-session'
                        className='block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100'
                        role='menuitem'
                        onClick={() => {
                          setShowMenu(false)
                          setShowCreateSessionModal(true)
                        }}
                      >
                        Create New Session
                      </Link>}

                    <Link to='#' className='block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100' role='menuitem'>
                      Settings
                    </Link>

                    {isLoggedIn
                      ? (
                        <Link
                          to='/'
                          className='block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100' role='menuitem'
                          onClick={() => {
                            setToken(null)
                            setUsername('')
                            setShowMenu(false)
                            history.push('/')
                          }}
                        >
                          Sign out
                        </Link>
                        )
                      : (
                        <Link
                          to='/login'
                          className='block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100' role='menuitem'
                          onClick={() => {
                            setShowMenu(false)
                            setShowLoginModal(true)
                          }}
                        >
                          Sign in
                        </Link>)}
                  </div>
                </Transition>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      <div className='lg:hidden' id='mobile-menu'>
        <MobileNavBtns />
        <MobileNavMenu showMenu={showMenu} setShowMenu={setShowMenu} isLoggedIn={isLoggedIn} username={username} />
      </div>
    </nav>
  )
}

export default Nav
