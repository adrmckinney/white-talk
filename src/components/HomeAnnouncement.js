
/* This example requires Tailwind CSS v2.0+ */
export default function HomeAnnouncement () {
  return (
    <div className='bg-white border-t-8 border-mediumPurple'>
      <div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between'>
        <h2 className='text-3xl font-extrabold tracking-tight text-gray-800 sm:text-4xl space-y-12'>
          <span className='block text-center uppercase'>For alumni</span>
          <span className='block text-darkerPurple text-center font-bold'>Join us May 23rd at 4pm for a session to discuss our successes and struggles as we try to live life with our anti-racist values.</span>
        </h2>
        {/* <div className='mt-8 flex lg:mt-0 lg:flex-shrink-0'>
          <div className='inline-flex rounded-md shadow'>
            <button
              className='inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700'
            >
              Get started
            </button>
          </div>
          <div className='ml-3 inline-flex rounded-md shadow'>
            <button
              className='inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50'
            >
              Learn more
            </button>
          </div>
        </div> */}
      </div>
    </div>
  )
}
