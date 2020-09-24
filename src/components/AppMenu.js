import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import { BrukerContext, isSdaOrAdm } from '../utilities'
import { isLdaOrSda, isOrdinarBruker } from '../utilities/BrukerHandling'

function AppMenu () {

  const { paloggetBruker } = useContext(BrukerContext)

  return (
    <Menu vertical size={'small'} >
      <Menu.Item style={{color: 'olive'}} name='ny registrering' key={"/nyregistrering"} as={Link} to={"/nyregistrering"} />
      {isLdaOrSda(paloggetBruker) &&
      <Menu.Item style={{color: 'olive'}}>
        Registreringer
        <Menu.Menu>
          <Menu.Item name='vis registrering' key={"/visregistrering"} as={Link} to={"/visregistrering"} />
          <Menu.Item name='ubehandlede registreringer' key={"/ubehandlederegistreringer"} as={Link} to={"/ubehandlederegistreringer"} />
        </Menu.Menu>
      </Menu.Item>
        }
      {isLdaOrSda(paloggetBruker) &&
      <Menu.Item style={{ color: 'olive' }}>
        Tilganger
        <Menu.Menu>
          <Menu.Item name='vis/endre tilgang' key={"/visendretilgang"} as={Link} to={"/visendretilgang"}/>
          <Menu.Item name='utgåtte' key={"/utgaattetilganger"} as={Link} to={"/utgaattetilganger"}/>
          <Menu.Item name='ønskes slettet' key={"/onskesslettettilganger"} as={Link} to={"/onskesslettettilganger"}/>
          <Menu.Item name='eksisterende' key={"/eksisterendetilganger"} as={Link} to={"/eksisterendetilganger"}/>
          <Menu.Item name='alle' key={"/tilganger"} as={Link} to={"/tilganger"}/>
        </Menu.Menu>
      </Menu.Item>
      }
      {isSdaOrAdm(paloggetBruker) &&
      <Menu.Item style={{color: 'olive'}}>
        Administrasjon
        <Menu.Menu>
          <Menu.Item name='brukere' key={"/brukere"} as={Link} to={"/brukere"}/>
          <Menu.Item name='roller' key={"/roller"} as={Link} to={"/roller"}/>
          <Menu.Item name='stammer' key={"/stammer"} as={Link} to={"/stammer"}/>
        </Menu.Menu>
      </Menu.Item>
      }
      {isOrdinarBruker(paloggetBruker) &&
      <Menu.Item style={{color: 'olive'}}>
        Mine
        <Menu.Menu>
          <Menu.Item name='eksisterende' key={"/eksisterendetilganger"} as={Link} to={"/eksisterendetilganger"}/>
          <Menu.Item name={'utgåtte'} key={"/utgaattetilganger"} as={Link} to={"/utgaattetilganger"}/>
          <Menu.Item name='ønskes slettet' key={"/onskesslettettilganger"} as={Link} to={"/onskesslettettilganger"}/>
          <Menu.Item name='alle' key={"/tilganger"} as={Link} to={"/tilganger"}/>
        </Menu.Menu>
      </Menu.Item>
      }
    </Menu>
  )
}

export default AppMenu
