import Button from './customComponents/Button'

export default function CallToAction() {
  return (
    <div className='bg-davysGray'>
      <div className='max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8'>
        <h2 className='text-3xl font-extrabold text-snow sm:text-4xl'>
          <span className='block'>Bring your curiosity</span>
        </h2>
        <p className='mt-4 text-lg leading-6 text-snow'>Start your anti-racist journey</p>
        <Button
          type={'link'}
          buttonLabel={'View Upcoming Sessions'}
          buttonSize={'large'}
          buttonStatus={'CTA'}
          customButtonStyle={'mt-8'}
        />
      </div>
    </div>
  )
}
