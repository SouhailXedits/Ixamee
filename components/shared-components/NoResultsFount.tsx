import Image from "next/image"

function NoResultsFount() {
    return (
      <div className=" flex flex-col gap-8 items-center px-16 py-4">
        <p className=" text-black/70">Pas de résultats à afficher dans cette matière.</p>
        <Image
          src="/illustrations/search-illustration.svg"
          alt="search illustration"
          width={150}
          height={150}
        />
      </div>
    );
}

export default NoResultsFount
