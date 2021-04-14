import { handleFormFilter } from '../functions'

const AdminPassword = ({ filterAdminRegister, setFilterAdminRegister }) => {
  return (
    <>
      <label
        className='block text-sm sm:text-lg font-medium text-gray-700 text-left mt-4'
        htmlFor='first_name'
      >
        Password
      </label>
      <input
        id='password'
        name='password'
        type='password'
        autoComplete='current-password'
        required className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-darkerPurple focus:darkerPurple focus:z-10 sm:text-sm'
        placeholder='Password'
        value={filterAdminRegister.password}
        onChange={(e) => handleFormFilter('password', e.target.value, setFilterAdminRegister)}
      />
    </>
  )
}

export default AdminPassword
