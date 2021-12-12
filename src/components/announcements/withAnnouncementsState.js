import { createContext, useContext, useEffect, useState } from 'react'
import { getAnnouncementList } from '../../api/announcementsApi/get-announcement-list'

const AnnouncementsStateContext = createContext()
const AnnouncementsDispatchContext = createContext()
const AnnouncementToEditStateContext = createContext()
const AnnouncementToEditDispatchContext = createContext()

export const useAnnouncementsState = () => {
  const announcementsState = useContext(AnnouncementsStateContext)
  const setAnnouncementsState = useContext(AnnouncementsDispatchContext)
  const announcementToEdit = useContext(AnnouncementToEditStateContext)
  const setAnnouncementToEdit = useContext(AnnouncementToEditDispatchContext)

  return { announcementsState, setAnnouncementsState, announcementToEdit, setAnnouncementToEdit }
}

export const withAnnouncementsState =
  Component =>
  ({ ...rest }) => {
    const [announcementsState, setAnnouncementsState] = useState(null)
    const [announcementToEdit, setAnnouncementToEdit] = useState(null)
    console.log('announcementToEdit', announcementToEdit)
    useEffect(() => {
      getAnnouncementList().then(data => setAnnouncementsState(data))
    }, [])

    return (
      <AnnouncementsStateContext.Provider value={announcementsState}>
        <AnnouncementToEditStateContext.Provider value={announcementToEdit}>
          <AnnouncementsDispatchContext.Provider value={setAnnouncementsState}>
            <AnnouncementToEditDispatchContext.Provider value={setAnnouncementToEdit}>
              <Component {...rest} />
            </AnnouncementToEditDispatchContext.Provider>
          </AnnouncementsDispatchContext.Provider>
        </AnnouncementToEditStateContext.Provider>
      </AnnouncementsStateContext.Provider>
    )
  }
