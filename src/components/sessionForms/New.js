
const Form = ({ name, age, update, setMode }) => (
  <form>
    <input type='text' value={name} onChange={e => update('name', e.target.value)} />
    <input type='number' value={age} onChange={e => update('age', e.target.value)} />
    <div><a href='#edit' onClick={() => setMode('show')}>Cancel</a></div>
  </form>
)

const Show = ({ name, age, setMode }) => (
  <div>
    <div>Name {name}</div>
    <div>Age {age}</div>
    <div><a href='#edit' onClick={() => setMode('edit')}>Edit Person</a></div>
  </div>
)

const initialState = { name: 'Dan (Ash) McDaniels', age: 39 }

function reducer (state, action) {
  switch (action.type) {
    case 'update-name':
      return { ...state, name: action.value }
    case 'update-age':
      return { ...state, age: action.value }
    default:
      throw new Error('That is not a valid action')
  }
}

function App () {
  const [mode, setMode] = useState('show')
  //   not sure how to incorporate the two lines of code and not exactly sure how they work
  const [state, dispatch] = useReducer(reducer, initialState)
  const update = (field, value) => dispatch({ type: `update-${field}`, value })

  return (
    mode === 'show' ? <Show name={state.name} age={state.age} setMode={setMode} /> : <Form name={state.name} age={state.age} setMode={setMode} update={update} />
  )
}

export default New
