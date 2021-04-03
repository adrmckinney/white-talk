
import { Link } from 'react-router-dom'
import RegSuccessfulAlert from './RegSuccessfulAlert'

const Sessions = ({ showRegSuccessfulAlert, setShowRegSuccessfulAlert, showSessionRegModal, setShowSessionRegModal }) => {
  return (
    <div className='bg-mellowApricot rounded-lg shadow px-5 py-6 sm:px-6'>
      <div className='h-96 border-4 border-kobi rounded-lg flex flex-col justify-center overflow-auto'>
        {showRegSuccessfulAlert &&
          <RegSuccessfulAlert setShowRegSuccessfulAlert={setShowRegSuccessfulAlert} />}
        <Link
          to='/session-register'
          onClick={() => setShowSessionRegModal(true)}
        >
          <p className='text-gray-700 text-3xl ml-4'>Sign up with name, email, preferred session.</p>
        </Link>
        <br />
        <p className='text-ming text-5xl ml-4'>April 11th 4pm for 5-6 weeks</p>
        <br />
        <p className='text-gray-700 text-3xl ml-4'>These sessions are most successful with a commitment of regular attendance and participation.</p>
        <p className='text-gray-700 text-3xl ml-4'>Workshop topics include:</p>
        <li className='ml-6'>
          Learn what racism is and how it functions
        </li>
        <li className='ml-6'>Explore white antiracist spaces and their importance</li>
        <li className='ml-6'>Learn about white supremacy culture and antidotes to lifting other values in our society</li>
        <li className='ml-6'>Determine what our stake is in dismantling racism and why it’s important to have our own investment in this ongoing work</li>
      </div>
    </div>
  )
}

export default Sessions
