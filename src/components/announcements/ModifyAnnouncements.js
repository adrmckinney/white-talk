import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { authListAnnouncement, listCreateAnnouncement, updateAnnouncement } from '../../api'

export default function ModifyAnnouncements ({ token, isEditingParams, handleIsEditing }) {
  const history = useHistory()
  const [announcementParams, setAnnouncementParams] = useState({
    title: '',
    body: ''
  })

  const changeParams = (name, value) => {
    setAnnouncementParams(state => ({ ...state, [name]: value }))
  }

  // Debugger station
  // console.log('announcementParams', announcementParams)
  // console.log('isEditingParams', isEditingParams)

  useEffect(() => {
    if (isEditingParams.pk) {
      setAnnouncementParams(state => ({
        ...state,
        title: isEditingParams.title,
        body: isEditingParams.body
      }))
    }
  }, [isEditingParams.pk, isEditingParams.title, isEditingParams.body])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isEditingParams.pk) {
      updateAnnouncement(token, isEditingParams.pk, announcementParams)
        .then(data => {
          authListAnnouncement(token)
            .then(data => {
              handleIsEditing('clear-params')
              history.push('/render-announcements')
            })
        })
    } else {
      listCreateAnnouncement(token, announcementParams)
        .then(data => {
          console.log('data', data)
          history.push('/render-announcements')
        })
    }
  }

  return (
    <div className='bg-white mt-10 sm:mt-0 py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24'>
      <div className='relative max-w-xl mx-auto'>
        <svg
          className='absolute left-full transform translate-x-1/2'
          width={404}
          height={404}
          fill='none'
          viewBox='0 0 404 404'
          aria-hidden='true'
        >
          <defs>
            <pattern
              id='85737c0e-0916-41d7-917f-596dc7edfa27'
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits='userSpaceOnUse'
            >
              <rect x={0} y={0} width={4} height={4} className='text-gray-200' fill='currentColor' />
            </pattern>
          </defs>
          <rect width={404} height={404} fill='url(#85737c0e-0916-41d7-917f-596dc7edfa27)' />
        </svg>
        <svg
          className='absolute right-full bottom-0 transform -translate-x-1/2'
          width={404}
          height={404}
          fill='none'
          viewBox='0 0 404 404'
          aria-hidden='true'
        >
          <defs>
            <pattern
              id='85737c0e-0916-41d7-917f-596dc7edfa27'
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits='userSpaceOnUse'
            >
              <rect x={0} y={0} width={4} height={4} className='text-gray-200' fill='currentColor' />
            </pattern>
          </defs>
          <rect width={404} height={404} fill='url(#85737c0e-0916-41d7-917f-596dc7edfa27)' />
        </svg>
        <div className='text-center'>
          <h2 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>{isEditingParams.pk ? 'Edit Announcement' : 'New Announcement'}</h2>
        </div>
        <div className='mt-12'>
          <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8'>

            <div className='sm:col-span-2'>
              <label htmlFor='title' className='block text-sm font-medium text-gray-700'>
                Announcement Title
              </label>
              <div className='mt-1'>
                <input
                  type='text'
                  name='title'
                  id='title'
                  value={announcementParams.title}
                  autoComplete='organization'
                  className='py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md'
                  onChange={(e) => changeParams(e.target.name, e.target.value)}
                />
              </div>
            </div>

            <div className='sm:col-span-2'>
              <label htmlFor='body' className='block text-sm font-medium text-gray-700'>
                Announcement Body
              </label>
              <div className='mt-1'>
                <textarea
                  id='body'
                  name='body'
                  value={announcementParams.body}
                  rows={4}
                  className='py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md'
                  defaultValue=''
                  onChange={(e) => changeParams(e.target.name, e.target.value)}
                />
              </div>
            </div>

            <div className='sm:col-span-2 space-y-4'>
              <button
                type='submit'
                className='btn-color w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                {isEditingParams.pk ? 'Update' : 'Create'}
              </button>
              <button
                type='button'
                className='btn-color w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                onClick={() => {
                  handleIsEditing('clear-params')
                  history.push('/render-announcements')
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
