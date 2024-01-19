import ArchiverCard from "../components/ArchivedCard";

const fakeClassData = [
    {
        id:9,
        name:"bac info 3", 
        archived_at: "12/03/2023",
        number_students: 36
    },
    {
        id:1,
        name:" zertzet zertyzey",
        archived_at: "12/03/2023",
        number_students: 12
    },
    {
        id:2,
        name:" zertzet",
        archived_at: "12/03/2023",
        number_students: 3
    },
    {
        id:3,
        name:" zertzet",
        archived_at: "12/03/2023",
        number_students: 3
    },
    
]

function ClassesLayout() {
    
    return (
      <div className=" flex gap-7 flex-wrap">
        {fakeClassData.map((classe) => (
          <ArchiverCard data={classe} key={classe.id} />
        ))}
      </div>
    );
}

export default ClassesLayout;
