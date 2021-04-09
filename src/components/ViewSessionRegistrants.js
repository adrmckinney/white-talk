import { useEffect, useState } from 'react'
import { listSessions } from '../api'

const ViewSessionRegistrants = () => {
  const [sessions, setSessions] = useState([])

  useEffect(() => {
    listSessions()
      .then(sessions => setSessions(sessions))
  }, [])

  console.log('sessions', sessions)

  return (
    <>
      <div className='flex flex-col'>
        <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
            {sessions.map(session => (
              <span key={session.pk}>
                <h1>{session.title}</h1>
                <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
                  <table className='min-w-full divide-y divide-gray-200'>
                    <thead className='bg-gray-50'>
                      <tr>
                        <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                          Name
                        </th>
                        <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                          Pronouns
                        </th>
                        <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                          Email
                        </th>
                        <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                          Comment
                        </th>
                        <th scope='col' className='relative px-6 py-3'>
                          <span className='sr-only'>Edit</span>
                        </th>
                      </tr>
                    </thead>

                    <tbody className='bg-white divide-y divide-gray-200'>
                      {session.session_registrants.map(registrant => (
                        <tr key={registrant.pk}>
                          <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 space-x-1 flex'>
                            <p>{registrant.first_name}</p>
                            <p>{registrant.last_name}</p>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                            {registrant.pronouns}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                            {registrant.email}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                            {registrant.comment}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                            <a href='#' className='text-indigo-600 hover:text-indigo-900'>Edit</a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewSessionRegistrants
