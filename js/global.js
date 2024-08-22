window.onload = function () {
    console.log('Global JS loaded');


    // Determine if the current URL is a GitHub Pages URL
    const isGitHubPages = window.location.hostname.includes('github.io');

    // Construct the base URL
    const baseUrl = isGitHubPages
        ? window.location.origin + window.location.pathname.replace(/\/$/, '')
        : window.location.origin;

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