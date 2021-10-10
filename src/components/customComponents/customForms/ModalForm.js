import { useContext } from 'react'
import { ModalContext } from '../../context/useModalContext'
import useForm from './useForm'
import Button from '../Button'
import RegisterLoginInputs from './formInputs/RegisterLoginInputs'

const ModalForm = ({ children }) => {
  const { setModal } = useContext(ModalContext)
  const { handleSubmit, isLoading, setRoute } = useForm()
  return (
    <>
      <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
        <div
          className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6'
          role='dialog'
          aria-modal='true'
          aria-labelledby='modal-headline'
        >
          <div>
            <div className='mt-2 mb-5 text-center'>
              <h3 className='text-lg leading-6 font-medium text-gray-900' id='modal-headline'>
                Admin Login
              </h3>
            </div>

            {/* {errors && (
              <div>
                <Errors errors={errors} setErrors={setErrors} />
              </div>
            )} */}
            <input type='hidden' name='remember' value='true' />

            {/* <RegisterLoginInputs /> */}
            {children}

            <div className='flex items-center justify-between mt-2'>
              <div className='text-sm'>
                <button
                  type='button'
                  className='font-medium text-indigo-600 hover:text-indigo-500'
                  //   onClick={() => setIsForgotPassword(true)}
                >
                  Forgot your password?
                </button>
              </div>
            </div>
          </div>
          <div className='mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense'>
            <Button
              type={'button'}
              buttonLabel={'Cancel'}
              buttonSize={'small'}
              buttonStatus={'cancel'}
              onClick={() => setModal(false)}
            />
            <Button
              type={isLoading ? 'button' : 'submit'}
              disabled={isLoading ? true : false}
              buttonLabel={isLoading ? 'Logging in...' : 'Login'}
              buttonSize={'small'}
              buttonStatus={'primary'}
              icon={isLoading ? 'refresh' : ''}
              onClick={() => setRoute('login')}
            />
          </div>
        </div>
      </form>
    </>
  )
}

export default ModalForm
