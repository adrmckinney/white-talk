import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const SessionStartDate = ({ startDate, setStartDate, endDate, setEndDate, time, setTime }) => {
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
            selected={startDate}
            id='startDate'
            isClearable
            placeholderText='Select a Start Date'
            onChange={date => setStartDate(date)}
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
            selected={endDate}
            id='endDate'
            isClearable
            placeholderText='Select an End Date'
            onChange={date => setEndDate(date)}
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
