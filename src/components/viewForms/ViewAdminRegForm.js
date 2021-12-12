import { useEffect } from 'react'
import { getUser } from '../../api/api'
import Button from '../customComponents/Button'

const ViewAdminRegForm = ({
  token,
  showModal,
  setShowModal,
  setFormToView,
  isEditing,
  setIsEditing,
  loginProfile,
  setLoginProfile,
  setIsEditingAdmin,
  handleRequestChangeUsername,
  handleRequestChangePassword,
  isLoading,
  isLoadingUsername,
}) => {
  // console.log('showModal', showModal)

  useEffect(() => {
    getUser(token).then(data => setLoginProfile(data))
  }, [token, setLoginProfile])

  //   const handleEmailField = () => {
  // if (isEditing) {

  // }
  //   }

  return (
    <>
      <div>
        <div className='mt-2 mb-5 text-center'>
          <h3 className='text-lg leading-6 font-medium text-coolGray-900' id='modal-headline'>
            View Admin Registration Profile
          </h3>
        </div>
        <div className='rounded-md shadow-sm space-y-4'>
          <div className='flex justify-between'>
            <span className='w-3/5'>
              <div className='text-coolGray-800 text-xl'>Name</div>
              <div className='flex relative space-x-1 w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md sm:text-sm'>
                <p>{loginProfile.first_name}</p>
                <p>{loginProfile.last_name}</p>
              </div>
            </span>
            <Button
              type={'button'}
              buttonLabel={'Edit Name'}
              buttonSize={'medium'}
              buttonStatus={'primary'}
              onClick={() => setIsEditing('register')}
              customButtonStyle={'w-1/3 self-end sm:col-start-2 sm:text-sm'}
            />
          </div>
          <div className='flex justify-between'>
            <span className='w-3/5'>
              <div className='text-coolGray-800 text-xl'>Email</div>
              <div
                required
                className='flex relative space-x-1 w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md sm:text-sm'
              >
                {loginProfile.email}
              </div>
            </span>
            <Button
              type={'button'}
              buttonLabel={'Edit Email'}
              buttonSize={'medium'}
              buttonStatus={'primary'}
              onClick={() => setIsEditing('register')}
              customButtonStyle={'w-1/3 self-end sm:col-start-2 sm:text-sm'}
            />
          </div>
          <div className='flex justify-between'>
            <span className='w-3/5'>
              <div className='text-coolGray-800 text-xl'>Username</div>
              <div className='flex relative space-x-1 w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md sm:text-sm'>
                {loginProfile.username}
              </div>
            </span>
            <Button
              type={'button'}
              buttonLabel={isLoadingUsername ? 'Processing' : 'Edit Username'}
              buttonSize={'medium'}
              buttonStatus={'primary'}
              icon={isLoadingUsername ? 'refresh' : ''}
              onClick={() => handleRequestChangeUsername(loginProfile.email)}
              customButtonStyle={'w-1/3 self-end sm:col-start-2 sm:text-sm'}
            />
          </div>
          <div className='flex justify-between'>
            <span className='w-3/5'>
              <div className='text-coolGray-800 text-xl'>Password</div>
              <div className='flex relative space-x-1 w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md sm:text-sm'>
                **********
              </div>
            </span>
            <Button
              type={'button'}
              buttonLabel={isLoading ? 'Processing' : 'Change Password'}
              buttonSize={'medium'}
              buttonStatus={'primary'}
              icon={isLoading ? 'refresh' : ''}
              onClick={() => handleRequestChangePassword(loginProfile.email)}
              customButtonStyle={'w-1/3 self-end sm:col-start-2 sm:text-sm'}
            />
          </div>
        </div>
      </div>
      <div className='mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense'>
        <Button
          type={'button'}
          buttonLabel={'Cancel'}
          buttonSize={'medium'}
          buttonStatus={'cancel'}
          onClick={() => {
            setShowModal('')
            setIsEditing('')
            setFormToView('')
            setIsEditingAdmin(false)
          }}
          customButtonStyle={'w-full col-span-full self-end sm:col-start-1 sm:text-sm'}
        />
      </div>
    </>
  )
}

export default ViewAdminRegForm
