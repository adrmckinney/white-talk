import { useEffect, useReducer, useState } from 'react'
import { Transition } from '@headlessui/react'
import { register, updateAdmin } from '../api'
import Errors from './Errors'
import AdminName from './registerAdminForm/AdminName'
import AdminEmail from './registerAdminForm/AdminEmail'
import AdminUsername from './registerAdminForm/AdminUsername'
import AdminPassword from './registerAdminForm/AdminPassword'
import Button from './customComponents/Button'

const Register = ({
  token,
  isEditing,
  setIsEditing,
  showModal,
  setShowModal,
  loginProfile,
  setIsRegistering,
  setIsEditingAdmin,
  isLoading,
  setIsLoading,
}) => {
  const [errors, setErrors] = useState('')
  const [enableBtn, setEnableBtn] = useState(0)

  const [filterAdminRegister, setFilterAdminRegister] = useReducer(
    (name, value) => ({ ...name, ...value }),
    {
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      password: '',
      re_password: '',
    }
  )

  useEffect(() => {
    if (isEditing === 'register' && loginProfile.id) {
      setFilterAdminRegister({
        first_name: loginProfile.first_name,
        last_name: loginProfile.last_name,
        email: loginProfile.email,
      })
    }
  }, [isEditing, loginProfile])

  // DEBUGGER STATION
  // console.log('isEditing REGISTER', isEditing)
  // console.log('showModal REGISTER', showModal)
  // console.log('loginProfile', loginProfile)
  // console.log('filterAdminRegister', filterAdminRegister)
  console.log('isLoading', isLoading)
  console.log('enableBtn', enableBtn)

  const handleRegister = e => {
    e.preventDefault()
    setIsLoading(true)
    if (isEditing === 'register') {
      updateAdmin(token, filterAdminRegister, loginProfile.id).then(data => {
        setIsLoading(false)
        setShowModal('')
        setIsEditing('')
      })
    } else {
      register(filterAdminRegister)
        .then(data => {
          setIsLoading(false)
          setShowModal('')
          setIsRegistering(false)
        })
        .catch(error => {
          console.log('error', error)
          setErrors(error.message)
        })
    }
  }

  const handleCancel = () => {
    if (isEditing) {
      setIsEditing('')
      setShowModal('')
      setIsEditingAdmin(false)
    } else {
      setIsRegistering(false)
      setShowModal('')
    }
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
        <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
          &#8203;
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
            <form className='mt-8 space-y-6' onSubmit={handleRegister}>
              <div
                className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6'
                role='dialog'
                aria-modal='true'
                aria-labelledby='modal-headline'
              >
                <div>
                  <div className='mt-2 mb-5 text-center'>
                    <h3 className='text-lg leading-6 font-medium text-gray-900' id='modal-headline'>
                      {isEditing === 'register' ? 'Update Admin Info' : 'Register New Admin'}
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
                      <AdminName
                        filterAdminRegister={filterAdminRegister}
                        setFilterAdminRegister={setFilterAdminRegister}
                        loginProfile={loginProfile}
                      />
                    </div>
                    <div>
                      <AdminEmail
                        filterAdminRegister={filterAdminRegister}
                        setFilterAdminRegister={setFilterAdminRegister}
                      />
                    </div>
                    {isEditing !== 'register' && (
                      <div>
                        <AdminUsername
                          filterAdminRegister={filterAdminRegister}
                          setFilterAdminRegister={setFilterAdminRegister}
                        />
                      </div>
                    )}
                    {isEditing !== 'register' && (
                      <div>
                        <AdminPassword
                          filterAdminRegister={filterAdminRegister}
                          setFilterAdminRegister={setFilterAdminRegister}
                          setEnableBtn={setEnableBtn}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className='mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense'>
                  <Button
                    type={'button'}
                    buttonLabel={'Cancel'}
                    buttonSize={'medium'}
                    buttonStatus={'cancel'}
                    onClick={() => handleCancel()}
                  />
                  <Button
                    type={isLoading ? 'button' : 'submit'}
                    buttonLabel={isEditing === 'register' ? 'Update' : 'Register'}
                    buttonSize={'medium'}
                    buttonStatus={'primary'}
                    disabled={enableBtn > 0 ? true : false}
                    icon={isLoading ? 'refresh' : ''}
                  />
                </div>
              </div>
            </form>
          </Transition>
        </span>
      </div>
    </div>
  )
}

export default Register
