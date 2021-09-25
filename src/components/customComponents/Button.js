import { MailIcon, CheckIcon } from '@heroicons/react/solid'
import { RefreshIcon, PencilAltIcon, TrashIcon, XIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'

const SIZES = {
  small: 'px-3 py-2 text-sm leading-4 items-center',
  medium: 'px-4 py-2 text-base font-medium items-center',
  large: 'px-6 py-3 text-lg font-medium items-center',
}

const STATUSES = {
  primary:
    'bg-darkerPurple hover:bg-mediumPurple text-snow border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mediumPurple',
  secondary: 'bg-lavenderBlue hover:bg-bluePurple text-coolGray-600 hover:text-ghostWhite',
  cancel:
    'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
}

const ICON_SIZES = {
  small: 'h-4 w-4',
  medium: 'h-6 w-6',
  large: 'h-8 w-8',
}

const Button = ({
  type,
  buttonLabel,
  buttonSize,
  buttonStatus,
  disabled,
  icon,
  onClick,
  to,
  customButtonStyle,
  overrideButtonStyle,
  customIconStyle,
  overrideIconStyle,
}) => {
  const ICONS = {
    mail: (
      <MailIcon
        className={`${ICON_SIZES[buttonSize]} ${customIconStyle} mr-4 self-center`}
        style={overrideIconStyle}
        aria-hidden='true'
      />
    ),
    refresh: (
      <RefreshIcon
        className={`${ICON_SIZES[buttonSize]} ${customIconStyle} mr-4 self-center animate-spin transform rotate-180`}
        style={overrideIconStyle}
        aria-hidden='true'
      />
    ),
    edit: (
      <PencilAltIcon
        className={`${ICON_SIZES[buttonSize]} ${customIconStyle} mr-4 self-center`}
        style={overrideIconStyle}
        aria-hidden='true'
      />
    ),
    delete: (
      <TrashIcon
        className={`${ICON_SIZES[buttonSize]} ${customIconStyle} mr-4 self-center`}
        style={overrideIconStyle}
        aria-hidden='true'
      />
    ),
    xicon: (
      <XIcon
        className={`${ICON_SIZES[buttonSize]} ${customIconStyle} mr-4 self-center`}
        style={overrideIconStyle}
        aria-hidden='true'
      />
    ),
    check: (
      <CheckIcon
        className={`${ICON_SIZES[buttonSize]} ${customIconStyle} mr-4 self-center`}
        style={overrideIconStyle}
        aria-hidden='true'
      />
    ),
  }

  if (type === 'link') {
    return (
      <Link
        to={to}
        disabled={disabled ?? false}
        onClick={onClick}
        style={overrideButtonStyle}
        className={`
                    inline-flex justify-center rounded-md shadow-sm
                    ${SIZES[buttonSize] ?? SIZES['medium']} 
                    ${STATUSES[buttonStatus] ?? STATUSES['primary']}
                    ${customButtonStyle}
                `}
      >
        {ICONS[icon]}
        {buttonLabel}
      </Link>
    )
  }

  return (
    <button
      type={type}
      disabled={disabled ?? false}
      onClick={onClick}
      style={overrideButtonStyle}
      className={`
            inline-flex justify-center rounded-md shadow-sm
            ${SIZES[buttonSize] ?? SIZES['medium']} 
            ${STATUSES[buttonStatus] ?? STATUSES['primary']}
            ${customButtonStyle}
        `}
    >
      {ICONS[icon]}
      {buttonLabel}
    </button>
  )
}

export default Button
