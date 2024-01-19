import ArchiverCard from '../components/ArchivedCard';

const FakeExamData = [
  {
    id: 9,
    name: 'DC1',
    archived_at: '12/03/2023',
    class: '2ème info 3',
  },
  {
    id: 1,
    name: 'DC2',
    archived_at: '12/03/2023',
    class: '2ème info 2',
  },
  {
    id: 2,
    name: 'DC3',
    archived_at: '12/03/2023',
    class: '3ème info 2',
  },
  {
    id: 3,
    name: 'DS1',
    archived_at: '12/03/2023',
    class: '4ème info 2',
  },
  {
    id: 4,
    name: 'DC4',
    archived_at: '12/03/2023',
    class: '4ème info 2',
  },
];

function ExamsLayout() {
  return (
    <div className=" flex gap-7 flex-wrap">
      {FakeExamData.map((classe) => (
        <ArchiverCard data={classe} key={classe.id} />
      ))}
    </div>
  );
}

export default ExamsLayout;
