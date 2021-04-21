import { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import Moment from 'react-moment'
import { listSessions } from '../api'
import SelectionElement from './SelectionElement'

const ViewSessionRegistrants = ({ isLoggedIn, dropdownSelectorMode, setDropdownSelectorMode }) => {
  const [sessions, setSessions] = useState([])
  const [registrantsToRender, setRegistrantsToRender] = useState([])
  const [allEmails, setAllEmails] = useState([])
  const [emails, setEmails] = useState([])
  // This state was for when I was trying to have a box that
  // would check all boxes. This was to get the checked
  // value from the each of the boxes.
  // const [checked, setChecked] = useReducer(
  //   (idx, value) => ({ ...idx, ...value })
  // )

  const handleEmails = (email) => {
    const checkEmails = [...emails]

    if (checkEmails.includes(email)) {
      setEmails(emails.filter(em => em !== email))
    } else {
      const newEmails = [...emails, email]
      setEmails(newEmails)
    }
  }

  // These functions were for when I was trying to have a box that
  // would check all boxes. This was to get the checked
  // value from the each of the boxes.

  // const handleChecked = (idx, email) => {
  //   // const checkChecked = [...checked]
  //   if (!checked) {
  //     setChecked({ [idx]: email })
  //   } else {
  //     let match = false
  //     console.log('match before', match)
  //     checked.forEach(check => {
  //       if (check.idx === idx) {
  //         match = true
  //       }
  //     })

  //     if (match === false) {
  //       setChecked({ [idx]: email })
  //     } else {
  //       console.log('match after', match)
  //     }
  //   }

  //   setChecked(checked.filter(ch => ch !== idx))
  // } else {
  //   setChecked({ [idx]: email })
  // }
  // }

  // const handleCheckAll = (idx, value) => {
  //   setChecked({ [idx]: value })
  // }

  if (!isLoggedIn) {
    <Redirect to='/' />
  }

  useEffect(() => {
    listSessions()
      .then(sessions => {
        setSessions(sessions)
        setDropdownSelectorMode('view-session-registrants')
        setAllEmails(sessions.map(session => session.email))
      })
  }, [setDropdownSelectorMode])

  const setSessionTableTitle = () => {
    return (
      <span
        className='font-normal space-x-2 truncate flex'
      >
        <p>{registrantsToRender.title}</p>
        <span className='flex space-x-1'>
          <Moment format='MM/DD/YYYY'>{registrantsToRender.start_date}</Moment>
          <p>-</p>
          <Moment format='MM/DD/YYYY'>{registrantsToRender.end_date}</Moment>
        </span>
      </span>
    )
  }

  return (
    <>
      <div className='max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8'>
        <SelectionElement sessions={sessions} dropdownSelectorMode={dropdownSelectorMode} setRegistrantsToRender={setRegistrantsToRender} setAllEmails={setAllEmails} />

        <div className='flex flex-col pt-20'>
          <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
            <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
              {/* {sessions.map(session => ( */}
              <span>
                <h1 className='text-2xl flex justify-center mb-10 shadow-sm rounded-lg'>{!registrantsToRender.pk ? 'Session' : setSessionTableTitle()}</h1>
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
                        <th scope='col' className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                          <span className='space-y-1'>
                            <p>Email</p>
                            {registrantsToRender.pk &&
                              <span className='flex items-center justify-around space-x-1'>
                                <a
                                  href={`mailto:${allEmails}`}
                                  rel='noreferrer'
                                  target='_blank'
                                  className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-2 py-1 bg-lavenderBlue text-base font-medium text-coolGray-600 hover:text-ghostWhite hover:bg-bluePurple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-xs'
                                >All
                                </a>
                                <a
                                  href={`mailto:${emails}`}
                                  rel='noreferrer'
                                  target='_blank'
                                  className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-2 py-1 bg-lavenderBlue text-base font-medium text-coolGray-600 hover:text-ghostWhite hover:bg-bluePurple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-xs'
                                >Selected
                                </a>
                              </span>}
                          </span>
                        </th>
                      </tr>
                    </thead>

                    <tbody className='bg-white divide-y divide-gray-200'>
                      {!registrantsToRender.pk || registrantsToRender.session_registrants.map((registrant, idx) => (
                        <tr key={`${registrant.pk}-index-${idx}`}>
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
                          <td className='px-6 py-4 whitespace-nowrap text-center text-sm font-medium'>
                            <input
                              name={idx}
                              id={registrant.email}
                              type='checkbox'
                              value={registrant.email}
                              onChange={(e) => {
                                // handleCheckAll(idx, e.target.checked)
                                handleEmails(registrant.email)
                              }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </span>
              {/* ))} */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewSessionRegistrants
