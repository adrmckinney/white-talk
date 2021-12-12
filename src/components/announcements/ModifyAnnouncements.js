import { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { createAnnouncement } from '../../api/announcementsApi/create-announcement'
import { authListAnnouncement, listCreateAnnouncement, updateAnnouncement } from '../../api/api'
import Button from '../customComponents/Button'
import { useHandleAnnouncementsState } from './useHandleAnnouncementsState'
import { useAnnouncementsState, withAnnouncementsState } from './withAnnouncementsState'

export const ModifyAnnouncements = ({ token }) => {
  const history = useHistory()
  const [announcementParams, setAnnouncementParams] = useState({})
  // const { announcementToEdit, setAnnouncements, setAnnouncementToEdit } =
  //   useContext(AnnouncementsContext)

  const { announcementToEdit, setAnnouncementsState } = useAnnouncementsState()
  console.log('announcementToEdit', announcementToEdit)
  const changeParams = (name, value) => {
    setAnnouncementParams(state => ({ ...state, [name]: value }))
  }

  useEffect(() => {
    if (announcementToEdit?.pk) {
      setAnnouncementParams(state => ({
        ...state,
        title: announcementToEdit?.title,
        body: announcementToEdit?.body,
      }))
    }
  }, [announcementToEdit?.pk, announcementToEdit?.title, announcementToEdit?.body])

  const handleSubmit = e => {
    e.preventDefault()
    createAnnouncement(token, announcementParams).then(data => {
      setAnnouncementsState(data)
      history.push('/render-announcements')
    })

    // if (announcementToEdit.pk) {
    //   updateAnnouncement(token, announcementToEdit.pk, announcementParams).then(data => {
    //     authListAnnouncement(token).then(data => {
    //       setAnnouncementToEdit([])
    //       history.push('/render-announcements')
    //       setAnnouncements(data)
    //     })
    //   })
    // } else {
    // listCreateAnnouncement(token, announcementParams).then(newAnnouncement => {
    //   authListAnnouncement(token).then(announcements => {
    //     history.push('/render-announcements')
    //     setAnnouncements(announcements)
    //   })
    // })
    // }
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
              <rect
                x={0}
                y={0}
                width={4}
                height={4}
                className='text-gray-200'
                fill='currentColor'
              />
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
              <rect
                x={0}
                y={0}
                width={4}
                height={4}
                className='text-gray-200'
                fill='currentColor'
              />
            </pattern>
          </defs>
          <rect width={404} height={404} fill='url(#85737c0e-0916-41d7-917f-596dc7edfa27)' />
        </svg>
        <div className='text-center'>
          <h2 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
            {announcementToEdit?.pk ? 'Edit Announcement' : 'New Announcement'}
          </h2>
        </div>
        <div className='mt-12'>
          <form
            onSubmit={handleSubmit}
            className='grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8'
          >
            <div className='sm:col-span-2'>
              <label htmlFor='title' className='block text-sm font-medium text-gray-700'>
                Announcement Title
              </label>
              <div className='mt-1'>
                <input
                  type='text'
                  name='title'
                  id='title'
                  value={announcementParams?.title}
                  autoComplete='organization'
                  className='py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md'
                  onChange={e => changeParams(e.target.name, e.target.value)}
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
                  value={announcementParams?.body}
                  rows={4}
                  className='py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md'
                  defaultValue=''
                  onChange={e => changeParams(e.target.name, e.target.value)}
                />
              </div>
            </div>

            <div className='sm:col-span-2 space-y-4'>
              <Button
                type={'submit'}
                buttonLabel={announcementToEdit?.pk ? 'Update' : 'Create'}
                buttonSize={'large'}
                buttonStatus={'primary'}
                customButtonStyle={'w-full'}
              />
              <Button
                type={'button'}
                buttonLabel={'Cancel'}
                buttonSize={'large'}
                buttonStatus={'cancel'}
                customButtonStyle={'w-full'}
                onClick={() => history.push('/render-announcements')}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default withAnnouncementsState(ModifyAnnouncements)
