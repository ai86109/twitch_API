const clientId = 'fftq7egbenuhg2t3lru0bgrqz9gmjm';
let apiUrl = 'https://api.twitch.tv/kraken/clips/top?&language=zh-tw&limit=50&period=week';

const request = new XMLHttpRequest();
getData();

window.onload = function(){
    document.querySelector('.select').addEventListener('click', function(e){
        if(e.target.classList.value === 'all custom-control-input'){
            getData()
        }else if(e.target.classList.value === 'lol custom-control-input'){
            game = encodeURIComponent('League of Legends');
            apiUrl = `https://api.twitch.tv/kraken/clips/top?&language=zh-tw&limit=50&period=week&game=${game}`;
            getData()
        }else if(e.target.classList.value === 'animal custom-control-input'){
            game = encodeURIComponent('Animal Crossing: New Horizons');
            apiUrl = `https://api.twitch.tv/kraken/clips/top?&language=zh-tw&limit=50&period=week&game=${game}`;
            getData()
        }
    })
}

function getData(){
    request.open('GET', apiUrl, true);
    request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
    request.setRequestHeader('Client-ID', clientId);
    request.send();
    request.onload = function(){
        if(request.status >= 200 && request.status < 400){
            const json = JSON.parse(request.responseText)
            const data = json.clips
            loadData(data)
        }else{
            console.log('err')
        }
    }
}

function loadData(data){
    document.querySelector('.card-group').innerHTML = '';
    for(let i=0; i<data.length; i++){
        const card = document.createElement('div')
        card.classList.add('card-list')
        card.innerHTML = `
        <div class="card-inner">
            <div class="rank">No.${i+1}</div>
            <div class="card-list__clip">
                <a href="${data[i].url}">
                    <img src="${data[i].thumbnails.medium}"/>
                </a>
            </div>
            <div class="card-list__body">
                    <a href="${data[i].broadcaster.channel_url}"><img src="${data[i].broadcaster.logo}"/></a>
                <div class="card-list_text">
                    <h2>${data[i].title}</h2>
                    <p>${data[i].broadcaster.display_name}</p>
                </div>
                <div class="card-list__views">${data[i].views} views</div>
            </div>
        </div>
        `
        document.querySelector('.card-group').appendChild(card)
    }
}