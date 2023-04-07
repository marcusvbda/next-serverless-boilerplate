import { useCallback, useEffect, useMemo, useState } from "react";
import { Datatable, ListFilterRow, ResponsivelTable, Table, InputTextSection } from "../styles";
import { lzResolver, setUrlParam } from "../utils";
import { HeaderCol } from "./HeaderCol";
import { getUrlParam } from "../utils";
import { RenderSlot } from "./RenderSlot";
import Paginator from "./Paginator";

export const DataTable = (props: any) => {
  const [searchText, setSearchText] = useState("");
  const [basicFilter, setBasicFilter] = useState(getUrlParam('_', ''));
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [showBasicFilter, setShowBasicFilter] = useState(false);
  const [columns, setColumns] = useState<any[]>([]);
  const [noResultText, setNoResultText] = useState("No result found");
  const [data, setData] = useState<any[]>([]);
  const [sort, setSort] = useState(getUrlParam('sort', ''))
  const [sortType, setSortType] = useState(getUrlParam('sort-type', ''))
  const [page, setPage] = useState(getUrlParam('page', 1))
  const [total, setTotal] = useState(0)
  const [perPage, setPerPage] = useState(0)
  const [totalText, setTotalText] = useState("")

  const { resource } = props;

  const fetchData = useCallback(async (filter: string, page = 1, sort = []) => {
    let payload: any = { resource, filter, page, sort }
    setIsLoading(true)

    const request = await lzResolver("resolveListData", payload)
    if (request?.result) {
      const { result } = request;
      setData(result?.items ? result?.items : [])
      setTotal(result?.pagination?.total ? result?.pagination?.total : 0)
      setPerPage(result?.pagination?.perPage ? result?.pagination?.perPage : 0)
      setTotalText(result?.pagination?.totalText ? result?.pagination?.totalText : "")
      setIsLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resource]);

  const fetchConfig = useCallback(async () => {
    const request = await lzResolver("datatableConfig", {
      resource: resource
    })
    if (request?.result) {
      const { result } = request;
      setColumns(result?.listColumns ? result?.listColumns : [])
      setSearchText(result?.searchText ? result?.searchText : "")
      setNoResultText(result?.noResultText ? result?.noResultText : "")
      setShowBasicFilter(result?.showBasicFilter ? result?.showBasicFilter : false)

      if (result?.sort) {
        const sort = Object.entries(result.sort)[0]
        setSort(sort[0])
        setSortType(sort[1])
      }

      setVisible(true)
      fetchData(basicFilter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resource, fetchData]);


  useEffect(() => {
    fetchConfig()
  }, [fetchConfig])

  const colSpan = useMemo(() => {
    let value = columns.length;
    return value
  }, [columns])

  const sortClickHandle = useCallback((val: any) => {
    if (isLoading) return;

    let [_sort, _sortType] = val;
    setSort(_sort);
    setUrlParam('sort', _sort);
    setSortType(_sortType);
    setUrlParam('sort-type', _sortType);
    fetchData(basicFilter, page, val);
  }, [setSort, setSortType, isLoading, fetchData, basicFilter, page])

  const handleFilterClear = useCallback((e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setBasicFilter("");
    setUrlParam('_', "");
    fetchData("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setBasicFilter])

  useEffect(() => {
    if (isLoading) return;

    const _window = window as any;
    clearTimeout(_window.filterTimeout);
    _window.filterTimeout = setTimeout(() => {
      setUrlParam('_', basicFilter);
      setUrlParam('page', 1);
      setPage(1);
      setTimeout(() => {
        fetchData(basicFilter)
      })
      // ;
    }, 600);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [basicFilter])

  const handlePageChange = useCallback((page: number) => {
    setPage(page);
    setUrlParam('page', page);
    setUrlParam('_', "");
    fetchData("", page);
  }, [fetchData])

  if (!visible) return <></>

  return (
    <Datatable>
      <ListFilterRow>
        {showBasicFilter && (
          <InputTextSection>
            <input type="text" placeholder={searchText} value={basicFilter} onChange={e => setBasicFilter(e.target.value)} />
            <a href="#" className="icon" onClick={handleFilterClear}>
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
                <line x1="1" y1="11"
                  x2="11" y2="1"
                  stroke="black" />
                <line x1="1" y1="1"
                  x2="11" y2="11"
                  stroke="black" />
              </svg>
            </a>
          </InputTextSection>
        )}
      </ListFilterRow>
      <ResponsivelTable>
        <Table>
          <thead>
            <tr>
              {columns.map((column, i) => (
                <HeaderCol key={i} {...column} onSort={sortClickHandle} sort={sort} sortType={sortType} />
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={colSpan} className="td-loading" />
              </tr>
            )}

            {(!isLoading && data.length <= 0) && (
              <tr>
                <td colSpan={colSpan} className="td-nothing">
                  <span>{noResultText}</span>
                </td>
              </tr>
            )}

            {(!isLoading && data.length > 0) && (
              data.map((row, i) => (
                <tr className="showing-result" key={i}>
                  {columns.map((column, j) => (
                    <td key={j}>
                      {(typeof row[j] == 'string') && row[j]}
                      {(typeof row[j] == 'object') && <RenderSlot slots={[row[j]]} />}
                    </td>
                  ))}
                </tr>
              ))
            )}

          </tbody>
        </Table>
      </ResponsivelTable>
      {!isLoading && (
        <Paginator
          onPageChange={handlePageChange}
          page={page}
          total={total}
          perPage={perPage}
          totalText={totalText}
        />
      )}
    </Datatable>
  );
};