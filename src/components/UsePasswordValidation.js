import { useEffect, useState } from 'react'

const UsePasswordValidation = ({ password, confirmPassword }) => {
  const [validLength, setValidLength] = useState(false)
  const [hasNumber, setHasNumber] = useState(false)
  const [upperCase, setUpperCase] = useState(false)
  const [lowerCase, setLowerCase] = useState(false)
  const [specialChar, setSpecialChar] = useState(false)
  const [match, setMatch] = useState(false)
  const value = [validLength, hasNumber, upperCase, lowerCase, specialChar]
  const count = value.filter((value) => value).length
  const falseCount = 5 - count
  console.log('VALUE', value)
  console.log('count', falseCount)

  useEffect(() => {
    setValidLength(password.length >= 8)
    setUpperCase(password.toLowerCase() !== password)
    setLowerCase(password.toUpperCase() !== password)
    setHasNumber(/\d/.test(password))
    setSpecialChar(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(password))
    setMatch(password && password === confirmPassword)
  }, [password, confirmPassword])

  return [validLength, hasNumber, upperCase, lowerCase, match, specialChar, falseCount]
}

export default UsePasswordValidation
