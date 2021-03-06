import { Transition } from '@headlessui/react'
import { useState, useEffect, useRef } from 'react'
// import Moment from 'react-moment'
import { formatSelectedSession, pageClickEvent } from './functions'

const SelectionElement = ({ sessions, dropdownSelectorMode, setRegistrantsToRender, extractConfirmedEmailData }) => {
  const [showSessions, setShowSessions] = useState(false)
  const [selectedValue, setSelectedValue] = useState([])
  const dropdownRef = useRef(null)

  // DEBUGGER STATION
  // console.log('selectedValue', selectedValue)

  // This useEffect calls the function (inside functions.js) that hides menues on window click.
  // It needs the useRef Variable, menu state variable, and the menu setState function.
  useEffect(() => {
    pageClickEvent(dropdownRef, showSessions, setShowSessions)
  }, [showSessions])

  // const setLabel = () => {
  //   if (dropdownSelectorMode === 'view-session-registrants') {
  //     return 'Select Session'
  //   }
  // }

  const setSelectDisplay = () => {
    if (dropdownSelectorMode === 'view-session-registrants') {
      return (
        <>
          {selectedValue.pk
            ? formatSelectedSession(selectedValue)
            : 'Select Session'}
        </>
      )
    }
  }

  return (
    <>
      {/* <label
        className='block text-sm sm:text-lg font-medium text-gray-700 text-left mt-4'
        htmlFor='pronouns'
      >
        {setLabel()}
      </label> */}
      <div className='mt-8 relative'>
        <button
          type='button' aria-haspopup='listbox' aria-expanded='true' aria-labelledby='listbox-label' className='bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          onClick={() => setShowSessions(!showSessions)}
        >
          <span className='flex truncate justify-center text-sm sm:text-md'>
            {setSelectDisplay()}
          </span>
          <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
            <svg className='h-5 w-5 text-gray-400' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
              <path fillRule='evenodd' d='M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z' clipRule='evenodd' />
            </svg>
          </span>
        </button>
        <Transition
          show={showSessions}
          enter=''
          enterFrom=''
          enterTo=''
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div
            className='absolute z-20 mt-1 w-full rounded-md bg-gray-50 shadow-lg'
            ref={dropdownRef}
          >
            <ul tabIndex='-1' role='listbox' aria-labelledby='listbox-label' aria-activedescendant='listbox-item-3' className='max-h-40 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm pb-8'>
              {sessions.map((session, idx) => (
                <li
                  key={`session-${idx}`}
                  id={`session-${session}`}
                  data-idx={idx}
                  value={session.title}
                  className='hover:text-white hover:bg-indigo-600 text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9'
                  onClick={() => {
                    setSelectedValue(session)
                    setShowSessions(false)
                    if (dropdownSelectorMode === 'view-session-registrants') {
                      setRegistrantsToRender(session)
                      extractConfirmedEmailData(session)
                    }
                  }}

                >
                  {/* <!-- Selected: "font-semibold", Not Selected: "font-normal" --> */}
                  <span
                    className='font-normal space-x-2 truncate flex'
                  >
                    <p>{session.title}</p>
                    {/* <span className='flex space-x-1'>
                      <Moment format='MM/DD/YYYY'>{session.start_date}</Moment>
                      <p>-</p>
                      <Moment format='MM/DD/YYYY'>{session.end_date}</Moment>
                    </span> */}
                  </span>
                </li>
              ))}

            </ul>
          </div>
        </Transition>
      </div>
    </>
  )
}

export default SelectionElement
