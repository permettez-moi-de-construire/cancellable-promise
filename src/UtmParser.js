import { camelCase, mapKeys, pick } from 'lodash'

class UtmParser {
  static defaultParamNames = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content'
  ]

  static storeUtmParams(
    storageKey,
    storage,
    queryString
  ) {
    if (queryString.utm_source) {
      const sessionLeadSource = storage.get(storageKey)

      // If there is already a source for the session
      // do not record it again
      if (sessionLeadSource && sessionLeadSource.utmSource) {
        console.info('utm source is already recorded, ignoring utm params')
        return
      }

      const storableUtmParams = this.parseParams(
        queryString,
        this.defaultParamNames
      )

      storage.set(storageKey, storableUtmParams)
    }
  }

  static parseParams(
    queryString,
    paramNames
  ) {
    const filteredQueryString = pick(queryString, paramNames)

    return mapKeys(filteredQueryString, (v, k) => camelCase(k))
  }
}

export default UtmParser
