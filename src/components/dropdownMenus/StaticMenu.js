import { Transition } from '@headlessui/react'
import { useState, useEffect, useRef } from 'react'
import { pageClickEvent } from '../functions'

const StaticMenu = ({ dropdownSelectorMode, setActionItem, selectedAction, setSelectedAction }) => {
  const [showActions, setShowActions] = useState(false)
  const dropdownRef = useRef(null)

  // This useEffect calls the function (inside functions.js) that hides menues on window click.
  // It needs the useRef Variable, menu state variable, and the menu setState function.
  useEffect(() => {
    pageClickEvent(dropdownRef, showActions, setShowActions)
  }, [showActions])

  // const setLabel = () => {
  //   if (dropdownSelectorMode === 'action') {
  //     return 'Select Action'
  //   }
  // }

  // const setSelectDisplay = () => {
  //   if (dropdownSelectorMode === 'action') {
  //     return (
  //       <>
  //         {selectedAction.pk
  //           ? formatSelectedSession(selectedAction)
  //           : 'Select Session'}
  //       </>
  //     )
  //   }
  // }

  const ACTIONITEMS = [
    'Email All',
    'Email Selected',
    'Update',
    'Delete'
  ]

  return (
    <>
      {/* <label
        className='block text-sm sm:text-lg font-medium text-gray-700 text-left mt-4'
        htmlFor='pronouns'
      >
        {setLabel()} */}
      {/* </label> */}
      <div className='mt-0 relative'>
        <button
          type='button' aria-haspopup='listbox' aria-expanded='true' aria-labelledby='listbox-label' className='bg-white relative w-auto border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          onClick={() => setShowActions(!showActions)}
        >
          <span className='flex justify-center text-sm sm:text-md'>
            {selectedAction || 'Action'}
          </span>
          <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
            <svg className='h-5 w-5 text-gray-400' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
              <path fillRule='evenodd' d='M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z' clipRule='evenodd' />
            </svg>
          </span>
        </button>
        <Transition
          show={showActions}
          enter=''
          enterFrom=''
          enterTo=''
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div
            className='absolute z-20 mt-1 min-w-max rounded-md bg-gray-50 shadow-lg'
            ref={dropdownRef}
          >
            <ul tabIndex='-1' role='listbox' aria-labelledby='listbox-label' aria-activedescendant='listbox-item-3' className='max-h-40 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
              {ACTIONITEMS.map((item, idx) => (
                <li
                  key={`session-${idx}`}
                  id={`session-${item}`}
                  data-idx={idx}
                  value={item}
                  className='hover:text-white hover:bg-indigo-600 text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9'
                  onClick={() => {
                    setSelectedAction(item)
                    // handleSessionRegFilter('session', session.pk)
                    setShowActions(false)
                    if (dropdownSelectorMode === 'view-session-registrants') {
                      setActionItem(item)
                    }
                  }}

                >
                  {/* <!-- Selected: "font-semibold", Not Selected: "font-normal" --> */}
                  <span
                    className='font-normal space-x-2 flex'
                  >
                    <p>{item}</p>
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

export default StaticMenu
