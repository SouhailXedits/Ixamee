'use client';
import { getExamAttachements } from '@/actions/examens';
import { useUpdateExamAttachements } from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/examens/hooks/useUpdateExamAttachements';
import { Upload, UploadListItemProps } from '@progress/kendo-react-upload';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { DialogTrigger, Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { DownloadIcon, PlusIcon, X } from 'lucide-react';

// const CustomListItemUI = (props: UploadListItemProps) => {
//   return (
//     <ul>
//       {props.files.map((file:any) => (
//         <li key={file.name}>{file.name}</li>
//       ))}
//     </ul>
//   );
// };
function FilesUploader({ editable = true }: { editable?: boolean }) {
  const { updateExamAttachements, isPending } = useUpdateExamAttachements();
  const [files, setFiles] = useState<any>([]);
  const [allFiles, setAllFiles] = useState<any>([]);
  const params = useParams();
  const { examenId } = params;
  const { correction_id } = params;
  console.log(correction_id);
  const {
    data: attachements,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['examenAttachements', examenId],
    queryFn: () => getExamAttachements({ exam_id: +examenId || +correction_id }),
  });
  console.log(attachements?.attachements, 'attachements');
  const attachementsData = attachements?.attachements as any;
  // attachementsData?.map((item: any) => {
  //   console.log(item);
  // })
  const handleFileChange = (event: any) => {
    const fileList = Array.from(event.target.files);
    console.log(fileList);
    setFiles(fileList);
  };

  useEffect(() => {
    if (attachementsData?.length > 0) {
      // setFiles(attachementsData);
      setAllFiles(attachementsData);
    }
  }, [attachementsData]);
  useEffect(() => {
    console.log(files, 'files');
    if (files.length > 0) handleSubmit();
  }, [files]);
  useEffect(() => {
    console.log(files, 'files');
    const handleUpdate = async () => {
      updateExamAttachements({
        exam_id: +examenId,
        attachements: allFiles,
      });
    };
    if (allFiles !== attachementsData && allFiles.length !==0) {
      handleUpdate();
    }
  }, [allFiles, attachementsData]);

  const handleSubmit = async () => {
    console.log(files, 'files');
    const data = await handleUpload(files);
    console.log(data);
    if (!data) return;
    const newFiles = data.map((file: any) => {
      return { original_filename: file.original_filename, url: file.url };
    });

    console.log(newFiles, 'newFiles');
    console.log(allFiles, 'newFiles');
    setAllFiles((prevAllFiles: any) => [...prevAllFiles, ...newFiles]);
    console.log(allFiles);
  };

  const handleUpload = async (files: any) => {
    console.log(files);
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

  const downloadFile = async (url: string, name: string) => {
    try {
      const cloudinaryUrl = url;
      const response = await fetch(cloudinaryUrl);
      const blob = await response.blob();

      // Generate a filename based on the public_id or a unique identifier
      // const filename = cloudinaryUrl.substring(cloudinaryUrl.lastIndexOf('/') + 1); // Extract filename from URL

      const a = document.createElement('a');
      a.href = window.URL.createObjectURL(blob);
      a.download = name || 'file';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (index: number) => {
    setAllFiles((prevAllFiles: any) => {
      const newFiles = [...prevAllFiles];
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  return (
    <div>
      {allFiles.length === 0 && editable ? (
        <Button className=" bg-transparent text-2 border border-2 rounded-md p-0">
          {/* <button className=" border-none bg-2/30 rounded ">
                  <PlusIcon />
                </button> */}
          <label
            htmlFor="file-input"
            className=" rounded-md cursor-pointer flex justify-center items-center p-2"
          >
            <Image src="/attachement-icon.svg" alt="icons" width={20} height={20} />
            <span className="pl-2 pr-2 text-sm font-semibold leading-tight text-center ">
              {allFiles.length === 0
                ? 'Ajouter une pièce jointe'
                : `${allFiles.length} pièces jointes`}
            </span>
          </label>
          <input
            type="file"
            id="file-input"
            className="hidden"
            onChange={handleFileChange}
            multiple
            accept=" .pdf, .docx, .doc, .ppt, .pptx"
            // placeholder='azaf'
          />
        </Button>
      ) : (
        <Dialog>
          <DialogTrigger>
            {allFiles.length > 0 && (
              <Button className=" bg-transparent text-2 border border-2 rounded-md">
                <Image src="/attachement-icon.svg" alt="icons" width={20} height={20} />
                <span className="pl-2 pr-2 text-sm font-semibold leading-tight text-center ">
                  {`${allFiles.length} pièces jointes`}
                </span>
                {/* <button className=" border-none bg-2/30 rounded ">
                  <PlusIcon />
                </button> */}
                {editable && (
                  <>
                    <label htmlFor="file-input" className="bg-2/30 rounded-md cursor-pointer">
                      <PlusIcon />
                    </label>
                    <input
                      type="file"
                      id="file-input"
                      className="hidden"
                      onChange={handleFileChange}
                      multiple
                      accept=" .pdf, .docx, .doc, .ppt, .pptx"
                      // placeholder='azaf'
                    />
                  </>
                )}
              </Button>
            )}
          </DialogTrigger>
          <DialogContent>
            <div className=" rounded">
              <p className=" text-lg mb-5">
                Pièces jointes :
                {/* <Image src="/bulletinsicon.svg" width={24} height={24} alt="pdf" /> Pièces jointes : */}
              </p>

              <div className="mt-4">
                {allFiles.map((file: any, index: number) => (
                  <div
                    key={index}
                    className="bg-8/50 px-4 py-2 rounded-md mb-2 flex items-center gap-2 text-2 justify-between"
                  >
                    <div className=" flex items-center gap-4 ">
                      <p className=" underline">{file.name || file.original_filename}</p>
                      <button
                        onClick={() => downloadFile(file.url, file.original_filename)}
                        className=" text-sm"
                      >
                        <DownloadIcon size={20} />
                      </button>
                    </div>
                    {editable && (
                      <button onClick={() => handleDelete(index)}>
                        <X color="red" size={20} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {/* <button
        className="bg-2 rounded-md px-4 py-2 mt-4 cursor-pointer text-white hover:bg-2/80"
        onClick={handleSubmit}
      >
        Upload
      </button> */}
              {/* <button onClick={downloadFile}>
        download
      </button> */}
            </div>
            {/* <FilesUploader /> */}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default FilesUploader;
