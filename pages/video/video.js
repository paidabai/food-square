$(function () {
  function getData(p) {
    req.video({ page: p }, res => {
      console.log(res)
      const { data, page, pageCount, totalCount } = res

      $('#videos')
        .empty()
        .append(
          data.map(v => {
            const { id, pic, views, title, duration } = v

            return `<div data-id='${id}' class="v_item">
            <div>
            <img src="./assets/img/video/${pic}" alt="">
            <div>
              <span>${views}次播放</span>
              <span>${duration}</span>
            </div>
            <img src="" alt="">
          </div>
          <div>${title}</div>
        </div>`
          })
        )

      const pages = []
      let start = Math.max(page - 2, 1)
      let end = Math.min(start + 4, pageCount)
      start = Math.max(end - 4, 1)
      for (let i = start; i <= end; i++) {
        pages.push(`<span class='${i == page ? 'active' : ''}'>${i}</span>`)
      }

      $('#pages>div').empty().append(pages)

      if (page == 1) {
        $('#pages>span').eq(0).hide()
      } else {
        $('#pages>span').eq(0).show()
      }

      if (page == pageCount) {
        $('#pages>span').last().hide()
      } else {
        $('#pages>span').last().show()
      }
    })
  }

  getData(1)

  $('#pages>div').on('click', 'span', function () {
    getData(this.innerHTML)
  })

  $('#pages>span')
    .first()
    .click(function () {
      getData($('#pages span.active').html() - 1)
    })

  $('#pages>span')
    .last()
    .click(function () {
      getData($('#pages span.active').html() - -1)
    })
})
