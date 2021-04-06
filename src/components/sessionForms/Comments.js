
const Comments = ({ filterInput, handleSessionRegFilter }) => {
  return (
    <>
      <label
        htmlFor='comment'
        className='block text-sm sm:text-lg font-medium text-gray-700 text-left mt-4'
      >
        Comment
      </label>
      <div className='mt-1'>
        <textarea
          className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md'
          name='comment'
          id='comment'
          rows='3'
          value={filterInput.comment}
          onChange={e => handleSessionRegFilter('comment', e.target.value)}
        />
      </div>
    </>
  )
}

export default Comments
