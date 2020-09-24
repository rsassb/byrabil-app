import React from "react"
import { Table } from 'reactstrap'
import { DefaultColumnFilter, fuzzyTextFilterFn } from './Filters'
import { Pagination } from './Pagination'
import { useTable, useSortBy, useFilters, usePagination, useGroupBy, useExpanded, useRowSelect, useRowState } from "react-table"
import { useExportData } from "react-table-plugins"
import { Grid, Button } from 'semantic-ui-react'
import { getExportFileBlob } from '../../utilities'

/**
 * As in the previous versions, a react-table accepts colums where at the core we have a field Header, and accessor
 * As in the previous versions, a react-table has data that consist of an array of JSONs
 */
const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])
    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    )
  }
)


export function  ReactTable({ columns, data, handleTableCellClick, getRowStyle, paginate, filter, selectColumn, exportAllowed, className }) {
  // you can get the react table functions by using the hook useTable
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
              .toLowerCase()
              .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter
    }),
    []
  )

  // const getRowStyle = (row) => {
  //   console.log(row, "row i getRowStyle")
  //   console.log(sele)
  //   console.log(selectedRowIds, 'selected row ids')
  //   console.log(parseInt(Object.keys(selectedRowIds)[Object.keys(selectedRowIds).length -1]), 'sel length')
  //   console.log(row.index, 'rowindex')
  //   console.log(row.index === parseInt(Object.keys(selectedRowIds)[Object.keys(selectedRowIds).length -1])  ? 'red' : 'blue', 'style')
  //   return {color: (row.index === parseInt(Object.keys(selectedRowIds)[Object.keys(selectedRowIds).length -1])  ? 'red' : 'blue')}
  // }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    exportData,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: {
      pageIndex,
      pageSize
      // ,
      // sortBy,
      // filters
    }
  } = useTable({
      columns,
      data,
      defaultColumn,
      getExportFileBlob,
      filterTypes,
      initialState: { pageIndex: 0 },
      handleTableCellClick,
      paginate,
      filter
    },
    useFilters,
    useGroupBy,
    useSortBy,
    useExportData,
    useExpanded,
    usePagination,
    useRowSelect,
    useRowState,
    useExpanded,
    hooks => {selectColumn &&
      hooks.visibleColumns.push(columns => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div style={{display: 'none'}}>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ])
    }
  )
  return (
    <div >
      {paginate &&
      <Pagination canPreviousPage = {canPreviousPage}
                canNextPage = {canNextPage}
                pageOptions = {pageOptions}
                pageCount = {pageCount}
                gotoPage = {gotoPage}
                nextPage = {nextPage}
                previousPage = {previousPage}
                setPageSize = {setPageSize}
                pageIndex = {pageIndex}
                pageSize = {pageSize} />
      }
      <Table bordered
             hover
             className={className}
             {...getTableProps()}
      >
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>
                <div>
                  <span {...column.getSortByToggleProps()}>
                    {column.render('Header')}
                    {/* Add a sort direction indicator */}
                    {column.isSorted ? column.isSortedDesc ? '🔽' : '🔼' : ''}
                  </span>
                </div>
                {/* Render the columns filter UI */}
                <div>{(filter && column.canFilter) ? column.render('Filter') : null}</div>
              </th>
            ))}
            </tr>
            ))}
        </thead>
        <tbody {...getTableBodyProps()}>
        {page.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps() } style={{ ...row.getRowProps().style, ...getRowStyle(row)}}>
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps({onClick: () => {
                      handleTableCellClick(row, cell)
                    }})}>{cell.render("Cell")}</td>
                );

              })}
            </tr>
          );
        })}
        </tbody>
      </Table>
      {exportAllowed &&
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <br />
            <Button size={'mini'} color={'olive'} onClick={() => { exportData("xlsx", false) }}>Excel</Button>
            <Button size={'mini'} color={'olive'} onClick={() => { exportData("csv", false) }}>Csv</Button>
            <Button size={'mini'} color={'olive'} onClick={() => { exportData("pdf", true) }}>Pdf</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      }

    </div>

  )
}

