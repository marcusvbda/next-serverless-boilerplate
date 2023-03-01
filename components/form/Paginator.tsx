import styled from "styled-components";
import { color, size } from "@/styles/variables";
import ReactPaginate from "react-paginate";
interface IProps {
  currentPage: number;
  lastPage: number;
  onChangePage: (page: number) => void;
}

const PaginatorDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  ul {
    display: flex;
    list-style-type: none;

    @media ${size.small} {
      max-width: 100%;
      flex-wrap: wrap;
      margin-top: 20px;
    }

    li {
      background: ${color.dark.backgroundDarkest};
      height: 40px;
      min-width: 40px;
      border: unset;
      display: flex;
      align-items: center;
      justify-content: center;

      &.disabled {
        opacity: 0.2;
        cursor: not-allowed;
      }

      a {
        color: ${color.dark.light};
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }

      &.selected {
        background: ${color.dark.primary};
      }
    }
  }
`

export default function Paginator(props: IProps) {
  const showingPages = [];
  for (let i = props.currentPage; i <= props.lastPage; i++) {
    showingPages.push(i);
  }

  return (
    <PaginatorDiv>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        forcePage={props.currentPage - 1}
        onPageChange={(val) => props.onChangePage(Number(val.selected) + 1) as any}
        pageRangeDisplayed={5}
        pageCount={props.lastPage}
        previousLabel="<"
        renderOnZeroPageCount={undefined}
      />
    </PaginatorDiv>
  );
}
