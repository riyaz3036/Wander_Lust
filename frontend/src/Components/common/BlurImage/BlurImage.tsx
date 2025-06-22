import { useState } from 'react'
import { Blurhash } from 'react-blurhash'

type BlurImageProps = {
  src: string
  blurhash: string
  alt?: string
  width?: number | string
  height?: number | string
}

const BlurImage = ({ src, blurhash, alt = '', width = '100%', height = '100%' }: BlurImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div
      className="relative rounded-[5px] overflow-hidden"
      style={{ width, height }}
    >
      {/* Blurhash placeholder */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          imageLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <Blurhash
          hash={blurhash}
          width="100%"
          height="100%"
          resolutionX={32}
          resolutionY={32}
          punch={1}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Actual image */}
      <img
        src={src}
        alt={alt}
        onLoad={() => setImageLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  )
}

export default BlurImage
