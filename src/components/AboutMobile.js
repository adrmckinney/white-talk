import { Animated } from 'react-animated-css'

const AboutMobile = ({ FACILITATORS }) => {
  return (
    <>
      <main
        className='mt-10 mx-auto max-w-7xl px-4 sm:hidden'
      >
        <Animated
          animationIn='fadeIn'
          animationInDuration={1000}
          animationOut='fadeOutLeft'
          isVisible
        >
          {FACILITATORS.map(facilitator => (
            <div
              key={facilitator.name}
              className='flex flex-col justify-between'
            >
              <span>
                <h1 className='flex flex-col mt-16 text-4xl tracking-tight font-extrabold text-gray-900 space-y-2'>
                  <span className='block'>About</span>{' '}
                  <span className='block text-mediumPurple'>{facilitator.name}</span>
                </h1>
                <p
                  className='mt-3 text-base text-gray-500 font-nunito'
                >
                  <span className=''>
                    {facilitator.bio}
                    {facilitator.email &&
                      <span>&nbsp;Contact Rachael at&nbsp;
                        <a
                          href={`mailto:${facilitator.email}`}
                          rel='noreferrer'
                          target='_blank'
                        >{facilitator.email}
                        </a>
                      </span>}
                  </span>
                </p>
              </span>
            </div>
          ))}
        </Animated>
      </main>
    </>
  )
}

export default AboutMobile
