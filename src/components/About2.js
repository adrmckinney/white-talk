import danSpeaking from '../images/danSpeaking.jpeg'

const FACILITATORS = [
  {
    name: 'Rachael Gigliotti',
    role: 'Founder',
    imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    bio:
    'Rachael Gigliotti has been living in Durham since 2010. In 2006, she attributes volunteering in New Orleans after hurricane Katrina as opening her eyes to seeing systematic racism in the US. Once going to an Racial Equity Institutes Phase 1 and 2 workshops in 2014, she found the language to filter and express the honesty around racism that could no longer be denied. She co-founded Durham\'s Organizing Against Racism white caucus and stayed involved until 2020. She helped facilitate discussions around systematic racism with community members through Student U in the summer of 2020. She started the Racial Equity white Talk to expand the conversation about racism and privilege with other white folks interested in being a part of a larger and supportive community around racial equity.'
  },
  {
    name: 'Natalie Rich',
    role: '',
    imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    bio:
    'Natalie Rich lives and works in Durham, North Carolina, where she currently serves as a coordinator and facilitator for the Durham Organizing Against Racism (OAR) white caucus. Natalie has been involved in antiracist organizing since January 2014, when she completed her first Racial Equity Institute Phase I training "Undoing Racism." Since then, she has co-facilitated cross racial conversation circles on race and racism, interactive theater presentations on microaggressions, and white affinity groups. Natalie has completed the Racial Equity Institute Groundwater training, Phase I and Phase II trainings.'
  },
  {
    name: 'Dan McKinney',
    role: '',
    imageUrl: danSpeaking,
    caption: 'Dan McKinney speaking to a crowd at the George Floyd Vigil in 2020',
    bio:
    'Dan has lived in Durham since 2011 and attended the Racial Equity Institutes (REI) Phase 1 workshop for the first time in 2015. Wanting to take action, he quickly got engaged with Organizing Against Racism\'s (OAR) white caucus only to learn that the action he really needed to take was to address his internalized racial superiority. He served as a coordinator for the white caucus for 5 years and has been on OAR Durham\'s leadership team since 2016. He has continued his learning by attending REI Phase 2 and Latinx Challenges in Racial Equity workshops. For the past 5 years, he worked with youth through local non-profits to identify and address institutional racism with their high schools. Through OAR Durham, he has organized 5 youth REI workshops. He has had speaking engagements at Duke, DPS, and in the community to discuss power, privilege, white culture, sexism, and adultism. From 2018–2020, he served on the City of Durham\'s Racial Equity Task Force.'
  }
]

export default function About2 () {
  return (
    <div className='bg-white'>
      <div className='mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24'>
        <div className='space-y-12 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0'>
          <div className='space-y-5 sm:space-y-4'>
            <h2 className='text-3xl font-extrabold tracking-tight sm:text-4xl'>About Us</h2>
            <p className='text-xl text-gray-500'>
              The facilitators who White Talk have been active in the Durham community for many years. Get to know us.
            </p>
          </div>
          <div className='lg:col-span-2'>
            <ul className='space-y-12 sm:divide-y sm:divide-gray-200 sm:space-y-0 sm:-mt-8 lg:gap-x-8 lg:space-y-0'>
              {FACILITATORS.map((facilitator) => (
                <li key={facilitator.name} className='sm:py-8'>
                  <div className='space-y-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-6 sm:space-y-0'>
                    <div className='aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-4'>
                      <img className='object-cover shadow-lg rounded-lg' src={facilitator.imageUrl} alt={facilitator.caption} />
                    </div>
                    <div className='sm:col-span-2'>
                      <div className='space-y-4'>
                        <div className='text-lg leading-6 font-medium space-y-1'>
                          <h3>{facilitator.name}</h3>
                          <p className='text-darkerPurple'>{facilitator.role}</p>
                        </div>
                        <div className='text-lg'>
                          <p className='text-gray-500'>{facilitator.bio}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
