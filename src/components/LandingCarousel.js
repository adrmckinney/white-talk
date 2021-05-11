import { useCallback, useEffect, useState } from 'react'
import { Animated } from 'react-animated-css'
// import { CSSTransition, TransitionGroup } from 'react-transition-group'

const LIST_ITEMS = [
  'What does it mean to live an anti-racist life?',
  'Upcoming Event: Book Study on "How to be an Antiracist"',
  'How can we do anti-racist work and mitigate white saviorism?'
]

const LandingCarousel = () => {
  const [current, setCurrent] = useState(0)
  const { length } = LIST_ITEMS

  const goToNext = useCallback(() => {
    setCurrent(current === length - 1 ? 0 : current + 1)
  }, [current, length])

  useEffect(() => {
    setTimeout(goToNext, 5000)
  }, [goToNext])

  if (!LIST_ITEMS || length <= 0) {
    return null
  }

  return (
    <>
      <section className='flex items-center h-full w-full'>
        {LIST_ITEMS.map((item, idx) => (
          <div
            key={idx}
            className={`${idx === current ? 'block' : 'hidden'} text-3xl sm:text-5xl bg-darkerPurple w-full py-6 px-4 flex justify-center lg:justify-end xl:justify-center`}
          >
            <p className='w-full sm:w-2/3 lg:w-1/2 xl:w-3/4 font-playFair font-semibold italic'>
              <Animated animationIn='fadeInRight' animationInDuration={2000} animationOut='fadeOutLeft' isVisible>
                {item}
              </Animated>
            </p>
          </div>
        ))}
      </section>
    </>
  )
}

export default LandingCarousel
