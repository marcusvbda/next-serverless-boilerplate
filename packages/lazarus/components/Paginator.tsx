import React, { useCallback, useMemo, useState } from 'react';
import { PaginationSection, PerPageDescription, PaginatorBtnList, PaginatorBtnListItem } from '../styles';

interface IPaginator {
  page: number;
  total: number;
  perPage: number;
  totalText: string;
  onPageChange: (page: number) => void;
}

const Paginator = ({ total, perPage, page, onPageChange, totalText }: IPaginator) => {
  const [lastPage, setLastPage] = useState(0);

  const computedBtnList = useMemo(() => {
    const btnList = [];
    const maxPage = Math.ceil(total / perPage);
    const currentPage = Number(page);
    const startPage = currentPage - 2;
    const endPage = currentPage + 2;

    if (startPage > 1) {
      btnList.push(1);
      if (startPage > 2) btnList.push('...');
    }
    for (let i = startPage; i <= endPage; i++) {
      if (i > 0 && i <= maxPage) {
        btnList.push(i);
      }
    }
    if (endPage < maxPage) {
      if (endPage < maxPage - 1) {
        // console.log(btnList.length)
        btnList.push('...');
      }
      setLastPage(maxPage);
      btnList.push(maxPage);
    }

    return btnList;
  }, [page, perPage, total]);

  const btnPaginateClick = useCallback((value: any) => {
    if ([page, "..."].includes(value)) return;
    if (value == 'prev') return onPageChange(page - 1)
    if (value == 'next') return onPageChange(page + 1)
    onPageChange(value)
  }, [page, onPageChange]);

  if (total <= 0 || (total <= perPage)) return <></>;

  return <>
    <PaginationSection>
      <PerPageDescription>
        {totalText}
      </PerPageDescription>
      <PaginatorBtnList>
        {page > 1 && (<PaginatorBtnListItem style={{ padding: 0 }} onClick={() => btnPaginateClick('prev')} >
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" ></path>
            </svg>
          </span>
        </PaginatorBtnListItem>
        )}
        {computedBtnList.map((item, index) => <PaginatorBtnListItem key={index} active={page == item} onClick={() => btnPaginateClick(item)}>
          {item}
        </PaginatorBtnListItem>
        )}
        {page < lastPage && (<PaginatorBtnListItem active={true} style={{ padding: 0 }} onClick={() => btnPaginateClick('next')}>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"></path>
            </svg>
          </span>
        </PaginatorBtnListItem>
        )}
      </PaginatorBtnList>
    </PaginationSection>
  </>;
}

export default Paginator;