export const API = {
  ERROR_PATH: ['response', 'data'],
  ERROR_STATUS_PATH: ['response', 'statusText'],
  GET_HEALTH: '/health'
}

export const TILGANG_API = {
  GET_BRUKER: (initialer) => `/bruker/${initialer}`,
  GET_BRUKERE: '/bruker',
  GET_AKTIVE_BRUKERE: '/brukere/finnAktive',
  GET_AKTIVE_SEKSJON_BRUKERE: (seksjon) =>`/bruker/finnAktiveBrukereSeksjon/${seksjon}`,
  PUT_BRUKER: (initialer) => `/bruker/${initialer}`,
  POST_BRUKER: `/bruker`,
  BRUKER_OBJECT: {
    STRING: ['initialer','navn','telefon','epostadresse','seksjon','sted','avdeling','lda','sda','adm','seksjonssjef','aktiv','systembruker']
  },

  GET_ROLLER: '/rolle',
  GET_ROLLER_SEKSJON: (seksjon) => `/roller/seksjon/${seksjon}`,
  ROLLE_OBJECT: {
    STRING: ['id', 'base', 'rolle', 'seksjonseier']
  },
  GET_STAMMER: '/stamme',
  GET_STAMMER_SEKSJON: (seksjon) => `/stammer/seksjon/${seksjon}`,
  STAMME_OBJECT: {
    STRING: ['id', 'stamme', 'katalog', 'eier']
  },

  GET_REGISTRERINGER: (initialer) => `/registreringer/${initialer}`,
  GET_UBEHANDLEDE_REGISTRERINGER: (initialer) => `/registreringer/ubehandlet/${initialer}`,
  PUT_REGISTRERING: (regid) =>`/registrering/${regid}`,
  POST_REGISTRERING: `/registrering`,
  POST_REGISTRERINGER: `/registreringer`,
  REGISTRERING_OBJECT: {
    STRING: ['regid','initialer','seksjon','dataeiersign','dataeierseksjon','dataeierdato',
      'formaal','kommentar','regdato','regav','kommentarkundestotte','annullert',
      'oppretteslokalnett','opprettesoracle','oppretteslinux']
  },

  GET_TILGANGER : (initialer) => `/tilganger/${initialer}`,
  GET_TILGANGER_BRUKER: (initialer) => `/tilganger/initialer/${initialer}`,
  GET_TILGANGER_REGISTRERING: (regid) => `/tilganger/regid/${regid}`,
  GET_TILGANGER_EKSISTERENDE: (initialer) =>  `/tilganger/eksisterende/${initialer}`,
  GET_TILGANGER_ONSKESSLETTET: (initialer) =>  `/tilganger/onskesslettet/${initialer}`,
  GET_TILGANGER_UTGAATT: (initialer) =>  `/tilganger/utgaatt/${initialer}`,
  PUT_TILGANG: (tilgangid) =>`/tilgang/${tilgangid}`,
  POST_TILGANG: `/tilgang`,
  POST_TILGANGER: `/tilganger`,
  TILGANG_OBJECT: {
    STRING: ['tilgangid','regid','initialer','tilgangtil','filstammeapp','lesetilgang','skrivetilgang',
      'oraclerolle','tildato','fjernetav','fjernetdato','seksjon','sendtmail',
      'regdato','onskesslettet','forlengelseforid']
  },

  POST_SEND_FJERNET_TILGANG_EPOST: (tilgangid) => `/proc/sendFjernUtgTilgangEpost/${tilgangid}`,
  POST_SEND_FORLENGET_TILGANG_EPOST: (tilgangid, lda) =>`/proc/sendForlengetTilgangEpost/${tilgangid}/${lda}`,
  POST_SEND_FJERN_ORACLE_TILGANG: (tilgangid, regid, sendepost) =>`/proc/sendForlengetTilgangEpost/${tilgangid}/${regid}/${sendepost}`,
  POST_FULLFOR_REGISTRERING: (regid, initialer, sendEpost) => `/proc/fullforRegistrering/${regid}/${initialer}/${sendEpost}`,
  POST_KOPIER_REGISTRERING: (regid, initialer) => `/proc/kopierRegistrering/${regid}/${initialer}`,
  POST_FORLEGNG_TILGANG_NY_REG: (tilgangid, tildato, bruker) => `/proc/kopierRegistrering/${tilgangid}/${tildato}/${bruker}`,
  GET_FINN_INITIALER: (navn) => `/proc/finnInitialer/${navn}`,
  GET_SJEKK_INITIALER: (initialer) => `/proc/sjekkInitialer/${initialer}`,


  BRUKERE: 'brukere',
  ROLLER: 'roller,',
  STAMMER: 'stammer'
}


export const LOCAL_STORAGE = {
  REMEMBER: 'rememberUser',
  USER_ID: 'userId',
  USER: 'user',
  PALOGGET_BRUKER: 'paloggetBruker'
}
