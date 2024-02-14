import PDFExport from "@/app/_utils/ExportAsPdf";
import { AllStudentList } from "./allStudent";

function ExportClassePdf({ newData , classeName, teacherEstabName }: any) {
  return (
    <>
      <PDFExport pdfName="Etudiants">
        <AllStudentList
          data={newData}
          classeName={classeName}
          teacherEstabName={teacherEstabName}
        />
      </PDFExport>
    </>
  );
}

export default ExportClassePdf
