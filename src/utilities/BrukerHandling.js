import { BRUKER_OBJECT } from '../enums/UI'

export const isLda = (bruker) => {
  return bruker[BRUKER_OBJECT.lda] === 'Y'
}

export const isSda = (bruker) => {
  return bruker[BRUKER_OBJECT.sda] === 'Y'
}

export const isAdm = (bruker) => {
  return bruker[BRUKER_OBJECT.adm] === 'Y'
}

export const isSdaOrAdm = (bruker) => {
  return isSda(bruker) || isAdm(bruker)
}

export const isLdaOrSda = (bruker) => {
  return isLda(bruker) || isSda(bruker)
}

export const isLdaSdaOrAdm = (bruker) => {
  return isLda(bruker) || isSda(bruker) || isAdm(bruker)
}

export const isOrdinarBruker = (bruker) => {
  return bruker['aktiv'] && !isLdaSdaOrAdm(bruker)
}


