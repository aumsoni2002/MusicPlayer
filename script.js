console.log("Welcome to Aum Music Player.");

//Initializing the variables

let songIndex = 0;
let audioElement = new Audio("songs/1.mp3"); // this is how we can save an audio into a variable.
let masterPlay = document.getElementById("masterPlay");
let masterPlay1 = document.getElementById("masterPlay1");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let masterSongName1 = document.getElementById("masterSongName1");
let seekBar = document.getElementById("seekBar");
let bottom = document.getElementsByClassName('bottom')
let volume = document.getElementById("volume");
let songItems = Array.from(document.getElementsByClassName("songItem"));
 

// this is an array object which contains all song names, where the songs are located and where the cover images are located
// through this object we will change the cover images and song names.
let songs = [
  {
    songName: "Falak Tak",
    filePath: "songs/1.mp3",
    coverPath: "covers/1.jpg",
  },
  {
    songName: "Pani Da Rang",
    filePath: "songs/2.mp3",
    coverPath: "covers/2.jpg",
  },
  {
    songName: "Yeh Fitoor Mera",
    filePath: "songs/3.mp3",
    coverPath: "covers/3.jpg",
  },
  {
    songName: "Nashe Si Chadh Gayi",
    filePath: "songs/4.mp3",
    coverPath: "covers/4.jpg",
  },
  {
    songName: "Raataan Lambiyan",
    filePath: "songs/5.mp3",
    coverPath: "covers/5.jpg",
  },
  {
    songName: "Pal Pal... Har Pal",
    filePath: "songs/6.mp3",
    coverPath: "covers/6.jpg",
  },
  {
    songName: "Dil Kyun Yeh Mera",
    filePath: "songs/7.mp3",
    coverPath: "covers/7.jpg",
  },
  {
    songName: "Ghungroo",
    filePath: "songs/8.mp3",
    coverPath: "covers/8.jpg",
  },
  {
    songName: "Dil Diyan Gallan",
    filePath: "songs/9.mp3",
    coverPath: "covers/9.jpg",
  },
  {
    songName: "Kabhi Kabhi Aditi",
    filePath: "songs/10.mp3",
    coverPath: "covers/10.jpg",
  },
];

// through this function we can change the song names and cover images.
songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// handling play/pause click

// here if anyone click on the master play button then two actions will be made.
// 1. if the audio is paused or have never been played, it will start playing.
// 2. if the audio is playing it will be paused.
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    // 1.
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle"); // it will remove the play button once i click on that button.
    masterPlay.classList.add("fa-pause-circle"); // it will add the pause button once i click on that button.
    gif.style.opacity = 1; // it will change the opacity of the gif to 1, so it will display the gif.
  } else {
    // 2.
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle"); // it will remove the pause button once i click on that button.
    masterPlay.classList.add("fa-play-circle"); // it will add the play button once i click on that button.
    gif.style.opacity = 0; // it will change the opacity of the gif to 0, so it will not display the gif.
  }
});

// counting seconds of the music through 'timeUpdate' event.
audioElement.addEventListener("timeupdate", () => {
  //now we will update the seekbar
  // the below method will save the progress time into the variable 'progress'
  // method is current time of the song divide by total time into 100.(it will give the current time in percentage form)
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

// now we will make the seekbar work, for eg -- if we want to listen to the song at any perticular time.
myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

// this will change the pause buttons into play buttons
// use Array.from, when one same class name is given to many elements and you want changes in all of them.
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-pause-circle");
      element.classList.add("fa-play-circle");
    }
  );
};

// this function will do several things once you click on those small play buttons
// it will start any particular song by clicking on its particular play button.
// it will change the play buttons into pause buttons.
Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      makeAllPlays();
      songIndex = parseInt(e.target.id);
      e.target.classList.remove("fa-play-circle");
      e.target.classList.add("fa-pause-circle");
      audioElement.src = `songs/${songIndex + 1}.mp3`;
      masterSongName.innerText = songs[songIndex].songName;
      masterSongName1.innerText = songs[songIndex].songName;
      audioElement.currentTime = 0;
      audioElement.play();
      gif.style.opacity = 1;
      masterPlay.classList.remove("fa-play-circle");
      masterPlay.classList.add("fa-pause-circle");
      masterPlay1.classList.remove("fa-play-circle");
      masterPlay1.classList.add("fa-pause-circle");
    });
  }
);

// Now we will work on forward button which will play the next song in line
document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 9) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  masterSongName1.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});

// Now we will work on backward button which will play the previous song in line
document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  masterSongName1.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});

// Now i will do the same thing but for the different buttons

// for previous1 ID
document.getElementById("previous1").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  masterSongName1.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay1.classList.remove("fa-play-circle");
  masterPlay1.classList.add("fa-pause-circle");
});

// for next1 ID
document.getElementById("next1").addEventListener("click", () => {
  if (songIndex >= 9) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  masterSongName1.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay1.classList.remove("fa-play-circle");
  masterPlay1.classList.add("fa-pause-circle");
});

// for masterplay1 ID
masterPlay1.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    // 1.
    audioElement.play();
    masterPlay1.classList.remove("fa-play-circle"); // it will remove the play button once i click on that button.
    masterPlay1.classList.add("fa-pause-circle"); // it will add the pause button once i click on that button.
    gif.style.opacity = 1; // it will change the opacity of the gif to 1, so it will display the gif.
  } else {
    // 2.
    audioElement.pause();
    masterPlay1.classList.remove("fa-pause-circle"); // it will remove the pause button once i click on that button.
    masterPlay1.classList.add("fa-play-circle"); // it will add the play button once i click on that button.
    gif.style.opacity = 0; // it will change the opacity of the gif to 0, so it will not display the gif.
  }
});

function myFunction() {
  var x = document.getElementById("myDIV");
  if (x.style.opacity === "0") {
    x.style.opacity = "1";
  } else {
    x.style.opacity = "0";
  }
}


volume.addEventListener('change', (e) =>{
  audioElement.volume = e.currentTarget.value / 100;
});

