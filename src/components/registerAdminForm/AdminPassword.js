import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'
import { useState, useEffect } from 'react'
import PasswordAlert from '../alerts/PasswordAlert'
import PasswordMatchAlert from '../alerts/PasswordMatchAlert'
import { handleFormFilter } from '../functions'
import UsePasswordValidation from '../UsePasswordValidation'

const AdminPassword = ({ filterAdminRegister, setFilterAdminRegister, setEnableBtn }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordBlur, setPasswordBlur] = useState(false)
  const [passwordMatchBlur, setPasswordMatchBlur] = useState(false)

  const [validLength, hasNumber, upperCase, lowerCase, match, specialChar, falseCount] = UsePasswordValidation({
    password: filterAdminRegister.password,
    confirmPassword: filterAdminRegister.re_password
  })

  useEffect(() => {
    setEnableBtn(falseCount)
  }, [falseCount, setEnableBtn])

  const handlePasswordAlert = () => {
    if (passwordBlur) {
      return (
        <span>
          <PasswordAlert validLength={validLength} hasNumber={hasNumber} upperCase={upperCase} lowerCase={lowerCase} specialChar={specialChar} falseCount={falseCount} setEnableBtn={setEnableBtn} />
        </span>
      )
    }
  }

  const handlePasswordMatchAlert = () => {
    if (passwordMatchBlur) {
      return (
        <PasswordMatchAlert match={match} />
      )
    }
  }

  return (
    <>
      <label
        className='block text-sm sm:text-lg font-medium text-gray-700 text-left mt-4'
        htmlFor='password'
      >
        Password
      </label>
      <span className='flex'>
        <input
          id='password'
          name='password'
          onBlur={e => setPasswordBlur(true)}
          type={`${showPassword ? 'text' : 'password'}`}
          autoComplete='current-password'
          required
          className='appearance-none rounded-md rounded-r-none relative block w-full px-3 py-2 border border-gray-300 border-r-0 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-darkerPurple focus:darkerPurple focus:z-10 sm:text-sm'
          placeholder='Password'
          value={filterAdminRegister.password}
          onChange={(e) => handleFormFilter('password', e.target.value, setFilterAdminRegister)}
        />
        <button
          type='button'
          tabIndex='-1'
          className='px-3 py-2 border border-gray-300 border-l-0 rounded-md rounded-l-none focus:outline-none'
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword
            ? <EyeOffIcon className='w-4 h-4' />
            : <EyeIcon className='w-4 h-4' />}
        </button>
      </span>

      {falseCount > 0 && <span>{handlePasswordAlert()}</span>}

      <label
        className='block text-sm sm:text-lg font-medium text-gray-700 text-left mt-4'
        htmlFor='confirm password'
      >
        Re-type Password
      </label>
      <span className='flex'>
        <input
          id='confirm password'
          name='re_password'
          onBlur={e => setPasswordMatchBlur(true)}
          type={`${showConfirmPassword ? 'text' : 'password'}`}
          required
          className='appearance-none rounded-md rounded-r-none relative block w-full px-3 py-2 border border-gray-300 border-r-0 placeholder-gray-500 focus:outline-none focus:ring-darkerPurple focus:darkerPurple focus:z-10 sm:text-sm'
          placeholder='Confirm Password'
          value={filterAdminRegister.re_password}
          onChange={(e) => {
            handleFormFilter(e.target.name, e.target.value, setFilterAdminRegister)
          }}
        />
        <button
          type='button'
          tabIndex='-1'
          className='px-3 py-2 border border-gray-300 border-l-0 rounded-md rounded-l-none focus:outline-none'
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword
            ? <EyeOffIcon className='w-4 h-4' />
            : <EyeIcon className='w-4 h-4' />}
        </button>
      </span>
      {!match && handlePasswordMatchAlert()}
    </>
  )
}

export default AdminPassword
