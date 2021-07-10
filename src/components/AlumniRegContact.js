import { MailIcon, RefreshIcon } from '@heroicons/react/outline'
import { CheckIcon, PencilIcon, XIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import { sendEmail } from '../api'

export default function AlumniRegContact ({ emailFormData }) {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [emailParams, setEmailParams] = useState(
    {
      mail_to: emailFormData.emails,
      subject: '',
      message: '',
      facilitator_name: '',
      reply_to: ''
    }
  )

  //   console.log('emailParams', emailParams)

  const handleChange = (name, value) => {
    setEmailParams(state => ({ ...state, [name]: value }))
  }

  const handleEmail = (e) => {
    e.preventDefault()
    setIsLoading(true)
    sendEmail(emailParams, 'temp_email_alumni')
      .then(res => {
        setEmailParams(state => ({
          ...state,
          mail_to: [],
          subject: '',
          message: '',
          facilitator_name: '',
          reply_to: ''
        }))
        // setShowAlert(true)
        setIsLoading(false)
      }, function (error) {
        console.log('FAILED...', error)
      })
  }

  return (
    <div className='bg-white py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24'>
      <div className='relative max-w-xl mx-auto'>
        <svg
          className='absolute left-full transform translate-x-1/2'
          width={404}
          height={404}
          fill='none'
          viewBox='0 0 404 404'
          aria-hidden='true'
        >
          <defs>
            <pattern
              id='85737c0e-0916-41d7-917f-596dc7edfa27'
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits='userSpaceOnUse'
            >
              <rect x={0} y={0} width={4} height={4} className='text-gray-200' fill='currentColor' />
            </pattern>
          </defs>
          <rect width={404} height={404} fill='url(#85737c0e-0916-41d7-917f-596dc7edfa27)' />
        </svg>
        <svg
          className='absolute right-full bottom-0 transform -translate-x-1/2'
          width={404}
          height={404}
          fill='none'
          viewBox='0 0 404 404'
          aria-hidden='true'
        >
          <defs>
            <pattern
              id='85737c0e-0916-41d7-917f-596dc7edfa27'
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits='userSpaceOnUse'
            >
              <rect x={0} y={0} width={4} height={4} className='text-gray-200' fill='currentColor' />
            </pattern>
          </defs>
          <rect width={404} height={404} fill='url(#85737c0e-0916-41d7-917f-596dc7edfa27)' />
        </svg>
        <div className='text-center'>
          <h2 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>{emailFormData.origin === 'alumni' ? 'Email Alumni' : 'Email Registrants'}</h2>
          <p className='mt-4 text-lg leading-6 text-gray-500'>
            {emailFormData.origin === 'alumni' ? 'This email will go out to all participants who have completed a session' : 'This email will go out to all session registrants of this session'}

          </p>
        </div>
        <div className='mt-12'>
          <form onSubmit={handleEmail} className='grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8'>

            <div className='sm:col-span-2'>
              <label htmlFor='company' className='flex justify-between text-sm font-medium text-gray-700'>
                Recipients
                {isEditing
                  ? <span className='space-x-2'>
                    <button
                      type='button'
                      className='btn-color inline-flex items-center px-1 py-0.5 border border-transparent shadow-sm text-xs leading-4 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkerPurple'
                      onClick={() => setIsEditing(false)}
                    >
                      <XIcon className='-ml-0.5 mr-2 h-3 w-3' aria-hidden='true' />
                      Cancel
                    </button>
                    <button
                      type='button'
                      className='btn-color inline-flex items-center px-1 py-0.5 border border-transparent shadow-sm text-xs leading-4 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkerPurple'
                      onClick={() => setIsEditing(false)}
                    >
                      <CheckIcon className='-ml-0.5 mr-2 h-3 w-3' aria-hidden='true' />
                      Save Changes
                    </button>
                    </span>
                  : <button
                      type='button'
                      className='btn-color inline-flex items-center px-1 py-0.5 border border-transparent shadow-sm text-xs leading-4 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkerPurple'
                      onClick={() => setIsEditing(true)}
                    >
                    <PencilIcon className='-ml-0.5 mr-2 h-3 w-3' aria-hidden='true' />
                    Edit Recipients
                    </button>}

              </label>
              <div className='mt-1'>
                {isEditing
                  ? <textarea
                      rows={4}
                      name='company'
                      id='company'
                      value={emailFormData.emails.join(', ')}
                      autoComplete='organization'
                      className='py-3 px-4 block w-full shadow-sm focus:ring-darkerPurple focus:border-darkerPurple border-gray-300 rounded-md'
                      onChange={(e) => handleChange(e.target.name, e.target.value)}
                    />
                  : <textarea
                      rows={4}
                      name='company'
                      id='company'
                      value={emailFormData.names.join(', ')}
                      autoComplete='organization'
                      className='py-3 px-4 block w-full shadow-sm focus:ring-darkerPurple focus:border-darkerPurple border-gray-300 rounded-md'
                      onChange={(e) => handleChange(e.target.name, e.target.value)}
                    />}

              </div>
            </div>

            <div className='sm:col-span-2'>
              <label htmlFor='facilitator_name' className='block text-sm font-medium text-gray-700'>
                Facilitator's Name
              </label>
              <div className='mt-1'>
                <input
                  id='facilitator_name'
                  name='facilitator_name'
                  type='text'
                  value={emailParams.facilitator_name}
                  className='py-3 px-4 block w-full shadow-sm focus:ring-darkerPurple focus:border-darkerPurple border-gray-300 rounded-md'
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </div>
            </div>

            <div className='sm:col-span-2'>
              <label htmlFor='reply_to' className='block text-sm font-medium text-gray-700'>
                Facilitator's Email
              </label>
              <div className='mt-1'>
                <input
                  id='reply_to'
                  name='reply_to'
                  type='email'
                  value={emailParams.reply_to}
                  autoComplete='email'
                  className='py-3 px-4 block w-full shadow-sm focus:ring-darkerPurple focus:border-darkerPurple border-gray-300 rounded-md'
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </div>
              <p className='mt-2 text-sm text-gray-500' id='email-description'>
                This email will be the one recipients will reply to and is automatically set up in the email.
              </p>
            </div>

            <div className='sm:col-span-2'>
              <label htmlFor='subject' className='block text-sm font-medium text-gray-700'>
                Subject
              </label>
              <div className='mt-1'>
                <input
                  id='subject'
                  name='subject'
                  type='text'
                  value={emailParams.subject}
                  className='py-3 px-4 block w-full shadow-sm focus:ring-darkerPurple focus:border-darkerPurple border-gray-300 rounded-md'
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
                  value={emailParams.message}
                  className='py-3 px-4 block w-full shadow-sm focus:ring-darkerPurple focus:border-darkerPurple border border-gray-300 rounded-md'
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </div>
            </div>

            <div className='sm:col-span-2'>
              {isLoading
                ? <button type='button' className='btn-color w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkerPurple'>
                  <RefreshIcon className='h-4 w-4 mr-4 self-center animate-spin' />
                  Sending Email...
                </button>
                : <button type='submit' className='btn-color w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkerPurple'>
                  <MailIcon className='h-4 w-4 mr-4 self-center' />
                  Send Email
                  </button>}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
