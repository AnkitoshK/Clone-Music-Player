console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "07 Channa Mereya - Arijit Singh 190Kbps", filePath: "07 Channa Mereya.mp3", coverPath: "covers/1.jpg"},
    {songName: "Kuch Is Tarah by Atif Aslam(audiosong.in)", filePath: "Kuch Is Tarah by Atif Aslam(audiosong.in).mp3", coverPath: "covers/2.jpg"},
    {songName: "Maine Royaan(PagalWorld.com.se)", filePath: "Maine Royaan(PagalWorld.com.se).mp3", coverPath: "covers/3.jpg"},
    {songName: "Maine Tera Naam Dil Rakh Diya", filePath: "Maine Tera Naam Dil Rakh Diya.mp3", coverPath: "covers/4.jpg"},
    {songName: "Pehli Dafa - Atif Aslam 320Kbps", filePath: "Pehli Dafa - Atif Aslam 320Kbps.mp3", coverPath: "covers/5.jpg"},
    {songName: "Tum Prem Ho Radhe - Jubin Nautiyal_320(PagalWorldl)", filePath: "Tum Prem Ho Radhe - Jubin Nautiyal_320(PagalWorldl).mp3", coverPath: "covers/6.jpg"},
    //{songName: "Phir Mohabbat - Arijit Singh - 320Kbps", filePath: "songs/2.mp3", coverPath: "covers/7.jpg"},
    {songName: "Phir Mohabbat - Arijit Singh - 320Kbps", filePath: "Phir Mohabbat - Arijit Singh - 320Kbps.mp3", coverPath: "covers/8.jpg"},
    {songName: "Toh Phir Aao Awarapan 128 Kbps", filePath: "Toh Phir Aao Awarapan 128 Kbps.mp3", coverPath: "covers/9.jpg"},
    {songName: "Tu Chodiyon Na(PagalWorld)", filePath: "Tu Chodiyon Na(PagalWorld).mp3", coverPath: "covers/10.jpg"},
]

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})


// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})