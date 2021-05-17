import { Fragment, useState } from 'react'
import { Popover } from '@headlessui/react'
import { Animated } from 'react-animated-css'
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/outline'
import AboutMobile from './AboutMobile'

const FACILITATORS = [
  {
    name: 'Rachael Gigliotti',
    bio: 'Rachael Gigliotti has been living in Durham since 2010. In 2006, she attributes volunteering in New Orleans after hurricane Katrina as opening her eyes to seeing systematic racism in the US. Once going to an Racial Equity Institutes Phase 1 and 2 workshops in 2014, she found the language to filter and express the honesty around racism that could no longer be denied. She co-founded Durham\'s Organizing Against Racism white caucus and stayed involved until 2020. She helped facilitate discussions around systematic racism with community members through Student U in the summer of 2020. She started the Racial Equity white Talk to expand the conversation about racism and privilege with other white folks interested in being a part of a larger and supportive community around racial equity.',
    email: 'rachgigliotti@yahoo.com'
  },
  {
    name: 'Natalie Rich',
    bio: 'Natalie Rich lives and works in Durham, North Carolina, where she currently serves as a coordinator and facilitator for the Durham Organizing Against Racism (OAR) white caucus. Natalie has been involved in antiracist organizing since January 2014, when she completed her first Racial Equity Institute Phase I training "Undoing Racism." Since then, she has co-facilitated cross racial conversation circles on race and racism, interactive theater presentations on microaggressions, and white affinity groups. Natalie has completed the Racial Equity Institute Groundwater training, Phase I and Phase II trainings.'
  }
  // {
  //   name: 'Dan McKinney',
  //   bio: 'Dan has lived in Durham since 2011 and attended the Racial Equity Institutes (REI) Phase 1 workshop for the first time in 2015. Wanting to take action, he quickly got engaged with Organizing Against Racism\'s (OAR) white caucus only to learn that the action he really needed to take was to address the internalized racial superiority inside himself. He served as a coordinator for the white caucus for 5 years and has been on OAR Durham\'s leadership team since 2016. He has continued his learning by attending REI Phase 2 and Latinx Challenges in Racial Equity workshops. For the past 5 years, he worked with youth through local non-profits to identify and address institutional racism with their high schools. Through OAR Durham, he has organized 5 youth REI workshops. He has had speaking engagements at Duke, DPS, and in the community to discuss power, privilege, white culture, sexism, and adultism. From 2018–2020, he served on the City of Durham\'s Racial Equity Task Force.'
  // }
]

const FACILITATORS_LENGTH = FACILITATORS.length

const About = () => {
  const [facilitatorIndex, setFacilitatorIndex] = useState(0)

  const increaseIndexCount = () => {
    if (facilitatorIndex === FACILITATORS_LENGTH - 1) {
      setFacilitatorIndex(0)
    } else {
      setFacilitatorIndex(facilitatorIndex + 1)
    }
  }

  const decreaseIndexCount = () => {
    if (facilitatorIndex === 0) {
      setFacilitatorIndex(FACILITATORS_LENGTH - 1)
    } else {
      setFacilitatorIndex(facilitatorIndex - 1)
    }
  }

  const increaseBtnName = () => {
    if (facilitatorIndex === FACILITATORS_LENGTH - 1) {
      return (
        FACILITATORS[0].name
      )
    } else {
      return (
        FACILITATORS[facilitatorIndex + 1].name
      )
    }
  }

  const decreaseBtnName = () => {
    if (facilitatorIndex === 0) {
      return (
        FACILITATORS[FACILITATORS_LENGTH - 1].name
      )
    } else {
      return (
        FACILITATORS[facilitatorIndex - 1].name
      )
    }
  }

  return (
    <>
      <div className='relative bg-white overflow-hidden mb-32 sm:hidden'>
        <AboutMobile FACILITATORS={FACILITATORS} />
      </div>
      <div className='hidden sm:block sm:relative sm:bg-white sm:overflow-hidden sm:h-screen'>
        <div className='max-w-7xl mx-auto'>
          <div className='relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 h-screen'>
            <svg
              className='hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2'
              fill='currentColor'
              viewBox='0 0 100 100'
              preserveAspectRatio='none'
              aria-hidden='true'
            >
              <polygon points='50,0 100,0 50,100 0,100' />
            </svg>

            {/* Have to keep this for style */}
            <Popover>
              {({ open }) => (
                <>
                  <div className='relative pt-6 px-4 sm:px-6 lg:px-8' />
                </>
              )}
            </Popover>

            <main
              className='hidden sm:block sm:mx-auto sm:max-w-7xl sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 sm:h-full'
            >
              <Animated
                animationIn='fadeIn'
                animationInDuration={1000}
                animationOut='fadeOutLeft'
                isVisible
                className='h-full'
              >
                <div
                  className=' lg:text-left flex flex-col justify-between h-full'
                >
                  <span>
                    <h1 className='flex flex-col text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl space-y-2 lg:space-y-0 pt-10 sm:pt-4 lg:pt-0'>
                      <span className='block xl:inline'>About Us</span>{' '}
                      {/* <span className='block sm:hidden text-mediumPurple xl:inline'>Rachel Gigliotti</span> */}
                    </h1>
                    <p
                      className='mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-2xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 font-nunito'
                    >
                      <span className=''>
                        {FACILITATORS[facilitatorIndex].bio}
                        {FACILITATORS[facilitatorIndex].email &&
                          <span>&nbsp;Contact Rachael at&nbsp;
                            <a
                              href={`mailto:${FACILITATORS[facilitatorIndex].email}`}
                              rel='noreferrer'
                              target='_blank'
                            >{FACILITATORS[facilitatorIndex].email}
                            </a>
                          </span>}
                      </span>
                    </p>
                  </span>

                  <div className='hidden sm:mt-8 sm:flex sm:justify-center lg:justify-start space-x-2 mb-10'>
                    {FACILITATORS_LENGTH > 2 &&
                      <div className='rounded-md shadow'>
                        <button
                          className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-darkerPurple bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-md md:px-10 focus:outline-none'
                          onClick={() => decreaseIndexCount()}
                        >
                          {decreaseBtnName()}
                        </button>
                      </div>}
                    <div className='flex items-center space-x-2'>
                      {FACILITATORS_LENGTH > 2 &&
                        <span>
                          <ChevronDoubleLeftIcon className='w-auto h-8 animate-pulse text-darkerPurple' />
                        </span>}
                      <span className='font-nunito text-lg'>
                        Learn about
                      </span>
                      <span>
                        <ChevronDoubleRightIcon className='w-auto h-8 animate-pulse text-darkerPurple' />
                      </span>
                    </div>
                    <div className='rounded-md shadow'>
                      <button
                        className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-darkerPurple bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-md md:px-10 focus:outline-none'
                        onClick={() => {
                          increaseIndexCount()
                        }}
                      >
                        {increaseBtnName()}
                      </button>
                    </div>
                  </div>
                </div>
              </Animated>
            </main>
          </div>
        </div>
        <div className='lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-mediumPurple flex items-center justify-center lg:justify-end xl:justify-center h-72 sm:h-auto'>
          <section className='flex items-center h-full w-full'>
            <div
              className='text-3xl sm:text-5xl bg-darkerPurple w-full py-6 px-4 flex justify-center lg:justify-end xl:justify-center'
            >
              <p className='w-full sm:w-2/3 lg:w-1/2 xl:w-3/4 font-playFair font-semibold italic'>
                {FACILITATORS[facilitatorIndex].name}
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default About
