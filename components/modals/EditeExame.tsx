// 'use client';
// import { Button } from '@/components/ui/button';
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import * as z from 'zod';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import Select from 'react-select';

// import Image from 'next/image';
// import {
//   Select as Select2,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { cn } from '@/lib/utils';
// import { use, useState } from 'react';
// import { useQuery, useQueryClient } from '@tanstack/react-query';
// import { useFormik } from 'formik';
// import {
//   createExamm,
//   getClasseOfUser,
//   getEstablishmentOfUser,
//   getMe,
//   getSubjectOfUser,
//   getTermOfUser,
//   updateExam,
// } from '@/actions/examens';
// import { Skeleton } from '../ui/skeleton';
// import { auth } from '@/auth';
// import { useCreateExam } from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/examens/hooks/useCreateExam';
// import { useEditExam } from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/examens/hooks/useEditeExam';
// interface AjouterUneClasse {
//   children: React.ReactNode;
//   exam: any;
// }
// interface Establishment {
//   id: number;
//   name: string;
// }

// interface EstablishmentData {
//   establishement: Establishment;
// }

// export const EditeExame = ({ children, exam }: AjouterUneClasse) => {
//   console.log(exam);
//   const queryClient = useQueryClient();
//   const user: any = queryClient.getQueryData(['user']);
//   const user_id = user?.id;

//   const userEstablishment = teacherEstab;
//   const subject = Teachersubject;
//   const term = Teacherterm;
//   const classe = TeacherClasse;

//   const userEstablishmentoptions = userEstablishment?.map((item:any) => {
//     return {
//       value: item?.establishement?.id,
//       label: item?.establishement?.name,
//     };
//   });
//   const subjectoptions = subject?.map((item) => {
//     return {
//       value: item.id,
//       label: item.name,
//     };
//   });
//   let classoption = classe
//     ?.map((item) => {
//       return item.classe.map((classItem) => ({
//         value: classItem.id,
//         label: classItem.name,
//       }));
//     })
//     .flat();

//   const examSchema = z.object({
//     establishment: z
//       .array(z.object({ value: z.number(), label: z.string() }))
//       .refine((value) => value.length > 0, {
//         message: 'Establishment is required',
//       }),
//     name: z.string().min(1, { message: 'Name is required' }),
//     term: z.string(),
//     classes: z
//       .array(z.object({ value: z.string(), label: z.string() }))
//       .refine((value) => value.length > 0, {
//         message: 'Classes is required',
//       }),

//     totalMarks: z.string().min(1, { message: 'Total Marks is required' }),
//     coefficient: z.string().min(1, { message: 'Coefficient is required' }),
//     style: z.string(),
//   });

//   const [clickedStyle, setClickedStyle] = useState('fr');
//   const [formData, setFormData] = useState({
//     establishment: exam?.examEstablishment
//       ? userEstablishmentoptions?.filter(
//           (option) => option.value === exam.examEstablishment[0]?.establishement_id
//         )
//       : [],
//     name: exam?.name || '',
//     term: exam?.term || '',
//     classes: exam?.ExamClassess
//       ? classoption?.filter((option) =>
//           exam.ExamClassess.some((item:any) => item.classe_id === option.value)
//         )
//       : [],
//     subject: exam?.subject_id
//       ? subjectoptions?.find((option) => option.value === exam.subject_id)
//       : '',
//     totalMarks: exam?.total_mark + '' || '',
//     coefficient: exam?.coefficient + '' || '',
//     style: 'fr',
//     user_id: '',
//   });
//   console.log(formData);

//   const [formErrors, setFormErrors] = useState<z.ZodError | null>(null);
//   const handleInputChange = (field: string, value: any) => {
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [field]: value,
//     }));
//   };
//   const { creatExam, isPending } = useCreateExam();
//   const { editExam, isPending : isPendingEdit } = useEditExam();

//   const handleSubmit = async () => {
//     try {
//       // Validate the form data
//       examSchema.parse(formData);
//       editExam({ exam_id: exam.id, data: formData, user_id });
//       // Clear form errors
//       // setFormErrors(null);
//     } catch (error: any) {
//       // If validation fails, update form errors
//       setFormErrors(error);
//     }
//   };
//   const renderFieldError = (fieldName: string) => {
//     if (formErrors) {
//       const fieldError = formErrors?.errors?.find((error) => error.path[0] === fieldName);

//       if (fieldError) {
//         return <div className="mt-1 text-sm text-red">{fieldError.message}</div>;
//       }
//     }

//     return null;
//   };
//   return (
//     <Dialog>
//       <DialogTrigger asChild>{children}</DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle className="text-[#1B8392] text-xl font-medium ">
//             Modifier votre examen
//           </DialogTitle>
//         </DialogHeader>

//         <div className="flex flex-col gap-6 placeholder:text-[#727272]">
//           <div className="flex flex-col gap-2">
//             <Label className="text-[#959595]">
//               établissement <span className="text-red">*</span>{' '}
//             </Label>
//             {isPendingTeacherEstab ? (
//               <Skeleton className="w-full h-[40px]" />
//             ) : (
//               <Select
//                 isMulti
//                 name="estab"
//                 defaultValue={
//                   exam?.examEstablishment
//                     ? userEstablishmentoptions?.filter(
//                         (option) => option.value === exam.examEstablishment[0]?.establishement_id
//                       )
//                     : undefined
//                 }
//                 options={userEstablishmentoptions}
//                 onChange={(selectedOptions: any) =>
//                   handleInputChange('establishment', selectedOptions)
//                 }
//                 placeholder="Sélectionner votre classe"
//                 styles={{
//                   option: (baseStyles, state) => ({
//                     ...baseStyles,
//                     fontSize: '14px',
//                     borderRadius: 12,
//                   }),
//                   control: (baseStyles, state) => ({
//                     ...baseStyles,
//                     border: '1/4px solid #727272',
//                     fontSize: '14px',
//                     outline: '#727272',
//                     minWidth: '220px',
//                   }),
//                 }}
//                 theme={(theme) => ({
//                   ...theme,
//                   borderRadius: 8,

//                   colors: {
//                     ...theme.colors,
//                     primary: 'none',
//                   },
//                 })}
//               />
//             )}
//             {renderFieldError('establishment')}
//           </div>
//           <div className="flex flex-col gap-2">
//             <Label className="text-[#959595]">
//               Nom de l’examen<span className="text-red">*</span>
//             </Label>
//             <Input
//               type="text"
//               name="name"
//               // defaultValue={exam?.name}
//               onChange={(e) => handleInputChange('name', e.target.value)}
//               value={formData.name}
//               placeholder="Entrer le nom de votre examen"
//               className="placeholder:text-[#727272] text-[#727272]"
//             />
//             {renderFieldError('name')}
//           </div>
//           <div className="flex flex-col gap-2">
//             <Label className="text-[#959595]">
//               Trimestre / Semestre <span className="text-red">*</span>
//             </Label>

//             {isPendingTeacherterm ? (
//               <Skeleton className="w-full h-[40px]" />
//             ) : (
//               <Select2 onValueChange={(value) => handleInputChange('term', value)}>
//                 <SelectTrigger className="w-full placeholder:text-[#727272] text-[#727272]">
//                   <SelectValue placeholder="Sélectionner la trimestre ou semestre" />
//                 </SelectTrigger>
//                 {term?.term === 'TRIMESTRE' ? (
//                   <SelectContent>
//                     <SelectItem
//                       value="trimestre_1"
//                       onClick={() => handleInputChange('term', 'trimestre_1')}
//                     >
//                       Trimestre 1
//                     </SelectItem>
//                     <SelectItem
//                       value="trimestre_2"
//                       onClick={() => handleInputChange('term', 'trimestre_2')}
//                     >
//                       Trimestre 2
//                     </SelectItem>
//                     <SelectItem
//                       value="trimestre_3"
//                       onClick={() => handleInputChange('term', 'trimestre_3')}
//                     >
//                       Trimestre 3
//                     </SelectItem>
//                   </SelectContent>
//                 ) : (
//                   <SelectContent>
//                     <SelectItem
//                       value="semestre_1"
//                       onClick={() => handleInputChange('term', 'semestre_1')}
//                     >
//                       Semestre 1
//                     </SelectItem>
//                     <SelectItem
//                       value="semestre_2"
//                       onClick={() => handleInputChange('term', 'semestre_2')}
//                     >
//                       Semestre 2
//                     </SelectItem>
//                   </SelectContent>
//                 )}
//               </Select2>
//             )}
//             {renderFieldError('term')}
//           </div>

//           <div className="flex items-center gap-2">
//             <div>
//               <Label className="text-[#959595]">
//                 Classe(s) <span className="text-red">*</span>
//               </Label>
//               {isPendingTeacherClasse ? (
//                 <Skeleton className="w-[220px] h-[40px]" />
//               ) : (
//                 <Select
//                   isMulti
//                   options={classoption?.filter((option) =>
//                     exam?.ExamClassess.some(
//                       (examClass: any) => examClass.classe_id === option.value
//                     )
//                   )}
//                   onChange={(selectedOptions) => handleInputChange('classes', selectedOptions)}
//                   defaultValue={classoption?.filter((option) =>
//                     exam?.ExamClassess.some(
//                       (examClass: any) => examClass.classe_id === option.value
//                     )
//                   )}
//                   placeholder="Sélectionner votre classe"
//                   styles={{
//                     option: (baseStyles, state) => ({
//                       ...baseStyles,
//                       fontSize: '14px',
//                       borderRadius: 12,
//                     }),
//                     control: (baseStyles, state) => ({
//                       ...baseStyles,
//                       border: '1/4px solid #727272',
//                       fontSize: '14px',
//                       outline: '#727272',
//                       minWidth: '220px',
//                     }),
//                   }}
//                   theme={(theme) => ({
//                     ...theme,
//                     borderRadius: 8,

//                     colors: {
//                       ...theme.colors,
//                       primary: 'none',
//                     },
//                   })}
//                 />
//               )}
//               {renderFieldError('classes')}
//             </div>
//             <div>
//               <Label className="text-[#959595]">
//                 Matière <span className="text-red">*</span>
//               </Label>
//               {isPendingSubject ? (
//                 <Skeleton className="w-[220px] h-[40px]" />
//               ) : (
//                 <Select
//                   isMulti={false}
//                   options={subjectoptions}
//                   placeholder="Sélectionner la matière"
//                   onChange={(selectedOption) => handleInputChange('subject', selectedOption)}
//                   defaultValue={subjectoptions?.find((option) => option.value === exam?.subject_id)}
//                   styles={{
//                     option: (baseStyles, state) => ({
//                       ...baseStyles,
//                       fontSize: '14px',
//                       borderRadius: 12,
//                     }),
//                     control: (baseStyles, state) => ({
//                       ...baseStyles,
//                       border: '1/4px solid #727272',
//                       fontSize: '14px',
//                       outline: '#727272',
//                       minWidth: '220px',
//                     }),
//                   }}
//                   theme={(theme) => ({
//                     ...theme,
//                     borderRadius: 8,

//                     colors: {
//                       ...theme.colors,
//                       primary: 'none',
//                     },
//                   })}
//                 />
//               )}
//               {renderFieldError('subject')}
//             </div>
//           </div>

//           <div className="flex items-center w-full gap-2">
//             <div className="w-[50%]">
//               <Label className="text-[#959595]">
//                 Note totale <span className="text-red">*</span>
//               </Label>
//               <Input
//                 type="number"
//                 onChange={(e) => handleInputChange('totalMarks', e.target.value)}
//                 value={formData.totalMarks}
//                 min={0}
//                 placeholder="Saisir la note totale"
//                 className="placeholder:text-[#727272]"
//               />
//               {renderFieldError('totalMarks')}
//             </div>
//             <div className="w-[50%]">
//               <Label className="text-[#959595]">
//                 coefficient <span className="text-red">*</span>
//               </Label>
//               <Input
//                 type="number"
//                 min={0}
//                 placeholder="Saisir le coefficient"
//                 onChange={(e) => handleInputChange('coefficient', e.target.value)}
//                 value={formData.coefficient}
//                 className="placeholder:text-[#727272]"
//               />
//               {renderFieldError('coefficient')}
//             </div>
//           </div>
//           <div>
//             <Label className="text-[#959595]">Style</Label>
//             <div className="flex gap-5">
//               <div
//                 className={cn(
//                   'flex items-center  justify-center  gap-9 p-3 border w-[50%]  rounded-xl cursor-pointer',
//                   formData.style === 'fr' && 'border-[#1B8392] text-[#1B8392] '
//                 )}
//                 onClick={() => handleInputChange('style', 'fr')}
//               >
//                 <Image
//                   src={formData.style === 'fr' ? '/examStyle.svg' : '/examStyleNoClicked.svg'}
//                   alt="examStyle"
//                   width={20}
//                   height={20}
//                 />
//                 <span>Français</span>
//               </div>
//               <div
//                 className={cn(
//                   'flex items-center  justify-center  gap-9 p-3 border w-[50%]  rounded-xl cursor-pointer',
//                   formData.style === 'ar' && 'border-[#1B8392] text-[#1B8392] '
//                 )}
//                 onClick={() => handleInputChange('style', 'ar')}
//               >
//                 <span>Arabe</span>
//                 <Image
//                   src={formData.style === 'ar' ? '/examStyle.svg' : '/examStyleNoClicked.svg'}
//                   alt="examStyle"
//                   width={20}
//                   height={20}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         <Button
//           type="submit"
//           className="w-full bg-[#1B8392] hover:opacity-80 mt-5 "
//           onClick={handleSubmit}
//         >
//           {' '}
//           Ajouter
//         </Button>
//       </DialogContent>
//     </Dialog>
//   );
// };

// function EditeExame() {
//   return (
//     <div>
//       edit
//     </div>
//   )
// }

// export default EditeExame
'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Select from 'react-select';

import Image from 'next/image';
import {
  Select as Select2,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { use, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createExamm,
  getClasseOfUser,
  getEstablishmentOfUser,
  getMe,
  getSubjectOfUser,
  getTermOfUser,
} from '@/actions/examens';
import { Skeleton } from '../ui/skeleton';
import { useCreateExam } from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/examens/hooks/useCreateExam';
import { SubjectOutputProps } from '@/types/subjects/subjectTypes';
import { useEditExam } from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/examens/hooks/useEditeExam';
interface AjouterUneClasse {
  children: React.ReactNode;
  exam: any;
}
interface Establishment {
  id: number;
  name: string;
}

interface EstablishmentData {
  establishement: Establishment;
}

export const EditeExame = ({ children, exam }: AjouterUneClasse) => {
  console.log(exam.term);
  console.log(exam.term.indexOf('trimestre'));
  const queryClient = useQueryClient();
  const user: any = queryClient.getQueryData(['user']);
  const teacherEstab: any = queryClient.getQueryData(['teacherEstab']);

  const user_id = user?.id;

  const userEstablishment = teacherEstab;

  const userEstablishmentoptions = userEstablishment?.map((item: any) => {
    return {
      value: item?.id,
      label: item?.name,
    };
  });

  const exam_Establishment = exam.exam_classess[0].establishment[0];
  const defaultEstablishment = userEstablishmentoptions?.find(
    (item: any) => item.value === exam_Establishment.id
  );

  // console.log(defaultEstablishment);

  const examSchema = z.object({
    establishment: z
      .array(z.object({ value: z.number(), label: z.string() }))
      .refine((value) => value.length > 0, {
        message: 'Establishment is required',
      }),
    name: z.string().min(1, { message: 'Name is required' }),
    term: z.string().min(1, { message: 'Term is required' }),
    classes: z
      .array(
        z.object({
          value: z.number(),
          label: z.string(),
        })
      )
      .refine((data) => data.length >= 1, {
        message: "L'classes est requis",
      }),
    subject: z
      .array(
        z.object({
          value: z.number(),
          label: z.string(),
        })
      )
      .refine((value) => value.length >= 0, {
        message: 'Matière is required',
      }),
    totalMarks: z.string().min(1, { message: 'Total Marks is required' }),
    coefficient: z.string().min(1, { message: 'Coefficient is required' }),
    style: z.string(),
  });

  const [clickedStyle, setClickedStyle] = useState('fr');
  const [formData, setFormData] = useState({
    establishment: [defaultEstablishment],
    name: exam?.name,
    term: exam?.term,
    classes: [],
    subject: '',
    totalMarks: exam?.total_mark + '',
    coefficient: exam.coefficient + '',
    style: 'fr',
    user_id: '',
  });
  console.log(formData);
  const [formErrors, setFormErrors] = useState<z.ZodError | null>(null);
  const handleInputChange = (field: string, value: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };
  const { data: TeacherClasse, isPending: isPendingTeacherClasse } = useQuery({
    queryKey: ['teacherClasse', formData?.establishment],
    queryFn: async () => await getClasseOfUser(user_id, formData?.establishment),
  });
  console.log(TeacherClasse);

  const { data: Teachersubject, isPending: isPendingSubject } = useQuery({
    queryKey: ['teachersubject', formData?.classes],
    queryFn: async () => await getSubjectOfUser(user_id, formData?.classes),
  });
  const { data: Teacherterm, isPending: isPendingTeacherterm } = useQuery({
    queryKey: ['teacherTerm'],
    queryFn: async () => await getTermOfUser(user_id),
  });
  const subject = Teachersubject;
  const term = Teacherterm;
  const classe = TeacherClasse;

  const subjectoptions = subject?.map((item: SubjectOutputProps) => {
    return {
      value: item.id,
      label: item.name,
    };
  });
  const currentSubjects = exam.subject_id;
  console.log(currentSubjects);
  console.log(subjectoptions);
  const currentSubject = subjectoptions?.filter((item: any) => {
    return item?.value === currentSubjects;
  });
  useEffect(() => {
    handleInputChange('subject', currentSubject);
  }, [Teachersubject]);

  const classoption = classe?.map((item: any) => ({
    value: item.id,
    label: item.name,
  }));
  const currentClasse = exam.exam_classess[0];
  // console.log(defaultClasse);
  let defaultClasse = classoption?.find((item: any) => {
    return item?.value === currentClasse?.id;
  }) as any;
  defaultClasse = [defaultClasse];
  console.log(defaultClasse);
  useEffect(() => {
    handleInputChange('classes', defaultClasse);
  }, [TeacherClasse]);
  console.log(defaultClasse);
  console.log(formData);
  const { creatExam, isPending } = useCreateExam();
  const verfierSchema = () => {
    let ok = false;
    try {
      examSchema.parse(formData);
      ok = true;
    } catch (error) {}
    return ok;
  };
  const { editExam, isPending: isPendingEdit } = useEditExam();

  const handleSubmit = async () => {
    try {
      // Validate the form data
      examSchema.parse(formData);
      editExam({ exam_id: exam.id, data: formData, user_id });
      // Clear form errors
      // setFormErrors(null);
    } catch (error: any) {
      // If validation fails, update form errors
      setFormErrors(error);
    }
  };
  const renderFieldError = (fieldName: string) => {
    if (formErrors) {
      const fieldError = formErrors?.errors?.find((error) => error.path[0] === fieldName);

      if (fieldError) {
        return <div className="mt-1 text-sm text-red">{fieldError.message}</div>;
      }
    }

    return null;
  };
  // const handleEstablishmentChange = (selectedOptions: any) => {
  //   handleInputChange('establishment', selectedOptions);
  //   // const { data: TeacherClasse, isPending: isPendingTeacherClasse } = useQuery({
  //   //   queryKey: ['teacherClasse'],
  //   //   queryFn: async () => await getClasseOfUser(user_id, formData.establishment),
  //   // });
  //   console.log(formData.establishment);
  //   // queryClient.invalidateQueries({ queryKey: ['teacherClasse'] });
  // };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-[#1B8392] text-xl font-medium ">
            Modifier votre examen
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-6 placeholder:text-[#727272]">
          <div className="flex flex-col gap-2">
            <Label className="text-[#959595]">
              établissement <span className="text-red">*</span>{' '}
            </Label>

            <Select
              isMulti
              name="estab"
              options={userEstablishmentoptions}
              defaultValue={formData.establishment}
              onChange={(selectedOptions) => handleInputChange('establishment', selectedOptions)}
              placeholder="Sélectionner votre classe"
              styles={{
                option: (baseStyles, state) => ({
                  ...baseStyles,
                  fontSize: '14px',
                  borderRadius: 12,
                }),
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  border: '1/4px solid #727272',
                  fontSize: '14px',
                  outline: '#727272',
                  minWidth: '220px',
                }),
              }}
              theme={(theme) => ({
                ...theme,
                borderRadius: 8,

                colors: {
                  ...theme.colors,
                  primary: 'none',
                },
              })}
            />
            {renderFieldError('establishment')}
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-[#959595]">
              Nom de l’examen<span className="text-red">*</span>
            </Label>
            <Input
              type="text"
              name="name"
              onChange={(e) => handleInputChange('name', e.target.value)}
              value={formData?.name}
              placeholder="Entrer le nom de votre examen"
              className="placeholder:text-[#727272]"
            />
            {renderFieldError('name')}
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-[#959595]">
              Trimestre / Semestre <span className="text-red">*</span>
            </Label>

            {exam.term.indexOf('trimestre') == -1 ? (
              <Skeleton className="w-full h-[40px]" />
            ) : (
              <Select2
                onValueChange={(value) => handleInputChange('term', value)}
                defaultValue={formData.term}
              >
                <SelectTrigger className="w-full placeholder:text-[#727272] text-[#727272]">
                  <SelectValue placeholder="Sélectionner la trimestre ou semestre" />
                </SelectTrigger>
                {term?.term === 'TRIMESTRE' ? (
                  <SelectContent>
                    <SelectItem
                      value="trimestre_1"
                      onClick={() => handleInputChange('term', 'trimestre_1')}
                    >
                      Trimestre 1
                    </SelectItem>
                    <SelectItem
                      value="trimestre_2"
                      onClick={() => handleInputChange('term', 'trimestre_2')}
                    >
                      Trimestre 2
                    </SelectItem>
                    <SelectItem
                      value="trimestre_3"
                      onClick={() => handleInputChange('term', 'trimestre_3')}
                    >
                      Trimestre 3
                    </SelectItem>
                  </SelectContent>
                ) : (
                  <SelectContent>
                    <SelectItem
                      value="semestre_1"
                      onClick={() => handleInputChange('term', 'semestre_1')}
                    >
                      Semestre 1
                    </SelectItem>
                    <SelectItem
                      value="semestre_2"
                      onClick={() => handleInputChange('term', 'semestre_2')}
                    >
                      Semestre 2
                    </SelectItem>
                  </SelectContent>
                )}
              </Select2>
            )}
            {renderFieldError('term')}
          </div>

          <div className="flex items-center gap-2">
            <div>
              <Label className="text-[#959595]">
                Classe(s) <span className="text-red">*</span>
              </Label>
              {isPendingTeacherClasse ? (
                <Skeleton className="w-[220px] h-[40px]" />
              ) : (
                <Select
                  isMulti
                  options={classoption}
                  isDisabled={formData?.establishment?.length == 0}
                  onChange={(selectedOptions) => handleInputChange('classes', selectedOptions)}
                  defaultValue={defaultClasse}
                  placeholder="Sélectionner votre classe"
                  styles={{
                    option: (baseStyles, state) => ({
                      ...baseStyles,
                      fontSize: '14px',
                      borderRadius: 12,
                    }),
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      border: '1/4px solid #727272',
                      fontSize: '14px',
                      outline: '#727272',
                      minWidth: '220px',
                    }),
                  }}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 8,

                    colors: {
                      ...theme.colors,
                      primary: 'none',
                    },
                  })}
                />
              )}
              {renderFieldError('classes')}
            </div>
            <div>
              <Label className="text-[#959595]">
                Matière <span className="text-red">*</span>
              </Label>
              {isPendingSubject ? (
                <Skeleton className="w-[220px] h-[40px]" />
              ) : (
                <Select
                  isMulti={false}
                  options={subjectoptions}
                  isDisabled={formData?.classes?.length == 0}
                  placeholder="Sélectionner la matière"
                  defaultValue={formData?.subject}
                  onChange={(selectedOption) => handleInputChange('subject', [selectedOption])}
                  styles={{
                    option: (baseStyles, state) => ({
                      ...baseStyles,
                      fontSize: '14px',
                      borderRadius: 12,
                    }),
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      border: '1/4px solid #727272',
                      fontSize: '14px',
                      outline: '#727272',
                      minWidth: '220px',
                    }),
                  }}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 8,

                    colors: {
                      ...theme.colors,
                      primary: 'none',
                    },
                  })}
                />
              )}
              {renderFieldError('subject')}
            </div>
          </div>

          <div className="flex items-center w-full gap-2">
            <div className="w-[50%]">
              <Label className="text-[#959595]">
                Note totale <span className="text-red">*</span>
              </Label>
              <Input
                type="number"
                onChange={(e) => handleInputChange('totalMarks', e.target.value)}
                value={formData?.totalMarks}
                min={0}
                placeholder="Saisir la note totale"
                className="placeholder:text-[#727272]"
              />
              {renderFieldError('totalMarks')}
            </div>
            <div className="w-[50%]">
              <Label className="text-[#959595]">
                coefficient <span className="text-red">*</span>
              </Label>
              <Input
                type="number"
                min={0}
                placeholder="Saisir le coefficient"
                onChange={(e) => handleInputChange('coefficient', e.target.value)}
                value={formData?.coefficient}
                className="placeholder:text-[#727272]"
              />
              {renderFieldError('coefficient')}
            </div>
          </div>
          <div>
            <Label className="text-[#959595]">Style</Label>
            <div className="flex gap-5">
              <div
                className={cn(
                  'flex items-center  justify-center  gap-9 p-3 border w-[50%]  rounded-xl cursor-pointer',
                  formData.style === 'fr' && 'border-[#1B8392] text-[#1B8392] '
                )}
                onClick={() => handleInputChange('style', 'fr')}
              >
                <Image
                  src={formData.style === 'fr' ? '/examStyle.svg' : '/examStyleNoClicked.svg'}
                  alt="examStyle"
                  width={20}
                  height={20}
                />
                <span>Français</span>
              </div>
              <div
                className={cn(
                  'flex items-center  justify-center  gap-9 p-3 border w-[50%]  rounded-xl cursor-pointer',
                  formData?.style === 'ar' && 'border-[#1B8392] text-[#1B8392] '
                )}
                onClick={() => handleInputChange('style', 'ar')}
              >
                <span>Arabe</span>
                <Image
                  src={formData?.style === 'ar' ? '/examStyle.svg' : '/examStyleNoClicked.svg'}
                  alt="examStyle"
                  width={20}
                  height={20}
                />
              </div>
            </div>
          </div>
        </div>

        {verfierSchema() ? (
          <DialogClose>
            <Button
              type="submit"
              className="w-full bg-[#1B8392] hover:opacity-80 mt-5 "
              onClick={handleSubmit}
            >
              {' '}
              Enregistrer
            </Button>
          </DialogClose>
        ) : (
          <Button
            type="submit"
            disabled={true}
            className="w-full bg-[#1B8392] hover:opacity-80 mt-5 "
            onClick={handleSubmit}
          >
            {' '}
            Enregistrer
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
};
