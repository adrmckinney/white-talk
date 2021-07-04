export default function HomeFooter () {
  return (
    <div className='relative bg-mediumPurple pb-24'>
      <div className='absolute inset-0'>
        <div className='absolute inset-y-0 left-0 w-1/2 bg-mediumPurple' />
      </div>
      <div className='relative max-w-7xl mx-auto lg:grid lg:grid-cols-5'>
        <div className='bg-mediumPurple py-16 px-4 sm:px-6 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12'>
          <div className='max-w-lg mx-auto'>
            <h2 className='text-2xl font-extrabold tracking-tight text-davysGray sm:text-3xl'>Get in touch</h2>
            <p className='mt-3 text-lg leading-6 text-snow'>
              If you have questions about the work we do or upcoming sessions, don't hesitate to reach out.
            </p>
          </div>
        </div>
        <div className='bg-magnolia sm:mt-20 py-16 px-4 sm:px-6 lg:col-span-3 lg:py-24 lg:px-8 xl:pl-12'>
          <div className='max-w-lg mx-auto lg:max-w-none'>
            <form action='#' method='POST' className='grid grid-cols-1 gap-y-6'>
              <div>
                <label htmlFor='full_name' className='sr-only'>
                  Full name
                </label>
                <input
                  type='text'
                  name='full_name'
                  id='full_name'
                  autoComplete='name'
                  className='block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-mediumPurple focus:border-darkerPuring-mediumPurple border-gray-300 rounded-md bg-snow'
                  placeholder='Full name'
                />
              </div>
              <div>
                <label htmlFor='email' className='sr-only'>
                  Email
                </label>
                <input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  className='block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-mediumPurple focus:border-darkerPuring-mediumPurple border-gray-300 rounded-md bg-snow'
                  placeholder='Email'
                />
              </div>
              <div>
                <label htmlFor='phone' className='sr-only'>
                  Phone
                </label>
                <input
                  type='text'
                  name='phone'
                  id='phone'
                  autoComplete='tel'
                  className='block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-mediumPurple focus:border-darkerPuring-mediumPurple border-gray-300 rounded-md bg-snow'
                  placeholder='Phone'
                />
              </div>
              <div>
                <label htmlFor='message' className='sr-only'>
                  Message
                </label>
                <textarea
                  id='message'
                  name='message'
                  rows={4}
                  className='block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-mediumPurple focus:border-darkerPuring-mediumPurple border border-gray-300 rounded-md bg-snow'
                  placeholder='Message'
                  defaultValue=''
                />
              </div>
              <div>
                <button
                  type='submit'
                  className='btn-color inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mediumPurple'
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
