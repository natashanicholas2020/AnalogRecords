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
    },
    {
        title: "Youngblood",
        artist: "5 Seconds of Summer",
        year: 2018,
        genres: ["Pop", "Pop rock"],
        color: "#1f2a44",
        cover: "images/youngblood5sos.jpg"
    }
];

// ---------- Elements on the page ----------
const crate = document.querySelector(".crate");
const crateFront = document.querySelector(".crate-front");
const arm = document.querySelector(".arm");
const record = document.querySelector(".record");
const label = document.querySelector(".outer");

// ---------- Build a record in the crate for each album ----------
albums.forEach(function (album) {
    // 1. Create the record's div
    const albumDiv = document.createElement("div");

    // 2. Give it the "album" class so your CSS styles it
    albumDiv.classList.add("album");

    // 3. Set its cover (the color shows if the image fails to load)
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

    // Clicking a record puts its cover on the turntable's label
    albumDiv.addEventListener("click", function () {
        label.style.backgroundImage = "url(" + album.cover + ")";
        label.style.backgroundColor = album.color;
    });
});

// ---------- Overlap the records so they always fit in the crate ----------
function layoutCrate() {
    const albumDivs = crate.querySelectorAll(".album");
    const count = albumDivs.length;
    if (count < 2) return;   // one record doesn't need to overlap

    // Space inside the crate, not counting its padding
    const style = getComputedStyle(crate);
    const available = crate.clientWidth
        - parseFloat(style.paddingLeft)
        - parseFloat(style.paddingRight);

    const albumWidth = albumDivs[0].offsetWidth;

    // Distance from one record's left edge to the next.
    // Never more than the record's width plus a 20px gap.
    const step = Math.min(albumWidth + 20, (available - albumWidth) / (count - 1));

    // Pull every record after the first one left to overlap the one before it
    albumDivs.forEach(function (div, i) {
        if (i > 0) {
            div.style.marginLeft = (step - albumWidth) + "px";
        }
    });
}

layoutCrate();

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