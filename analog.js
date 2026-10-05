const arm = document.querySelector(".arm");
const record = document.querySelector(".record");

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

const albums = [
    {
        title: "Kiss Me, Kiss Me, Kiss Me",
        artist: "The Cure",
        year: 1987,
        genres: ["Post-punk", "Alternative"],
        color: "#3b2f4a"
    }
];