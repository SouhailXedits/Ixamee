import Image from "next/image"

function SubjectIcon({icon, onClick}) {
  console.log(icon)
    return (
      <div onClick={onClick} className=" cursor-pointer">
        <Image src={icon.src} alt={icon.alt} width={50} height={50} />
      </div>
    );
}

export default SubjectIcon
