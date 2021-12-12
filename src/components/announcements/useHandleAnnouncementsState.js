import { useAnnouncementsState } from './withAnnouncementsState'

export const useHandleAnnouncementsState = () => {
  const { setAnnouncementToEdit } = useAnnouncementsState()

  const handleEditAnnouncements = params => {
    console.log('params', params)
    setAnnouncementToEdit(params)
  }

  return { handleEditAnnouncements }
}
