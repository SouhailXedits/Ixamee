import Image from "next/image"

function SubjectIcon({icon}) {
    return (
        <div>
            <Image src={icon.src} alt={icon.alt} width={50} height={50}/>
        </div>
    )
}

export default SubjectIcon
