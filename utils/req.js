const req = (() => {
  const req_options = {
    mode: 'pro',
    get baseURL() {
      return this.mode == 'dev' ? 'http://192.168.31.65:3000/' : 'https://serverms.xin88.top/'
    },
  }

  function get(url, params, callback) {
    if (arguments.length == 2) {
      callback = arguments[1]
      params = ''
    }
    $.get(req_options.baseURL + url, params, callback)
  }

  function post(url, params, callback) {
    if (arguments.length == 2) {
      callback = arguments[1]
    }
    $.post(req_options.baseURL + url, params, callback)
  }

  return {
    login(params, callback) {
      post('users/login', params, callback)
    },
    register(params, callback) {
      post('users/register', params, callback)
    },
    checkPhone(params, callback) {
      post('users/checkPhone', params, callback)
    },
    video(params, callback) {
      get('video', params, callback)
    },
    mall(params, callback) {
      get('mall', params, callback)
    },
    note(params, callback) {
      get('note', params, callback)
    },
    search(params, callback) {
      get('mall/search', params, callback)
    },
    index(callback) {
      get('index', callback)
    },
  }
})()
