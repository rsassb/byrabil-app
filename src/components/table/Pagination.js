import React from 'react'
import { Button, Icon } from 'semantic-ui-react'

export const Pagination = ( {  canPreviousPage,
                               canNextPage,
                               pageOptions,
                               pageCount,
                               gotoPage,
                               nextPage,
                               previousPage,
                               setPageSize,
                               pageIndex,
                               pageSize }) => {
  return (
    <div>
      <Button icon size={'mini'} onClick={() => gotoPage(0)} disabled={!canPreviousPage}><Icon name='angle double left'/></Button>
      <Button icon size={'mini'} onClick={() => previousPage()} disabled={!canPreviousPage}><Icon name='angle left'/></Button>
      <Button icon size={'mini'} onClick={() => nextPage()} disabled={!canNextPage}><Icon name='angle right'/></Button>
      <Button icon size={'mini'} onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}><Icon name='angle double right'/></Button>
      <span>
        Side <strong>{pageIndex ? pageIndex + 1 : 1} of {pageOptions ? pageOptions.length: '?'}</strong>
      </span>
      <span>
        | Gå til side: <input type="number"
                                  defaultValue={pageIndex + 1}
                                  onChange={e => {
                                    const page = e.target.value ? Number(e.target.value) + 1: 0;
                                    gotoPage(page);
                              }}
          style={{ width: "50px" }}
        />
      </span>{" "}
      <select
        value={pageSize}
        onChange={e => {
          setPageSize(Number(e.target.value));
        }}
      >
        {[5, 10, 20, 30, 50, 100].map(pageSize => (
          <option key={pageSize} value={pageSize}>
            Vis {pageSize}
          </option>
        ))}
      </select>
    </div>
 )
}