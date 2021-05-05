import { useLocation } from 'react-router-dom'
const Header = () => {
  const path = useLocation()

  const renderLocation = () => {
    if (path.pathname === '/') {
      return (
        <div className='flex'>
          <p>Welcome to&nbsp;</p>
          <p className='text-5xl'>Racial Equity white Talk</p>
        </div>
      )
    } else if (path.pathname === '/book-study') {
      return 'Book Study'
    } else if (path.pathname === '/sessions') {
      return 'Sessions'
    } else if (path.pathname === '/connect') {
      return 'Connect'
    } else if (path.pathname === '/view-session-registrants') {
      return 'Session Registrants'
    }
  }

  return (
    <header className='pt-32 pb-10'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h1 className='text-3xl font-bold text-isabelline'>
          {renderLocation()}
        </h1>
      </div>
    </header>
  )
}

export default Header
