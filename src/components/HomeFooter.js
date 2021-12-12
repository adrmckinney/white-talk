import { useState } from 'react'
import { sendEmail } from '../api/api'
import MessageSentAlert from './alerts/MessageSentAlert'
import Button from './customComponents/Button'
import { formatPhoneNumber } from './functions'

export default function HomeFooter() {
  const [isLoading, setIsLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [emailParams, setEmailParams] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    to_name: 'Rachael',
    reply_to: '',
    email_to: 'adrmckinney@gmail.com',
  })

  const handleEmail = e => {
    e.preventDefault()
    setIsLoading(true)
    sendEmail(emailParams, 'template_contact').then(
      res => {
        setEmailParams(state => ({
          ...state,
          name: '',
          email: '',
          phone: '',
          message: '',
          reply_to: '',
        }))
        setShowAlert(true)
        setIsLoading(false)
      },
      function (error) {
        console.log('FAILED...', error)
      }
    )
  }

  const handleChange = (name, value) => {
    setEmailParams(state => ({ ...state, [name]: value }))
  }

  const closeAlert = () => {
    setShowAlert(false)
  }

  return (
    <div className='relative bg-mediumPurple pb-24'>
      <div className='absolute inset-0'>
        <div className='absolute inset-y-0 left-0 w-1/2 bg-mediumPurple' />
      </div>
      <div className='relative max-w-7xl mx-auto lg:grid lg:grid-cols-5'>
        <div className='bg-mediumPurple py-16 px-4 sm:px-6 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12'>
          <div className='max-w-lg mx-auto'>
            <h2 className='text-2xl font-extrabold tracking-tight text-davysGray sm:text-3xl'>
              Get in touch
            </h2>
            <p className='mt-3 text-lg leading-6 text-snow'>
              If you have questions about the work we do or upcoming sessions, don't hesitate to
              reach out.
            </p>
          </div>
        </div>
        <div className='bg-magnolia sm:mt-20 py-16 px-4 sm:px-6 lg:col-span-3 lg:pt-24 lg:pb-4 lg:px-8 xl:pl-12'>
          <div className='max-w-lg mx-auto lg:max-w-none'>
            <form onSubmit={handleEmail} className='grid grid-cols-1 gap-y-6'>
              <div>
                <label htmlFor='name' className='sr-only'>
                  Full name
                </label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  autoComplete='name'
                  required
                  value={emailParams.name}
                  className='block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-mediumPurple focus:border-darkerPuring-mediumPurple border-gray-300 rounded-md bg-snow'
                  placeholder='Full name'
                  onChange={e => handleChange(e.target.name, e.target.value)}
                />
              </div>
              <div>
                <label htmlFor='email' className='sr-only'>
                  Email
                </label>
                <input
                  id='email'
                  name='email'
                  type='email'
                  required
                  value={emailParams.email}
                  autoComplete='email'
                  className='block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-mediumPurple focus:border-darkerPuring-mediumPurple border-gray-300 rounded-md bg-snow'
                  placeholder='Email'
                  onChange={e => handleChange(e.target.name, e.target.value)}
                />
              </div>
              <div>
                <label htmlFor='phone' className='sr-only'>
                  Phone
                </label>
                <input
                  type='text'
                  name='phone'
                  id='phone'
                  autoComplete='tel'
                  value={emailParams.phone || ''}
                  className='block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-mediumPurple focus:border-darkerPuring-mediumPurple border-gray-300 rounded-md bg-snow'
                  placeholder='Phone'
                  onChange={e => handleChange(e.target.name, e.target.value)}
                  onBlur={e => handleChange(e.target.name, formatPhoneNumber(e.target.value))}
                />
              </div>
              <div>
                <label htmlFor='message' className='sr-only'>
                  Message
                </label>
                <textarea
                  id='message'
                  name='message'
                  rows={4}
                  required
                  className='block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-mediumPurple focus:border-darkerPuring-mediumPurple border border-gray-300 rounded-md bg-snow'
                  placeholder='Message'
                  value={emailParams.message}
                  onChange={e => handleChange(e.target.name, e.target.value)}
                />
              </div>
              <span className='flex flex-col h-52 space-y-20'>
                <div>
                  <Button
                    type={isLoading ? 'button' : 'submit'}
                    buttonSize={'medium'}
                    buttonLabel={isLoading ? 'Sending Email...' : 'Send Email'}
                    buttonStatus={'primary'}
                    icon={isLoading ? 'refresh' : 'mail'}
                    disabled={isLoading ? true : false}
                  />
                </div>
                {showAlert && <MessageSentAlert closeAlert={closeAlert} />}
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
