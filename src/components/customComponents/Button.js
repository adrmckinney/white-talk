import { MailIcon } from '@heroicons/react/solid'
import { RefreshIcon } from '@heroicons/react/outline'

const SIZES = {
    small: 'px-3 py-2 text-sm leading-4 items-center',
    medium: 'px-4 py-2 text-base font-medium items-center',
    large: 'px-6 py-3 text-lg font-medium items-center'
}

const STATUSES = {
    primary: 'bg-darkerPurple hover:bg-mediumPurple text-snow border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mediumPurple',
    secondary: 'bg-lavenderBlue hover:bg-bluePurple text-coolGray-600 hover:text-ghostWhite',
    cancel: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
}

const ICON_SIZES = {
    small: 'h-4 w-4',
    medium: 'h-6 w-6',
    large: 'h-8 w-8'
}

const getIcon = (icon, buttonSize) => {
    switch (icon) {
        case 'mail':
            return <MailIcon className={`${ICON_SIZES[buttonSize]} mr-4 self-center`}/>
        case 'refresh':
            return <RefreshIcon className={`${ICON_SIZES[buttonSize]} mr-4 self-center animate-spin transform rotate-180`}/>
        default:
            break
    }
}

const Button = ({
    type,
    buttonLabel,
    buttonSize,
    buttonStatus,
    disabled,
    icon,
    onClick
}) => {
  return (
    <>
      <button 
      type={type}
      disabled={disabled ?? false}
      onClick={onClick}
      className={`
            inline-flex justify-center rounded-md shadow-sm
            ${SIZES[buttonSize] ?? SIZES['medium']} 
            ${STATUSES[buttonStatus] ?? STATUSES['primary']}
        `}>
        {getIcon(icon, buttonSize)}
        {buttonLabel}
      </button>
    </>
  )
}

export default Button