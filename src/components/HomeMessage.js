const MESSAGES = {
  title: 'A personal invitation and note from the founder | Rachael Gigliotti',
  paragraph1: 'Privilege is a power that takes intentionality to see, and it is necessary that we see it in order to reduce harm moving forward. One thing that I have learned over the years is that to be a better anti-racist, one must make mistakes and be grounded in their own understanding as race and racism continues to evolve and change in it’s presentation. I have also witnessed that the best anti-racists do not operate in a vacuum; that it takes the strength of a community to come together and support each other on this journey.',
  paragraph2: 'Lastly, I decided to focus my energy toward creating intentional white spaces because I have found it invaluable to be able to collectively process what it means to be white in this country, especially without harming our friends and family of color. I recognize that meeting solely in white spaces has limitations to accomplishing racial liberation but without this intentional commitment we will be unprepared and this can lead us to being counterproductive and at times cause harm in this larger fight for racial equity.  We must do our work to understand and acknowledge what it means to be white and the implicite harm we inherently inject in our society.'
}

export default function HomeMessage () {
  return (
    <div className='z-50 mx-auto pt-20 px-4 sm:px-6 lg:px-8 h-screen w-full bg-snow'>
      <blockquote className='mt-10 font-nunito'>
        <footer className='my-8'>
          <div className='md:flex md:items-center md:justify-center'>
            <div className='mt-3 text-center md:mt-0 md:ml-4 md:flex md:items-center'>
              <div className='text-3xl font-medium text-mediumPurple'>{MESSAGES.title}</div>
            </div>
          </div>
        </footer>
        <div className='max-w-5xl mx-auto text-center text-xl leading-9 font-medium text-davysGray'>
          <div>
            &ldquo;{MESSAGES.paragraph1}&rdquo;
          </div>
        </div>
        <div className='max-w-5xl mx-auto text-center text-xl leading-9 font-medium text-davysGray pt-16'>
          <div>
            &ldquo;{MESSAGES.paragraph2}&rdquo;
          </div>
        </div>
      </blockquote>
    </div>
  )
}
