import React, { useEffect, useRef, useState } from 'react'
import './Carousel.css'
import CarouselOne from '../../images/carousel/CarouselOne.jpg'
import CarouselTwo from '../../images/carousel/CarouselTwo.jpg'
import CarouselThree from '../../images/carousel/CarouselThree.jpg'

const Carousel: React.FC = () => {
  const carouselImages = [CarouselOne, CarouselTwo, CarouselThree]
  const [index, setIndex] = useState<number>(0)
  const delay = 2500

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  useEffect(() => {
    resetTimeout()
    timeoutRef.current = setTimeout(
      () => setIndex(prevIndex => (prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1)),
      delay,
    ) as unknown as NodeJS.Timeout

    return () => {
      resetTimeout()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  return (
    <div className="slideshow">
      <div className="slideshowSlider" style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
        {carouselImages.map((image, index) => (
          <div className="slide" key={index} style={{ backgroundImage: `url(${image})` }}></div>
        ))}
      </div>

      <div className="slideshowDots">
        {carouselImages.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? ' active' : ''}`}
            onClick={() => {
              setIndex(idx)
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default Carousel
