$(function () {
  const { type, kw } = R.query

  $('#options>span').eq(type).addClass('active').siblings().removeClass('active')

  $('#options>span').click(function () {
    const index = $(this).index()
    location.href = `?page=search&type=${index}&kw=${kw}`

    $('#options>span').eq(type).addClass('active').siblings().removeClass('active')
  })

  function getData(page) {
    console.log({ kw, page, type })

    req.search({ kw, page, type }, data => {
      const { pageCount, page } = data
      console.log(data)

      $('#main ul').html(
        data.data.map(({ id, name, pic, price, sale_count }) => {
          return `<li>
              <img src="./assets/img/mall/${pic}" alt="">
              <div>
                <span>${name}</span>
                <span>¥${price}</span>
                <span>销量: ${sale_count}</span>
              </div>
            </li>`
        })
      )

      if (pageCount == 0) return
      //分页
      const pages = []

      pages.push(`<span class="prev ${page == 1 ? 'disabled' : ''}">上一页</span>`)

      let start = Math.max(page - 2, 1)
      let end = Math.min(start + 4, pageCount)
      start = Math.max(end - 4, 1)
      for (let i = start; i <= end; i++) {
        pages.push(`<span class='page ${i == page ? 'active' : ''}'>${i}</span>`)
      }

      pages.push(`<span class="next ${page == pageCount ? 'disabled' : ''}">下一页</span>`)

      $('#pages').html(pages)
    })
  }

  $('#pages').on('click', 'span.page', function () {
    getData($(this).text())
  })

  $('#pages').on('click', 'span.next', function () {
    getData($(this).siblings('.active').text() - -1)
  })

  $('#pages').on('click', 'span.prev', function () {
    getData($(this).siblings('.active').text() - 1)
  })

  getData(1)
})
