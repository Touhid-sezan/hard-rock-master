// Capturing elements by id
const searchInput = document.getElementById('search-input');
const result = document.getElementById('result');
const searchButton = document.getElementById('search-btn');

/// api URL ///
const apiURL = 'https://api.lyrics.ovh';


// Search Button clicking event listener setup
searchButton.addEventListener('click', e=> {
    e.preventDefault();
    searchValue = searchInput.value.trim();

    if(!searchValue){
        alert("There is nothing to search");
    }
    else{ 
        searchSong(searchValue);
    }
})

//Search song from api
async function searchSong(searchValue){
    const searchResult = await fetch(`${apiURL}/suggest/${searchValue}`)
    const data = await searchResult.json();

    showData(data);
}

//Show final result 
function showData(data){
  
    result.innerHTML = `<ol class="song-list">
      ${data.data.slice(0, 10)
        .map(song=> `<li>
                    <div>
                        <strong>${song.title}</strong> by ${song.artist.name} 
                    </div>
                    <span data-artist="${song.artist.name}" data-songtitle="${song.title}"> get lyrics</span>
                </li>`
        )
        .join('')}
    </ol>`;
}


//event listener in get lyrics button
result.addEventListener('click', e=>{
    const clickedElement = e.target;

    //checking clicked elemet is button or not
    if (clickedElement.tagName === 'SPAN'){
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-songtitle');
        
        getLyrics(artist, songTitle)
    }
})

// Show lyrics for song
async function getLyrics(artist, songTitle) {
  
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);

    const data = await res.json();
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
    result.innerHTML = ` 
    <h4 style="margin-bottom:30px;">Title: ${songTitle} - <strong>Artist: ${artist}</strong></h4><ul>
    <div data-artist="${artist}" data-songtitle="${songTitle}"></div>
    <p style="margin-top:20px;">${lyrics}</p>
    `       
}
