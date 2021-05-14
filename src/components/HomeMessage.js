import { ChatAltIcon, ChevronDoubleDownIcon } from '@heroicons/react/outline'

const MESSAGES = [
  {
    title: 'A personal invitation and note from the founder - Rachael Gigliotti',
    paragraph1: 'Privilege is a power that takes intentionality to see, and it is necessary that we see it in order to reduce harm moving forward. One thing that I have learned over the years is that to be a better anti-racist, one must make mistakes and be grounded in their own understanding as race and racism continues to evolve and change in it’s presentation. I have also witnessed that the best anti-racists do not operate in a vacuum; that it takes the strength of a community to come together and support each other on this journey.',
    paragraph2: 'Lastly, I decided to focus my energy toward creating intentional white spaces because I have found it invaluable to be able to collectively process what it means to be white in this country, especially without harming our friends and family of color. I recognize that meeting solely in white spaces has limitations to accomplishing racial liberation but without this intentional commitment we will be unprepared and this can lead us to being counterproductive and at times cause harm in this larger fight for racial equity.  We must do our work to understand and acknowledge what it means to be white and the implicite harm we inherently inject in our society.',
    icon: ChatAltIcon
  }
]

export default function HomeMessage () {
  return (
    <div className='py-4 sm:py-12 bg-white mb-10'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='lg:text-center'>
          <div className='w-full flex justify-center'>
            <ChevronDoubleDownIcon className='animate-pulse text-darkerPurple w-auto h-12' />
          </div>
          <p className='mt-10 max-w-2xl text-xl text-gray-500 lg:mx-auto font-nunito'>
            A personal invitation and note from the founder - Rachael Gigliotti
          </p>
        </div>
        <div className='mt-10'>
          <dl className='space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10'>
            <div className='relative grid col-span-full font-nunito'>
              <dt>
                <p className='sm:ml-16 text-base text-gray-500'>{MESSAGES[0].paragraph1}</p>
              </dt>
              <dd className='mt-2 sm:ml-16 text-base text-gray-500'>{MESSAGES[0].paragraph2}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}
