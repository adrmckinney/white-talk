/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { sendEmail } from '../api'

export default function Contact ({ handleCloseModal }) {
  const [open, setOpen] = useState(true)
  const [emailParams, setEmailParams] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: null,
    subject: '',
    message: '',
    to_name: 'Rachael'
  })

  const handleEmail = () => {
    console.log('button clicked')
    sendEmail(emailParams)
      .then(res => {
        console.log('SUCCESS!', res.status, res.text)
      }, function (err) {
        console.log('FAILED...', err)
      })
  }

  const handleChange = (name, value) => {
    setEmailParams(state => ({ ...state, [name]: value }))
  }

  function formatPhoneNumber (phoneNumberString) {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      handleChange('phone', '(' + match[1] + ') ' + match[2] + '-' + match[3])
    }
    return null
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' static className='fixed z-20 inset-0 overflow-y-auto' open={open} onClose={setOpen}>
        <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6'>
              <div>
                <div className='mt-3 text-center sm:mt-5'>
                  <Dialog.Title as='h3' className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
                    Contact
                  </Dialog.Title>
                  <div className='mt-2'>

                    <div className='bg-white py-4 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-4'>
                      <div className='relative max-w-xl mx-auto'>
                        <div className='mt-12'>
                          <form onSubmit={handleEmail} className='grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8'>
                            <div>
                              <label htmlFor='first_name' className='block text-sm font-medium text-gray-700'>
                                First name
                              </label>
                              <div className='mt-1'>
                                <input
                                  type='text'
                                  name='first_name'
                                  id='first_name'
                                  autoComplete='given-name'
                                  className='py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md'
                                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                                />
                              </div>
                            </div>
                            <div>
                              <label htmlFor='last_name' className='block text-sm font-medium text-gray-700'>
                                Last name
                              </label>
                              <div className='mt-1'>
                                <input
                                  type='text'
                                  name='last_name'
                                  id='last_name'
                                  autoComplete='family-name'
                                  className='py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md'
                                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                                />
                              </div>
                            </div>
                            <div className='sm:col-span-2'>
                              <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                                Email
                              </label>
                              <div className='mt-1'>
                                <input
                                  id='email'
                                  name='email'
                                  type='email'
                                  autoComplete='email'
                                  className='py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md'
                                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                                />
                              </div>
                            </div>
                            <div className='sm:col-span-2'>
                              <label htmlFor='phone' className='block text-sm font-medium text-gray-700'>
                                Phone Number
                              </label>
                              <div className='mt-1 relative rounded-md shadow-sm'>
                                {/* <div className='absolute inset-y-0 left-0 flex items-center'>
                                  <label htmlFor='country' className='sr-only'>
                                    Country
                                  </label>
                                  <select
                                    id='country'
                                    name='country'
                                    className='h-full py-0 pl-4 pr-8 border-transparent bg-transparent text-gray-500 focus:ring-indigo-500 focus:border-indigo-500 rounded-md'
                                  >
                                    <option>US</option>
                                    <option>CA</option>
                                    <option>EU</option>
                                  </select>
                                </div> */}
                                <input
                                  type='text'
                                  name='phone'
                                  id='phone'
                                  value={emailParams.phone || ''}
                                  autoComplete='tel'
                                  className='py-3 px-4 block w-full pl-4 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md'
                                  placeholder='(555) 987-6543'
                                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                                  onBlur={() => formatPhoneNumber(emailParams.phone)}
                                />
                              </div>
                            </div>
                            <div className='sm:col-span-2'>
                              <label htmlFor='subject' className='block text-sm font-medium text-gray-700'>
                                Email Subject
                              </label>
                              <div className='mt-1'>
                                <input
                                  id='subject'
                                  name='subject'
                                  type='text'
                                  autoComplete='subject'
                                  className='py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md'
                                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                                />
                              </div>
                            </div>
                            <div className='sm:col-span-2'>
                              <label htmlFor='message' className='block text-sm font-medium text-gray-700'>
                                Message
                              </label>
                              <div className='mt-1'>
                                <textarea
                                  id='message'
                                  name='message'
                                  rows={4}
                                  className='py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md'
                                  defaultValue=''
                                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                                />
                              </div>
                            </div>
                            <div className='sm:col-span-2'>
                              <button
                                type='submit'
                                className='btn-color w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                              >
                                Let's talk
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div className='mt-5 sm:mt-6'>
                <button
                  type='button'
                  className=' btn-color inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm'
                  onClick={() => {
                    setOpen(false)
                    handleCloseModal()
                  }}
                >
                  Go back
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
