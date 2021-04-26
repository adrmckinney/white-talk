import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const SessionDates = ({ time, setTime, handleFilterSession, filterInput }) => {
  return (
    <>
      <div className='flex flex-col sm:flex-row sm:space-x-6'>
        <div>
          <label
            className='block text-sm sm:text-lg font-medium text-gray-700 text-center sm:text-left mt-4'
            htmlFor='startDate'
          >
            Start Date
          </label>
          <DatePicker
            selected={filterInput.start_date}
            id='startDate'
            autoComplete='off'
            placeholderText='Select a Start Date'
            onChange={e => handleFilterSession('start_date', e)}
          />
        </div>
        <div>
          <label
            className='block text-sm sm:text-lg font-medium text-gray-700 text-center sm:text-left mt-4'
            htmlFor='endDate'
          >
            End Date
          </label>
          <DatePicker
            selected={filterInput.end_date}
            id='endDate'
            autoComplete='off'
            placeholderText='Select an End Date'
            onChange={e => handleFilterSession('end_date', e)}
          />
        </div>
      </div>
      <div>
        {/* <span>
          <DatePicker
            selected={time}
            isClearable
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption='Time'
            dateFormat='h:mm aa'
            placeholderText='Select a Time'
            onChange={time => setTime(time)}
          />
        </span> */}
      </div>
    </>
  )
}

export default SessionDates
