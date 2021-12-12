import { useEffect, useState, useRef, useReducer, useContext } from 'react'
import { useHistory } from 'react-router-dom'
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
import { logout } from '../api/api'
import LoginOverlay from './LoginOverlay'
import { ModalContext } from './context/useModalContext'
import Button from './customComponents/Button'

const Nav = ({
  token,
  setToken,
  username,
  setUsername,
  isLoggedIn,
  setAuth,
  showModal,
  setShowModal,
  showLoginModal,
  setShowLoginModal,
  setShowCreateSessionModal,
  setShowRegistrationModal,
  loggedInName,
  showRegSuccessfulAlert,
  setShowRegSuccessfulAlert,
  setFormToView,
  showTransparentNav,
}) => {
  const [showMenu, setShowMenu] = useState(false)
  const [isSigningIn, setIsSigningIn] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [isEditingAdmin, setIsEditingAdmin] = useState(false)
  const [isCreatingSession, setIsCreatingSession] = useState(false)
  // const [showTransparentNav, setShowTransparentNav] = useState(false)
  const [adminBtn, setAdminBtn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState('')
  const dropdownRef = useRef(null)
  const history = useHistory('')
  const { setModal, setModalComponent } = useContext(ModalContext)

  // DEBUGGER STATION
  // console.log('isRegistering', isRegistering)
  // console.log('isCreatingSession', isCreatingSession)
  // console.log('isSigningIn', isSigningIn)
  // console.log('isLoading', isLoading)
  // console.log('username', username)

  // close menu on window click feature
  useEffect(() => {
    const pageClickEvent = e => {
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

  // ********** LOGIN FEATURES *************
  const [filterLogin, setFilterLogin] = useReducer((name, value) => ({ ...name, ...value }), {
    username: '',
    password: '',
  })

  const handleLogin = () => {
    setShowMenu(false)
    setIsSigningIn('login-modal')
  }

  if (isSigningIn === 'login-modal') {
    return (
      <LoginModal
        setAuth={setAuth}
        showModal={'login-form'}
        setShowModal={setShowModal}
        setIsSigningIn={setIsSigningIn}
        filterLogin={filterLogin}
        setFilterLogin={setFilterLogin}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        errors={errors}
        setErrors={setErrors}
      />
    )
  }
  if (isSigningIn === 'login-overlay') {
    return (
      <LoginOverlay
        setAuth={setAuth}
        showModal='login-form'
        setShowModal={setShowModal}
        setIsSigningIn={setIsSigningIn}
        filterLogin={filterLogin}
        setFilterLogin={setFilterLogin}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        errors={errors}
        setErrors={setErrors}
      />
    )
  }
  // ********** LOGIN FEATURES *************

  if (isRegistering) {
    return (
      <Register
        token={token}
        showModal='admin-registration-form'
        setShowModal={setShowModal}
        setIsRegistering={setIsRegistering}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    )
  }

  if (isCreatingSession) {
    return (
      <CreateSession
        token={token}
        showModal='create-session-form'
        setShowModal={setShowModal}
        setIsCreatingSession={setIsCreatingSession}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    )
  }

  if (isEditingAdmin) {
    return (
      <ViewForm
        token={token}
        isLoggedIn={isLoggedIn}
        showModal='view-form'
        setShowModal={setShowModal}
        formToView='admin-reg-form'
        setFormToView={setFormToView}
        setIsEditingAdmin={setIsEditingAdmin}
      />
    )
  }

  // if (isModifyingAnnouncement) {
  //   return (
  //     <p>something</p>
  //   )
  // }

  const handleLogout = () => {
    logout(token).then(data => {
      setToken(null)
      setUsername('')
      setShowMenu(false)
      setFilterLogin({
        username: '',
        password: '',
      })
      history.push('/')
    })
  }

  const navBtnClass = () => {
    return (
      // `${showTransparentNav ? 'text-gray-800 hover:bg-gray-700 hover:text-white' : 'text-white hover:bg-blueGray-100 hover:text-gray-800'} px-3 py-2 rounded-md text-xs lg:text-sm font-medium`
      'text-white hover:bg-blueGray-100 hover:text-gray-800 px-3 py-2 rounded-md text-xs lg:text-sm font-medium'
    )
  }

  return (
    // <nav className={`${showTransparentNav ? 'sm:bg-ghostWhite' : 'sm:bg-mediumPurple'} fixed top-0 z-20 w-full`}>
    <nav className='sm:bg-mediumPurple fixed top-0 z-20 w-full'>
      <div className='max-w-7xl mx-auto px-2 sm:px-4 lg:px-8'>
        <div className='relative h-16 flex items-center justify-between'>
          <div className='px-2 flex items-center lg:px-0'>
            <div className='hidden sm:block sm:ml-10'>
              <NavBtns isLoggedIn={isLoggedIn} navBtnClass={navBtnClass} />
              {/* <button
                onClick={() => {
                  setModal(true)
                  setModalComponent('create-session')
                }}
              >
                Test Modal
              </button> */}
              {/* <Button
                type={'link'}
                to={'/test-session-create'}
                buttonSize={'small'}
                buttonLabel={'hello'}
              /> */}
            </div>
          </div>
          {/* <Search /> */}
          <div className='flex sm:hidden'>
            {/* <!-- Mobile menu button --> */}
            <Button
              type={'button'}
              buttonStatus={'mobileHamburger'}
              buttonSize={'mobileHamburger'}
              labelPosition={'center'}
              aria-controls='mobile-menu'
              aria-expanded='false'
              onClick={() => setShowMenu(showMenu => !showMenu)}
            >
              <span className='sr-only'>Open main menu</span>

              {/* Heroicon name: outline/menu */}

              <svg
                className={`${showMenu ? 'hidden' : 'block'} h-6 w-6`}
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
              {/* Heroicon name: outline/x */}
              <svg
                className={`${showMenu ? 'block' : 'hidden'} h-6 w-6`}
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </Button>
          </div>
          <div className='hidden sm:block sm:ml-4'>
            <div className='flex items-center'>
              {/* <!-- Profile dropdown --> */}
              <div className='ml-3 relative flex-shrink-0 font-nunito'>
                <div>
                  <Button
                    type={'button'}
                    buttonLabel={isLoggedIn ? `Hello ${loggedInName}` : 'admin login'}
                    buttonSize={'null'}
                    buttonStatus={'null'}
                    customButtonStyle={
                      'text-white hover:bg-blueGray-100 hover:text-gray-800 px-3 py-2 text-xs lg:text-sm font-medium shadow-none'
                    }
                    aria-expanded='false'
                    aria-haspopup='true'
                    onClick={() => setShowMenu(showMenu => !showMenu)}
                  />
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
                    {token && (
                      <>
                        <Button
                          type={'button'}
                          buttonLabel={'Create New Session'}
                          buttonSize={'text'}
                          buttonStatus={'text'}
                          labelPosition={'left'}
                          role='menuitem'
                          onClick={() => {
                            setShowMenu(false)
                            setIsCreatingSession(true)
                          }}
                        />
                        <Button
                          type={'link'}
                          to={'/render-announcements'}
                          buttonLabel={'Modify Announcements'}
                          buttonSize={'text'}
                          buttonStatus={'text'}
                          labelPosition={'left'}
                          role='menuitem'
                          onClick={() => {
                            setShowMenu(false)
                          }}
                        />
                        <Button
                          type={'button'}
                          buttonLabel={'Register New Admin'}
                          buttonSize={'text'}
                          buttonStatus={'text'}
                          labelPosition={'left'}
                          disabled={username === 'testUser'}
                          role='menuitem'
                          onClick={() => {
                            setShowMenu(false)
                            setIsRegistering(true)
                          }}
                        />
                        <Button
                          type={'button'}
                          buttonLabel={'Update User Settings'}
                          buttonSize={'text'}
                          buttonStatus={'text'}
                          labelPosition={'left'}
                          disabled={username === 'testUser'}
                          role='menuitem'
                          onClick={() => {
                            setShowMenu(false)
                            setIsEditingAdmin(true)
                          }}
                        />
                      </>
                    )}
                    <Button
                      type={isLoggedIn ? 'link' : 'button'}
                      to={'/'}
                      buttonLabel={isLoggedIn ? 'Sign out' : 'Sign in'}
                      buttonSize={'text'}
                      buttonStatus={'text'}
                      labelPosition={isLoggedIn ? 'left' : 'center'}
                      role='menuitem'
                      onClick={() => {
                        isLoggedIn ? handleLogout() : handleLogin()
                      }}
                    />
                  </div>
                </Transition>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showRegSuccessfulAlert && (
        <RegSuccessfulAlert
          showRegSuccessfulAlert={showRegSuccessfulAlert}
          setShowRegSuccessfulAlert={setShowRegSuccessfulAlert}
        />
      )}

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      <div className='lg:hidden bg-davysGray text-gray-800' id='mobile-menu'>
        {showMenu && (
          <>
            <MobileNavBtns
              isLoggedIn={isLoggedIn}
              loggedInName={loggedInName}
              handleLogout={handleLogout}
              showMenu={showMenu}
              setShowMenu={setShowMenu}
              setIsSigningIn={setIsSigningIn}
            />
            {isLoggedIn && (
              <MobileNavMenu
                setToken={setToken}
                showMenu={showMenu}
                setUsername={setUsername}
                setShowMenu={setShowMenu}
                isLoggedIn={isLoggedIn}
                username={username}
                setIsCreatingSession={setIsCreatingSession}
                setIsRegistering={setIsRegistering}
                setIsEditingAdmin={setIsEditingAdmin}
                loggedInName={loggedInName}
                handleLogout={handleLogout}
              />
            )}
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav
