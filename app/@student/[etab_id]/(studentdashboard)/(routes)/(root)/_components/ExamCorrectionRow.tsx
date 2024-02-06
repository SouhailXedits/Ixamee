function ExamCorrectionRow({ Examdata }: any) {
  console.log(Examdata);
//   {
//     id: 67,
//     mark_obtained: 5,
//     rank: 1,
//     exam: {
//       total_mark: 5,
//       subject: { name: 'CSS', icon: '/subjects/coding.svg', coefficient: 3 }
//     }
//   }
    // const avg = 
  return (
    <div className=" flex gap-4 p-2 border-b justify-between">
      <p className=" basis-[50%]">{Examdata.exam.name}</p>
      <p className=" p-2 rounded-xl"
        style={
          Examdata.mark_obtained > Examdata.exam.total_mark / 2
            ? { color: '#12B76A', backgroundColor: '#12b76a40' }
            : Examdata.mark_obtained > 10 &&
              Examdata.mark_obtained < (Examdata.exam.total_mark * 75) / 100
            ? { color: '#F69D16' }
            : { color: '#F04438' }
        }
      >
        {Examdata.mark_obtained} / {Examdata.exam.total_mark}
      </p>
      <p className=" text-2">Rang : {Examdata.rank} </p>
    </div>
  );
}

export default ExamCorrectionRow
