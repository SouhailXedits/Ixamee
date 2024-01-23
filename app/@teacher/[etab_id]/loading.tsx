import Image from 'next/image';

function Loading() {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <Image src="/loading.svg" alt="bankicon" width={400} height={400} />
    </div>
  );
}

export default Loading;
