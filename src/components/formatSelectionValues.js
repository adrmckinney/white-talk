import Moment from 'react-moment'

export const formatSelectedSession = (session) => {
//   console.log('session', session)
//   if (!session) {
//     return 'loading'
//   }

  return (
    <span
      className='font-normal space-x-2 truncate flex'
    >
      <p>{session.title}</p>
      <span className='flex space-x-1'>
        <Moment format='MM/DD/YYYY'>{session.start_date}</Moment>
        <p>-</p>
        <Moment format='MM/DD/YYYY'>{session.end_date}</Moment>
      </span>
    </span>
  )
}
