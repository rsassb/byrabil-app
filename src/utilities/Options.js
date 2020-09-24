export const optionFromArray = (array, key, tekst, verdi) => {
  let options = []
  array.forEach((a) => {
    options.push({
      key: a[key],
      text: a[tekst],
      value: a[verdi]
    })
  })
  return options
}

export const unique = (arr, keyProps) => {
  return Object.values(arr.reduce((uniqueMap, entry) => {
    const key = keyProps.map(k => entry[k]).join('|');
    if (!(key in uniqueMap)) uniqueMap[key] = entry;
    return uniqueMap;
  }, {}));
}