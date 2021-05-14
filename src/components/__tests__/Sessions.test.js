import Sessions from '../Sessions'
import { render, screen, waitFor } from '@testing-library/react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const fakeApi = new MockAdapter(axios)

test('ensure session title is present', () => {
  const token = '12343'
  const isLoggedIn = false
  const sessions = []
  const setSessions = jest.fn()
  const sessionToRegister = []
  const setSessionToRegister = jest.fn()
  const showModal = false
  const setShowModal = jest.fn()
  const setFormToView = jest.fn()
  const setSessionToView = jest.fn()
  const registered = false
  const setRegistered = jest.fn()

  render(<Sessions token={token} isLoggedIn={isLoggedIn} sessions={sessions} setSessions={setSessions} sessionToRegister={sessionToRegister} setSessionToRegister={setSessionToRegister} showModal={showModal} setShowModal={setShowModal} setFormToView={setFormToView} setSessionToView={setSessionToView} registered={registered} setRegistered={setRegistered} />)

  expect(screen.getByText('Get Engaged')).toBeInTheDocument()
})

// test('ensure Sessions render', async () => {
//   const token = '12343'
//   const isLoggedIn = false
//   let sessions = []
//   const setSessions = (newSessions) => {
//     sessions = newSessions
//   }
//   const sessionToRegister = []
//   const setSessionToRegister = jest.fn()
//   const showModal = false
//   const setShowModal = jest.fn()
//   const setFormToView = jest.fn()
//   const setSessionToView = jest.fn()
//   const registered = false
//   const setRegistered = jest.fn()

//   fakeApi.onGet('api/sessions/').reply(200, (
//     [
//       {
//         pk: 1,
//         title: 'Test',
//         start_date: '2021-04-12T04:00:00.000Z',
//         end_date: '2021-05-18T04:00:00.000Z',
//         start_time: '2021-05-09T02:15:00.137Z',
//         end_time: '2021-05-09T02:15:00.137Z',
//         description: null,
//         session_status: true,
//         number_of_registrants_allowed: 8,
//         facilitator: 'Test',
//         session_registrants: [
//           {
//             pk: 1,
//             first_name: 'David (tested)',
//             last_name: 'Debris',
//             pronouns: 'he/him/his',
//             email: 'test@example.com',
//             comment: 'Test with test',
//             session: 1,
//             confirm: true
//           }
//         ]
//       }
//     ]
//   ))

//   render(<Sessions token={token} isLoggedIn={isLoggedIn} sessions={sessions} setSessions={setSessions} sessionToRegister={sessionToRegister} setSessionToRegister={setSessionToRegister} showModal={showModal} setShowModal={setShowModal} setFormToView={setFormToView} setSessionToView={setSessionToView} registered={registered} setRegistered={setRegistered} />)

//   await waitFor(() => expect(screen.getByText('David (tested)')).toBeInTheDocument())
// })
