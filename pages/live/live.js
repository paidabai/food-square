$(function () {
    let nowPage = 1
    let loding = false
    let noMore = false
    const getData = (page = 1) => {
        loding = true
        nowPage++
        const url = `https://douyu.xin88.top/api/room/list?page=${page}&;type=ms`
        $.get(url, data => {
            if (data.code === 0) {
                if (data.data.pageCount == nowPage) {
                    noMore = true
                    $('.nomore').show()
                }
                loding = false
                $('.goods-list').append(
                    data.data.list.map(v => {

                        const { roomSrc, roomName, nickname, hn } = v
            
                        return `
                        <div class="v_item">
                            <div>
                                <img src="${roomSrc}" alt="">
                                <div>
                                    <span>${nickname}</span>
                                </div>
                                <div>
                                    <span>${hn}</span>
                                </div>
                            </div>
                            <div>${roomName}</div>
                        </div>
                        `
                    })
                )
            } else {
                console.log(请求失败);
            }
        })
    }

    getData()    
    getData(nowPage)

    onscroll = () => {
        if (noMore) return
        if (scrollY + innerHeight + 250 >= $('#friendlink').offset().top && !loding) {
            getData(nowPage)
        }
    }
})