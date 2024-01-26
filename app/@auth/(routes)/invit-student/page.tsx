'use client';
import React, { Suspense, useCallback, useEffect, useState } from 'react';
import Logo from '../../../../components/modals/Logo';
import Image from 'next/image';
import InvitForm from '../../_components/invit-form';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import AuthErrorPage from '../error/page';
import { verifInvitation } from '@/actions/auth/invitation';
import { getAllSubjectsByUserId } from '@/actions/subjects';
import { getClassesOfUser } from '@/data/user';
import Loading from '@/app/loading';
import { useQuery } from '@tanstack/react-query';

export default function Page() {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<any>({});
  const [classe, setClasse] = useState<any>([]);
  const [subjects, setSubjects] = useState([]);
  const [student, setStudent] = useState<any>({});
  const [teacher, setTeacher] = useState<any>({});

  const searchParams = useSearchParams();
  const token = searchParams.get('token') as string;

  const onSubmit = useCallback(async () => {
    if (!token) {
      return <AuthErrorPage />;
    }

    try {
      const data = await verifInvitation(token);
      setError(data?.error);
      setSuccess(data?.success);
      const existingStudent = data.success?.existingStudent as any;
      const existingTeacher = data.success?.existingTeacher as any;
      const userClasse = data.success?.userClasse as any;
      const usersubjects = data.success?.usersubjects as any;
      setStudent(existingStudent);
      setTeacher(existingTeacher);
      setClasse(userClasse);
      setSubjects(usersubjects);
    } catch (error) {
      console.error('🚀 ~ verifInvitation ~ error:', error);
    }
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  if (error) {
    return <AuthErrorPage />;
  }
  if (Object.keys(success).length === 0) {
    return <Loading />;
  }

  return (
    <div id="SignUpRoot" className="bg-[#f0f6f8] flex flex-col md:flex-row w-full">
      {/* Left section */}
      <div className="bg-white w-full flex flex-col justify-center h-[100vh] items-center md:rounded-br-[100px] md:rounded-tr-[100px] gap-10">
        <div className="text-center text-2 text-4xl max-lg:text-3xl">Bienvenue à Ixamee</div>
        <div className="flex flex-col items-start w-3/5 text-2 text-xl gap-5">
          Créons votre compte
        </div>
        <div className="w-full bg-[#F0F6F8]">
          <div className="w-3/5 ml-[14rem]">
            <p className="text-sm mt-2 text-[#727272]"> Vous avez été invité par:</p>
            <div className="flex gap-10 items-center py-5">
              <Image
                alt="picture Student"
                src={teacher?.image || '/studenttestpicture.svg'}
                width={75}
                height={75}
                className="rounded-full object-fill"
              />
              <div>
                <ul className="flex flex-col gap-3">
                  <li>{teacher?.name}</li>
                  <li className="text-gray">
                    classe:
                    <span className="text-[#727272] font-extralight">
                      {classe.length && classe.map((classe: any) => classe?.name)}
                    </span>
                  </li>
                  <li className="text-gray">
                    Matière(s):&nbsp;
                    <span className="text-[#727272] font-extralight">
                      {subjects.length &&
                        subjects?.map((subject: any, index: number) => (
                          <span key={index}>
                            {subject.name}
                            {index < subjects.length - 1 && ' / '}
                          </span>
                        ))}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start w-3/5 gap-2">
          <p className="font-medium text-[#727272]">L&apos;adresse e-mail de votre compte est</p>
          <p>{student?.email}</p>

          <InvitForm email={student?.email} />
          <div className="flex w-full justify-center">
            <p className="text-center text-[#727272] max-md:text-sm max-sm:text-xs ">
              Vous avez déjà un compte?{' '}
            </p>
            &nbsp;
            <Link
              className="text-center text-mainGreen hover:underline text-base font-semibold max-md:text-sm max-sm:text-xs "
              href={'/login'}
            >
              Se connecter
            </Link>
          </div>
        </div>
      </div>
      {/* Right section */}
      <div className="hidden flex-col justify-center items-center gap-8 lg:flex md:w-[70%]">
        <Logo className={'max-xl:w-[50%]'} width={300} height={200} />
        <div className="text-center text-[#4c4c4d] w-full text-4xl max-lg:text-2xl mt-[5%]">
          Une seule plateforme
          <br />
          pour tous vos <span className="text-2 hover:opacity-50 ">examens</span>
        </div>
      </div>
    </div>
  );
}
