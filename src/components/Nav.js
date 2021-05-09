import { useEffect, useState, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Transition } from '@headlessui/react'
import { pageClickEvent } from './functions'
import NavBtns from './NavBtns'
import RegSuccessfulAlert from './alerts/RegSuccessfulAlert'
import MobileNavBtns from './MobileNavBtns'
import MobileNavMenu from './MobileNavMenu'
import LoginModal from './LoginModal'
import CreateSession from './CreateSession'
import Register from './Register'
import ViewForm from './ViewForm'
import { logout } from '../api'
import useDocumentScrollThrottled from './customComponents/useDocumentScrollThrottled'

// import Search from './Search'

const Nav = ({ token, setToken, username, setUsername, isLoggedIn, setAuth, showModal, setShowModal, showLoginModal, setShowLoginModal, setShowCreateSessionModal, setShowRegistrationModal, loggedInName, showRegSuccessfulAlert, setShowRegSuccessfulAlert, setFormToView, setSessions }) => {
  const [showMenu, setShowMenu] = useState(false)
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)
  const [isEditingAdmin, setIsEditingAdmin] = useState(false)
  const [isCreatingSession, setIsCreatingSession] = useState(false)
  const [showTransparentNav, setShowTransparentNav] = useState(false)
  const [adminBtn, setAdminBtn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const dropdownRef = useRef(null)
  const history = useHistory('')

  // DEBUGGER STATION
  // console.log('isRegistering', isRegistering)
  // console.log('isCreatingSession', isCreatingSession)
  // console.log('isSigningIn', isSigningIn)

  // scroll on click feature
  const MINIMUM_SCROLL = 0
  const TIMEOUT_DELAY = 0

  useDocumentScrollThrottled(callbackData => {
    const { previousScrollTop, currentScrollTop } = callbackData
    const isScrolledDown = previousScrollTop < currentScrollTop
    const isMinimumScrolled = currentScrollTop > MINIMUM_SCROLL

    setShowTransparentNav(currentScrollTop > 2)

    setTimeout(() => {
      setShowTransparentNav(isScrolledDown && isMinimumScrolled)
    }, TIMEOUT_DELAY)
  })

  // close menu on window click feature
  useEffect(() => {
    const pageClickEvent = (e) => {
      if (dropdownRef.current !== null && !dropdownRef.current.contains(e.target)) {
        setShowMenu(false)
        setAdminBtn(false)
      }
    }
    if (showMenu || adminBtn) {
      window.addEventListener('click', pageClickEvent)
    }
    return () => {
      window.removeEventListener('click', pageClickEvent)
    }
  }, [showMenu, adminBtn])

  // This useEffect calls the function (inside functions.js) that hides menues on window click.
  // It needs the useRef Variable, menu state variable, and the menu setState function.
  useEffect(() => {
    pageClickEvent(dropdownRef, showMenu, setShowMenu)
  }, [showMenu])

  if (isSigningIn) {
    return (
      <LoginModal setAuth={setAuth} showModal='login-form' setShowModal={setShowModal} setIsSigningIn={setIsSigningIn} />
    )
  }

  if (isRegistering) {
    return (
      <Register token={token} showModal='admin-registration-form' setShowModal={setShowModal} setIsRegistering={setIsRegistering} />
    )
  }

  if (isCreatingSession) {
    return (
      <CreateSession token={token} showModal='create-session-form' setShowModal={setShowModal} setIsCreatingSession={setIsCreatingSession} setSessions={setSessions} isLoading={isLoading} setIsLoading={setIsLoading} />
    )
  }

  if (isEditingAdmin) {
    return (
      <ViewForm token={token} isLoggedIn={isLoggedIn} showModal='view-form' setShowModal={setShowModal} formToView='admin-reg-form' setFormToView={setFormToView} setIsEditingAdmin={setIsEditingAdmin} />
    )
  }

  const handleLogout = () => {
    logout(token)
      .then(data => {
        setToken(null)
        setUsername('')
        setShowMenu(false)
        history.push('/')
      })
  }

  const navBtnClass = () => {
    return (
      `${showTransparentNav ? 'text-gray-800 hover:bg-gray-700 hover:text-white' : 'text-white hover:bg-blueGray-100 hover:text-gray-800'} px-3 py-2 rounded-md text-xs lg:text-sm font-medium`
    )
  }

  return (
    <nav className={`${showTransparentNav ? 'sm:bg-none' : 'sm:bg-mediumPurple'} bg-ghostWhite fixed top-0 z-20 w-full`}>
      <div className='max-w-7xl mx-auto px-2 sm:px-4 lg:px-8'>
        <div className='relative h-16 flex items-center justify-between'>
          <div className='px-2 flex items-center lg:px-0'>
            {/* <div className='flex-shrink-0'>
              <img className='block h-8 w-8' src='https://tailwindui.com/img/logos/workflow-mark-indigo-300.svg' alt='Workflow' />
            </div> */}
            <div className='hidden sm:block sm:ml-10'>
              <NavBtns isLoggedIn={isLoggedIn} navBtnClass={navBtnClass} />
            </div>
          </div>
          {/* <Search /> */}
          <div className='flex sm:hidden'>
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

              <svg className={`${showMenu ? 'hidden' : 'block'} h-6 w-6`} xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16' />
              </svg>
              {/* Heroicon name: outline/x */}
              <svg className={`${showMenu ? 'block' : 'hidden'} h-6 w-6`} xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>
          <div className='hidden sm:block sm:ml-4'>
            <div className='flex items-center'>

              {/* <!-- Profile dropdown --> */}
              <div className='ml-3 relative flex-shrink-0 font-nunito'>
                <div>
                  <button
                    type='button'
                    className={navBtnClass()}
                    id='user-menu'
                    aria-expanded='false'
                    aria-haspopup='true'
                    onClick={() => setShowMenu(showMenu => !showMenu)}
                  >
                    {isLoggedIn
                      ? `Hello ${loggedInName}`
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
                    className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 flex flex-col font-nunito'
                    role='menu'
                    aria-orientation='vertical'
                    aria-labelledby='user-menu'
                    ref={dropdownRef}
                  >
                    {token &&
                      <>
                        <button
                          className='block py-2 px-4 text-sm text-left text-gray-700 hover:bg-gray-100'
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
                          className='block py-2 px-4 text-sm text-left text-gray-700 hover:bg-gray-100'
                          role='menuitem'
                          onClick={() => {
                            setShowMenu(false)
                            setIsRegistering(true)
                          }}
                        >
                          Register New Admin
                        </button>

                        <button
                          className='block py-2 px-4 text-sm text-left text-gray-700 hover:bg-gray-100'
                          role='menuitem'
                          onClick={() => {
                            setShowMenu(false)
                            setIsEditingAdmin(true)
                          }}
                        >
                          Update User Settings
                        </button>
                      </>}
                    {isLoggedIn
                      ? (
                        <Link
                          to='/'
                          className='block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100' role='menuitem'
                          onClick={() => {
                            handleLogout()
                            // setToken(null)
                            // setUsername('')
                            // setShowMenu(false)
                            // history.push('/')
                          }}
                        >
                          Sign out
                        </Link>
                        )
                      : (
                        <button
                          className='block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100' role='menuitem'
                          onClick={() => {
                            setShowMenu(false)
                            setIsSigningIn(true)
                          }}
                        >
                          Sign in
                        </button>)}
                  </div>
                </Transition>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showRegSuccessfulAlert &&
        <RegSuccessfulAlert showRegSuccessfulAlert={showRegSuccessfulAlert} setShowRegSuccessfulAlert={setShowRegSuccessfulAlert} />}

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      <div className='lg:hidden text-gray-800 border-b-8 border-gray-300' id='mobile-menu'>
        {showMenu &&
          <>
            <MobileNavBtns isLoggedIn={isLoggedIn} loggedInName={loggedInName} handleLogout={handleLogout} showMenu={showMenu} setShowMenu={setShowMenu} setIsSigningIn={setIsSigningIn} />
            {isLoggedIn &&
              <MobileNavMenu setToken={setToken} showMenu={showMenu} setUsername={setUsername} setShowMenu={setShowMenu} isLoggedIn={isLoggedIn} username={username} setIsCreatingSession={setIsCreatingSession} setIsRegistering={setIsRegistering} setIsEditingAdmin={setIsEditingAdmin} loggedInName={loggedInName} handleLogout={handleLogout} />}
          </>}
      </div>
    </nav>
  )
}

export default Nav
