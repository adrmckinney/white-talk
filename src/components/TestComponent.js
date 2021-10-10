import { withSessionState, useSessionState } from './sessions/withSessionState'

const TestComponent = () => {
  const { sessionState, welcome } = useSessionState()
  const { sessions } = withSessionState()
  console.log('sessionState', sessionState)
  console.log('welcome', welcome)
  console.log('state', sessions)
  return <>TestComponent component</>
}

export default withSessionState(TestComponent)
