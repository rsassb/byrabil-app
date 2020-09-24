import { Input } from 'semantic-ui-react'
import React from 'react'
import matchSorter from 'match-sorter'
import { convertTilgangStringDateToDate } from '../../utilities'

export function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}


export const ColumnFilter = ({ column: { filterValue, setFilter, filter } }) => {
  return (
    <Input
      value={filterValue || ""}
      onChange={e => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Filtrer ${filter ? filter : ""}...`}
    />
  )
}

// Define a default UI for filtering
export function DefaultColumnFilter({ column: { filterValue, preFilteredRows, setFilter, width }, }) {
  const count = preFilteredRows.length

  return (
    <input
      style={{
        width: width,
      }}
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Filtrer ${count} rader...`}
    />
  )
}

export const BooleanColumnFilter = ({ column: { filterValue, setFilter } }) => {
  return (
    <select
      value={filterValue || ""}
      onChange={e => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
    >
      <option value="">Alle</option>
      <option value={true}>Ja</option>
      <option value={false}>Nei</option>
    </select>
  )
}

export const YNColumnFilter = ({ column: { filterValue, setFilter } }) => {
  return (
    <select
      value={filterValue || ""}
      onChange={e => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
    >
      <option value="">Alle</option>
      <option value={'Y'}>Ja</option>
      <option value={'N'}>Nei</option>
    </select>
  )
}

export const TilgangtilColumnFilter = ({ column: { filterValue, setFilter } }) => {
  return (
    <select
      value={filterValue || ""}
      onChange={e => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
    >
      <option value="">Alle</option>
      <option value={'Lokalnett'}>Lokalnett</option>
      <option value={'Linux'}>Linux</option>
      <option value={'Oracle'}>Oracle</option>
      <option value={'Annet'}>Annet</option>
    </select>
  )
}


// This is a custom UI for our 'between' or number range
// filter. It uses two number boxes and filters rows to
// ones that have values between the two
export function NumberRangeColumnFilter({column: { filterValue = [], preFilteredRows, setFilter, id },}) {
  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    preFilteredRows.forEach(row => {
      min = Math.min(row.values[id], min)
      max = Math.max(row.values[id], max)
    })
    return [min, max]
  }, [id, preFilteredRows])

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <input
        value={filterValue[0] || ''}
        type="number"
        onChange={e => {
          const val = e.target.value
          setFilter((old = []) => [val ? parseInt(val, 10) : undefined, old[1]])
        }}
        placeholder={`Min (${min})`}
        style={{
          width: '70px',
          marginRight: '0.5rem',
        }}
      />
      to
      <input
        value={filterValue[1] || ''}
        type="number"
        onChange={e => {
          const val = e.target.value
          setFilter((old = []) => [old[0], val ? parseInt(val, 10) : undefined])
        }}
        placeholder={`Max (${max})`}
        style={{
          width: '70px',
          marginLeft: '0.5rem',
        }}
      />
    </div>
  )
}

// This is a custom filter UI for selecting
// a unique option from a list
export function SelectColumnFilter({ column: { filterValue, setFilter, preFilteredRows, id },}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
    >
      <option value="">Alle</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

// This is a custom filter UI that uses a
// slider to set the filter value between a column's
// min and max values
export function SliderColumnFilter({ column: { filterValue, setFilter, preFilteredRows, id },}) {
  // Calculate the min and max
  // using the preFilteredRows

  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    preFilteredRows.forEach(row => {
      min = Math.min(row.values[id], min)
      max = Math.max(row.values[id], max)
    })
    return [min, max]
  }, [id, preFilteredRows])

  return (
    <>
      <input
        type="range"
        min={min}
        max={max}
        value={filterValue || min}
        onChange={e => {
          setFilter(parseInt(e.target.value, 10))
        }}
      />
      <button onClick={() => setFilter(undefined)}>Off</button>
    </>
  )
}

export const CustomFilterSted = ({ column: { filterValue, setFilter } }) => {
  return (
    <select
      value={filterValue || ""}
      onChange={e => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
    >
      <option value="">Alle</option>
      <option value={"K"}>Kvgr</option>
      <option value={"O"}>Oslo</option>
    </select>
  )
}


export const CustomNullNotNullFilter = ({ column: { filterValue, setFilter}}) => {
  return (
    <select
    value={filterValue || ""}
    onChange={e => {
      setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
    }}
  >
    <option value="">Alle</option>
    <option value={"T"}>Tomme</option>
    <option value={"I"}>Ikke Tomme</option>
  </select>
  )
}

export function datoFilter(rows, id, filterValue) {
  return rows.filter(row => {
    if (filterValue === undefined || filterValue.length<10) {
      return true;
    }
    if (filterValue.startsWith('>=')) {
      return convertTilgangStringDateToDate(row.original[id]) >= convertTilgangStringDateToDate(filterValue.replace(">=",""))
    }
    if (filterValue.startsWith('>')) {
      return convertTilgangStringDateToDate(row.original[id]) > convertTilgangStringDateToDate(filterValue.replace(">",""))
    }
    if (filterValue.startsWith('<=')) {
      return convertTilgangStringDateToDate(row.original[id]) <= convertTilgangStringDateToDate(filterValue.replace("<=",""))
    }
    if (filterValue.startsWith('<')) {
      return convertTilgangStringDateToDate(row.original[id]) < convertTilgangStringDateToDate(filterValue.replace("<",""))
    }
    return convertTilgangStringDateToDate(row.original[id]) === convertTilgangStringDateToDate(filterValue.replace("=",""))

  })
}

export function nullNotNullFilter(rows, id, filterValue) {
  return rows.filter(row => {
    if (filterValue === undefined || filterValue.length === 0) {
      return true;
    }
    if (filterValue === 'T') {
      return row.original[id] === null || row.original[id] === undefined || row.original[id] === ''
    }
    return row.original[id] !== null && row.original[id] !== undefined && row.original[id] !== ''

  })
}

