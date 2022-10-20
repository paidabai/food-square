$(function () {
  const user = JSON.parse(sessionStorage.getItem('user') || localStorage.getItem('user'))
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

        setTimeout(() => {
          location.href = '/'
        },1500)
      } else {
        $('#isLogin').hide()
        $('#notLogin').show()
        showMessage('登录失败',0)
      }
    })
  })
  if (user) {
    $('#notLogin').hide()
    $('#isLogin').show()
    $('#isLogin>span').html(`欢迎,<a  href="/profile">${user.phone}</a>`)
    showMessage('已经登录了哦',0)
    setTimeout(() => {
      location.href = '/'
    },1500)
  } else {
    $('#isLogin').hide()
    $('#notLogin').show()
  }
})
