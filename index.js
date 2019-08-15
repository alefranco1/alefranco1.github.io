let pageIndex = 1;

let streamData = (name) => {
    return fetch(`https://api.twitch.tv/kraken/search/streams?query=${name}&limit=${55}`, {
        method: 'GET', 
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin', 
        headers: {
            'Client-ID': APIKEY,
            'Accept': 'application/vnd.twitchtv.v5+json'
        },
        redirect: 'follow', 
        referrer: 'no-referrer', 
    })
    .then(response => response.json())
    .catch(error => console.error(error))
};

let onSearch = () => {
    let gameName = document.getElementById("searchbar").value;
    streamData(gameName).then((parsedJson) => {
        let total = parsedJson._total
        let list = parsedJson.streams.map((element)=> {
            return {
                description: element.channel.description,
                displayName: element.channel.display_name, 
                game: element.game,
                image: element.preview.medium,
                total: total,
                url: element.channel.url,
                viewers: element.viewers,
            };
        });
        console.log(list)
    });
};