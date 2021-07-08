// code from https://dev.to/producthackers/intersection-observer-using-react-49ko and https://github.com/zygisS22/intersectionObserverApi/blob/master/src/IO-Api-hook.js

import { useEffect, useRef, useState } from 'react'

const useTriggerNavAnimation = (options) => {
  const announcementRef = useRef()
  const [announcementIsVisible, setAnnouncementIsVisible] = useState(false)

  const callbackFunction = (entries) => {
    const [entry] = entries
    setAnnouncementIsVisible(entry.isIntersecting)
  }

  useEffect(() => {
    const observer = new window.IntersectionObserver(callbackFunction, options)
    if (announcementRef.current) observer.observe(announcementRef.current)

    const currentContainer = announcementRef.current

    return () => {
      if (currentContainer) observer.unobserve(currentContainer)
    }
  }, [announcementRef, options])

  return [announcementRef, announcementIsVisible]
}

export default useTriggerNavAnimation
