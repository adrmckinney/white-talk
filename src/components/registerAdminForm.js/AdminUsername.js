import { handleFormFilter } from '../functions'

const AdminUsername = ({ filterAdminRegister, setFilterAdminRegister }) => {
  return (
    <>
      <label
        className='block text-sm sm:text-lg font-medium text-gray-700 text-left mt-4'
        htmlFor='first_name'
      >
        Username
      </label>
      <input
        id='username'
        name='username'
        type='text'
        autoComplete='username'
        required
        className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-darkerPurple focus:darkerPurple focus:z-10 sm:text-sm'
        placeholder='Username'
        value={filterAdminRegister.username}
        onChange={(e) => handleFormFilter('username', e.target.value, setFilterAdminRegister)}
      />
    </>
  )
}

export default AdminUsername
