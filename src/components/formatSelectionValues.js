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
        <p>({session.start_date}</p>
        <p>-</p>
        <p>{session.end_date})</p>
      </span>
    </span>
  )
}
