import Image from "next/image";

function SearchResultItem({data}: any) {
    return (
        <div className=" p-2 flex gap-2 items-center border-b">
            {data.image && <Image src={data.image} alt="search results item" height={30} width={30}/>}
            <p>{data.name}</p>
        </div>
    )
}

export default SearchResultItem
