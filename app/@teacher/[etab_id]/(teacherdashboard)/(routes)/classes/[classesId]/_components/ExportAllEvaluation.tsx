import PDFExport from '@/app/_utils/ExportAsPdf';
import { AllStudentList } from './allStudent';
import AllEvaluation from './AllEvaluation';
import PDFExportAllEvaluation from './PDFExportAllEvaluation';
import EvaluationPDFExport from '@/app/_utils/CustomExportAsPdf';
import Evaluation from './Evaluation';

function ExportAllEvaluationPdf({ newData, classeId, examId }: any) {
  console.log(classeId);
  console.log(examId);

  if (!newData) return;

  return (
    <>
      <PDFExportAllEvaluation pdfName="Etudiants">
        {/* {newData.map((item: any) => {
          const data = item?.correctionExamOfUser?.filter(
            (items: any) => items.user_id === item.id
          );
          return ( */}
        <AllEvaluation userExamCorectionContent={newData} classeId={classeId} examId={examId} />
        {/* ); */}
        {/* })} */}
      </PDFExportAllEvaluation>
    </>
  );
}

export default ExportAllEvaluationPdf;
