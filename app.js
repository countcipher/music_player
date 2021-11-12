const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const record = document.querySelector('img-container');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const volumeControl = document.getElementById('volume-control');

//SONG TITLES
//========================================
const songs = ['hey', 'summer', 'ukulele'];

//KEEP TRACK OF SONG
//========================================
let songIndex = 0;

//INITIALLY LOAD SONG DETAILS INTO DOM
//========================================
loadSong(songs[songIndex]);

//UPDATE SONG DETAILS
//========================================
function loadSong(song){
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}

//PLAY SONG
//========================================
function playSong(){
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    
    /*audio.volume = .2;*/
    
    audio.play();
}

//PAUSE SONG
//========================================
function pauseSong(){
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    
    audio.pause();
}

//PLAY PREVIOUS SONG
//========================================
function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex]);
    
    if(musicContainer.classList.contains('play')){
        audio.play();
    }
}

//PLAY NEXT SONG
//=========================================
function nextSong(){
    songIndex++;
    if(songIndex === songs.length){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    
    if(musicContainer.classList.contains('play')){
        audio.play();
    }

}
//UPDATE PROGRESS BAR
//========================================
function updateProgress(){
    const audioPlayed = audio.currentTime / audio.duration * 100;
    
    progress.style.width = `${audioPlayed}%`;
}
//SKIP FORWARD/BACKWARD ON SONG DURING PLAYBACK
//==========================================
function setProgress(e){
    const progressBarWidth = this.clientWidth;
    const skipTo = e.offsetX;
    const audioDuration = audio.duration;
    
    audio.currentTime = skipTo / progressBarWidth * audioDuration;
}

//AUTOMATICALLY GO TO NEXT SONG WHEN CURRENT SONG FINISHES
//========================================================
function automaticallyGoToNextSong(){
    const audioPlayed = audio.currentTime;
    const totalAudio = audio.duration;
    
    if(audioPlayed == totalAudio){
        nextSong();
    }
}

//CHANGE VOLUME
//=========================================
function changeVolume(){
    console.log(volumeControl.value);
    audio.volume = volumeControl.value;
}

//EVENT LISTENERS
//=========================================
playBtn.addEventListener('click', () => {
    //const isPlaying = musicContainer.classList.contains('play');
    
    if(musicContainer.classList.contains('play')){
        pauseSong();
    }else{
        playSong();
    }
});
//Change songs
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

//Update progress bar in conjunction with audio progress
audio.addEventListener('timeupdate', updateProgress);

//Click on progress bar to skip forward/backward on song
progressContainer.addEventListener('click', setProgress);

//Automatically go to next song when previous song ends
audio.addEventListener('timeupdate', automaticallyGoToNextSong);

//Change volumeControl
volumeControl.addEventListener('change', changeVolume);
