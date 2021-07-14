import { Fragment, useEffect } from 'react'
import LandingCarousel from './LandingCarousel'
import HomeMessage from './HomeMessage'
import HeatherHackmanDivider from './dividers/HeatherHackmanDivider'
import CallToAction from './CallToAction'
import HomeFooter from './HomeFooter'
import Announcements from './Announcements'
import useTriggerNavAnimation from './customComponents/useTriggerNavAnimation'

const Home = ({ changeNavAnimation }) => {
  const [announcementRef, announcementIsVisible] = useTriggerNavAnimation({
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  })

  useEffect(() => {
    if (announcementIsVisible) changeNavAnimation('false')
  }, [announcementIsVisible, changeNavAnimation])

  return (
    <>
      <div className='relative bg-ghostWhite overflow-hidden h-screen sm:h-auto'>
        <div className='max-w-7xl mx-auto'>
          <div className='relative z-10 pb-8 bg-ghostWhite sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32'>
            <svg
              className='hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-ghostWhite transform translate-x-1/2'
              fill='currentColor'
              viewBox='0 0 100 100'
              preserveAspectRatio='none'
              aria-hidden='true'
            >
              <polygon points='50,0 100,0 50,100 0,100' />
            </svg>

            {/* Have to keep this for style */}
            <div className='relative pt-6 px-4 sm:px-6 lg:px-8' />

            <main
              className='mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28'
            >
              <div
                className='text-center lg:text-left'
              >
                <h1 className='flex flex-col text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl space-y-2 lg:space-y-0 pt-10 sm:pt-4 lg:pt-0'>
                  <span
                    className='block xl:inline'
                  >Welcome to
                  </span>{' '}
                  <span className='block text-mediumPurple xl:inline uppercase font-playFair'>Racial Equity <span className='lowercase'>white</span> Talk</span>
                </h1>
                <p
                  className='mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 font-nunito'
                >
                  We invite you to join us as we explore white identity in the context of racism in the US. Through book studies and weekly sessions we explore what it means to live an anti-racist life and to do anti-racist work as white people. We do this in a community of white people, all learning, all leaning into discomfort, all making mistakes, and all growing in this work.
                </p>
              </div>
            </main>
          </div>
        </div>
        <div className='lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-mediumPurple flex items-center justify-center lg:justify-end xl:justify-center h-72 sm:h-auto'>
          <LandingCarousel />
        </div>
      </div>
      {/* <HomeDivider /> */}

      {/* <HomeAnnouncement /> */}
      <span ref={announcementRef}>
        <Announcements />
      </span>

      <section className='relative h-screen preserve3d'>
        <HeatherHackmanDivider />
      </section>

      {/* <HomeDivider /> */}

      <HomeMessage />

      {/* <section className='relative h-screen preserve3d'>
        <RachaelDivider />
      </section> */}
      <CallToAction />

      <HomeFooter />
    </>
  )
}

export default Home
