import { createContext, useContext, useEffect, useState } from 'react'
import { getAnnouncement } from '../../api/announcementsApi/get-announcement'

const AnnouncementStateContext = createContext()
const AnnouncementDispatchContext = createContext()

export const useAnnouncementsState = () => {
  const announcementState = useContext(AnnouncementStateContext)
  const setAnnouncementPk = useContext(AnnouncementDispatchContext)

  return {
    announcementState,
    setAnnouncementPk,
  }
}

export const withAnnouncementsState =
  Component =>
  ({ ...rest }) => {
    const [announcementState, setAnnouncementState] = useState(null)
    const [announcementPk, setAnnouncementPk] = useState(null)

    useEffect(() => {
      getAnnouncement('04c4a72c99c63c16b6e4f9026fb0a6187beafd30', announcementPk).then(data =>
        setAnnouncementState(data)
      )
    }, [setAnnouncementPk, announcementPk])

    return (
      <AnnouncementStateContext.Provider value={announcementState}>
        <AnnouncementDispatchContext.Provider value={setAnnouncementPk}>
          <Component {...rest} />
        </AnnouncementDispatchContext.Provider>
      </AnnouncementStateContext.Provider>
    )
  }
