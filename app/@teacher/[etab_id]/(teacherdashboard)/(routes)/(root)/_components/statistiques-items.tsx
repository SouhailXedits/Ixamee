import PieChartItem from './pie-chartItem';

const StatistiquesItems = () => {
  const items = [
    {
      // color: '#F04438',
      color: '#D0D5DD',

      firstMessage: 'Entre 0 - 30%',
      studentNumber: '3',
    },
    {
      // color: '#F69D16',
      color: '#D0D5DD',

      firstMessage: 'Entre 30 - 60%',
      studentNumber: '7',
    },
    {
      // color: '#12B76A',
      color: '#D0D5DD',

      firstMessage: 'Entre 60 - 80%',
      studentNumber: '8',
    },
    {
      // color: '#1B8392',
      color: '#D0D5DD',

      firstMessage: 'Plus de 80%',
      studentNumber: '10',
    },
  ];

  return (
    <div className="flex items-center justify-center w-full pt-4 pb-4 border rounded-xl max-2xl:flex-wrap max-2xl:gap-4  h-[205px] ">
      <PieChartItem
        // series={[11, 11, 13, 8]}
        series={[100]}
        colors={['#D9D9D9']}
        // colors={['#12b76a', '#f04438', '#1b8392', '#f69d16']}
        numberOfStudent={0}
      />
      {/* PieChartItem */}
      <div className="flex  ">
        {items.map((item) => (
          <div key={item.color} className="flex  gap-2 pl-6">
            <div
              className="w-[5.08px]  rounded-[126.89px]"
              style={{ backgroundColor: item.color }}
            />
            <div className="flex flex-col gap-1 pl-4">
              <span className=" text-[#727272]">{item.firstMessage}</span>
              <span className=" text-10 font-[500] leading-9">{item.studentNumber} étudiants </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatistiquesItems;
