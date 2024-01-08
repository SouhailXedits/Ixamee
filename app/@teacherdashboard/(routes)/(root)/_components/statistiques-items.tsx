import PieChartItem from './pie-chartItem';

const StatistiquesItems = () => {
  const items = [
    {
      color: '#F04438',
      firstMessage: 'Entre 0 - 30%',
      studentNumber: '3',
    },
    {
      color: '#F69D16',
      firstMessage: 'Entre 30 - 60%',
      studentNumber: '7',
    },
    {
      color: '#12B76A',
      firstMessage: 'Entre 60 - 80%',
      studentNumber: '8',
    },
    {
      color: '#1B8392',
      firstMessage: 'Plus de 80%',
      studentNumber: '10',
    },
  ];

  return (
    <div className="flex items-center justify-center w-full pt-4 pb-4 border rounded-xl max-2xl:flex-wrap max-2xl:gap-4 ">
      {/* <PieChartItem
        series={[11, 11, 13, 8]}
        colors={['#12b76a', '#f04438', '#1b8392', '#f69d16']}
        numberOfStudent={29}
      /> */}
      <PieChartItem/>

      <div className="flex ">
        {items.map((item) => (
          <div key={item.color} className="flex gap-2 pl-6">
            <div
              className="w-[5.08px] h-14 rounded-[126.89px]"
              style={{ backgroundColor: item.color }}
            />
            <div className="flex flex-col gap-1 pl-4">
              <span className=" text-[#727272]">{item.firstMessage}</span>
              <span
                className="text-[15px]  text-xl
           font-bold  leading-9"
              >
                {item.studentNumber} étudiants{' '}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatistiquesItems;
