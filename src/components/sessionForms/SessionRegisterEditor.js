import { RefreshIcon, XIcon } from '@heroicons/react/outline'
import { useHistory } from 'react-router-dom'
import { CheckIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'
import { sendEmail, sessionRegister, updateRegistrant } from '../../api'
import SuccessfulRegistrationModal from '../alerts/SuccessfulRegistrationModal'
import SessionToRegister from './SessionToRegister'
import ConfirmationStatus from './ConfirmationStatus'

export default function SessionRegisterEditor ({ token, sessionRegistrationData }) {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [renderSuccessAlert, setRenderSuccessAlert] = useState(false)
  const history = useHistory()
  const [registrationParams, setRegistrationParams] = useState(
    {
      first_name: '',
      last_name: '',
      pronouns: '',
      email: '',
      comment: '',
      session: null,
      confirm: false,
      // specifically for registration emails
      title: '',
      facilitator: '',
      facilitator_email: '',
      registrant_cue_number: null,
      number_of_registrants_allowed: null,
      description: ''
    }
  )
  const emailFacilitatorParams = ({
    first_name: registrationParams.first_name,
    last_name: registrationParams.last_name,
    pronouns: registrationParams.pronouns,
    email: registrationParams.email,
    comment: registrationParams.comment,
    session: registrationParams.title,
    to_name: registrationParams.facilitator,
    reply_to: registrationParams.email,
    facilitator: registrationParams.facilitator,
    facilitator_email: registrationParams.facilitator_email,
    registrant_cue_number: registrationParams.registrant_cue_number + 1,
    number_of_registrants_allowed: registrationParams.number_of_registrants_allowed
  })
  const emailRegistrantParams = ({
    first_name: registrationParams.first_name,
    last_name: registrationParams.last_name,
    email: registrationParams.email,
    session: registrationParams.title,
    reply_to: registrationParams.facilitator_email,
    facilitator: registrationParams.facilitator,
    description: registrationParams.description
  })

  //   DEBUGGER
  console.log('registrationParams', registrationParams)
  console.log('sessionRegistrationData', sessionRegistrationData)
  console.log('isEditing', isEditing)

  useEffect(() => {
    setIsEditing(false)
    if (sessionRegistrationData.registrant) {
      setIsEditing(true)
      setRegistrationParams({
        first_name: sessionRegistrationData.registrant.first_name,
        last_name: sessionRegistrationData.registrant.last_name,
        pronouns: sessionRegistrationData.registrant.pronouns,
        email: sessionRegistrationData.registrant.email,
        comment: sessionRegistrationData.registrant.comment,
        session: sessionRegistrationData.registrant.session,
        confirm: sessionRegistrationData.registrant.confirm
      })
    }
  }, [sessionRegistrationData.registrant])

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    if (isEditing) {
      updateRegistrant(token, sessionRegistrationData.registrant.pk, registrationParams)
        .then(data => {
          setIsEditing(false)
          history.goBack()
        })
    } else {
      sessionRegister(registrationParams)
        .then(data => {
          setIsLoading(false)
          setRenderSuccessAlert(true)
          //   setIsRegistering('')
          //   setRegistered(true)
          sendEmail(emailRegistrantParams, 'template_jthf4wi')
            .then(res => {
              console.log('success')
            }, function (error) {
              console.log('FAILED...', error)
            })
          sendEmail(emailFacilitatorParams, 'template_45evc8x')
            .then(res => {
              console.log('success')
            }, function (error) {
              console.log('FAILED...', error)
            })
        })
        .catch()
    }
  }

  const handleChange = (name, value) => {
    setRegistrationParams(state => ({ ...state, [name]: value }))
  }

  const toggleAlert = (Object) => {
    setRenderSuccessAlert(false)
    history.push('/sessions')
  }

  if (renderSuccessAlert) {
    return (
      <SuccessfulRegistrationModal toggleAlert={toggleAlert} />
    )
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
              <rect x={0} y={0} width={4} height={4} className='text-darkerPurple' fill='currentColor' />
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
              <rect x={0} y={0} width={4} height={4} className='text-darkerPurple' fill='currentColor' />
            </pattern>
          </defs>
          <rect width={404} height={404} fill='url(#85737c0e-0916-41d7-917f-596dc7edfa27)' />
        </svg>
        <div className='text-center'>
          {/* <h2 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>{emailFormData.origin === 'alumni' ? 'Email Alumni' : 'Email Registrants'}</h2> */}
          <h2 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>Register for Session</h2>
        </div>
        <div className='mt-12'>
          <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8'>

            <div className='sm:col-span-2'>
              <SessionToRegister sessionRegistrationData={sessionRegistrationData} handleChange={handleChange} token={token} />
            </div>

            <div>
              <label htmlFor='first_name' className='block text-sm font-medium text-gray-700'>
                <span className='flex'>
                  First Name
                  <p className='ml-1 text-red-500'>*</p>
                </span>
              </label>
              <div className='mt-1'>
                <input
                  type='text'
                  name='first_name'
                  id='first_name'
                  value={registrationParams.first_name}
                  autoComplete='given-name'
                  required
                  className='py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md'
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor='last_name' className='block text-sm font-medium text-gray-700'>
                <span className='flex'>
                  Last Name
                  <p className='ml-1 text-red-500'>*</p>
                </span>
              </label>
              <div className='mt-1'>
                <input
                  type='text'
                  name='last_name'
                  id='last_name'
                  required
                  value={registrationParams.last_name}
                  autoComplete='family-name'
                  className='py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md'
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor='pronouns' className='block text-sm font-medium text-gray-700'>
                Pronouns
              </label>
              <div className='mt-1'>
                <input
                  type='text'
                  name='pronouns'
                  id='pronouns'
                  value={registrationParams.pronouns}
                  autoComplete='given-name'
                  placeholder='she/her/hers, they/them/their, etc.'
                  className='py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md'
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                <span className='flex'>
                  Email
                  <p className='ml-1 text-red-500'>*</p>
                </span>
              </label>
              <div className='mt-1'>
                <input
                  type='email'
                  name='email'
                  id='email'
                  required
                  value={registrationParams.email}
                  placeholder='you@example.com'
                  autoComplete='family-name'
                  className='py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md'
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </div>
            </div>

            <div className='sm:col-span-2'>
              <label htmlFor='comment' className='block text-sm font-medium text-gray-700'>
                Comments or Questions
              </label>
              <div className='mt-1'>
                <textarea
                  id='comment'
                  name='comment'
                  rows={4}
                  value={registrationParams.comment}
                  className='py-3 px-4 block w-full shadow-sm focus:ring-darkerPurple focus:border-darkerPurple border border-gray-300 rounded-md'
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </div>
            </div>

            {isEditing &&
              <div className='grid col-span-2'>
                <ConfirmationStatus registrationParams={registrationParams} handleChange={handleChange} />
              </div>}

            <div className='sm:col-span-2 space-y-4'>
              {isLoading
                ? <button type='button' className='btn-color w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkerPurple'>
                  <RefreshIcon className='h-4 w-4 mr-4 self-center animate-spin' />
                  Processing...
                </button>
                : <button
                    type='submit'
                    className='btn-color w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkerPurple'
                  >
                  <CheckIcon className='h-6 w-6 mr-4 self-center' />
                  {isEditing
                    ? 'Update'
                    : 'Register'}
                  </button>}
              <button
                type='submit'
                className='btn-color w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkerPurple'
                onClick={() => {
                  setIsEditing(false)
                  history.goBack()
                }}
              >
                <XIcon className='h-6 w-6 mr-4 self-center' />
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
