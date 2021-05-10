import Divider from './Divider'
import RegistrationMessage from './RegistrationMessage'
import UpcomingSessions from './UpcomingSessions'

const SessionsOld = ({ token, isLoggedIn, showModal, setShowModal, sessions, setSessions, sessionToRegister, setSessionToRegister, setFormToView, setSessionToView, registered, setRegistered }) => {
  if (registered) {
    return (
      <RegistrationMessage setRegistered={setRegistered} />
    )
  }

  return (
    <>
      <div className='max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8 relative'>
        <div className='bg-lavenderBlue rounded-lg shadow px-5 py-6 sm:px-6'>
          <div className='h-96 border-4 border-bluePurple rounded-lg flex flex-col justify-center overflow-auto pl-4'>
            <h3 className='text-xl font-bold text-center text-coolGray-700'>
              What are white Talk Sessions?
            </h3>
            <br />
            <p className='text-coolGray-700'>White talk sessions are opportunities to spend intentional time each week digging deeper into our understanding of racism and whiteness. Each session lasts 5 weeks, with a 1 hour meeting each week.</p>
            <p>Meeting topics are:</p>
            <li className='ml-6 text-coolGray-700'><strong>Meeting 1</strong> Let's talk about race and racism and how it works</li>
            <li className='ml-6 text-coolGray-700'><strong>Meeting 2</strong> Community and the importance of meeting in white spaces</li>
            <li className='ml-6 text-coolGray-700'><strong>Meeting 3</strong> Strategies to disrupt racism - calling in and calling out</li>
            <li className='ml-6 text-coolGray-700'><strong>Meeting 4</strong> Characteristics and antidotes of white supremacy culture</li>
            <li className='ml-6 text-coolGray-700'><strong>Meeting 5</strong> Continuing the work, both for racial justice and for the healing of racial injustices</li>
            <p className='text-coolGray-700'>These sessions are most successful with a commitment of regular attendance and participation.</p>
            <br />
          </div>
        </div>
      </div>
      <Divider />
      <UpcomingSessions token={token} sessions={sessions} setSessions={setSessions} isLoggedIn={isLoggedIn} showModal={showModal} setShowModal={setShowModal} sessionToRegister={sessionToRegister} setSessionToRegister={setSessionToRegister} setFormToView={setFormToView} setSessionToView={setSessionToView} setRegistered={setRegistered} />
    </>
  )
}

export default SessionsOld