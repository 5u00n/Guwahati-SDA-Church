document.onload = function() {
    //load json file and print to console
    fetch('./../data/SiteData.json')
    .then(response => response.json())
    .then(data => console.log(data));


}