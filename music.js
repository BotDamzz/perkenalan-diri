const songs = [

    {
        title: "Lagu Favorit 1",
        artist: "Feby Putri",
        audio: "lagu1.mp3",
        cover: "cover1.jpg"
    },

    {
        title: "Lagu Favorit 2",
        artist: "Penyanyi 2",
        audio: "music/lagu2.mp3",
        cover: "images/cover2.jpg"
    },

    {
        title: "Lagu Favorit 3",
        artist: "Penyanyi 3",
        audio: "music/lagu3.mp3",
        cover: "images/cover3.jpg"
    },

    {
        title: "Lagu Favorit 4",
        artist: "Penyanyi 4",
        audio: "music/lagu4.mp3",
        cover: "images/cover4.jpg"
    },

    {
        title: "Lagu Favorit 5",
        artist: "Penyanyi 5",
        audio: "music/lagu5.mp3",
        cover: "images/cover5.jpg"
    }

];


const audio =
    document.getElementById("audio");

const cover =
    document.getElementById("cover");

const title =
    document.getElementById("songTitle");

const artist =
    document.getElementById("artist");

const playBtn =
    document.getElementById("playBtn");

const prevBtn =
    document.getElementById("prevBtn");

const nextBtn =
    document.getElementById("nextBtn");

const progress =
    document.getElementById("progress");

const volume =
    document.getElementById("volume");

const currentTime =
    document.getElementById("currentTime");

const duration =
    document.getElementById("duration");

const playlistItems =
    document.getElementById("playlistItems");


let songIndex = 0;


/* =========================
   LOAD SONG
========================= */

function loadSong(index) {

    const song =
        songs[index];

    title.textContent =
        song.title;

    artist.textContent =
        song.artist;

    cover.src =
        song.cover;

    audio.src =
        song.audio;


    createPlaylist();


    progress.value = 0;

}


loadSong(songIndex);


/* =========================
   PLAY
========================= */

function playSong() {

    audio.play();

    playBtn.textContent =
        "⏸";

}


function pauseSong() {

    audio.pause();

    playBtn.textContent =
        "▶";

}


playBtn.addEventListener(
    "click",
    () => {

        if (audio.paused) {

            playSong();

        } else {

            pauseSong();

        }

    }
);


/* =========================
   NEXT
========================= */

nextBtn.addEventListener(
    "click",
    () => {

        songIndex++;

        if (
            songIndex >=
            songs.length
        ) {

            songIndex = 0;

        }

        loadSong(songIndex);

        playSong();

    }
);


/* =========================
   PREVIOUS
========================= */

prevBtn.addEventListener(
    "click",
    () => {

        songIndex--;

        if (
            songIndex < 0
        ) {

            songIndex =
                songs.length - 1;

        }

        loadSong(songIndex);

        playSong();

    }
);


/* =========================
   PROGRESS
========================= */

audio.addEventListener(
    "loadedmetadata",
    () => {

        duration.textContent =
            formatTime(audio.duration);

    }
);


audio.addEventListener(
    "timeupdate",
    () => {

        if (!audio.duration) return;

        const percent =
            (
                audio.currentTime /
                audio.duration
            ) * 100;


        progress.value =
            percent;


        currentTime.textContent =
            formatTime(
                audio.currentTime
            );

    }
);


progress.addEventListener(
    "input",
    () => {

        if (!audio.duration)
            return;


        audio.currentTime =
            (
                progress.value / 100
            ) *
            audio.duration;

    }
);


/* =========================
   AUTO NEXT
========================= */

audio.addEventListener(
    "ended",
    () => {

        nextBtn.click();

    }
);


/* =========================
   VOLUME
========================= */

audio.volume =
    volume.value;


volume.addEventListener(
    "input",
    () => {

        audio.volume =
            volume.value;

    }
);


/* =========================
   FORMAT TIME
========================= */

function formatTime(seconds) {

    if (
        isNaN(seconds)
    ) {

        return "0:00";

    }


    const minutes =
        Math.floor(
            seconds / 60
        );


    const secs =
        Math.floor(
            seconds % 60
        );


    return (
        minutes +
        ":" +
        secs
            .toString()
            .padStart(2, "0")
    );

}


/* =========================
   PLAYLIST
========================= */

function createPlaylist() {

    playlistItems.innerHTML =
        "";


    songs.forEach(
        (song, index) => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "song-item";


            if (
                index === songIndex
            ) {

                item.classList.add(
                    "active"
                );

            }


            item.innerHTML = `

                <div class="song-number">
                    ${String(index + 1).padStart(2, "0")}
                </div>

                <img
                    src="${song.cover}"
                    alt="Cover"
                >

                <div class="song-text">

                    <strong>
                        ${song.title}
                    </strong>

                    <small>
                        ${song.artist}
                    </small>

                </div>

            `;


            item.addEventListener(
                "click",
                () => {

                    songIndex =
                        index;

                    loadSong(
                        songIndex
                    );

                    playSong();

                }
            );


            playlistItems.appendChild(
                item
            );

        }
    );

}


/* =========================
   KEYBOARD
========================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.code ===
            "Space"
        ) {

            event.preventDefault();

            playBtn.click();

        }


        if (
            event.code ===
            "ArrowRight"
        ) {

            nextBtn.click();

        }


        if (
            event.code ===
            "ArrowLeft"
        ) {

            prevBtn.click();

        }

    }
);
