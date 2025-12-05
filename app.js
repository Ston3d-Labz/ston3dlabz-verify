// Hier landen alle Plates, nachdem wir plates.json geladen haben
let plateIndex = {};
let dataLoaded = false;

// JSON laden und in eine Chip-ID → Info Map umwandeln
async function loadPlates() {
    try {
        const response = await fetch("plates.json");
        if (!response.ok) {
            throw new Error("Fehler beim Laden der plates.json");
        }

        const data = await response.json();

        // Erwartete Struktur: data.designs[designName].plates[chipId]
        if (data.designs) {
            for (const [designName, designObj] of Object.entries(data.designs)) {
                const editionSize = designObj.edition_size || 420;
                const plates = designObj.plates || {};
                const collection = designObj.collection || null; // NEU

                for (const [chipId, plateInfo] of Object.entries(plates)) {
                    plateIndex[chipId] = {
                        design: designName,
                        number: plateInfo.number,
                        edition_size: editionSize,
                        status: plateInfo.status || "valid",
                        collection: collection // NEU
                    };
                }
            }
        }

        dataLoaded = true;
        console.log("Plates geladen:", plateIndex);
    } catch (err) {
        console.error("Fehler beim Laden der Plates:", err);
    }
}

// Direkt beim Laden der Seite Daten holen
loadPlates();


// Hauptfunktion: Chip-ID prüfen
function verify() {
    const input = document.getElementById("chipInput").value.trim();
    const resultBox = document.getElementById("result");

    if (!input) {
        resultBox.innerText = "Bitte eine Chip-ID eingeben.";
        resultBox.style.color = "#ff5050";
        return;
    }

    if (!dataLoaded) {
        resultBox.innerText = "Daten werden noch geladen. Bitte kurz warten und erneut prüfen.";
        resultBox.style.color = "#ffcc00";
        return;
    }

    const entry = plateIndex[input];

    if (entry) {
        // Falls keine Kollektion gesetzt ist, lassen wir die Zeile einfach weg
        const collectionLine = entry.collection
            ? `<br>Kollektion: ${entry.collection}`
            : "";

        resultBox.innerHTML =
            `✔ Original Plate<br>
             Design: ${entry.design}<br>
             Nummer: ${entry.number} / ${entry.edition_size}` +
             collectionLine +
            `<br>Status: ${entry.status}`;

        resultBox.style.color = "#21ff94";
    } else {
        resultBox.innerHTML = "✘ Nicht registriert";
        resultBox.style.color = "#ff5050";
    }
}
