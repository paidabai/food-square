$(function () {
  
  let nowPage = 1
  let loading = false
  $('.pb').hide()
  // const column = 4

  // const findMinHeight = arr => {
  //   // console.log(arr)
  // //   let min = arr[0]

  // //   arr.forEach(x => {
  // //     // console.log(x.bottom, min.bottom);
  // //     if (x.bottom < min.bottom) min = x
  // //   })
  // //   return min
  // // }

  // // const findMaxHeight = arr => {
  // //   let max = arr[0]

  // //   arr.forEach(x => {
  // //     if (x.bottom > max.bottom) max = x
  // //   })
  // //   return max
  // // }
  
  function getData() {

    loading = true

    req.note({ page: nowPage + 1 }, data => {
      if (data.code == 200) {
        loading = false
        nowPage++

        if (nowPage == data.pageCount) $('.no-more').show()
    
        $('.pb').append(
          data.data.map(({ cover, title, name, favorite, head_icon }) => {
            return `
              <div class="note">
                  <a class="note-cover" href="" target="_blank" >
                    <img src="./assets/img/note/${cover}" alt="">
                  </a>
                  <div class="note-info">
                    <a href="" class="note-name" target="_blank">${title}</a>
                    <div>
                      <a href="" class="user-head" target="_blank">
                        <img src="./assets/img/note/${head_icon}" alt="">
                      </a>
                      <a href="" class="user-name" target="_blank">${name}</a>

                      <a href="">${favorite}</a>
                    </div>
                  </div>
              </div>
            `
          })
        )  

        setTimeout(() => {
          $('.pb').show()
          waterfall('.pb');
        }, 110);
          
    }

      // const arr = []

      // $('#main li').each((index, el) => {
      //   // 第一行
      //   if (index < column) {
      //     $(el)
      //       .css('left', index * 290)
      //       .data('column', index)
      //   } else {
      //     const x = findMinHeight(arr)
      //     // console.log(x)
      //     // console.log({ left: x.left, top: x.bottom + 10 });

      //     $(el)
      //       .css({ left: x.left, top: x.bottom + 30 })
      //       .data('column', x.column)
      //   }

      //   // console.log($(el).data('column'));

      //   arr[$(el).data('column')] = {
      //     left: $(el).css('left'),
      //     top: $(el).css('top'),
      //     height: $(el).width() * $(el).data('hw') + 85,
      //     get bottom() {
      //       return parseInt(this.top) + parseInt(this.height)
      //     },
      //     column: $(el).data('column'),
      //   }

      //   // console.log(arr);
      // })

      // $('ul').css('height', findMaxHeight(arr).bottom + 20)
    })
  }
  
  getData()

  window.addEventListener('resize', function () {
    waterfall('.pb');
});

  const $more = $('.more')

  onscroll = function () {
    const top = $more.offset().top
    const y = document.body.scrollTop || document.documentElement.scrollTop

    if (y + innerHeight + 200 > top && !loading) {
      getData()
    }
  }

})