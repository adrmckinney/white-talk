import { deleteAnnouncement } from '../../api/api'
import Button from '../customComponents/Button'
import { useAnnouncementsState } from './withAnnouncementsState'
import { getAnnouncementList } from '../../api/announcementsApi/get-announcement-list'
import { useEffect, useState } from 'react'

export const RenderAnnouncements = ({ token }) => {
  const { setAnnouncementPk } = useAnnouncementsState()
  const [announcements, setAnnouncements] = useState(null)

  useEffect(() => {
    getAnnouncementList(token).then(data => setAnnouncements(data))
    setAnnouncementPk(null)
  }, [token, setAnnouncementPk])

  const handleDelete = pk => {
    deleteAnnouncement(token, pk).then(data => {
      getAnnouncementList(token).then(data => setAnnouncements(data))
    })
  }

  return (
    <div className='mt-16 py-12 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='lg:text-center'>
          <p className='mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl uppercase'>
            Current Annoucements
          </p>
          <p className='mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto flex justify-center'>
            Update current announcements or
            <Button
              type={'link'}
              to={'/modify-announcements'}
              buttonLabel={'create a new one'}
              buttonSize={'extraSmall'}
              buttonStatus={'primary'}
              customButtonStyle={'ml-2 self-start'}
              overrideButtonStyle={{ padding: '0.375rem 0.625rem' }}
            />
          </p>
        </div>

        <div className='mt-10'>
          <dl className='space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10'>
            {announcements?.map(announcement => (
              <div key={announcement?.pk} className='relative'>
                <dt>
                  <div className='absolute flex flex-col items-center justify-around h-full'>
                    <Button
                      type={'link'}
                      to={'/modify-announcements'}
                      buttonLabel={'Edit'}
                      buttonSize={'extraSmall'}
                      buttonStatus={'primary'}
                      onClick={() => setAnnouncementPk(announcement?.pk)}
                      overrideButtonStyle={{ paddingRight: '0.375rem', paddingLeft: '0.375rem' }}
                    />
                    <Button
                      type={'button'}
                      buttonLabel={'Delete'}
                      buttonSize={'extraSmall'}
                      buttonStatus={'primary'}
                      onClick={() => handleDelete(announcement?.pk)}
                      overrideButtonStyle={{ paddingRight: '0.375rem', paddingLeft: '0.375rem' }}
                    />
                  </div>
                  <p className='ml-16 text-lg leading-6 font-medium text-gray-900'>
                    {announcement?.title}
                  </p>
                </dt>
                <dd className='mt-2 ml-16 text-base text-gray-500'>{announcement?.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

export default RenderAnnouncements
