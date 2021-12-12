import { url } from '../url'

export const UpdateAnnouncement = (token, pk, announcementData) => {
  return url
    .put(`api/retrieve-update-delete-announcement/${pk}/`, announcementData, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then(res => res.data)
}
