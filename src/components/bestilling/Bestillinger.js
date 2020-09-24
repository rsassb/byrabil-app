import React, { useContext, useEffect, useState } from 'react'
import { ReactTable } from '../table'
import useAxios from 'axios-hooks'
import { SSBBIL_API } from '../../configurations'
import { ApiContext, BrukerContext, convertDateToStringDate } from '../../utilities'
import { Form, Grid, Label, Icon, Checkbox } from 'semantic-ui-react'
import { Title, Text } from '@statisticsnorway/ssb-component-library'
import DatePicker from 'react-datepicker'


function Bestillinger( props ) {

  const { ssbbilApi } = useContext(ApiContext)
  const { bruker } = useContext(BrukerContext)

  const [bestillinger, setBestillinger] = useState([])
  // const [deleteBestillingId, setDeleteBestillingId] = useState()
  const [deleteBestillingId, setDeleteBestillingId] = useState()
  const [selectedBestillingIndex, setSelectedBestillingIndex] = useState()
  const [dato, setDato] = useState(new Date())
  const [datoString, setDatoString] = useState()


  const [{ data: getData, loading: getLoading, error: getError }, reFetch] =
    useAxios( props.type === 'mine' ?
      `${ssbbilApi}${SSBBIL_API.GET_BESTILLINGER_PASSASJER(bruker.initialer)}`
      : `${ssbbilApi}${SSBBIL_API.GET_BESTILLINGER_DATO(convertDateToStringDate(dato))}`)

  const [{ loading: deleteLoading, error: deleteError, response: deleteResponse }, executeDelete] =
    useAxios({ url: `${ssbbilApi}${SSBBIL_API.DELETE_BESTILLING(deleteBestillingId)}`, method: 'DELETE' }, { manual: true })

  useEffect(() => {
    if (!getLoading && !getError && getData !== undefined) {
      console.log(getData._embedded ? getData._embedded.bestilling : getData)
      setBestillinger(getData)
    }
  }, [getData, getError, getLoading])

  useEffect(() => {
    if (!deleteLoading && deleteResponse) {
      reFetch()
    }
    if (!deleteLoading && deleteError) { console.log(deleteError.response) }
  }, [deleteError, deleteLoading, deleteResponse])


  const onChangeDato = (selectedDate) => {
    setDato(selectedDate || dato);
  }

  const onRowClick = ( rowInfo, cell ) => {
    setSelectedBestillingIndex(rowInfo.index)
    if (cell.column.id === 'avbestill') {
      console.log(rowInfo.original.id, 'rowInfo.original.id')
      setDeleteBestillingId(rowInfo.original.id)

      console.log(rowInfo, 'rowinfo')

    }
  }

  useEffect(() => {
    console.log(deleteBestillingId, 'deleteBestillingId')

    // console.log(selectedBestillingId, 'bestillingsid skal slettes')

    if (deleteBestillingId && deleteBestillingId >=0) {
      console.log(deleteBestillingId, 'skal slettes')
      executeDelete()
    }

  }, deleteBestillingId)

  const getRowStyle = (row) => {
    return {
      background: (row.index === selectedBestillingIndex  ? 'green' : null),
      color: (row.index === selectedBestillingIndex  ? 'white' : null)
    }
  }

  const bestillingHeadersMine = [
    // { Header: 'passasjer', accessor: 'passasjer', width: 50, input: 'text' },
    { Header: 'dato', accessor: 'dato', width: 120, input: 'text' },
    { Header: 'påstigning', accessor: 'paastigning', width: 100, input: 'text' },
    { Header: 'avbestill', Cell: <Icon name='cancel' color='red' /> },
  ]

  const bestillingHeadersAlle = [
    { Header: 'passasjer', accessor: 'passasjer', width: 50, input: 'text' },
    // { Header: 'Til Oslo', accessor: d => {return d.fra}, Cell: ({ value }) => <Checkbox disabled checked={value === 'K'}/>},
    // { Header: 'Fra Oslo', accessor: d => {return d.fra}, Cell: ({ value }) => <Checkbox disabled checked={value === 'O'}/>},
    { Header: 'dato', accessor: 'dato', width: 120, input: 'text' },
    { Header: 'påstigning', accessor: 'paastigning', width: 100, input: 'text' },
    { Header: 'kommentar', accessor: 'kommentar', width: 150, input: 'text' },
    { Header: 'bestilt', accessor: 'bestilt', width: 120, input: 'text' },
    { Header: 'avbestill', Cell: <Icon name='cancel' color='red' /> },
  ]

  return (
    <>
      <Form>
        {console.log(props.type)}
        <Grid stretched={true} columns={3}>
          {props.type !== 'mine' &&
          <div>
            <Grid.Row>
              <Grid.Column>
                <Label color={'olive'}>Reisedato</Label>
                {/*<Title size={6}>Reisedato</Title>*/}
                <DatePicker
                  selected={dato}
                  name={'dato'}
                  dateFormat="yyyy-MM-dd"
                  onChange={(dato) => onChangeDato(dato)}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Label color={'olive'}>Fra Oslo</Label>
                {/*<Title size={6}>Fra Kongsvinger</Title>*/}
                {bestillinger &&
                <ReactTable
                  columns={bestillingHeadersAlle}
                  data={bestillinger.filter(b => b['fra'] === 'K')}
                  handleTableCellClick={onRowClick}
                  getRowStyle={getRowStyle}
                />}
              </Grid.Column>
              <Grid.Row>
                <Grid.Column>
                  <Label color={'olive'}>Fra Oslo</Label>
                  {/*<Title size={6}>Fra Oslo</Title>*/}
                  {bestillinger &&
                  <ReactTable
                    columns={bestillingHeadersAlle}
                    data={bestillinger.filter(b => b['fra'] === 'O')}
                    handleTableCellClick={onRowClick}
                    getRowStyle={getRowStyle}
                  />}
                </Grid.Column>
              </Grid.Row>
            </Grid.Row>
            </div>
            }
          {props.type === 'mine' &&
          <Grid.Row>
            <Grid.Column>
              <Label color={'olive'}>Til Oslo</Label>
              {bestillinger &&
              <ReactTable
                columns={ bestillingHeadersMine}
                data={bestillinger.filter(b => b['fra'] === 'K')}
                handleTableCellClick={onRowClick}
                getRowStyle={getRowStyle}
              />}
            </Grid.Column>
            <Grid.Column>
              <Label color={'olive'}>Fra Oslo</Label>
              {bestillinger &&
              <ReactTable
                columns={bestillingHeadersMine}
                data={bestillinger.filter(b => b['fra'] === 'O')}
                handleTableCellClick={onRowClick}
                getRowStyle={getRowStyle}
              />}
            </Grid.Column>
          </Grid.Row>
          }
        </Grid>
      </Form>
    </>
  )
}

export default Bestillinger
