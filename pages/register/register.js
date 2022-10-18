$(function () {
  const $pwd = $('[name=pwd]')
  const $phone = $('[name=phone]')
  const $re_pwd = $('[name=re-pwd]')

  // 手机号正确性监测
  $phone
    .blur(function () {
      const phone = $(this).val()
      const $em = $(this).next()

      //格式
      if (!/^1[3-9]\d{9}$/.test(phone)) {
        $em.html('手机号格式错误').css('color', 'red')
        $(this).css('border-color', 'red')
        $(this).data('status', false)
        return
      }

      // 重复监测
      req.checkPhone({ phone }, data => {
        console.log(data)
        if (data.code == 202) {
          $em.html('手机号已存在').css('color', 'red')
          $(this).css('border-color', 'red')
          $(this).data('status', false)
        } else {
          $em.html('手机号正确').css('color', 'green')
          $(this).css('border-color', '')
          $(this).data('status', true)
        }
      })
    })
    .focus(function () {
      $(this).css('border-color', '')
    })

  $pwd
    .blur(function () {
      const pwd = $(this).val()
      const $em = $(this).next()

      if (pwd.length >= 6 && pwd.length <= 12) {
        $em.html('')
        $(this).css('border-color', '')
        $em.css('color', 'green').html('格式正确')
        $(this).data('status', true)
      } else {
        $em.css('color', 'red').html('长度必须6~12位之间')
        $(this).css('border-color', 'red')
        $(this).data('status', false)
      }
    })
    .focus(function () {
      $(this).css('border-color', '')
    })

  $re_pwd
    .blur(function () {
      const $em = $(this).next()
      if ($pwd.val() == $re_pwd.val()) {
        $em.css('color', 'green').html('密码一致')
        $(this).css('border-color', '')
        $(this).data('status', true)
      } else {
        $em.css('color', 'red').html('密码不一致!')
        $(this).css('border-color', 'red')
        $(this).data('status', false)
      }
    })
    .focus(function () {
      $(this).css('border-color', '')
    })

  $('button#register').click(function () {
    const phone = $phone.val()
    const pwd = $pwd.val()

    const allright = Array.from($('#main div>input')).every(el => $(el).data('status'))

    if (!allright) {
      alert('请确保所有信息填写正确!')
      return
    }

    req.register({ phone, pwd }, data => {
      console.log(data)
      if (data.code == 200) {
        showMessage('注册成功, 请登录',1)
        setTimeout(() => {
          location.href = '?page=login'
        }, 1500);
      } else {
        showMessage('注册失败, 请稍后重试!',0)
      }
    })
  })
})
