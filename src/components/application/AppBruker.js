import React, { useContext, useEffect, useState } from 'react'
import { LOCAL_STORAGE, SSBBIL_API, TILGANG_API, UI } from '../../configurations'
import { Checkbox, Label } from 'semantic-ui-react'
import useAxios from 'axios-hooks'
import { ApiContext, BrukerContext } from '../../utilities'

function AppBrukerParam () {

  const { ssbbilApi } = useContext(ApiContext)

  const [initialer, setInitialer] = useState('RSA')
  const { bruker, setBruker } = useContext(BrukerContext)
  const [{ data, loading, error }] = useAxios(`${ssbbilApi}${SSBBIL_API.GET_ANSATT(initialer)}`)
  useEffect(() => {
    console.log(initialer, 'initialer')
    console.log(data, "data for hentet bruker")
    if (!loading && !error && data) {
      setBruker(data)
    }
  }, [error, loading, data])
  
  return (
    <>
      <Label> Initialer: {bruker.initialer}</Label>
    </>
)
}

export default AppBrukerParam
