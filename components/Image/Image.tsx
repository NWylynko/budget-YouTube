import NextImage from "next/image"

interface ImageProps {
  src: string;
  alt?: string;
  width: number;
  height: number;
}

const loader = ({ src, width, quality }) => {
  return `/api/image/get?imageId=${src}&width=${width}&format=webp`
}

export const imageLoader = ({ src, width }) => loader({ src, width, quality: 100 })

export const Image = ({ src, alt, width, height }: ImageProps) => {
  return (
    <NextImage
      loader={loader}
      src={src}
      alt={alt}
      width={width}
      height={height}
    />
  )
}