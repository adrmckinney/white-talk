import { Transition } from '@headlessui/react'
import { useState, useEffect, useRef } from 'react'

const Pronouns = ({ filterInput, handleSessionRegFilter }) => {
  const [showPronouns, setShowPronouns] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const pageClickEvent = (e) => {
      if (dropdownRef.current !== null && !dropdownRef.current.contains(e.target)) {
        setShowPronouns(!showPronouns)
      }
    }
    if (showPronouns) {
      window.addEventListener('click', pageClickEvent)
    }
    return () => {
      window.removeEventListener('click', pageClickEvent)
    }
  }, [showPronouns])

  const PRONOUNS = [
    'she/her/hers',
    'he/him/his',
    'they/them/theirs'
  ]

  return (
    <>
      <label
        className='block text-sm sm:text-lg font-medium text-gray-700 text-left mt-4'
        htmlFor='pronouns'
      >
        Pronouns
      </label>
      <div className='mt-1 relative'>
        <button
          type='button' aria-haspopup='listbox' aria-expanded='true' aria-labelledby='listbox-label' className='bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          onClick={() => setShowPronouns(!showPronouns)}
        >
          <span className='block truncate text-center text-sm sm:text-md'>
            {filterInput.pronouns || '–– Select Pronouns ––'}

          </span>
          <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
            <svg className='h-5 w-5 text-gray-400' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
              <path fillRule='evenodd' d='M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z' clipRule='evenodd' />
            </svg>
          </span>
        </button>
        <Transition
          show={showPronouns}
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
            <ul tabIndex='-1' role='listbox' aria-labelledby='listbox-label' aria-activedescendant='listbox-item-3' className='max-h-40 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
              {PRONOUNS.map((pronoun, idx) => (
                <li
                  key={`pronoun-${idx}`}
                  id={`pronoun-${pronoun}`}
                  data-idx={idx}
                  value={PRONOUNS}
                  className='hover:text-white hover:bg-indigo-600 text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9'
                  onClick={() => {
                    handleSessionRegFilter('pronouns', pronoun)
                    setShowPronouns(false)
                  }}
                >
                  {/* <!-- Selected: "font-semibold", Not Selected: "font-normal" --> */}
                  <span
                    className='font-normal block truncate'
                  >
                    {pronoun}
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

export default Pronouns
