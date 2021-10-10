import { useCallback, useState } from 'react'

const useForm = formObj => {
  const [form, setForm] = useState(formObj)

  const renderFormInputs = () => {
    return Object.values(form).map(inputObj => {
      const { value, label, errorMessage, valid, renderInput } = inputObj
      console.log('renderInput()', renderInput())
      return renderInput(onInputChange, value, valid, errorMessage, label)
    })
  }
  const isInputFieldValid = useCallback(
    inputField => {
      for (const rule of inputField?.validationRules) {
        if (!rule?.validate(inputField?.value, form)) {
          inputField.errorMessage = rule?.message
          return false
        }
      }

      return true
    },
    [form]
  )
  console.log('form', form)
  const onInputChange = useCallback(
    (event, target) => {
      if (!event?.target) {
        const inputObj = { ...form[target] }
        inputObj.value = event
        inputObj.touched = true

        setForm({ ...form, [target]: inputObj })
      } else {
        const { name, value } = event.target
        const inputObj = { ...form[name] }
        inputObj.value = value

        const isValidInput = isInputFieldValid(inputObj)
        if (isValidInput && !inputObj?.valid) {
          inputObj.valid = true
        } else if (!isValidInput && inputObj?.valid) {
          inputObj.valid = false
        }

        inputObj.touched = true
        setForm({ ...form, [name]: inputObj })
      }
    },
    [form, isInputFieldValid]
  )

  const isFormValid = useCallback(() => {
    let isValid = true
    const arr = Object.values(form)

    for (let i = 0; i < arr.length; i++) {
      if (!arr[i].valid) {
        isValid = false
        break
      }
    }

    return isValid
  }, [form])

  return { renderFormInputs, isFormValid }
}

export default useForm
