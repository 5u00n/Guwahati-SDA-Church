window.onload = function () {
    console.log('Global JS loaded');
    fetch('./../data/SiteData.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('address').innerHTML = data.address;
            document.getElementById('timings').innerHTML = data.timings;
            document.getElementById('phoneEmail').innerHTML = data.phone1 + "<br>" + data.phone2 + "<br>" + data.email;
        })
        .catch(error => console.error('Error fetching data:', error));
};