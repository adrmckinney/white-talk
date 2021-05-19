import { ChevronDoubleDownIcon } from '@heroicons/react/outline'

const HomeDivider = () => {
  return (
    <>
      {/* <div className='bg-lavenderWebb h-2 transform skew-y-1' /> */}
      {/* <div className='bg-lavenderBlue h-2 transform -skew-y-2 -m-2' /> */}
      <div className='w-full h-40 flex justify-center items-center border-t-8 border-mediumPurple'>
        <ChevronDoubleDownIcon className='animate-pulse text-darkerPurple w-auto h-12' />
      </div>
      <div className='bg-lavenderWebb h-4 transform skew-y-2' />
      <div className='bg-bluePurple h-2 transform skew-y-1 -m-1' />
      <div className='bg-lavenderBlue h-2 transform -skew-y-2 -m-2' />
    </>
  )
}

export default HomeDivider
