import { url } from '../url'

export const createAnnouncement = (token, announcementData) => {
  return url
    .post('api/create-announcement/', announcementData, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then(res => res.data)
}
