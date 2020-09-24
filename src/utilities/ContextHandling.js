import React, { useState } from 'react'

export const ApiContext = React.createContext({
  tilgangApi: process.env.REACT_APP_API_TILGANG
})

export const BrukerContext = React.createContext({initialer: 'RSA'})

export const AppContextProvider = (props) => {
  const [tilgangApi, setTilgangApi] = useState(process.env.REACT_APP_API_TILGANG)
  const [paloggetBruker, setPaloggetBruker] = useState({})

  return (
    <ApiContext.Provider value={{ tilgangApi, setTilgangApi }}>
      <BrukerContext.Provider value={{paloggetBruker, setPaloggetBruker}}>
        {props.children}
      </BrukerContext.Provider>
    </ApiContext.Provider>
  )
}
