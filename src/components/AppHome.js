import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'

import { ROUTING } from '../configurations'
import { BrukerTabell, RolleTabell, StammeTabell, RegistreringTabell,
  VisEndreTilgang, VisRegistrering } from './'
import NyRegistrering from './registrering/NyRegistrering'
import VisTilganger from './tilgang/VisTilganger'

function AppHome () {


  return (
    <Grid columns='equal'>
      <Grid.Row>
        <Grid.Column>
          <Switch>
            <Route path={ROUTING.BRUKERE}>
              <BrukerTabell type={'brukere'}/>
            </Route>
            <Route path={ROUTING.ROLLER}>
              <RolleTabell />
            </Route>
            <Route path={ROUTING.STAMMER}>
              <StammeTabell />
            </Route>
            <Route path={ROUTING.REGISTRERINGER}>
              <RegistreringTabell />
            </Route>
            <Route path={ROUTING.TILGANGER}>
              <VisTilganger typeTilganger={'alle'}/>
            </Route>
            <Route path={ROUTING.EKSISTERENDE_TILGANGER}>
              <VisTilganger typeTilganger={'eksisterende'}/>
            </Route>
            <Route path={ROUTING.UTGAATTE_TILGANGER}>
              <VisTilganger typeTilganger={'utgaatte'} />
            </Route>
            <Route path={ROUTING.ONSKES_SLETTET_TILGANGER}>
              <VisTilganger typeTilganger={'onskesslettet'}/>
            </Route>
            <Route path={ROUTING.VISENDRETILGANG}>
              <VisEndreTilgang />
            </Route>
            <Route path={ROUTING.VISREGISTRERING}>
              <VisRegistrering />
            </Route>
            <Route path={ROUTING.NYREGISTRERING}>
              <NyRegistrering />
            </Route>
            <Route path={ROUTING.UBEHANDLEDEREG}>
              <VisRegistrering typeRegistreringer='ubehandlede'/>
            </Route>
            {/*<Route path={ROUTING.BASE}>*/}
            {/*  <AppHome />*/}
            {/*</Route>*/}
          </Switch>
        </Grid.Column>

        </Grid.Row>
    </Grid>
  )
}

export default AppHome
