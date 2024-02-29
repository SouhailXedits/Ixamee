// import { Button } from '@/components/ui/button';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuLabel,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import { ModifierUneClasse } from './modifier-une-classe';
// import { SupprimerUneClasse } from './suprimer-classe';
// import { ArchiveUneClasse } from './archiver-classe';
// import { useState } from 'react';
// interface DropdownMenuItemSelectProps {
//   children: React.ReactNode;
//   data: any;
// }

// export const DropdownMenuItemSelect = ({ children, data }: DropdownMenuItemSelectProps) => {
//   const [isopen, setIsOpen] =useState(false)
//   return (

//     <DropdownMenu modal={isopen}>
//       <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
//       <DropdownMenuContent className="w-45  text-[#727272]">
//         <DropdownMenuGroup>
//           <ModifierUneClasse data={data}>
//             <DropdownMenuLabel className="cursor-pointer hover:text-black hover:rounded-sm hover:bg-secondeColor">
//               <span>Modifier</span>
//             </DropdownMenuLabel>
//           </ModifierUneClasse>

//           <SupprimerUneClasse classe_id={data.id}>
//             <DropdownMenuLabel className="cursor-pointer hover:text-black hover:rounded-sm hover:bg-secondeColor">
//               <span>Supprimer</span>
//             </DropdownMenuLabel>
//           </SupprimerUneClasse>
//           <ArchiveUneClasse classe_id={data.id}>
//             <DropdownMenuLabel className="cursor-pointer hover:text-black hover:rounded-sm hover:bg-secondeColor">
//               <span>Archiver</span>
//             </DropdownMenuLabel>
//           </ArchiveUneClasse>
//         </DropdownMenuGroup>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// };
