import { url } from '../url'

export const getAnnouncementList = () => {
  return url.get('api/list-announcement/').then(res => res.data)
}
