import DatePicker from 'react-datepicker'

const INPUT_STYLES = {
  login:
    'appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm',
  primary:
    'appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm',
  full: 'py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md',
  date: 'flex flex-col space-y-2 items-center text-sm sm:text-lg font-medium text-gray-700',
}

const LABEL_STYLES = {
  login: 'sr-only',
  full: 'block text-sm font-medium text-gray-700',
  left: 'block text-sm sm:text-lg font-medium text-gray-700 text-center sm:text-left',
}

const Input = ({
  name,
  type,
  id,
  autoComplete,
  required,
  value,
  handleChange,
  placeholder,
  inputStyle,
  labelStyle,
  label,
  errorMessage,
  isValid,
  selected,
  timeIntervals,
  timeCaption,
  dateFormat,
  showTimeSelect,
  showTimeSelectOnly,
  column,
}) => {
  return (
    <>
      <div className='flex flex-col w-full'>
        {id === 'date' || id === 'time' ? (
          <span className='space-y-4 sm:space-y-0 sm:justify-between'>
            <div className={'flex flex-col'}>
              <label htmlFor={name} className={`${LABEL_STYLES[labelStyle]}`}>
                {label}
              </label>
              <DatePicker
                name={name}
                selected={value}
                id={id}
                autoComplete='off'
                value={value}
                placeholderText={placeholder}
                timeIntervals={timeIntervals}
                timeCaption={timeCaption}
                dateFormat={dateFormat}
                showTimeSelect={showTimeSelect}
                showTimeSelectOnly={showTimeSelectOnly}
                onChange={event => handleChange(event, name)}
              />
            </div>
          </span>
        ) : (
          <div className='mt-1 w-full'>
            <input
              id={id}
              name={name}
              type={type}
              autoComplete={autoComplete}
              required={required}
              className={`${INPUT_STYLES[inputStyle]}`}
              placeholder={placeholder}
              value={value}
              onChange={handleChange}
            />
          </div>
        )}
        {errorMessage && !isValid && <span className='text-red-500'>{errorMessage}</span>}
      </div>
    </>
  )
}

export default Input
