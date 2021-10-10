import { useState } from 'react'
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'
import useForm from '../useForm'

const RegisterLoginInputs = () => {
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { handleChange, values } = useForm()
  return (
    <>
      <div className='rounded-md shadow-sm -space-y-px'>
        <div>
          <label htmlFor='modal-username' className='sr-only'>
            Username
          </label>
          <input
            id='modal-username'
            name='username'
            type='text'
            autoComplete='username'
            required
            className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
            placeholder='Username'
            value={values.username ?? ''}
            onChange={event => handleChange(event)}
          />
        </div>
        <div>
          <label htmlFor='modal-password' className='sr-only'>
            Password
          </label>
          <span className='flex'>
            <input
              id='modal-password'
              name='password'
              type={`${showPassword ? 'text' : 'password'}`}
              autoComplete='current-password'
              required
              className='appearance-none rounded-md rounded-r-none rounded-t-none  relative block w-full px-3 py-2 border border-gray-300 border-r-0 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-darkerPurple focus:darkerPurple focus:z-10 sm:text-sm'
              placeholder='Password'
              value={values.password ?? ''}
              onChange={e => handleChange(e)}
            />
            <button
              type='button'
              tabIndex='-1'
              className='px-3 py-2 border border-gray-300 border-l-0 rounded-md rounded-t-none  rounded-l-none focus:outline-none'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOffIcon className='w-4 h-4' /> : <EyeIcon className='w-4 h-4' />}
            </button>
          </span>
        </div>
      </div>
    </>
  )
}

export default RegisterLoginInputs
