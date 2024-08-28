window.onload = function () {


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
            });

            document.getElementById('timings').innerHTML = timingData;
            document.getElementById('footerAboutChurch').innerHTML = data.aboutChurch;


            //home page data insertion
            let homeEventRow = document.getElementById('homeEventRow');

            if (homeEventRow) {
                let eventHtml = "";
                eventHtml += `<div class="row"><h2 class="text-center">${data.event.title}</h2></div> <div class="row">`;
                Object.values(data.event.events).map((event) => {
                    console.log(event);
                    eventHtml += `<div class="col-md-4 col-sm-4">
                    <div class="card">
                        <img src="${event.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${event.title}</h5>
                            <hr>
                            <p class="card-text">${event.description}</p>
                            <p class="card-text"><small class="text-muted">${event.date + ",  " + event.time}</small></p>
                        </div>
                    </div>
                </div>`;
                }
                );
                eventHtml += "</div>";
                homeEventRow.innerHTML = eventHtml;
            }

            //about page data insertion
            let aboutChurch = document.getElementById('aboutChurch');
            let aboutPastor = document.getElementById('aboutPastor');
            let aboutHistory = document.getElementById('aboutHistory');
            let aboutVision = document.getElementById('aboutVision');
            let aboutMission = document.getElementById('aboutMission');





            //contacts page data insertion
            let contactAddress = document.getElementById('contactAddress');
            let contactPhone1 = document.getElementById('contactPhone1');
            let contactPhone2 = document.getElementById('contactPhone2');
            let contactEmail = document.getElementById('contactEmail');

            if (contactAddress) {
                contactAddress.innerHTML = data.address;
            }
            if (contactPhone1) {
                contactPhone1.innerHTML = data.phone1;
            }
            if (contactPhone2) {
                contactPhone2.innerHTML = data.phone2;
            }
            if (contactEmail) {
                contactEmail.innerHTML = data.email;
                contactEmail.href = "mailto:" + data.email;
            }




        })
        .catch(error => console.error('Error fetching data:', error));
};