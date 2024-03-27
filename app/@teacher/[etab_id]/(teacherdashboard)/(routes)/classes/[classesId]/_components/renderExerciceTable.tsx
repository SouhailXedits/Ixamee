import { getDetailsOfAllExercice, getDetailsOfExercice } from './getDetailsOfExam';
import { calcSumOfMarks } from '../../../examens/[examenId]/_components/sharedFunction';
import { getMarkOfExerciceWithId } from '@/app/_utils/calculateChildrenMarks';
export const renderExericeTable = (
  obj: any,
  depth: number,
  index: number,
  examCorrection: any,
  userCorrections: any,
  examContent: any
) => {
  const TotalMark = calcSumOfMarks(obj);
  const result = examCorrection && calcSumOfMarks(examCorrection[index]);

  return (
    <>
      <thead className="text-white">
        <tr>
          {depth === 1 && (
            <>
              <th className="border border-black/50 bg-[#99C6D3] p-2 pb-[10px]">N</th>
              <th className="border border-black/50 bg-[#99C6D3] p-2 pb-[10px]">Bareme</th>
              <th className="border bg-[#99C6D3] border-black/50 p-2 pb-[10px]">Note</th>
              <th className="border bg-[#99C6D3] border-black/50 p-2 pb-[10px]">Moyene</th>
            </>
          )}
          {depth === 2 && (
            <>
              <th className="border border-black/50 bg-[#99C6D3] p-2 pb-[10px]">N</th>
              <th className="border border-black/50 bg-[#99C6D3] p-2 pb-[10px]">S.N</th>
              <th className="border border-black/50 bg-[#99C6D3] p-2 pb-[10px]">Bareme</th>
              <th className="border bg-[#99C6D3] border-black/50 p-2 pb-[10px]">Note</th>
              <th className="border bg-[#99C6D3] border-black/50 p-2 pb-[10px]">Moyene</th>
            </>
          )}
          {depth > 2 && (
            <>
              <th className="border border-black/50 bg-[#99C6D3] p-2 pb-[10px]">N</th>
              <th className="border border-black/50 bg-[#99C6D3] p-2 pb-[10px]">S.N</th>
              <th className="border border-black/50 bg-[#99C6D3] p-2 pb-[10px]">S.N2</th>
              <th className="border border-black/50 bg-[#99C6D3] p-2 pb-[10px]">Bareme</th>
              <th className="border bg-[#99C6D3] border-black/50 p-2 pb-[10px]">Note</th>
              <th className="border bg-[#99C6D3] border-black/50 p-2 pb-[10px]">Moyene</th>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        <>
          {obj?.children?.map((item: any, index: number) => (
            // <tr key={index}>

            <>
              {depth === 1 && (
                <tr>
                  <td className="p-2 border border-black/50">{item.name}</td>{' '}
                  <td className="p-2 border border-black/50">{item.mark}</td>
                  <td className="p-2 border border-black/50">
                    {getMarkOfExerciceWithId(examCorrection, item.id) === null
                      ? 0
                      : getMarkOfExerciceWithId(examCorrection, item.id)}
                  </td>
                  <td className="p-2 border border-black/50">
                    {getDetailsOfExercice(item.id, examCorrection, userCorrections, examContent)}
                  </td>
                </tr>
              )}
              {depth === 2 &&
                (item.children?.length === 0 ? (
                  <tr key={index}>
                    <td className="p-2 pb-[10px] border border-black/50">{item.name}</td>
                    <td className="p-2 pb-[10px] border border-black/50"> </td>

                    <td className="p-2 pb-[10px] border border-black/50">{item.mark}</td>
                    <td className="p-2 pb-[10px] border border-black/50">
                      {getMarkOfExerciceWithId(examCorrection, item.id) === null
                        ? 0
                        : getMarkOfExerciceWithId(examCorrection, item.id)}
                    </td>
                    <td className="p-2 pb-[10px] border border-black/50">
                      {getDetailsOfExercice(item.id, examCorrection, userCorrections, examContent)}
                    </td>
                  </tr>
                ) : (
                  item?.children?.map((subItem: any, subIndex: number) => {
                    if (subItem?.children?.length === 0) {
                      return (
                        <tr key={subIndex}>
                          <td className="p-2 pb-[10px] border border-black/50"></td>
                          <td className="p-2 pb-[10px] border border-black/50"> {subItem.name}</td>

                          <td className="p-2 pb-[10px] border border-black/50">{subItem.mark}</td>
                          <td className="p-2 pb-[10px] border border-black/50">
                            {getMarkOfExerciceWithId(examCorrection, subItem.id) === null
                              ? 0
                              : getMarkOfExerciceWithId(examCorrection, subItem.id)}
                          </td>
                          <td className="p-2 pb-[10px] border border-black/50">
                            {getDetailsOfExercice(
                              subItem.id,
                              examCorrection,
                              userCorrections,
                              examContent
                            )}
                          </td>
                        </tr>
                      );
                    }
                  })
                ))}
              {depth === 3 &&
                (item.children?.length === 0 ? (
                  <tr key={index}>
                    <td className="p-2 pb-[10px] border border-black/50">{item.name}</td>
                    <td className="p-2 pb-[10px] border border-black/50"> </td>
                    <td className="p-2 pb-[10px] border border-black/50"> </td>
                    <td className="p-2 pb-[10px] border border-black/50">{item.mark}</td>
                    <td className="p-2 pb-[10px] border border-black/50">
                      {getMarkOfExerciceWithId(examCorrection, item.id) === null
                        ? 0
                        : getMarkOfExerciceWithId(examCorrection, item.id)}
                    </td>
                    <td className="p-2 pb-[10px] border border-black/50">
                      {getDetailsOfExercice(item.id, examCorrection, userCorrections, examContent)}
                    </td>
                  </tr>
                ) : (
                  item?.children?.map((subItem: any, subIndex: number) => {
                    if (subItem?.children?.length === 0) {
                      return (
                        <tr key={subIndex}>
                          <td className="p-2 pb-[10px] border border-black/50"></td>
                          <td className="p-2 pb-[10px] border border-black/50"> {subItem.name}</td>
                          <td className="p-2 pb-[10px] border border-black/50"> </td>
                          <td className="p-2 pb-[10px] border border-black/50">{subItem.mark}</td>
                          <td className="p-2 pb-[10px] border border-black/50">
                            {getMarkOfExerciceWithId(examCorrection, subItem.id) === null
                              ? 0
                              : getMarkOfExerciceWithId(examCorrection, subItem.id)}
                          </td>
                          <td className="p-2 pb-[10px] border border-black/50">
                            {getDetailsOfExercice(
                              subItem.id,
                              examCorrection,
                              userCorrections,
                              examContent
                            )}
                          </td>
                        </tr>
                      );
                    }
                    return subItem?.children?.map((subSubItem: any, subSubIndex: number) => {
                      return (
                        <tr key={subSubIndex}>
                          <td className="p-2 pb-[10px] border border-black/50">{item.name}</td>
                          <td className="p-2 pb-[10px] border border-black/50">{subItem.name}</td>
                          <td className="p-2 pb-[10px] border border-black/50">
                            {subSubItem.name}
                          </td>
                          <td className="p-2 pb-[10px] border border-black/50">
                            {subSubItem.mark}
                          </td>
                          <td className="p-2 pb-[10px] border border-black/50">
                            {getMarkOfExerciceWithId(examCorrection, subSubItem.id) === null
                              ? 0
                              : getMarkOfExerciceWithId(examCorrection, subSubItem.id)}
                          </td>
                          <td className="p-2 pb-[10px] border border-black/50">
                            {getDetailsOfExercice(
                              subSubItem.id,
                              examCorrection,
                              userCorrections,
                              examContent
                            )}
                          </td>
                        </tr>
                      );
                    });
                  })
                ))}
            </>
          ))}
          <tr>
            <td
              colSpan={depth}
              className="p-2 border border-black/50 bg-[#9DD60026] text-[#4C4C4D] pb-[10px]"
            >
              Total
            </td>
            <td className="p-2 border border-black/50 bg-[#9DD60026] text-[#4C4C4D] pb-[10px]">
              {TotalMark}
            </td>
            <td className="p-2 pb-[10px] border border-black/50 bg-[#9DD60026] text-[#4C4C4D]">
              {result}
            </td>
            <td className="p-2  pb-[10px] border border-black/50 bg-[#9DD60026] text-[#4C4C4D]">
              {/* {result === 0 ? '0%' : ((result / TotalMark) * 100).toFixed(2) + '%'} */}

              {getDetailsOfAllExercice(examCorrection, userCorrections, obj, index)}
            </td>
          </tr>
        </>
      </tbody>
    </>
  );
};
