import { PhoneIcon } from '@heroicons/react/solid'
import Moment from 'react-moment'
import { sortSessions } from './functions'

export default function MobileUpcomingSessions ({ token, sessions, setSessions, isLoggedIn, showModal, setShowModal, sessionToRegister, setSessionToRegister, setFormToView, setSessionToView, setRegistered, isDeleting, setIsDeleting, isRegistering, setIsRegistering, isEditing, setIsEditing, sessionToDelete, setSessionToDelete, sessionToEdit, setSessionToEdit, isLoading, setIsLoading, renderSessionStatus }) {
  return (
    <ul className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 sm:px-10'>
      <h1 className='col-span-full text-3xl text-center text-gray-900 font-extrabold font-sans my-10 rounded-lg'>Upcoming Sessions</h1>
      {sortSessions(sessions).map((session) => (
        <li
          key={`session-${session.pk}`}
          className='col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y-4 divide-mediumPurple font-nunito mx-2 border border-mediumPurple'
        >
          <div className='text-2xl font-bold py-2 break-words'>
            {session.title}
          </div>
          <div className='flex flex-col px-4 pt-8 pb-2 text-xl space-y-8'>
            <span className='space-y-8'>
              <span className=''>
                <div className='space-x-2'>
                  <Moment format='MMM DD, YYYY'>{session.start_date}</Moment>
                  <span>-</span>
                  <Moment format='MMM DD, YYYY'>{session.end_date}</Moment>
                </div>
                <div className='space-x-2'>
                  <Moment format='h:mm a'>{session.start_time}</Moment>
                  <span>-</span>
                  <Moment format='h:mm a'>{session.end_time}</Moment>
                </div>
                <div className='flex justify-center space-x-2'>
                  <h3>Facilitator:</h3>
                  <p>{session.facilitator}</p>
                </div>
              </span>
              <div className='text-base'>
                <p>{session.description}</p>
              </div>
            </span>
            <div className='flex divide-x divide-gray-200'>
              <div className='w-0 flex-1 flex justify-center'>
                {renderSessionStatus(session)}
              </div>
            </div>
          </div>
          {isLoggedIn &&
            <div>
              <span>
                <div className='flex justify-center space-x-2'>
                  <h3>Registered:</h3>
                  <p>{session.session_registrants.length}</p>
                </div>
                <div className='flex justify-center space-x-2'>
                  <h3>Confirmed:</h3>
                  <p>{session.confirmed}</p>
                </div>
              </span>
              <div className='-mt-px flex divide-x divide-gray-200'>
                <div className='-ml-px w-0 flex-1 flex'>
                  <a
                    href={`tel:${session.telephone}`}
                    className='relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm table-btn-color font-medium border border-transparent rounded-br-lg'
                  >
                    <PhoneIcon className='w-5 h-5 text-gray-400' aria-hidden='true' />
                    <span className='ml-3'>Call</span>
                  </a>
                </div>
                <div className='-ml-px w-0 flex-1 flex'>
                  <a
                    href={`tel:${session.telephone}`}
                    className='relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500'
                  >
                    <PhoneIcon className='w-5 h-5 text-gray-400' aria-hidden='true' />
                    <span className='ml-3'>Call</span>
                  </a>
                </div>
              </div>
            </div>}
        </li>
      ))}
    </ul>
  )
}
