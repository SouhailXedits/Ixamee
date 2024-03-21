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

interface SearchModalProps {
  children: React.ReactNode;
  field: string;
  table: string;
  emptyMessage?: string;
}

interface SearchState {
  searchInput: string;
  searchResult: any[];
  isLoading: boolean;
  isError: boolean;
}

const debounce = (func: (...args: any[]) => void, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

export function SearchModal({
  children,
  field,
  table,
  emptyMessage,
}: SearchModalProps) {
  const [searchState, setSearchState] = useState<SearchState>({
    searchInput: '',
    searchResult: [],
    isLoading: false,
    isError: false,
  });

  const handleSearchChange = debounce(async (value: string) => {
    setSearchState((prevState) => ({ ...prevState, isLoading: true }));

    try {
      const data = await getDataByName(table, value);
      setSearchState((prevState) => ({ ...prevState, searchResult: data }));
    } catch (error) {
      setSearchState((prevState) => ({ ...prevState, isError: true }));
    } finally {
      setSearchState((prevState) => ({ ...prevState, isLoading: false }));
    }
  }, 500);

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
            value={searchState.searchInput}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="rounded-bl-none rounded-br-none pl-10 pr-12  pb-2 outline-none border-b h-10"
          />
          {/* <p>{field} : </p> */}
        </DialogHeader>
        <div className=" overflow-auto h-[300px] bg-white w-full pt-10">
          {searchState.isLoading && <div>Loading...</div>}
          {searchState.isError && <div>Error while fetching data</div>}
          {searchState.searchResult.length === 0 && (
            <div>{emptyMessage || 'No results found'}</div>
          )}
          <div>
            {searchState.searchResult.map((result
