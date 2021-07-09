import { useCallback, useEffect, useState } from 'react'
// import { Animated } from 'react-animated-css'
// import { Transition } from 'react-transition-group'
import { Transition } from '@headlessui/react'
// import { CSSTransition, TransitionGroup } from 'react-transition-group'

const LIST_ITEMS = [
  'How can we do anti-racist work without being ‘white saviors’?',
  'What steps can we take to be a better white anti-racist?',
  'This is a journey, not a destination and everyone is welcomed.',
  'What do you have to gain in the fight to dismantle racism?',
  'Talking about racism in a supportive space prepares us for all other spaces.'
]

const LandingCarousel = () => {
  const [current, setCurrent] = useState(0)
  const [animation, setAnimation] = useState(true)
  const { length } = LIST_ITEMS

  const goToNext = useCallback(() => {
    setCurrent(current === length - 1 ? 0 : current + 1)
  }, [current, length])

  useEffect(() => {
    setTimeout(() => {
      setAnimation(false)
      setTimeout(() => {
        goToNext()
        setAnimation(true)
      }, 2000)
    }, 5000)
  }, [goToNext])

  if (!LIST_ITEMS || length <= 0) {
    return null
  }

  return (
    <>
      {/* <Transition
        show={animation}
        className='flex items-center h-full w-full'
      > */}
      <div
        className='flex items-center h-full w-full'
      >
        {LIST_ITEMS.map((item, idx) => (
          <div
            key={idx}
            className={`${idx === current ? 'block' : 'hidden'} text-3xl sm:text-5xl bg-darkerPurple w-full py-6 px-4 flex justify-center lg:justify-end items-center xl:justify-center h-40 sm:h-52 lg:h-60 xl:h-52`}
          >
            <Transition
              show={animation}
              enter='transition-all transform duration-2000 ease-in-out'
              enterFrom='opacity-0 translate-x-3/4'
              enterTo='opacity-100 translate-x-0'
              // beforeLeave={() => setAnimation(false)}
              leave='transition-all transform duration-2000 ease-in'
              leaveFrom='opacity-100 translate-x-0'
              leaveTo='opacity-0 -translate-x-3/4'
              // afterLeave={() => setAnimation(true)}
              className='w-full sm:w-full md:w-2/3 lg:w-3/5 xl:w-3/4 font-playFair font-semibold italic lg:text-4xl xl:text-5xl'
            >
              {/* <Animated animationIn='fadeInRight' animationInDuration={2000} animationOut='fadeOutLeft' isVisible> */}
              {/* <Transition.Child
                enter='transition-all transform duration-1000'
                enterFrom='opacity-0 translate-x-1/4'
                enterTo='opacity-100 translate-x-0'
                leave='transition-all transform duration-1000'
                leaveFrom='opacity-100 translate-x-0'
                leaveTo='opacity-0 -translate-x-1/4'
              > */}
              {item}
              {/* </Transition.Child> */}
              {/* </Animated> */}
            </Transition>
          </div>
        ))}
      </div>
      {/* </Transition> */}
    </>
  )
}

export default LandingCarousel
