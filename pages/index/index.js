$(function () {
  req.index(data => {
    const { hot_video, index_items, today_hot, today_meal } = data

    // <img src="./img/${item.pic}" alt="" />
    $('.videolist').html(
      hot_video.map(item => {
        return `<div>
          <video preload="none" poster="/assets/img/${item.pic}" loop src="./assets/video/${item.mp4}"></video>
          <span class="fs-16">${item.vname}</span>
          <i></i>
          </div>`
      })
    )

    $('.index_hotlistw').html(
      today_hot.map(item => {
        return `<li class="fs-14 ${item.emphasize ? 'emphasize' : ''}">${item.name}</li>`
      })
    )

    $('.index_sancanw ul').html(
      today_meal.map((item, index) => {
        return `<li class="fs-13 ${index == 0 ? 'active' : ''}">${item.cate_name}</li>`
      })
    )

    $('.swiper-wrapper').html(
      today_meal.map(item1 => {
        const [x, y, z] = item1.contents

        return `<div class="swiper-slide">
          
            <div>
              <img src="./assets/img/food/${x.pic}" alt="" />
            </div>
            <strong>${x.title}</strong>
            <p>${x.desc}</p>
          
        </div>
        <div class="swiper-slide">
         
          <div>
          <img src="./assets/img/food/${y.pic}" alt="" />
        </div>
            <strong>${y.title}</strong>
            <p>${y.desc}</p>
          
        </div>
        <div class="swiper-slide">
         
          <div>
          <img src="./assets/img/food/${z.pic}" alt="" />
        </div>
            <strong>${z.title}</strong>
            <p>${z.desc}</p>
          
        </div>
        `
      })
    )

    $('#index_items').html(
      index_items.map(item => {
        const els = item.items.map(value => {
          return `<div>
          <div>
            <img src="./assets/img/food/${value.pic}" />
            <div>
              ${value.author}
            </div>
          </div>
         <strong>${value.title}</strong>
         <p>${value.desc}</p>
        </div>`
        })

        return `<div class="list_s1">
      <div class="title_s1 fs-16">${item.title}</div>
      <div class="imgs">
        ${els.join('')}
      </div>
      </div>`
      })
    )
  })

  $('.videolist').on('click', '>div', function () {
    if ($(this).hasClass('current')) {
      $(this).removeClass('current')
      $(this).parent().removeClass('playing')
      $(this).children('video')[0].pause()
    } else {
      $(this).addClass('current').siblings().removeClass('current')
      $(this).parent().addClass('playing')
      $('video').each((i, el) => el.pause())
      $(this).children('video')[0].play()
    }
  })

  $('.index_sancanw').on('click', 'li', function () {
    $(this).addClass('active').siblings().removeClass('active')
  })

  var mySwiper = new Swiper('.swiper', {
    on: {
      activeIndexChange() {
        $('.index_sancanw li')
          .eq(this.activeIndex / 3)
          .addClass('active')
          .siblings()
          .removeClass('active')
      },
    },
    slidesPerGroup: 3,
    slidesPerView: 3,
    spaceBetween: 25,
  })

  $('.index_sancanw ul').on('click', 'li', function () {
    const index = $(this).index() * 3
    mySwiper.slideTo(index)
  })

  setInterval(() => {
    $('.index_qrcodew').toggleClass('active')
  }, 3000)

})
