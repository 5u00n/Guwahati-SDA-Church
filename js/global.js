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
                console.log(timing);
            });

            document.getElementById('timings').innerHTML = timingData;
            document.getElementById('footerAboutChurch').innerHTML = data.aboutChurch;

            //contacts page data
            let contactAddress=document.getElementById('contactAddress');
            let contactPhone1=document.getElementById('contactPhone1');
            let contactPhone2=document.getElementById('contactPhone2');
            let contactEmail=document.getElementById('contactEmail');

            if(contactAddress){
                contactAddress.innerHTML=data.address;
            }
            if(contactPhone1){
                contactPhone1.innerHTML=data.phone1;
            }
            if(contactPhone2){
                contactPhone2.innerHTML=data.phone2;
            }
            if(contactEmail){
                contactEmail.innerHTML=data.email;
                contactEmail.href="mailto:"+data.email;
            }
            



        })
        .catch(error => console.error('Error fetching data:', error));
};