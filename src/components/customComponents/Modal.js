import { Transition } from '@headlessui/react'
import { useContext } from 'react'
import { ModalContext } from '../context/useModalContext'
import ModalTesting from '../ModalTesting'
import TestSessionCreate from '../TestSessionCreate'
import ModalForm from './customForms/ModalForm'

const Modal = children => {
  const { modal, modalComponent } = useContext(ModalContext)

  const getComponent = () => {
    switch (modalComponent) {
      case 'form':
        return <ModalForm />
      case 'create-session':
        return <TestSessionCreate />
      default:
        break
    }
  }

  return (
    modal && (
      <div className='fixed z-20 inset-0 overflow-y-auto'>
        <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          {/* Background overlay, show/hide based on modal state. */}
          <Transition
            show={modal}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
              <div className='absolute inset-0 bg-gray-500 opacity-75' />
            </div>
          </Transition>
          {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
          <span
            className='inline-block align-middle h-screen w-3/4 sm:w-1/2 md:w-1/3'
            aria-hidden='true'
          >
            &#8203;
            {/* Modal panel, show/hide based on modal state. */}
            <Transition
              show={modal}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              {getComponent()}
            </Transition>
          </span>
        </div>
      </div>
    )
  )
}

export default Modal
