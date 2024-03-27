'use client';
import { getExamAttachements } from '@/actions/examens';
import { useUpdateExamAttachements } from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/examens/hooks/useUpdateExamAttachements';
import { Upload, UploadListItemProps } from '@progress/kendo-react-upload';
import { useQuery } from '@tanstack/react-query';
import { DownloadIcon } from 'lucide-react';
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
function FilesRenderer() {
  const [files, setFiles] = useState<any>([]);
  const params = useParams();
  const { correction_id } = params;

  const {
    data: attachements,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['examenAttachements', correction_id],
    queryFn: () => getExamAttachements({ exam_id: +correction_id }),
  });

  const attachementsData = attachements?.attachements;
  // attachementsData?.map((item: any) => {
  //
  // })
  useEffect(() => {
    if (attachementsData) {
      setFiles(attachementsData);
    }
  }, [attachementsData]);

  // const oldFiles = JSON.parse(attachements?.attachements || '[]');
  //
  const downloadFile = async (cloudinaryUrl: string, name: string) => {
    try {
      const response = await fetch(cloudinaryUrl);
      const blob = await response.blob();

      // Generate a filename based on the public_id or a unique identifier
      //   const filename = cloudinaryUrl.substring(cloudinaryUrl.lastIndexOf('/') + 1); // Extract filename from URL
      //

      const a = document.createElement('a');
      a.href = window.URL.createObjectURL(blob);
      a.download = name;
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error(error);
    }
  };
  // useEffect(() => {
  //   // Check if window is available (runs only in the browser)
  //   if (typeof window !== 'undefined') {
  //     // Code that relies on browser-specific APIs
  //     downloadFile();
  //   }
  // }, []);

  //   const handleSubmit = async (event: any) => {
  //     event.preventDefault();
  //     const data = await handleUpload(files);
  //
  //     if (!data) return;
  //     const newFiles = data.map((file: any) => {
  //       return { original_filename: file.original_filename, url: file.url };
  //     });
  //     if (Array.isArray(attachementsData)) {
  //       attachementsData.map((item: any) => {
  //         newFiles.push(item);
  //       });
  //     }
  //
  //     // newFiles.push(...oldFiles);
  //     await updateExamAttachements({
  //       exam_id: +examenId,
  //       attachements: newFiles,
  //     });
  //   };

  //   const handleUpload = async (files: any) => {
  //
  //     try {
  //       const form = new FormData();
  //       let allFiles: any = [];
  //       const uploadPromises = files.map(async (file: File) => {
  //
  //         form.append('file', file);
  //         form.append('upload_preset', 'firaslatrach');
  //

  //         const response = await fetch('https://api.cloudinary.com/v1_1/dm5d9jmf4/image/upload', {
  //           method: 'POST',
  //           body: form,
  //         });
  //         const data = await response.json();
  //

  //         if (response.ok) {
  //           allFiles.push(data);
  //
  //         } else {
  //           console.error(await response.json());
  //           toast.error('File(s) upload failed !');
  //         }
  //       });
  //
  //       await Promise.all(uploadPromises);

  //
  //       return allFiles;
  //     } catch (error) {
  //
  //       console.error(error);
  //     }
  //   };

  return (
    <div className=" rounded p-5 mx-12 mt-10 bg-5">
      <p className=" text-lg mb-5">
        <Image src="/bulletinsicon.svg" width={24} height={24} alt="pdf" /> Pièces jointes :
      </p>
      <div className="mt-4">
        {files.map((file: any, index: number) => (
          <div
            key={index}
            className="bg-8/50 px-4 py-2 rounded-md mb-2 flex justify-between items-center gap-4 text-2"
          >
            {file.name || file.original_filename}
            <button onClick={() => downloadFile(file.url, file.original_filename)}>
              {' '}
              <DownloadIcon />
            </button>
          </div>
        ))}
      </div>
      {/* <button onClick={downloadFile}>
        download
      </button> */}
    </div>
  );
}

export default FilesRenderer;
