import { useEffect, useState } from 'react'

const useIsEditing = (params) => {
  const [isEditingParams, setIsEditingParams] = useState([])

  //   if (value === 'edit-announcement') {
  setIsEditingParams(params)
  // return params
  //   } else if (value === 'clear-params') {
  //   setIsEditingParams([])
  // return []
  //   }
  //   console.log('isEditingParams', isEditingParams)
  return isEditingParams
}

export default useIsEditing
