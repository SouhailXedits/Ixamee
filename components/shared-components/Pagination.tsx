import React from 'react';
import {
  Pagination as ReactPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';


interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const handlePreviousPage = () => {
    onPageChange(currentPage > 1 ? currentPage - 1 : 1);
  };

  const handleNextPage = () => {
    onPageChange(currentPage < totalPages ? currentPage + 1 : totalPages);
  };

  return (
    <ReactPagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="flex items-center gap-1 bg-transparent text-1 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <ArrowLeft /> Précident
          </Button>
        </PaginationItem>
        {Array.from({ length: totalPages }).map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink href="#" onClick={() => onPageChange(index + 1)} className={`${ currentPage === index + 1 && 'bg-1/10'}`}>
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <Button
            onClick={handleNextPage}
            className="flex items-center gap-1 bg-transparent text-1 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={currentPage === totalPages}
          >
            Suivant <ArrowRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </ReactPagination>
  );
};

export default Pagination;
