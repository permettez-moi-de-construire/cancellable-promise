import { camelCase, mapValues, pick } from 'lodash'

class UtmParser {
  static storeUtmParams(storageKey, storage, queryString) {
    const sessionLeadSource = storage.get(storageKey)

    if (queryString.utm_source) {
      // If there is already a source for the session
      // do not record it again
      if (sessionLeadSource && sessionLeadSource.utmSource) {
        console.info('utm source is already recorded, ignoring utm params')
        return
      }

      const storableUtmParams = this.parseUtmParams(queryString)

      storage.set(storageKey, storableUtmParams)
    }
  }

  static parseUtmParams(
    queryString,
    paramNames = [
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_term',
      'utm_content'
    ]
  ) {
    const filteredQueryString = pick(queryString, paramNames)

    return mapValues(filteredQueryString, camelCase)
  }
}

export default UtmParser
