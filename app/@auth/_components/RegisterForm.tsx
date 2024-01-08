'use client';

import ProfForm from './ProfForm';
import EtudiantForm from './EtudiantForm';
import { useState } from 'react';
export default function RegisterForm() {
  const [role, setRole] = useState<string>('professeur');
  const handleRole = (role:string) => {
    setRole(role);
  };

  // return (
  //   <Form {...form}>
  //     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
  //       <FormError message={error} />
  //       <FormSuccess message={success} />

  //       <div
  //         id="ButtonsRoot"
  //         className="bg-[#99c6d3] flex flex-row gap-4 w-full cursor-pointer font-['Poppins'] items-start pt-2 px-1 rounded-[50px]"
  //       >
  //         <div
  //           id="Buttons"
  //           className={`text-center text-xl font-semibold capitalize text-white flex flex-row mb-2 w-1/2 h-12 items-start justify-center pt-2 px-4 rounded-[50px] ${
  //             role === 'professeur' ? 'bg-[#1b8392] ' : ''
  //           }`}
  //           onClick={() => {
  //             setRole('professeur');
  //           }}
  //         >
  //           Professeur
  //         </div>
  //         <div
  //           id="Buttons1"
  //           className={`text-center text-xl font-semibold capitalize text-white flex flex-row mt-px w-1/2 h-12 items-start justify-center pt-2 px-4 rounded-[50px] ${
  //             role === 'etudiant' ? 'bg-[#1b8392] ' : ''
  //           }`}
  //           onClick={() => {
  //             setRole('etudiant');
  //           }}
  //         >
  //           Étudiant
  //         </div>
  //       </div>

  //       <div className="w-full flex flex-row gap-4">
  //         <FormField
  //           control={form.control}
  //           name="nom"
  //           render={({ field }) => (
  //             <FormItem>
  //               <FormLabel>
  //                 Nom <span className="text-red"> *</span>
  //               </FormLabel>
  //               <FormControl>
  //                 <Input
  //                   {...field}
  //                   placeholder="Entrez votre nom"
  //                   type="text"
  //                   icon={<LucidePencil className="text-gray w-5 h-5" />}
  //                   disabled={isPending}
  //                   className="flex-1"
  //                 />
  //               </FormControl>
  //               <FormMessage />
  //             </FormItem>
  //           )}
  //         />
  //         <FormField
  //           control={form.control}
  //           name="prenom"
  //           render={({ field }) => (
  //             <FormItem>
  //               <FormLabel>
  //                 Prenom<span className="text-red"> *</span>
  //               </FormLabel>
  //               <FormControl className="relative">
  //                 <Input
  //                   {...field}
  //                   type="text"
  //                   placeholder="Entrez votre prénom"
  //                   icon={<LucidePencil className="text-gray w-5 h-5" />}
  //                   disabled={isPending}
  //                   className="flex-1"
  //                 />
  //               </FormControl>
  //               <FormMessage />
  //             </FormItem>
  //           )}
  //         />
  //       </div>
  //       <div className="w-full flex flex-row gap-4">
  //         <FormField
  //           control={form.control}
  //           name="email"
  //           render={({ field }) => (
  //             <FormItem>
  //               <FormLabel>
  //                 E-mail<span className="text-red"> *</span>
  //               </FormLabel>
  //               <FormControl>
  //                 <Input
  //                   {...field}
  //                   placeholder="Entrez votre e-mail"
  //                   type="email"
  //                   icon={<MdOutlineEmail className="text-gray w-5 h-5" />}
  //                   disabled={isPending}
  //                   className="flex-1"
  //                 />
  //               </FormControl>
  //               <FormMessage />
  //             </FormItem>
  //           )}
  //         />
  //         <FormField
  //           control={form.control}
  //           name="phone"
  //           render={({ field }) => (
  //             <FormItem>
  //               <FormLabel className="whitespace-nowrap	">
  //                 Numéro de téléphone<span className="text-red"> *</span>
  //               </FormLabel>
  //               <FormControl className="relative">
  //                 <Input
  //                   {...field}
  //                   placeholder="+216 00 000 000"
  //                   type="tel"
  //                   icon={<TnFlag width={20} height={20} className="" />}
  //                   disabled={isPending}
  //                   className="flex-1"
  //                 />
  //               </FormControl>

  //               <FormMessage />
  //             </FormItem>
  //           )}
  //         />
  //       </div>
  //       <div className="w-full flex flex-row gap-4">
  //         <FormField
  //           control={form.control}
  //           name="gouvernorat"
  //           render={({ field }) => (
  //             <FormItem>
  //               <FormLabel>
  //                 Gouvernorat<span className="text-red"> *</span>
  //               </FormLabel>
  //               <FormControl className="flex-grow ">
  //                 <Input
  //                   {...field}
  //                   type="list"
  //                   options={govOptions}
  //                   icon={<RiGovernmentLine className="text-gray w-5 h-5" />}
  //                   disabled={isPending}
  //                   className="flex-1"
  //                 />
  //               </FormControl>
  //               <FormMessage />
  //             </FormItem>
  //           )}
  //         />

  //         <FormField
  //           control={form.control}
  //           name="password"
  //           render={({ field }) => (
  //             <FormItem>
  //               <FormLabel>
  //                 Mot de passe<span className="text-red"> *</span>
  //               </FormLabel>
  //               <FormControl className="relative">
  //                 <Input
  //                   {...field}
  //                   placeholder="Entrez votre mot de passe"
  //                   type={showPassword ? 'text' : 'password'}
  //                   icon={<IoKeyOutline className="text-gray w-5 h-5" />}
  //                   disabled={isPending}
  //                 />
  //               </FormControl>
  //               <FormMessage />
  //             </FormItem>
  //           )}
  //         />
  //       </div>
  //       <Button className="bg-[#99c6d3] font-semibold w-full h-12 pt-3 items-start justify-center rounded-lg text-center text-white text-base hover:opacity-75">
  //         S'inscrire
  //       </Button>
  //     </form>
  //   </Form>
  // );
  return (
    <div></div>
  )
}
