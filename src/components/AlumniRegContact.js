import { XIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import { sendEmail } from '../api/api'
import Button from './customComponents/Button'

export default function AlumniRegContact({ emailFormData }) {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [nameEmailObjects, setNameEmailObjects] = useState([])
  const [deletedEmailObjects, setDeletedEmailObjects] = useState([])
  const [emailParams, setEmailParams] = useState({
    mail_to: [],
    subject: '',
    message: '',
    facilitator_name: '',
    reply_to: '',
  })

  // console.log('emailParams', emailParams)
  // console.log('emailFormData', emailFormData)
  // console.log('nameEmailObjects', nameEmailObjects)
  // console.log('deletedEmailObjects', deletedEmailObjects)

  useEffect(() => {
    setNameEmailObjects(emailFormData.names_emails)
    setEmailParams(state => ({
      ...state,
      mail_to: emailFormData.names_emails.map(obj => obj.email),
      facilitator_name: emailFormData.facilitator_name,
      reply_to: emailFormData.facilitator_email,
    }))
  }, [emailFormData])

  const handleChange = (name, value) => {
    setEmailParams(state => ({ ...state, [name]: value }))
  }

  const getEmailTemplate = () => {
    if (emailFormData.origin === 'registrants') {
      return 'temp_email_registrants'
    } else if (emailFormData.origin === 'alumni') {
      return 'temp_email_alumni'
    }
  }

  // functions for editing the email list
  const removeNameEmailObject = (nameEmail, idx) => {
    const newObjects = [...nameEmailObjects]
    newObjects.splice(idx, 1)
    setNameEmailObjects(newObjects)
    deletedEmailObjects.push(nameEmail)
  }

  const handleEmailEditCancel = () => {
    setIsEditing(false)
    nameEmailObjects.push(...deletedEmailObjects)
    setDeletedEmailObjects([])
    setEmailParams(state => ({ ...state, mail_to: nameEmailObjects.map(obj => obj.email) }))
  }

  const handleEmailEditSave = () => {
    setIsEditing(false)
    setEmailParams(state => ({ ...state, mail_to: nameEmailObjects.map(obj => obj.email) }))
  }

  const handleEmail = e => {
    e.preventDefault()
    setIsLoading(true)
    sendEmail(emailParams, getEmailTemplate()).then(
      res => {
        setEmailParams(state => ({
          ...state,
          subject: '',
          message: '',
          facilitator_name: '',
          reply_to: '',
        }))
        setNameEmailObjects([])
        setDeletedEmailObjects([])
        // setShowAlert(true)
        setIsLoading(false)
      },
      function (error) {
        console.log('FAILED...', error)
      }
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
              <rect
                x={0}
                y={0}
                width={4}
                height={4}
                className='text-darkerPurple'
                fill='currentColor'
              />
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
              <rect
                x={0}
                y={0}
                width={4}
                height={4}
                className='text-darkerPurple'
                fill='currentColor'
              />
            </pattern>
          </defs>
          <rect width={404} height={404} fill='url(#85737c0e-0916-41d7-917f-596dc7edfa27)' />
        </svg>
        <div className='text-center'>
          <h2 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
            {emailFormData.origin === 'alumni' ? 'Email Alumni' : 'Email Registrants'}
          </h2>
          <p className='mt-4 text-lg leading-6 text-gray-500'>
            {emailFormData.origin === 'alumni'
              ? 'This email will go out to all participants who have completed a session'
              : 'This email will go out to all session registrants of this session'}
          </p>
        </div>
        <div className='mt-12'>
          <form
            onSubmit={handleEmail}
            className='grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8'
          >
            <div className='sm:col-span-2'>
              <label
                htmlFor='company'
                className='flex justify-between text-sm font-medium text-gray-700'
              >
                Recipients
                {isEditing ? (
                  <span className='space-x-2'>
                    <Button
                      type={'button'}
                      buttonLabel={'Cancel'}
                      buttonSize={'extraSmall'}
                      icon={'xicon'}
                      onClick={() => handleEmailEditCancel()}
                      overrideIconStyle={{ marginRight: '10px' }}
                    />
                    <Button
                      type={'button'}
                      buttonLabel={'Save Changes'}
                      buttonSize={'extraSmall'}
                      icon={'check'}
                      onClick={() => handleEmailEditSave()}
                      overrideIconStyle={{ marginRight: '10px' }}
                    />
                  </span>
                ) : (
                  <Button
                    type={'button'}
                    buttonLabel={'Edit Recipients'}
                    buttonSize={'extraSmall'}
                    buttonStatus={'primary'}
                    icon={'edit'}
                    onClick={() => setIsEditing(true)}
                    overrideIconStyle={{ marginRight: '10px' }}
                  />
                )}
              </label>
              <div className='mt-1'>
                {isEditing ? (
                  <div className='py-3 px-4 block w-full shadow-sm focus:ring-darkerPurple focus:border-darkerPurple rounded-md border-2 border-mediumPurple h-44 overflow-y-auto space-y-2'>
                    {nameEmailObjects.map((nameEmail, idx) => (
                      <div
                        key={`edit-${nameEmail.name}-${idx}`}
                        className='py-6 px-4 flex items-center justify-between w-full shadow-sm focus:ring-darkerPurple focus:border-darkerPurple rounded-md border-2 border-gray-300 h-6 hover:border-red-500 text-base'
                      >
                        <p>{`${nameEmail.name} <${nameEmail.email}>`}</p>
                        <XIcon
                          className='h-6 w-6 text-red-500 transform hover:scale-125 ease-linear'
                          onClick={() => removeNameEmailObject(nameEmail, idx)}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className='py-3 px-4 block w-full shadow-sm border-2 border-gray-300 rounded-md overflow-y-auto h-32 text-sm font-nunito'>
                    {nameEmailObjects.map((nameEmail, idx) => (
                      <span key={`${nameEmail.name}-${idx}`} className='inline-flex flex-wrap'>
                        <p className='font-bold'>{nameEmail.name}&nbsp;</p>
                        <p>{`<${nameEmail.email}>`}&nbsp;</p>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className='sm:col-span-2'>
              <label htmlFor='facilitator_name' className='block text-sm font-medium text-gray-700'>
                {emailFormData.origin === 'alumni' ? "Sender's Name" : "Facilitator's Name"}
              </label>
              <div className='mt-1'>
                <input
                  id='facilitator_name'
                  name='facilitator_name'
                  type='text'
                  value={emailParams.facilitator_name}
                  className='py-3 px-4 block w-full shadow-sm focus:ring-darkerPurple focus:border-darkerPurple border-gray-300 rounded-md'
                  onChange={e => handleChange(e.target.name, e.target.value)}
                />
              </div>
            </div>

            <div className='sm:col-span-2'>
              <label htmlFor='reply_to' className='block text-sm font-medium text-gray-700'>
                {emailFormData.origin === 'alumni' ? "Sender's Email" : "Facilitator's Email"}
              </label>
              <div className='mt-1'>
                <input
                  id='reply_to'
                  name='reply_to'
                  type='email'
                  value={emailParams.reply_to}
                  autoComplete='email'
                  className='py-3 px-4 block w-full shadow-sm focus:ring-darkerPurple focus:border-darkerPurple border-gray-300 rounded-md'
                  onChange={e => handleChange(e.target.name, e.target.value)}
                />
              </div>
              <p className='mt-2 text-sm text-gray-500' id='email-description'>
                This email will be the one recipients will reply to.
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
                  onChange={e => handleChange(e.target.name, e.target.value)}
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
                  onChange={e => handleChange(e.target.name, e.target.value)}
                />
              </div>
            </div>

            <div className='sm:col-span-2'>
              <Button
                type={isLoading ? 'button' : 'submit'}
                buttonLabel={isLoading ? 'Sending Email...' : 'Send Email'}
                buttonSize={'medium'}
                buttonStatus={'primary'}
                icon={isLoading ? 'refresh' : 'mailOutline'}
                customButtonStyle={'w-full'}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
