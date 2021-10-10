import { useContext } from 'react'
import { ModalContext } from './context/useModalContext'

const ModalTesting = () => {
  const { setModal } = useContext(ModalContext)
  return (
    <>
      <div
        className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6'
        role='dialog'
        aria-modal='true'
        aria-labelledby='modal-headline'
      >
        <button className={'bg-red-500'} onClick={() => setModal(false)}>
          close modal
        </button>
      </div>
    </>
  )
}

export default ModalTesting
