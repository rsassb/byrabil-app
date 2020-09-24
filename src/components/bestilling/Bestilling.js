import React, { useContext, useEffect, useState } from 'react'
import useAxios from 'axios-hooks'
import {
  Form,
  Grid,
  Label,
  Checkbox,
  Button
  // Dropdown
} from 'semantic-ui-react'
import { Input, TextArea, Dropdown, Button as SsbButton } from '@statisticsnorway/ssb-component-library'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import {
  ApiContext, BrukerContext,
  convertDateToStringDate,
} from '../../utilities'
import { SSBBIL_API, SSB_STYLE } from '../../configurations'

function Bestilling ( ) {

  const { ssbbilApi } = useContext(ApiContext)
  const { bruker } = useContext(BrukerContext)

  const [dato, setDato] = useState(new Date())
  // const [datoString, setDatoString] = useState()
  const [bestillinger, setBestillinger] = useState([])
  const [pastigning, setPastigning] = useState('SSB')
  const [kommentar, setKommentar] = useState('')
  const [antallSeter, setAntallSeter] = useState(6)


  const [{ data: bestillingData, loading: bestillingLoading, error: bestillingError }] =
    useAxios(`${ssbbilApi}${SSBBIL_API.GET_BESTILLINGER_DATO(convertDateToStringDate(dato))}`)
  const [{ loading: postBestillingLoading, error: postBestillingError, response: postBestillingResponse }, executeBestillingPost] =
    useAxios({ url: `${ssbbilApi}${SSBBIL_API.POST_BESTILLING}`, method: 'POST' },
      { manual: true })
  const [{ data: seteData, loading: seteLoading, error: seteError } ] =
    useAxios(`${ssbbilApi}${SSBBIL_API.GET_SETER_DATO(convertDateToStringDate(dato))}`)

  useEffect(() => {
    if (!bestillingLoading && !bestillingError && bestillingData !== undefined) {
      // console.log(bestillingData._embedded ? bestillingData._embedded.bestilling : bestillingData)
      setBestillinger(bestillingData)
    }
  }, [bestillingData, bestillingError, bestillingLoading])

  useEffect(() => {
    if (!seteLoading && !seteError && seteData !== undefined ) {
      // console.log(seteData._embedded ? seteData._embedded.sete : seteData)
      setAntallSeter(seteData.length > 0 ? seteData[0].antallSeter : 6)
    }
  }, [seteData, seteError, seteLoading])

  useEffect(() => {
    if (!postBestillingLoading && postBestillingResponse) {
      console.log(postBestillingResponse.data)
    }
    if (!postBestillingLoading && postBestillingError) { console.log(postBestillingError.response) }
  }, [postBestillingError, postBestillingLoading, postBestillingResponse])

  const onChangeDato = (selectedDate) => {
    setDato(selectedDate || dato)
  }

  const bestillFra = (fra) => {
    console.log(fra, 'fra')
    let bestilling = {
      passasjer: bruker.initialer,
      dato: convertDateToStringDate(dato),
      fra: fra,
      paastigning: fra === 'K' ? pastigning : null
    }
    executeBestillingPost({data: bestilling})

  }

  const pastigningOptions = [
    {text: 'SSB', value: 'SSB'},
    {text: 'Stasjonen', value: 'Stasjonen'},
    {text: 'Rådhuset', value: 'Raadhuset'},
  ]

  const pastigningItems = [
    {title: 'SSB', id: 'SSB'},
    {title: 'Stasjonen', id: 'Stasjonen'},
    {title: 'Rådhuset', id: 'Raadhuset'},
  ]


  return (
    <Form>
      <Grid stretched={true} columns={1}>
        <Grid.Row>
          <Grid.Column>
            <Label>Reisedato</Label>
            <DatePicker
              selected={dato}
              name={'dato'}
              dateFormat="yyyy-MM-dd"
              onChange={(dato) => onChangeDato(dato)}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
        {/*<GridColumn>*/}
        {/*    <Label>Fra Kongsvinger: {(bestillinger.filter((b) => b['fra'] === 'K')).length}</Label>*/}
        {/*    <Label>Fra Oslo: {(bestillinger.filter((b) => b['fra'] === 'O')).length}</Label>*/}
        {/*</GridColumn>*/}
        <Grid.Column>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <div style={{color: (bestillinger.filter((b) => b['fra'] === 'K')).length < antallSeter ? 'green' : 'red'}}>Til Oslo:&nbsp;
                {(bestillinger.filter((b) => b['fra'] === 'K')).length < antallSeter ?
                antallSeter - (bestillinger.filter((b) => b['fra'] === 'K')).length : 0
                } ledige seter
                {(bestillinger.filter((b) => b['fra'] === 'K')).length > antallSeter &&
                ', ' + ((bestillinger.filter((b) => b['fra'] === 'K')).length - antallSeter) + ' på venteliste'
                }
                </div>
              </Grid.Column>
              <Grid.Column>
                <div style={{color: (bestillinger.filter((b) => b['fra'] === 'O')).length < antallSeter ? 'green' : 'red'}}>Fra Oslo:&nbsp;
                {(bestillinger.filter((b) => b['fra'] === 'O')).length < antallSeter ?
                  antallSeter - (bestillinger.filter((b) => b['fra'] === 'O')).length : 0
                } ledige seter
                {(bestillinger.filter((b) => b['fra'] === 'O')).length >= antallSeter &&
                ', ' + ((bestillinger.filter((b) => b['fra'] === 'O')).length - antallSeter) + ' på venteliste'
                }
                </div>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <Dropdown name='pastigning'
                          placeholder={'påstigning'}
                          value={pastigning}
                          onChange={(sted) => setPastigning(sted)}
                          selection
                          items={pastigningItems}
                          searchable
                />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={1}>
              <Grid.Column >
                <Label>Kommentar</Label>
                <TextArea rows={2} value={kommentar}
                          onChange={(kommentar) => setKommentar(kommentar)} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <SsbButton negative={(bestillinger.filter((b) => b['fra'] === 'K')).length >= antallSeter}
                              onClick={() => bestillFra('K')}
                >
                  Til Oslo {(bestillinger.filter((b) => b['fra'] === 'K')).length >= antallSeter &&
                ' som nr ' + ((bestillinger.filter((b) => b['fra'] === 'K')).length - antallSeter + 1) + ' på venteliste'}
                </SsbButton>
              </Grid.Column>
              <Grid.Column>
                <SsbButton negative={(bestillinger.filter((b) => b['fra'] === 'O')).length >= antallSeter}
                onClick={() => bestillFra('O')}
                >
                  Fra Oslo {(bestillinger.filter((b) => b['fra'] === 'O')).length >= antallSeter &&
                ' som nr ' + ((bestillinger.filter((b) => b['fra'] === 'O')).length - antallSeter + 1) + ' på venteliste'}
                </SsbButton>
              </Grid.Column>
            </Grid.Row>

          </Grid>
        </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
  )
}

export default Bestilling
