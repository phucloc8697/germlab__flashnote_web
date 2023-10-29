import { useState, useLayoutEffect } from 'react'

const useWindowSize = (initValue = [0, 0]) => {
  const [width, setWidth] = useState(initValue[0])
  const [height, setHeight] = useState(initValue[1])
  useLayoutEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }

    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])
  return { width, height, isMobile: () => width <= 768 }
}

export default useWindowSize
