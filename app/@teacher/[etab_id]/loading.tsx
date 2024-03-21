import Image from 'next/image';

function Loading({ imageWidth = 400, imageHeight = 400, altText = 'Loading indicator' }) {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Image
        src="/loading.svg"
        alt={altText}
        width={imageWidth}
        height={imageHeight}
      />
    </div>
  );
}

export default Loading;
