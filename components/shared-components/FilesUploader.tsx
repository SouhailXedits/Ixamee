'use client';
import { getExamAttachements } from '@/actions/examens';
import { useUpdateExamAttachements } from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/examens/hooks/useUpdateExamAttachements';
import { Upload, UploadListItemProps } from '@progress/kendo-react-upload';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

// const CustomListItemUI = (props: UploadListItemProps) => {
//   return (
//     <ul>
//       {props.files.map((file:any) => (
//         <li key={file.name}>{file.name}</li>
//       ))}
//     </ul>
//   );
// };
function FilesUploader() {
  const { updateExamAttachements, isPending } = useUpdateExamAttachements();
  const [files, setFiles] = useState<any>([]);
  const params = useParams();
  const { examenId } = params;
  console.log(examenId);
  const {
    data: attachements,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['examenAttachements', examenId],
    queryFn: () => getExamAttachements({ exam_id: +examenId }),
  });
  console.log(attachements?.attachements, 'attachements');
  const attachementsData = attachements?.attachements;
  // attachementsData?.map((item: any) => {
  //   console.log(item);
  // })
  useEffect(() => {
    if (attachementsData) {
      setFiles(attachementsData);
    }
  }, [attachementsData]);

  // const oldFiles = JSON.parse(attachements?.attachements || '[]');
  // console.log(oldFiles)
  // const downloadFile = async () => {
  //   try {
  //     const cloudinaryUrl =
  //       'https://res.cloudinary.com/dm5d9jmf4/image/upload/v1711106997/emmmsvccr4trjhot16wp.pdf';
  //     const response = await fetch(cloudinaryUrl);
  //     const blob = await response.blob();

  //     // Generate a filename based on the public_id or a unique identifier
  //     const filename = cloudinaryUrl.substring(cloudinaryUrl.lastIndexOf('/') + 1); // Extract filename from URL

  //     const a = document.createElement('a');
  //     a.href = window.URL.createObjectURL(blob);
  //     a.download = filename;
  //     document.body.appendChild(a);
  //     a.click();
  //     document.body.removeChild(a);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // useEffect(() => {
  //   // Check if window is available (runs only in the browser)
  //   if (typeof window !== 'undefined') {
  //     // Code that relies on browser-specific APIs
  //     downloadFile();
  //   }
  // }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const data = await handleUpload(files);
    console.log(data);
    if (!data) return;
    const newFiles = data.map((file: any) => {
      return { original_filename: file.original_filename, url: file.url };
    });
    if (Array.isArray(attachementsData)) {
      attachementsData.map((item: any) => {
        newFiles.push(item);
      });
    }
    console.log(newFiles, '🚀')
    // newFiles.push(...oldFiles);
    await updateExamAttachements({
      exam_id: +examenId,
      attachements: newFiles,
    });
  };

  const handleUpload = async (files: any) => {
    console.log('upload');
    try {
      const form = new FormData();
      let allFiles: any = [];
      const uploadPromises = files.map(async (file: File) => {
        console.log(file);
        form.append('file', file);
        form.append('upload_preset', 'firaslatrach');
        console.log(form);

        const response = await fetch('https://api.cloudinary.com/v1_1/dm5d9jmf4/image/upload', {
          method: 'POST',
          body: form,
        });
        const data = await response.json();
        console.log(data);

        if (response.ok) {
          allFiles.push(data);
          console.log(allFiles);
        } else {
          console.error(await response.json());
          toast.error('File(s) upload failed !');
        }
      });
      console.log(uploadPromises);
      await Promise.all(uploadPromises);

      console.log(allFiles);
      return allFiles;
    } catch (error) {
      console.log(error);
      console.error(error);
    }
  };

  const handleFileChange = (event: any) => {
    const fileList = Array.from(event.target.files);
    console.log(fileList);
    setFiles(fileList);
  };

  return (
    <div className=" rounded p-5 mx-12 mt-10 bg-5">
      <p className=" text-lg mb-5">
        <Image src="/bulletinsicon.svg" width={24} height={24} alt="pdf" /> Pièces jointes :
      </p>
      <label
        htmlFor="file-input"
        className="bg-2/50 text-white rounded-md px-4 py-2 cursor-pointer"
      >
        Cliquez pour choisir ou faites glisser et déposez le(s) fichier(s) ici
      </label>
      <input
        type="file"
        id="file-input"
        className="hidden"
        onChange={handleFileChange}
        multiple
        accept=" .pdf, .docx, .doc, .ppt, .pptx"
      />
      <div className="mt-4">
        {files.map((file: any, index: number) => (
          <div key={index} className="bg-8/50 px-4 py-2 rounded-md mb-2">
            {file.name || file.original_filename}
          </div>
        ))}
      </div>
      <button
        className="bg-2 rounded-md px-4 py-2 mt-4 cursor-pointer text-white hover:bg-2/80"
        onClick={handleSubmit}
      >
        Upload
      </button>
      {/* <button onClick={downloadFile}>
        download
      </button> */}
    </div>
  );
}

export default FilesUploader;
