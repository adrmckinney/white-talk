import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const SessionTime = ({ handleFilterSession, filterInput }) => {
  return (
    <>
      <div className='flex flex-col space-y-2 items-center text-sm sm:text-lg font-medium text-gray-700'>
        <h1>Times</h1>
        <div>
          {/* <label
            className='block text-sm sm:text-lg font-medium text-gray-700 text-center sm:text-left mt-4'
            htmlFor='startDate'
          >
            Start Time
          </label> */}

          <DatePicker
            selected={filterInput.start_time}
            name='start_time'
            showTimeSelect
            autoComplete='off'
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption='Time'
            dateFormat='h:mm aa'
            placeholderText='Select a Start Time'
            onChange={e => handleFilterSession('start_time', e)}
          />
        </div>
        <div>
          {/* <label
            className='block text-sm sm:text-lg font-medium text-gray-700 text-center sm:text-left mt-4'
            htmlFor='endDate'
          >
            End Time
          </label> */}
          <DatePicker
            selected={filterInput.end_time}
            name='end_time'
            showTimeSelect
            autoComplete='off'
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption='Time'
            dateFormat='h:mm aa'
            placeholderText='Select an End Time'
            onChange={e => handleFilterSession('end_time', e)}
          />
        </div>
      </div>
      <div />
    </>
  )
}

export default SessionTime
