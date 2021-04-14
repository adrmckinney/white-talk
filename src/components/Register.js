import { useEffect, useReducer, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Transition } from '@headlessui/react'
import { register } from '../api'
import { handleFormFilter } from './functions'
import Errors from './Errors'
import AdminName from './registerAdminForm.js/AdminName'
import AdminEmail from './registerAdminForm.js/AdminEmail'
import AdminUsername from './registerAdminForm.js/AdminUsername'
import AdminPassword from './registerAdminForm.js/AdminPassword'

const Register = ({ token, isEditing, showModal, setShowModal, loginProfile }) => {
  const [errors, setErrors] = useState('')
  const history = useHistory()

  const [filterAdminRegister, setFilterAdminRegister] = useReducer(
    (name, value) => ({ ...name, ...value }),
    {
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      password: ''
    }
  )

  useEffect(() => {
    if (isEditing === 'register' && loginProfile) {
      handleFormFilter('username', loginProfile.username, setFilterAdminRegister)
      // setFilterAdminRegister({ username: loginProfile.username })
    }
  }, [isEditing, loginProfile])

  // if (isEditing === 'register' && loginProfile) {
  //   setFilterAdminRegister({ username: loginProfile.username })
  // }

  console.log('isEditing REGISTER', isEditing)
  console.log('showModal REGISTER', showModal)
  console.log('loginProfile', loginProfile)
  console.log('filterAdminRegister', filterAdminRegister)

  const handleRegister = (e) => {
    e.preventDefault()
    register(filterAdminRegister.username, filterAdminRegister.password)
      .then(data => {
        // setUsername(data.username)
        // setPassword(data.password)
        setShowModal('')
        history.push('/')
      })
      .catch(error => {
        setErrors(error.message)
      })
  }

  return (
    <div className='fixed z-20 inset-0 overflow-y-auto'>
      <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>

        {/* Background overlay, show/hide based on modal state. */}
        <Transition
          show={showModal === 'admin-registration-form'}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
            <div className='absolute inset-0 bg-gray-500 opacity-75' />
          </div>
        </Transition>
        {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
        {/* <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>&#8203;</span> */}

        {/* Modal panel, show/hide based on modal state. */}
        <Transition
          show={showModal === 'admin-registration-form'}
          enter='ease-out duration-300'
          enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          enterTo='opacity-100 translate-y-0 sm:scale-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100 translate-y-0 sm:scale-100'
          leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
        >
          <form
            className='mt-8 space-y-6'
            onSubmit={handleRegister}
          >
            <div className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6' role='dialog' aria-modal='true' aria-labelledby='modal-headline'>
              <div>
                <div className='mt-2 mb-5 text-center'>
                  <h3 className='text-lg leading-6 font-medium text-gray-900' id='modal-headline'>
                    Register New Admin
                  </h3>
                </div>

                {errors && (
                  <div>
                    <Errors errors={errors} setErrors={setErrors} />
                  </div>
                )}
                <input type='hidden' name='remember' value='true' />
                <div className='rounded-md shadow-sm space-y-4'>
                  <div>
                    <AdminName filterAdminRegister={filterAdminRegister} setFilterAdminRegister={setFilterAdminRegister} />
                  </div>
                  <div>
                    <AdminUsername filterAdminRegister={filterAdminRegister} setFilterAdminRegister={setFilterAdminRegister} />
                  </div>
                  <div>
                    <AdminPassword filterAdminRegister={filterAdminRegister} setFilterAdminRegister={setFilterAdminRegister} />
                  </div>
                  <div>
                    <AdminEmail filterAdminRegister={filterAdminRegister} setFilterAdminRegister={setFilterAdminRegister} />
                  </div>
                </div>
              </div>
              <div className='mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense'>
                <button type='submit' className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-darkerPurple text-base font-medium text-white hover:bg-mediumPurple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm'>
                  Register
                </button>
                <button
                  type='button'
                  className='modal-submit-btn'
                  onClick={() => {
                    if (isEditing) {
                      history.push('/')
                    } else {
                      history.goBack()
                      setShowModal('')
                    }
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </Transition>
      </div>
    </div>
  )
}

export default Register
