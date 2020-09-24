export const convertToDatetimeJsonString = timestamp => {
  return timestamp ? (new Date(timestamp - 1000)).toISOString() : ""
}

export const convertTilgangStringDateToDateTime = datetimestring => {
  if (datetimestring) {
    let datetime = datetimestring.split(' ')
    let date = datetime[0].split('.')
    let formatdate = date[1] + '/' + date[0] + '/' + date[2]
    return new Date(formatdate + ' ' + datetime[1])
  } else {
    return null
  }
}

export const convertTilgangStringDateToDate = datetimestring => {
  if (datetimestring) {
    let datetime = datetimestring.split(' ')
    let date = datetime[0].split('.')
    return new Date(date[1] + '/' + date[0] + '/' + date[2])
  } else {
    return null
  }
}

export const convertDateToTilgangStringDate = date => {
  if (date) {
   let tmpDate = date.toLocaleDateString('no').split('.')
    return tmpDate[0].padStart(2,'0') + '.' + tmpDate[1].padStart(2,'0') + '.' + tmpDate[2] + ' 08:00:00'
  } else {
    return null
  }
}


export const convertDateToTilgangStringDateTime = date => {
  if (date) {
    let tmpDate = date.toLocaleDateString('no').split('.')
    return tmpDate[0].padStart(2,'0') + '.' + tmpDate[1].padStart(2,'0') + '.' + tmpDate[2] + ' ' + date.toLocaleTimeString('no')
  } else {
    return null
  }
}

export const yearsFromNow = (numOfYears) => {
  return new Date(new Date().setFullYear(new Date().getFullYear() + numOfYears))
}

export const yearsFromNowAsStringDateTime = (numOfYears) => {
  return convertDateToTilgangStringDateTime(yearsFromNow(numOfYears))
}
