import Image from "next/image";

function Loading() {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className="text-center">
        <p className="text-2xl font-semibold">Loading...</p>
        <Image
          src="/loading.svg"
          alt="Bank Icon"
          width={400}
          height={400}
          viewBox="0 0 400 400"
          layout="intrinsic"
          className="mx-auto mt-8"
        />
      </div>
    </div>
  );
}

export default Loading;
