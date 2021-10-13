import { createContext, useEffect, useMemo, useState } from 'react'
import { authListAnnouncement } from '../../api'

export const useContextAnnouncements = token => {
  const [announcements, setAnnouncements] = useState([])
  const [announcementToEdit, setAnnouncementToEdit] = useState([])
  const announcementControls = useMemo(
    () => ({
      announcements,
      setAnnouncements,
      announcementToEdit,
      setAnnouncementToEdit,
    }),
    [announcements, announcementToEdit]
  )

  useEffect(() => {
    authListAnnouncement(token).then(data => setAnnouncements(data))
  }, [token])

  return { announcementControls }
}

export default useContextAnnouncements

export const AnnouncementsContext = createContext({
  announcements: [],
  setAnnouncements: () => {},
  announcementToEdit: [],
  setAnnouncementToEdit: () => {},
})
