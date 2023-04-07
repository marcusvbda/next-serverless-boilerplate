import styled from "styled-components";

const mediaQueryMobile = "@media(max-width: 900px)";

export const LaravelListView = styled.section`
  width: 100%;
`;

export const Mg = styled.div<{ top?: number, bottom?: number }>`
  margin-top: ${props => props.top ? props.top : 0}px;
  margin-bottom: ${props => props.bottom ? props.bottom : 0}px;
`

export const Mb = styled.div<{ bottom?: number }>`
  margin-bottom: ${props => props.bottom ? props.bottom : 0}px;
`

export const ResponsiveRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
  ${mediaQueryMobile} {
    flex-direction: column;
    align-items: flex-start;
  }
`

export const Title = styled.h1`
  color: var(--gray_900);
  font-weight: 600;
  font-size: 1.8rem;
  ${mediaQueryMobile} {
    order: 1;
    text-align: center;
    width: 100%;
    font-size: 2.5rem;
  }
`

export const StyledRenderSlot = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`

export const Datatable = styled.div`
  background-color: white;
  border-radius: 8px;
  border : 1px solid #e2e8f0;
`

export const ResponsivelTable = styled.div`
  width: 100%;
  overflow-x: auto;
`

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  thead tr th {
    background-color: var(--gray_500);
    border-top: 1px solid var(--gray_600);
    border-bottom: 1px solid var(--gray_600);
    color : var(--gray_800);
    padding:  0.5rem 1rem;
    text-align: left;
    white-space: nowrap;
  }

  tbody tr {
    &.showing-result:hover {
      background-color: var(--hover-datatable-color);
      transition: .5s;
    }
    
    td {
      padding:  1.2rem 1rem;
      text-align: left;
      border-top: 1px solid var(--gray_600);
      border-bottom: 1px solid var(--gray_600);
      white-space: nowrap;
      font-size: .875rem;
      color: var(--gray_900);
      @media(max-width: 900px) {
        font-size: 1rem;
      }

      &.td-nothing {
        span {
          display: flex;
          align-self: center;
          justify-content: center;
          padding: 50px 0;
          color : var(--gray_700);
        }
      }

      &.td-loading {
        padding: 7px 20px ;

        @keyframes loading-animation {
          0%   {
            transform: rotateY(0deg);
          }
          33%   {
            transform: rotateY(110deg);
          }
          99%   {
            transform: rotateY(0deg);
          }
        }

        &::after {
          content: "";
          display: block;
          background-color: var(--theme-datatable-color);
          animation: loading-animation 2.3s infinite;
          height: 5px;
          width: 100%;
        }
      }
    }
  }
`

export const Th = styled.th`
  &.p-0 {
    padding: 0;
  }
`

export const LinkSortable = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 0.875rem;
  color : var(--gray_800);
  padding: 8px 16px;

  &a {
    &:hover {
      transition: .5s;
      filter : brightness(130%);
    }
  }

  .arrow-sort {
    height: 18px;
    margin-left: 8px;
    fill: var(--gray_800);

    &.op-03 {
      opacity: 0.3;
    }

    &.op-1 {
      opacity: 1;
    }
  }
`

export const ListFilterRow = styled.div`
  display: flex;
  padding: 8px 16px;
  gap: 25px;
`

export const InputTextSection = styled.div`
  display: flex;
  margin-left: auto;
  @media(max-width: 900px) {
    width: 100%;
  }
  position: relative;
  .icon {
    height: 100%;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 0;
    font-size: .875rem;
    color: var(--gray_800);
    position: absolute;
    cursor: pointer;
    transition: .5s;

    svg {
      width: 12px;
      height: 12px;

      line {
        stroke : var(--gray_800);
      }
    }

    &:hover {
      svg line {
        stroke : black;
      }
    }
  }

  input {
    font-size: .875rem;
    color: var(--gray_800);
    border: 1px solid var(--gray_600);
    padding: 8px 16px;
    padding-right: 53px;
    border-radius: 8px;
    min-width: 300px;

    @media(max-width: 900px) {
      width: 100%;
      padding: 16px 16px;
    }
  }

  &.small {
    input {
      min-width: 100px;
      font-size: .75rem;
      padding-right: 16px;
    }
    .clearable {
      display: none;
    }
  }
`

export const PaginatorSection = styled.div`
  display: flex;
  padding: 8px 16px;
  justify-content: space-between;
  align-items: center;

  @media(max-width: 900px) {
    margin: 20px 0;
    flex-direction: column;
  }
`;

export const PerPageDescription = styled.span`
  color: var(--gray_700);
  font-size: 0.875rem;
`;

export const PaginatorBtnList = styled.ol`
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
  border: 1px solid var(--gray_600);
  border-radius: 8px;
`;

export const PaginatorBtnListItem = styled.li<any>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 0.5rem;
  font-size: .875rem;
  border-radius: 0.25rem;
  min-width: 32px;
  background-color: '#fff';
  color: var(--theme-datatable-color);
  cursor: pointer;
  position: relative;

  @media(max-width: 900px) {
    font-size: 1rem;
    min-width: 50px;
    height: 50px;
  }
  transition: .5s;

  span {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ${(props) => props.active && `
    outline: 3px solid var(--theme-datatable-color);
  `}

  ${(props) => !props.active && `
    &:hover {
      filter: brightness(60%);
    }
  `}

  svg {
    width: 1.25rem;
    height: 1.25rem;
    fill: currentColor;
  }



`;

export const PaginationSection = styled.div`
  padding: 10px 16px;
  align-items: center;
  display: flex;
`;