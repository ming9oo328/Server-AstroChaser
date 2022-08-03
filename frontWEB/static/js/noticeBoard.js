let noticeBoardPage = 0;
const noticePrevBtn = document.getElementById("notice-prev-btn");
const noticeNextBtn = document.getElementById("notice-next-btn");
const noticeWriteBtn = document.getElementById("notice-write-btn");
let titleArr;

window.onload = async function(){
    titleArr = await getNormalNoticeBoardTitles();
    showNormalNoticeBoardTitles(noticeBoardPage);
}

noticeWriteBtn.onclick = function noticeWriteBtnClicked(event){
    if(localStorage.getItem("member")=="운영진")
    {
        location.href = `/notice/editor`;
    }
    else
    {
        alert("운영진만 글을 작성할 수 있는 게시판입니다.")
    }
}

async function showNormalNoticeBoardTitles(page){
    html = ''

    for(var i = 0; i<10; i++){
        if(i==9 || Number((page*10)+i) == titleArr.length-1 ) {
            console.log(titleArr[Number((page*10)+i)])
            html += `
                <div class="removeColumns">
                    <div class="columns" onclick="location.href='/notice/${titleArr[Number((page*10)+i)].id}'">
                        <div class="column is-full" id="final-column">
                            <div class="noticeCol iconCol"></div>
                            <div class="noticeCol titleCol">${titleArr[Number((page*10)+i)].title}</div>
                            <div class="noticeCol writerCol">${titleArr[Number((page*10)+i)].name}</div>
                            <div class="noticeCol timeCol">${titleArr[Number((page*10)+i)].createdat.substring(0, 10)}</div>
                            <div class="noticeCol watchCol">${titleArr[Number((page*10)+i)].viewCount}</div>
                        </div>
                    </div>
                </div>
                `
            $('.notice-list').append(html)
            break;
        }
        html += `
        <div class="removeColumns">
            <div class="columns" onclick="location.href='/notice/${titleArr[Number((page*10)+i)].id}'">
                <div class="column is-full">
                    <div class="noticeCol iconCol"></div>
                    <div class="noticeCol titleCol">${titleArr[Number(page*10 + i)].title}</div>
                    <div class="noticeCol writerCol">${titleArr[Number(page*10 + i)].name}</div>
                    <div class="noticeCol timeCol">${titleArr[Number(page*10 + i)].createdat.substring(0, 10)}</div>
                    <div class="noticeCol watchCol">${titleArr[Number(page*10 + i)].viewCount}</div>
                </div>
            </div>
        </div>
        `
       
    }      
}

noticePrevBtn.onclick = function(){
    if(noticeBoardPage>=1){
        $('.removeColumns').empty();
        Number(noticeBoardPage--);
        showNormalNoticeBoardTitles(noticeBoardPage);
    }
}
noticeNextBtn.onclick = function(){
    if(titleArr.length/10 > noticeBoardPage+1)
    {
        $('.removeColumns').empty();
        Number(noticeBoardPage++);
        console.log(noticeBoardPage)
        showNormalNoticeBoardTitles(noticeBoardPage);
    }
}

async function getNormalNoticeBoardTitles(){
    const getTitleRes = await getAPI(hostAddress, 'app/notice/title/normal');
    let titleArr = new Array();
    for(var i in getTitleRes.result){
        let titleRes = new Object();
        titleRes.id = getTitleRes.result[i].id;
        titleRes.title = getTitleRes.result[i].title;
        titleRes.name = getTitleRes.result[i].name;
        titleRes.createdat = getTitleRes.result[i].createdat;
        titleRes.viewCount = getTitleRes.result[i].viewCount;

        titleArr.push(titleRes);
    }

    return titleArr;

}


//get API AS JSON
async function getAPI(host, path, headers ={}) {
    const url = `http://${host}/${path}`;
    console.log(url);
    const options = {
      method: "GET",
      headers: headers,
    };
    const res = await fetch(url, options);
    const data = res.json();
    // console.log(res)
    // console.log(data)
    if (res.ok) {
      return data;
    } else {
      throw new Error(data);
    }
  }