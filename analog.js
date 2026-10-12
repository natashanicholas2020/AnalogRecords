// ---------- Album data ----------
// To add an album, copy a { ... } block, paste it after a comma, and change the details.
const albums = [
    {
        title: "Kiss Me, Kiss Me, Kiss Me",
        artist: "The Cure",
        year: 1987,
        genres: ["Post-punk", "Alternative"],
        color: "#3b2f4a",
        cover: "images/kissmethecure.jpg"
    },
    {
        title: "Popstar",
        artist: "Tinashe",
        year: 2026,
        genres: ["Pop", "R&B", "Dance"],
        color: "#c94f7c",
        cover: "images/popstartinashe.jpg"
    }
];

// ---------- Elements on the page ----------
const crate = document.querySelector(".crate");
const crateFront = document.querySelector(".crate-front");
const arm = document.querySelector(".arm");
const record = document.querySelector(".record");

// ---------- Build a record in the crate for each album ----------
albums.forEach(function (album) {
    // 1. Create the record's div
    const albumDiv = document.createElement("div");

    // 2. Give it the "album" class so your CSS styles it
    albumDiv.classList.add("album");

    // 3. Set its placeholder color
    albumDiv.style.backgroundColor = album.color;
    albumDiv.style.backgroundImage = "url(" + album.cover + ")";

    // 4. Title
    const title = document.createElement("p");
    title.classList.add("album-title");
    title.textContent = album.title;
    albumDiv.appendChild(title);

    // 5. Artist
    const artist = document.createElement("p");
    artist.classList.add("album-artist");
    artist.textContent = album.artist;
    albumDiv.appendChild(artist);

    // 6. Put it in the crate, behind the front panel
    crate.insertBefore(albumDiv, crateFront);

        // Clicking a record puts its cover on the turntable
    albumDiv.addEventListener("click", function () {
        record.style.backgroundImage = "url(" + album.cover + ")";
    });
});

// ---------- Tonearm ----------
arm.addEventListener("click", function () {
    arm.classList.toggle("swinging");

    if (arm.classList.contains("swinging")) {
        // Arm is going down: wait for it to land, then start spinning
        setTimeout(function () {
            // Only start if the arm is still down when the timer finishes
            if (arm.classList.contains("swinging")) {
                record.classList.add("spinning");
            }
        }, 1000);
    } else {
        // Arm is lifting: stop the record right away
        record.classList.remove("spinning");
    }
});