import { createSessionForm, signupForm } from './customComponents/customForms/utils/formConfig'
import ModalForm from './customComponents/customForms/ModalForm'
import Modal from './customComponents/Modal'
import useForm from './customComponents/customForms/useForm'

const TestSessionCreate = () => {
  const { renderFormInputs, isFormValid } = useForm(createSessionForm)

  return (
    <form className='mt-48 mx-20 flex flex-col'>
      <h1>Create Session</h1>

      {renderFormInputs()}

      <button type={'submit'} disabled={!isFormValid()}>
        Submit
      </button>
    </form>
  )
}

export default TestSessionCreate
