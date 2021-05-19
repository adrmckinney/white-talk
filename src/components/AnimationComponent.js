import { useEffect, useState } from 'react'

const useAnimationState = (children) => {
  const [animatedItems, setItems] = useState(null)

  useEffect(() => {
    const newState = animatedItems.concat([children])
    setItems(newState)
  }, [children, animatedItems])

  return animatedItems
}

const AnimationComponent = (props) => {
  const animatedItems = useAnimationState(props.children)

  return (
    <>
      <div className='animatedContainer'>{animatedItems}</div>
    </>
  )
}

export default AnimationComponent
