import { useState } from 'react'

const useEditAnnouncements = () => {
  const [announcementToEdit, setAnnouncementToEdit] = useState([])

  const handleEditAnnouncements = (value, params) => {
    if (value === 'edit-announcement') {
      setAnnouncementToEdit(params)
      return params
    } else if (value === 'clear-params') {
      setAnnouncementToEdit([])
    }
  }

  console.log('announcementToEdit', announcementToEdit)

  return {
    announcementToEdit,
    setAnnouncementToEdit,
    handleEditAnnouncements,
  }
}

export default useEditAnnouncements
