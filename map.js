function initializeMap(revolutions, rpm) {
    // Initialize map
    const map = L.map('map', {
        crs: L.CRS.EPSG3857, // EPSG3857 coordinate reference system
        center: [48.8566, 2.3522],
        zoom: 4
    });

    // Ad map layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add revolution points
    revolutions.forEach(revolution => {
        const { name, latitude, longitude, details } = revolution;

        // Add pointer
        L.marker([latitude, longitude])
            .addTo(map)
            .bindPopup(`<b>${name}</b><br>${details}`); // Popup
    });

    // Set rotation speed (radian/minute)
    const rotationSpeed = 10000 * rpm * 2 * Math.PI / 60; // Convert RPM to radian and speed it up a bit

    //Start rotation animation
    function rotateMap() {
        const mapElement = document.getElementById('map');
        let rotation = 0;
        function animate() {
            rotation += rotationSpeed;
            mapElement.style.transform = `rotate(${rotation}rad)`;
            requestAnimationFrame(animate);
        }
        animate();
    }

    rotateMap();
}

