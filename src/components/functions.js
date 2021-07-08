import Moment from 'react-moment'

export const formatSelectedSession = (session) => {
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

export const handleFormFilter = (name, value, setFilterFunction) => {
  return setFilterFunction({ [name]: value })
}

export const pageClickEvent = (useRefVariable, stateVariable, setStateFunction) => {
  const clickEvent = (e) => {
    if (useRefVariable.current !== null && !useRefVariable.current.contains(e.target)) {
      setStateFunction(!stateVariable)
    }
  }

  if (stateVariable) {
    window.addEventListener('click', clickEvent)
  }
  return () => {
    window.removeEventListener('click', clickEvent)
  }
}

export const sortSessions = (sessions) => {
  return sessions.slice().sort((a, b) => new Date(b.start_date) - new Date(a.start_date))
}

export function formatPhoneNumber (phoneNumberString) {
  const cleaned = ('' + phoneNumberString).replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return ('phone', '(' + match[1] + ') ' + match[2] + '-' + match[3])
  }
  return phoneNumberString
}
