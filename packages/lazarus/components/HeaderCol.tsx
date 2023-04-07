import { useCallback, useMemo } from "react"
import { LinkSortable, Th } from "../styles"

export const HeaderCol = (props:any) => {
  const { label,width,sortable,index,sort, sortType, onSort} = props

  const isSortable = useMemo(() => {
    return sortable && (index != undefined)
  },[sortable,index ])

  const isSorting = useMemo(() => {
    return sort == index
  },[sort,index])

  const showAsc = useMemo(() => {
    return isSorting && sortType == "asc"
  },[isSorting,sortType ])

  const handleSort = useCallback((e:any) => {
    e.preventDefault()
    if(!isSortable) return;
    const payload = [index,showAsc || !isSorting ? 'desc' : 'asc']
    onSort(payload)
  },[isSortable,index,showAsc,isSorting,onSort])

  return (
    <Th style={{width}} className={`${isSortable ? 'p-0' : '' }`}>
      {!isSortable ? label : (
        <LinkSortable href="#" onClick={handleSort}>
          <span className="lazarus-viewlist--hlabel">{label}</span>
          { showAsc ? (
            <svg className={`arrow-sort ${isSorting ? 'op-1' : 'op-03'}`} xmlns="http://www.w3.org/2000/svg " viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"></path>
            </svg>
          ) : (
            <svg className={`arrow-sort ${isSorting ? 'op-1' : 'op-03'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"></path>
            </svg> 
          )}
        </LinkSortable>
      ) }
    </Th>
  )
}