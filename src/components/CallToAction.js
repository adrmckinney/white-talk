import { Link } from 'react-router-dom'

export default function CallToAction () {
  return (
    <div className='bg-davysGray'>
      <div className='max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8'>
        <h2 className='text-3xl font-extrabold text-snow sm:text-4xl'>
          <span className='block'>Bring your curiosity</span>
        </h2>
        <p className='mt-4 text-lg leading-6 text-snow'>
          Start your anti-racist journey
        </p>
        <Link
          to='/sessions'
          className='mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-snow bg-forestGreen hover:bg-russianGreen sm:w-auto'
        >
          View Upcoming Sessions
        </Link>
      </div>
    </div>
  )
}
