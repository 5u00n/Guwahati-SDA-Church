window.onload = function () {
    console.log('Global JS loaded');
    // Get the base URL of the current location
    const baseUrl = window.location.origin + window.location.pathname.replace(/\/$/, '');

    // Construct the full URL for the fetch request
    const dataUrl = `${baseUrl}/data/SiteData.json`;


    fetch(dataUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById('address').innerHTML = data.address;
            document.getElementById('phoneEmail').innerHTML = data.phone1 + "<br>" + data.phone2 + "<br>" + data.email;

            let timingData = "";
            Object.values(data.timings).map((timing) => {
                timingData += timing + "<br>";
                console.log(timing);
            });

            document.getElementById('timings').innerHTML = timingData;

        })
        .catch(error => console.error('Error fetching data:', error));
};