import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getDataByName } from '@/data/search-by-name';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useState } from 'react';
import SearchResultItem from '../ui/SearchResultItem';

interface searchChildren {
  children: React.ReactNode;
  field: string;
  table: string
}

export function SearchModal({ children, field , table}: searchChildren) {
  const [searchInput, setSearchInput] = useState<string>('');
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const [searchResult, setSearchResults] = useState<any>([])
  function handleSearchChange(value: string) {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    setSearchInput(value);

    // Set a new timeout to perform the action after 500 milliseconds
    const timeoutId = setTimeout(async () => {
      const data = await getDataByName(table, searchInput);
      setSearchResults(data)
      
      // if (user === null || (user?.role !== 'TEACHER' && user?.role !== 'ADMIN')) {
      //   setShowError(true);
      //   setUserId(null);
      // }
      // if (user) setUserId(user.id);
    }, 500);


    setTypingTimeout(timeoutId);
  }



  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[425px] p-2">
        <DialogHeader className=" absolute w-full flex">
          <Image
            src="/scoop.svg"
            alt="icons"
            width={20}
            height={20}
            className=" absolute top-3 left-3"
          />
          <input
            type="text"
            placeholder={`Chercher un ${field}`}
            value={searchInput}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="rounded-bl-none rounded-br-none pl-10 pr-12  pb-2 outline-none border-b h-10"
          />
          {/* <p>{field} : </p> */}
        </DialogHeader>
        <div className=" overflow-auto h-[300px] bg-white w-full pt-10">
          <div >
            {searchResult.length !== 0 && searchResult.map((result: any) => <SearchResultItem data={result} key={result.id}/>
            )}
            
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
