function calculate() {
    // Get unix time and convert to minute
    var now = Math.floor(Date.now() / 1000);
    now = Math.floor(now / 60); // time as minute

    // Add time as minute from French Revolution to beginning of unix time
    var totalTime = now + 94916160; // 94916160 minutes

    // JSON dosyasını al ve işleme
    fetch('revolutions.json')
        .then(response => response.json())
        .then(data => {
            const revolutions = data.revolutions; // Get array of revolutions
            const count = revolutions.length; // Get amounth of revolutions happened

            // Calculate rpm
            const rpm = count / totalTime;

            // Print
            document.getElementById("rpm").innerText = "There is " + rpm.toFixed(10) + " revolution per minute since French Revolution";

            // Initialize map processes
            initializeMap(revolutions, rpm);
        })
        .catch(error => console.error('Hata:', error));
}

// Run on load
window.onload = calculate;

