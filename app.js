// Temporäre Testdaten (später ersetzen wir das durch plates.json)
const plates = {
    "TEST-123": {
        design: "Astronaut",
        number: 1,
        edition_size: 420,
        status: "valid"
    },
    "TEST-999": {
        design: "Medusa",
        number: 13,
        edition_size: 420,
        status: "valid"
    }
};


// Hauptfunktion: Chip-ID prüfen
function verify() {
    const input = document.getElementById("chipInput").value.trim();
    const resultBox = document.getElementById("result");

    if (!input) {
        resultBox.innerText = "Bitte eine Chip-ID eingeben.";
        resultBox.style.color = "#ff5050";
        return;
    }

    const entry = plates[input];

    if (entry) {
        resultBox.innerHTML =
            `✔ Original Plate<br>
             Design: ${entry.design}<br>
             Nummer: ${entry.number} / ${entry.edition_size}<br>
             Status: ${entry.status}`;
        resultBox.style.color = "#21ff94";
    } else {
        resultBox.innerHTML = "✘ Nicht registriert";
        resultBox.style.color = "#ff5050";
    }
}

