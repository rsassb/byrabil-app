export const getNestedObject = (nestedObject, pathArray) =>
  pathArray.reduce((object, key) =>
    (object && object[key] !== 'undefined') ? object[key] : undefined, nestedObject
  )


export const sortArrayOfObjects = (array, by, direction = 'ascending') => {
  return (array && array[1]) ? (by && by.length === 1 ? array.sort(compareObjects(by, direction)) :
    array.sort(compareObjectsByMultipleFields(by, direction))) : []
}

function compareObjects (by, direction) {
  return function innerSort (a, b) {
    let aObj = a
    let bObj = b
    const byArray = by[0].split('.')

    for (let idx = 0; idx < byArray.length; idx++) {
      aObj = aObj[byArray[idx]]
      bObj = bObj[byArray[idx]]
    }

    return direction === 'ascending' ? aObj.localeCompare(bObj) : bObj.localeCompare(aObj)
  }
}

function compareObjectsByMultipleFields (by, direction) {
  return function innerSort (a, b) {
    if (by.length === 0) {
      return 0
    } // force to equal if keys run out

    const key = by[0] // take out the first key

    if (a[key] < b[key]) {
      return direction === 'ascending' ? -1 : 1
    } // will be 1 if DESC

    else if (a[key] > b[key]) {
      return direction === 'ascending' ? 1 : -1
    }// will be -1 if DESC

    else {
      return compareObjectsByMultipleFields(by.slice(1))(a, b)
    }
  }
}
