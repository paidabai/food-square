const user = JSON.parse(sessionStorage.getItem('user') || localStorage.getItem('user'))
if (user) {
  $('#notLogin').hide()
  $('#isLogin>span').html(`欢迎,<a href="?page=profile">${user.phone}</a>`)
} else {
  $('#isLogin').hide()
}

// $('#isLogin button').click(function () {
//   sessionStorage.clear()
//   localStorage.clear()
//   $('#notLogin').show().next().hide()
// })

$('#search button').click(function () {
  const kw = $(this).prev().val()
  location.href = `?page=search&kw=${kw}&type=0`
})

$('#search input').keyup(function (e) {
  if (e.keyCode == 13) {
    $(this).next().click()
  }
})
