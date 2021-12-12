import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { authListAnnouncement } from '../../api/api'
import { AuthContext } from './AuthContext'

const AnnouncementsContext = createContext()

const AnnouncementsProvider = ({ children }) => {
  const [announcements, setAnnouncements] = useState([])
  const [announcementToEdit, setAnnouncementToEdit] = useState([])
  const token = useContext(AuthContext)
  console.log('token', token)
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

  return (
    <AnnouncementsContext.Provider value={announcementControls}>
      {children}
    </AnnouncementsContext.Provider>
  )
}

export { AnnouncementsContext, AnnouncementsProvider }

// export const AnnouncementsContext = createContext({
//   announcements: [],
//   setAnnouncements: () => {},
//   announcementToEdit: [],
//   setAnnouncementToEdit: () => {},
// })
