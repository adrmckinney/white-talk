import { useState, useEffect } from 'react'
import { listAnnouncements } from '../api'

export default function Announcements () {
  const [announcements, setAnnouncements] = useState([])

  useEffect(() => {
    listAnnouncements()
      .then(data => setAnnouncements(data))
  }, [])

  return (
    <div className='relative bg-darkBlueGray py-16 sm:py-24 lg:py-20 h-screen'>
      <div className='mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl'>
        <p className='mt-2 text-3xl font-extrabold text-snow tracking-tight sm:text-5xl uppercase'>
          Announcements
        </p>
        <div className='mt-12 border-t-4 border-bronze'>
          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2'>
            {announcements.map((announcement) => (
              <div key={announcement.pk} className='pt-6'>
                <div className='flow-root bg-darkBlueGray rounded-lg px-6 pb-8'>
                  <div className='-mt-6'>
                    <h3 className='mt-8 text-lg font-bold text-babyBlueEyes tracking-tight'>{announcement.title}</h3>
                    <p className='mt-5 text-base text-snow'>
                      {announcement.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
