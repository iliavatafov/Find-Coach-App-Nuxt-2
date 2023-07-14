export const convertCSVStrToArray = (str) => {
  const newLine = /\r?\n/
  const divider = ','

  const rawDataByRows = str.split(newLine)

  const titles = rawDataByRows.shift().split(divider)

  const data = rawDataByRows.reduce((acc, value) => {
    const rawUserData = value.split(divider)

    const coachData = rawStrignConvertor(rawUserData, titles)

    acc.push(coachData)
    return acc
  }, [])

  return data
}

function normalizeString(str, splitParam, startIndex, endIndex) {
  return str.split(splitParam).slice(startIndex, endIndex).join('')
}

function rawStrignConvertor(rawUserData, titles) {
  const coachData = {}
  let titleIndex = 0

  for (let i = 0; i < rawUserData.length; i++) {
    let propValue = rawUserData[i]
    const propKey = titles[titleIndex]

    const arrayChecker = {
      isArrayStart: propValue.startsWith('['),
      isArrayEnd: propValue.endsWith(']'),
      isArrayWithOneEl: propValue.startsWith('[') && propValue.endsWith(']'),
    }

    if (arrayChecker.isArrayStart) {
      while (!arrayChecker.isArrayEnd || arrayChecker.isArrayWithOneEl) {
        propValue = rawUserData[i]

        arrayChecker.isArrayEnd = propValue.endsWith(']')

        const isPropInCoachData = Object.prototype.hasOwnProperty.call(
          coachData,
          propKey
        )

        if (!isPropInCoachData) {
          coachData[propKey] = []
        }

        if (arrayChecker.isArrayStart && !arrayChecker.isArrayEnd) {
          arrayChecker.isArrayStart = false
          coachData[propKey].push(
            normalizeString(propValue, '', 2, propValue.length - 1)
          )
        } else if (arrayChecker.isArrayWithOneEl) {
          coachData[propKey].push(
            normalizeString(propValue, '', 2, propValue.length - 2)
          )
          titleIndex++
          break
        } else if (arrayChecker.isArrayEnd) {
          coachData[propKey].push(
            normalizeString(propValue, '', 1, propValue.length - 2)
          )
          titleIndex++
          break
        } else {
          coachData[propKey].push(
            normalizeString(propValue, '', 1, propValue.length - 1)
          )
        }
        i++
      }
    } else {
      const isPropValueNumber = Number(propValue)

      if (isPropValueNumber || isPropValueNumber === 0) {
        const nextValue = rawUserData[i + 1]

        if (Number(nextValue) || Number(nextValue) === 0) {
          propValue += nextValue
          i++
        }
        propValue = Number(propValue)
      }

      coachData[propKey] = propValue
      titleIndex++
    }
  }

  return coachData
}
