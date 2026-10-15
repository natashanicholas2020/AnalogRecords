// ---------- Album data ----------
// To add an album, copy a { ... } block, paste it after a comma, and change the details.
const albums = [
    {
        title: "Youngblood",
        artist: "5 Seconds of Summer",
        year: 2018,
        genres: ["Pop", "Pop rock"],
        color: "#1f2a44",
        cover: "images/youngblood5sos.jpg",
        preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/3a/65/f7/3a65f7ac-ee1f-fe43-7d15-7cdabadbaa8c/mzaf_15806045478662929773.plus.aac.p.m4a",
        song: "Want You Back",
        appleMusicUrl: "https://music.apple.com/us/album/youngblood/1369109452?uo=4"
    },
    {
        title: "Kiss Me, Kiss Me, Kiss Me",
        artist: "The Cure",
        year: 1987,
        genres: ["Post-punk", "Alternative"],
        color: "#3b2f4a",
        cover: "images/kissmethecure.jpg",
        preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/86/96/49/8696498e-c448-fd66-7d3f-b02fe43ea12d/mzaf_6925694512417375942.plus.aac.p.m4a",
        song: "Just Like Heaven",
        appleMusicUrl: "https://music.apple.com/us/album/kiss-me-kiss-me-kiss-me/31739756?uo=4"
    },
    {
        title: "Popstar",
        artist: "Tinashe",
        year: 2026,
        genres: ["Pop", "R&B", "Dance"],
        color: "#c94f7c",
        cover: "images/popstartinashe.jpg",
        preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/f2/93/6a/f2936a39-3f56-1b6d-e794-5c97dccf987c/mzaf_9328482400229579607.plus.aac.p.m4a",
        song: "Melatonin",
        appleMusicUrl: "https://music.apple.com/us/album/popstar/6789739137?uo=4"
    },
    {
        title: "we had fun, didn't we? (deluxe)",
        artist: "VIBI",
        year: 2025,
        genres: ["Pop"],
        color: "#8c2a1a",
        cover: "images/wehadfunvibi.jpg",
        preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/cc/cc/51/cccc514d-963d-a8ff-afc6-65457a7691e9/mzaf_14584114302282343144.plus.aac.p.m4a",
        song: "homesafe",
        appleMusicUrl: "https://music.apple.com/us/album/we-had-fun-didnt-we-deluxe/1796930482?uo=4"
    }
];

// ---------- Elements on the page ----------
const crate = document.querySelector(".crate");
const crateFront = document.querySelector(".crate-front");
const arm = document.querySelector(".arm");
const record = document.querySelector(".record");
const label = document.querySelector(".outer");
const displayText = document.querySelector(".display-text");

// ---------- Audio ----------
const player = new Audio();
let currentPreview = null;   // the preview for the record on the turntable

// Lifts the needle and stops the record and music
function liftNeedle() {
    arm.classList.remove("swinging");
    record.classList.remove("spinning");
    player.pause();
}

// ---------- Crate settings ----------
const ALBUMS_PER_ROW = 4;
const CRATE_BOTTOM = 1005;   // the turntable's bottom edge (75 + 850 + 40 + 40)

// ---------- Build the records in the crate, in rows ----------
let currentRow = null;

albums.forEach(function (album, index) {
    // Start a new row every 4 albums (at index 0, 4, 8, ...)
    if (index % ALBUMS_PER_ROW === 0) {
        currentRow = document.createElement("div");
        currentRow.classList.add("crate-row");
        crate.insertBefore(currentRow, crateFront);
    }

    // Create the record and give it the "album" class
    const albumDiv = document.createElement("div");
    albumDiv.classList.add("album");

    // Set its cover (the color shows if the image fails to load)
    albumDiv.style.backgroundColor = album.color;
    albumDiv.style.backgroundImage = "url(" + album.cover + ")";

    // Show the title and artist when someone hovers over the cover
    albumDiv.title = album.title + " by " + album.artist;

    // Put it in the current row
    currentRow.appendChild(albumDiv);

    // Clicking a record puts it on the turntable
    albumDiv.addEventListener("click", function () {
        label.style.backgroundImage = "url(" + album.cover + ")";
        label.style.backgroundColor = album.color;

        // Show the song and artist on the display
        displayText.textContent = (album.song || album.title) + " - " + album.artist;

        // Switching records lifts the needle first
        liftNeedle();

        // Load this record's preview, if it has one
        currentPreview = album.preview || null;
        if (currentPreview) {
            player.src = currentPreview;
        }
    });
});

// ---------- Overlap the records and size the crate ----------
function layoutCrate() {
    const firstAlbum = crate.querySelector(".album");
    if (!firstAlbum) return;   // empty crate, nothing to lay out

    // Space inside the crate, not counting its padding
    const style = getComputedStyle(crate);
    const available = crate.clientWidth
        - parseFloat(style.paddingLeft)
        - parseFloat(style.paddingRight);

    const albumWidth = firstAlbum.offsetWidth;

    // Spacing that fits exactly 4 records across a row
    const step = Math.min(albumWidth + 20, (available - albumWidth) / (ALBUMS_PER_ROW - 1));

    // In every row, overlap each record after the first
    crate.querySelectorAll(".crate-row").forEach(function (row) {
        row.querySelectorAll(".album").forEach(function (div, i) {
            if (i > 0) {
                div.style.marginLeft = (step - albumWidth) + "px";
            }
        });
    });

    // Move the crate's top up so its bottom stays at the turntable's bottom edge
    crate.style.top = (CRATE_BOTTOM - crate.offsetHeight) + "px";
}

layoutCrate();

// ---------- Tonearm ----------
arm.addEventListener("click", function () {
    arm.classList.toggle("swinging");

    if (arm.classList.contains("swinging")) {
        // Arm is going down: wait for it to land, then start the record and music
        setTimeout(function () {
            // Only start if the arm is still down when the timer finishes
            if (arm.classList.contains("swinging")) {
                record.classList.add("spinning");
                if (currentPreview) {
                    player.play();
                }
            }
        }, 1000);
    } else {
        // Arm is lifting: stop the record and music right away
        liftNeedle();
    }
});

// When the 30-second preview ends, lift the needle
player.addEventListener("ended", liftNeedle);