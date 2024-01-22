'use client';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select as CustomSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/selectModifierStudent';
import { TunisianGoverments } from '@/public/auth/data/TunisianGoverments';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { getAllEstabs } from '@/actions/establishements';
import Select from 'react-select';
import { getAllSubjects } from '@/actions/subjects';
export default async function InfoCard({ user, userEstablishment, teachersubject }: any) {
  const [noChange, setNoChange] = useState(true);
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [phoneNumber, setPhoneNumber] = useState(user?.phone_number);
  const [government, setGovernment] = useState(user?.government);

  const [defaultEstablishments, setDefaultEstablishments] = useState(userEstablishment);
  const [defaultTeacherSubjects, setDefaultTeacherSubjects] = useState(teachersubject);
  const govOptions = TunisianGoverments;

  const {
    data: establishments,
    error: getEstabsError,
    isPending: estabPending,
  } = useQuery<any>({
    queryKey: ['establishments'],
    queryFn: async () => await getAllEstabs(),
  });
  const estabOptions =
    (establishments?.data &&
      establishments?.data?.estabs.map((estab: any) => {
        return { id: estab.id, value: estab.name, label: estab.name };
      })) ||
    [];

  const {
    data: subjects,
    error: getSubError,
    isPending: subPending,
  } = useQuery<any>({
    queryKey: ['subjects'],
    queryFn: async () => await getAllSubjects(),
  });

  const subjectOptions =
    (subjects?.data &&
      subjects?.data.map((subject: any) => {
        return { id: subject.id, value: subject.name, label: subject.name };
      })) ||
    [];

  return (
    <div className="w-[50%]  p-5 flex flex-col gap-4  rounded-xl shadow-lg max-xl:w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          {user?.image ? (
            <Image
              src={user?.image}
              alt="uplodImage"
              width={100}
              height={100}
              className="rounded-full cursor-pointer"
            />
          ) : (
            <Image
              src={'/uplodImage.svg'}
              alt="uplodImage"
              width={100}
              height={100}
              className="cursor-pointer"
            />
          )}

          <div className="flex flex-col gap-3">
            <span className="text-[#727272]">Ajouter une photo de profil</span>
            <span className="text-[#F04438]">Taille maximale est de 2 Mo</span>
          </div>
        </div>
        <div>
          <Image
            src={'/editeIcon.svg'}
            alt="editeIcon"
            width={20}
            height={20}
            className="cursor-pointer"
          />
        </div>
      </div>
      <div className="text-[#1B8392] text-lg">Informations personnelles</div>
      <div className="flex justify-between p-1 rounded-lg border-l-[4px] border-[#99C6D3] items-center ">
        <div>
          <span className="text-[#727272] pl-3">Nom et prénom</span>
          <Input
            defaultValue={name}
            className="border-none w-full placeholder:text-[#727272] text-[#727272]"
          />
        </div>
        <div>
          <Image
            src={'/editeIcon.svg'}
            alt="editeIcon"
            width={20}
            height={20}
            className="cursor-pointer"
          />
        </div>
      </div>
      <div className="flex justify-between p-1 rounded-lg border-l-[4px] border-[#99C6D3] items-center ">
        <div>
          <span className="text-[#727272] pl-3">E-mail</span>
          <Input
            defaultValue={email}
            className="border-none w-[400px] placeholder:text-[#727272] text-[#727272]"
          />
        </div>
        <div>
          <Image
            src={'/editeIcon.svg'}
            alt="editeIcon"
            width={20}
            height={20}
            className="cursor-pointer"
          />
        </div>
      </div>
      <div className="flex justify-between p-1 rounded-lg border-l-[4px] border-[#99C6D3] items-center ">
        <div>
          <span className="text-[#727272] pl-3">Numéro de téléphone</span>
          <Input
            defaultValue={phoneNumber}
            className="border-none w-[400px] placeholder:text-[#727272] text-[#727272]"
          />
        </div>
        <div>
          <Image
            src={'/editeIcon.svg'}
            alt="editeIcon"
            width={20}
            height={20}
            className="cursor-pointer"
          />
        </div>
      </div>

      <div className="flex justify-between p-1 rounded-lg border-l-[4px] border-[#99C6D3] items-center ">
        <div className="w-[110%]">
          <span className="text-[#727272] pl-3">Gouvernorat</span>
          <CustomSelect>
            <SelectTrigger className="w-[102%] border-none text-[#727272]">
              <SelectValue defaultValue={government} placeholder={government} />
            </SelectTrigger>
            <SelectContent>
              {govOptions.map((gov: any) => (
                <SelectItem defaultValue={government} value={gov.id}>
                  {gov.label}
                </SelectItem>
              ))}
            </SelectContent>
          </CustomSelect>
        </div>
      </div>
      <div className="flex justify-between p-1 rounded-lg border-l-[4px] border-[#99C6D3] items-center ">
        <div className="w-[110%]">
          <span className="text-[#727272] pl-3">Établissement</span>
          <Select
            isMulti
            name="estab"
            options={estabOptions}
            placeholder={
              defaultEstablishments && defaultEstablishments.map((estab: any) => estab?.name)
            }
            isSearchable={true}
            styles={{
              control: (provided, state) => ({
                ...provided,
                borderColor: 'transparent',
                '&:hover': {
                  borderColor: 'transparent',
                },
                width: '101.5%',
              }),
              option: (provided, state) => ({
                ...provided,
                fontSize: '14px',
                backgroundColor: state.isFocused ? '#F0F6F8' : 'transparent',
                '&:hover': {
                  backgroundColor: '#F0F6F8',
                },
              }),
              multiValue: (provided, state) => ({
                ...provided,
                backgroundColor: '#F0F6F8',
              }),
              dropdownIndicator: (provided, state) => ({
                ...provided,
                color: '#1B8392',
              }),
              clearIndicator: (provided, state) => ({
                ...provided,
                color: '#1B8392',
              }),
              indicatorSeparator: (provided, state) => ({
                ...provided,
                display: 'none',
              }),
              placeholder: (provided, state) => ({
                ...provided,
                color: '#727272',
              }),
            }}
            //   value={estabOptions.filter((option: any) =>
            //     field.value.some((selectedOption) => selectedOption.id === option.id)
            //   )}
            //   onChange={(selectedOptions) => field.onChange(selectedOptions)}
          />
        </div>
      </div>
      <div className="flex justify-between p-1 rounded-lg border-l-[4px] border-[#99C6D3] items-center ">
        <div className="w-[110%]">
          <span className="text-[#727272] pl-3">Matière</span>
          <Select
            isMulti
            name="estab"
            options={subjectOptions}
            placeholder={
              defaultTeacherSubjects && defaultTeacherSubjects.map((subject: any) => subject?.name)
            }
            isSearchable={true}
            styles={{
              control: (provided, state) => ({
                ...provided,
                borderColor: 'transparent',
                '&:hover': {
                  borderColor: 'transparent',
                },
                width: '101.5%',
              }),
              option: (provided, state) => ({
                ...provided,
                fontSize: '14px',
                backgroundColor: state.isFocused ? '#F0F6F8' : 'transparent',
                '&:hover': {
                  backgroundColor: '#F0F6F8',
                },
                width: '101.5%',
              }),
              multiValue: (provided, state) => ({
                ...provided,
                backgroundColor: '#F0F6F8',
              }),
              dropdownIndicator: (provided, state) => ({
                ...provided,
                color: '#1B8392',
              }),
              clearIndicator: (provided, state) => ({
                ...provided,
                color: '#1B8392',
              }),
              indicatorSeparator: (provided, state) => ({
                ...provided,
                display: 'none',
              }),
              placeholder: (provided, state) => ({
                ...provided,
                color: '#727272',
              }),
            }}
            //   value={estabOptions.filter((option: any) =>
            //     field.value.some((selectedOption) => selectedOption.id === option.id)
            //   )}
            //   onChange={(selectedOptions) => field.onChange(selectedOptions)}
          />
        </div>
      </div>
      <div className="flex justify-end w-full cursor-pointer ">
        <div
          className={`${
            noChange ? 'bg-[#99c6d3]' : 'bg-[#1B8392]'
          }  text-white  w-[110px] flex items-end justify-end p-3 rounded-lg `}
        >
          Enregistrer
        </div>
      </div>
    </div>
  );
}
