$(function () {
  $('#area2 .login').click(function () {
    const phone = $('#area2 input').eq(0).val()
    const pwd = $('#area2 input').eq(1).val()

    req.login({ phone, pwd }, data => {

      if (data.code == 200) {
        const checked = $(':checkbox').prop('checked')
        if (checked) {
          localStorage.setItem('user', JSON.stringify(data.data))
        } else {
          sessionStorage.setItem('user', JSON.stringify(data.data))
        }
        showMessage('登录成功',1)

        const user = JSON.parse(sessionStorage.getItem('user') || localStorage.getItem('user'))
        if (user) {
          $('#notLogin').hide()
          $('#isLogin').show()
          $('#isLogin>span').html(`欢迎,<a  href="/profile">${user.phone}</a>`)
        } else {
          $('#isLogin').hide()
          $('#notLogin').show()
        }

        setTimeout(() => {
          location.href = '/'
        },1500)
      } else {
        showMessage('登录失败',0)
      }
    })
  })
})
