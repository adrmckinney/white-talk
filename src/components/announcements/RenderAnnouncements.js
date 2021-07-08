import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { authListAnnouncement, deleteAnnouncement } from '../../api'

export default function RenderAnnouncements ({ token, handleIsEditing }) {
  const [announcements, setAnnouncements] = useState([])

  useEffect(() => {
    authListAnnouncement(token)
      .then(data => setAnnouncements(data))
  }, [token])

  const handleDelete = (pk) => {
    deleteAnnouncement(token, pk)
      .then(data => {
        authListAnnouncement(token)
          .then(data => setAnnouncements(data))
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
            <Link
              to='/modify-announcements'
              className='btn-color ml-2 inline-flex self-start items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              create a new one
            </Link>
          </p>
        </div>

        <div className='mt-10'>
          <dl className='space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10'>
            {announcements.map((announcement) => (
              <div key={announcement.pk} className='relative'>
                <dt>
                  <div className='absolute flex flex-col items-center justify-around h-full'>
                    <Link
                      to='/modify-announcements'
                      className='btn-color inline-flex items-center px-1.5 py-0.5 border border-transparent text-xs font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                      onClick={() => handleIsEditing('edit-announcement', announcement)}
                    >
                      Edit
                    </Link>
                    <button
                      type='button'
                      className='btn-color inline-flex items-center px-1.5 py-0.5 border border-transparent text-xs font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                      onClick={() => handleDelete(announcement.pk)}
                    >
                      Delete
                    </button>
                  </div>
                  <p className='ml-16 text-lg leading-6 font-medium text-gray-900'>{announcement.title}</p>
                </dt>
                <dd className='mt-2 ml-16 text-base text-gray-500'>{announcement.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
