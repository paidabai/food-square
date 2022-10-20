$(() => {

  if (localStorage.user === undefined && sessionStorage.user === undefined) {
    showMessage("非法访问，请登录", 0);
    setTimeout(() => { 
      location.href = '?page=login'
    },1500)
  }

  $('#main').height(innerHeight - 80)

  $('#sidebar').on('click', 'li', function () {
    $(this).addClass('active').siblings().removeClass('active')

    $('#content>div').eq($(this).index()).show().siblings().hide()
  })

  $('#sidebar li').eq(0).click()

  const user = JSON.parse(sessionStorage.getItem('user') || localStorage.getItem('user'))

  $('#content h2').eq(0).after(`<table>
      <tr>
        <td>会员名</td>
        <td></td>
      </tr>
      <tr>
        <td>手机号</td>
        <td>${user.phone}</td>
      </tr>
      <tr>
        <td>注册时间</td>
        <td>${moment(user.created * 1000).format('YYYY-MM-DD')}</td>
      </tr>
    </table>`)

  $('button:contains(退出登录)').click(function () {
    setTimeout(() => {
      $('.toast').show()
    }, 200);
    $('.ok').click(() => {
      sessionStorage.clear()
      localStorage.clear()
      $('#notLogin').show().next().hide()
      location.href = '?page=login'
    })
  })

})
