import { url } from '../url'

export const DeleteAnnouncement = (token, pk) => {
  return url
    .delete(`api/retrieve-update-delete-announcement/${pk}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then(res => res.data)
}
