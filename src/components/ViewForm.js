import { Transition } from '@headlessui/react'
import { useState } from 'react'
import Register from './Register'
import ViewAdminRegForm from './viewForms/ViewAdminRegForm'
import ViewCreateSessionForm from './viewForms/ViewCreateSessionForm'
import CreateSession from './CreateSession'
import { requestChangePassword, requestChangeUsername } from '../api/api'
import ResetPasswordUsernameEmailAlert from './alerts/ResetPasswordUsernameEmailAlert'

const ViewForm = ({
  token,
  showModal,
  setShowModal,
  formToView,
  setFormToView,
  sessionToView,
  setIsEditingAdmin,
}) => {
  const [isEditing, setIsEditing] = useState('')
  const [loginProfile, setLoginProfile] = useState([])
  const [isEmailingReset, setIsEmailingReset] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingUsername, setIsLoadingUsername] = useState(false)

  // DEBUGGER STATION
  console.log('showModal', showModal)
  console.log('formToView', formToView)
  console.log('isEditing', isEditing)

  //   Function to handle which form is to be rendered inside modal ViewForm
  const handleFormSelection = () => {
    if (formToView === 'admin-reg-form') {
      return (
        <ViewAdminRegForm
          token={token}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          showModal={showModal}
          setShowModal={setShowModal}
          setFormToView={setFormToView}
          loginProfile={loginProfile}
          setLoginProfile={setLoginProfile}
          setIsEditingAdmin={setIsEditingAdmin}
          handleRequestChangeUsername={handleRequestChangeUsername}
          handleRequestChangePassword={handleRequestChangePassword}
          isLoading={isLoading}
          isLoadingUsername={isLoadingUsername}
        />
      )
    } else if (formToView === 'create-session-form') {
      return (
        <ViewCreateSessionForm
          token={token}
          setIsEditing={setIsEditing}
          setShowModal={setShowModal}
          sessionToView={sessionToView}
          setFormToView={setFormToView}
        />
      )
    } else if (formToView === 'register') {
      // return (
      //   <Register token={token} showModal='admin-registration-form' setShowModal={setShowModal} setIsRegistering={setIsRegistering} />
      // )
    }
  }

  // isEditing CONDITIONALS: I originally had this inside the view form components but
  // the modal would not render when isEditing. Placed at this component level it works
  if (loginProfile && isEditing === 'register') {
    return (
      <Register
        token={token}
        loginProfile={loginProfile}
        isEditing='register'
        setIsEditing={setIsEditing}
        showModal='admin-registration-form'
        setShowModal={setShowModal}
        setIsEditingAdmin={setIsEditingAdmin}
      />
    )
  }

  if (sessionToView && isEditing === 'create-session') {
    return (
      <CreateSession
        token={token}
        sessionToEdit={sessionToView}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        showModal='create-session-form'
      />
    )
  }
  // if (sessionToView && isEditing === 'edit-registrant') {
  //   return (
  //     <ViewSessionRegistrant
  //       token={token}
  //       sessionToEdit={sessionToView}
  //       isEditing={isEditing}
  //       setIsEditing={setIsEditing}
  //       showModal='create-session-form'
  //     />
  //   )
  // }
  // ^^^^^ isEditing CONDITIONALS ^^^^^

  if (isEmailingReset) {
    return (
      <ResetPasswordUsernameEmailAlert
        isEmailingReset={isEmailingReset}
        setIsEmailingReset={setIsEmailingReset}
      />
    )
  }

  const handleRequestChangeUsername = email => {
    setIsLoadingUsername(true)
    setShowModal('')
    setFormToView('')
    requestChangeUsername(email).then(data => {
      setIsLoadingUsername(false)
      setIsEmailingReset('username-reset')
    })
  }

  const handleRequestChangePassword = email => {
    setIsLoading(true)
    setShowModal('')
    setFormToView('')
    requestChangePassword(email).then(data => {
      setIsLoading(false)
      setIsEmailingReset('password-reset')
    })
  }

  return (
    <>
      <div className='fixed z-20 inset-0 overflow-y-auto'>
        <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          {/* Background overlay, show/hide based on modal state. */}
          <Transition
            show={showModal === 'view-form'}
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
          <span
            className='hidden sm:inline-block sm:align-middle sm:h-screen sm:w-1/2'
            aria-hidden='true'
          >
            &#8203;
            {/* Modal panel, show/hide based on modal state. */}
            <Transition
              show={showModal === 'view-form'}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <div className='mt-8 space-y-6'>
                <div
                  className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6'
                  role='dialog'
                  aria-modal='true'
                  aria-labelledby='modal-headline'
                >
                  {handleFormSelection()}
                </div>
              </div>
            </Transition>
          </span>
        </div>
      </div>
    </>
  )
}

export default ViewForm
