import { render } from '@testing-library/react'
import UpcomingSessions from '../UpcomingSessions'

describe('<UpcomingSessions />', () => {
  const token = ''
  const isLoggedIn = false
  const sessions = []
  const setSessions = sessions
  const sessionToRegister = []
  const setSessionToRegister = jest.fn()
  const showModal = false
  const setShowModal = jest.fn()
  const setFormToView = jest.fn()
  const setSessionToView = jest.fn()
  const setRegistered = jest.fn()
  it('renders without crashing', () => {
    render(<UpcomingSessions token={token} sessions={sessions} setSessions={setSessions} isLoggedIn={isLoggedIn} showModal={showModal} setShowModal={setShowModal} sessionToRegister={sessionToRegister} setSessionToRegister={setSessionToRegister} setFormToView={setFormToView} setSessionToView={setSessionToView} setRegistered={setRegistered} setIsRegistering={jest.fn()} setSessionToEdit={jest.fn()} setIsEditing={jest.fn()} setSessionToDelete={jest.fn()} setIsDeleting={jest.fn()} renderSessionStatus={false} getConfirmationCount={0} />)
  })

  it('edit btn renders', () => {
    const { getByTestId } = render(<UpcomingSessions token={token} sessions={sessions} setSessions={setSessions} isLoggedIn={isLoggedIn} showModal={showModal} setShowModal={setShowModal} sessionToRegister={sessionToRegister} setSessionToRegister={setSessionToRegister} setFormToView={setFormToView} setSessionToView={setSessionToView} setRegistered={setRegistered} setIsRegistering={jest.fn()} setSessionToEdit={jest.fn()} setIsEditing={jest.fn()} setSessionToDelete={jest.fn()} setIsDeleting={jest.fn()} renderSessionStatus={false} getConfirmationCount={0} />)

    const editBtn = getByTestId('editBtn')
    expect(editBtn).toBeInTheDocument()
  })
})
