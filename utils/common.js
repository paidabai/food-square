class R {
  static get query() {
    const query = location.search.replace('?', '')
    if (!query) return null

    const obj = {}
    query.split('&').forEach((value = '') => {
      const [k, v] = value.split('=')
      obj[k] = decodeURI(v)
    })
    return obj
  }
}
