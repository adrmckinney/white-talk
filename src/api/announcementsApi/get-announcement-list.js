import { url } from '../url'

export const getAnnouncementList = token => {
  if (!!token) {
    return url
      .get('api/create-announcement/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then(res => res.data)
  } else {
    return url.get('api/list-announcement/').then(res => res.data)
  }
}
