$(function () {
  let nowPage = 1
  let loading = false
  let nomore = false

  function getData() {
    loading = true
    req.mall({ page: nowPage + 1 }, data => {
      loading = false
      nomore = nowPage == data.pageCount
      if (nomore) {
        $('.nomore').show()
      }
      if (data.code == 200) {
        nowPage++
      } else {
        return
      }

      $('.goods-list').append(
        data.data.map(({ name, pic, price, sale_count }) => {
          return `<li>
              <a href="">
                <img src="./assets/img/mall/${pic}" alt="">
              </a>
              
              <div>
                <a href="" class="line-2">${name}</a>
                <div>
                  <span>¥${price}</span>
                  <span>月售${sale_count}</span>
                </div>
              </div>
              
            </li>`
        })
      )
    })
  }
  getData()

  const $more = $('.more')

  onscroll = function () {
    if (nomore) return
    // 底部元素距离顶部的高度
    const top = $more.offset().top
    // 滚动的高度
    const y = document.body.scrollTop || document.documentElement.scrollTop
    
    if (y + innerHeight + 100 > top && !loading) {
      getData()
    }
  }

})
