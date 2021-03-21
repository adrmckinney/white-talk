import { useLocation } from 'react-router-dom'
const Header = () => {
  const path = useLocation()

  const renderLocation = () => {
    if (path.pathname === '/') {
      return 'Welcome to Racial Equity white Talk'
    } else if (path.pathname === '/book-study') {
      return 'Book Study'
    } else if (path.pathname === '/sessions') {
      return 'Sessions'
    }
  }

  return (
    <header className='py-10'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h1 className='text-3xl font-bold text-white'>
          {renderLocation()}
        </h1>
      </div>
    </header>
  )
}

export default Header
