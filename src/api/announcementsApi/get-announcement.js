import { url } from '../url'

export const getAnnouncement = (token, pk) => {
  return url
    .get(`api/retrieve-update-delete-announcement/${pk}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then(res => res.data)
}
