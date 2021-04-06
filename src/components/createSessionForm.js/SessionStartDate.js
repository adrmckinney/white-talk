import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const SessionStartDate = ({ time, setTime, handleFilterSession, filterInput }) => {
  return (
    <>
      <div className='flex space-x-2'>
        <div>
          <label
            className='block text-sm sm:text-lg font-medium text-gray-700 text-left mt-4'
            htmlFor='startDate'
          >
            Start Date
          </label>
          <DatePicker
            selected={filterInput.start_date}
            id='startDate'
            isClearable
            placeholderText='Select a Start Date'
            onChange={e => handleFilterSession('start_date', e)}
          />
        </div>
        <div>
          <label
            className='block text-sm sm:text-lg font-medium text-gray-700 text-left mt-4'
            htmlFor='endDate'
          >
            End Date
          </label>
          <DatePicker
            selected={filterInput.end_date}
            id='endDate'
            isClearable
            placeholderText='Select an End Date'
            // onChange={date => setEndDate(date)}
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

export default SessionStartDate
