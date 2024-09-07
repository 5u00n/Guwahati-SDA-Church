window.onload = function () {



    const hostname = window.location.hostname;

    console.log("hostname : ", hostname, hostname.includes("web.app"));


    //load from firebase hosted site
    if (hostname.includes("web.app")) {
        try {
            const firebaseConfig = {
                apiKey: "AIzaSyAqUtzpaSR6L0FWEbtIT28HKPDLD_beRv8",
                authDomain: "guwahati-sda-church.firebaseapp.com",
                databaseURL: "https://guwahati-sda-church-default-rtdb.firebaseio.com",
                projectId: "guwahati-sda-church",
                storageBucket: "guwahati-sda-church.appspot.com",
                messagingSenderId: "1018011197869",
                appId: "1:1018011197869:web:019377c2e546a11610c124",
                measurementId: "G-L66SBJRMPW"
            };


            firebase.initializeApp(firebaseConfig);
            firebase.database().ref('/').on('value', snapshot => {
                let data = snapshot.val();

                loadDataToDocument(data)



            });
        } catch (e) {
            console.error(e);
        }
    } else {

        // Determine if the current URL is a GitHub Pages URL
        const isGitHubPages = window.location.hostname.includes('github.io');

        // Construct the base URL
        const baseUrl = isGitHubPages ? window.location.origin + window.location.pathname.replace(/\/$/, '') : window.location.origin;

        // Construct the full URL for the fetch request
        const dataUrl = `${baseUrl}/data/SiteData.json`;



        fetch(dataUrl)
            .then(response => response.json())
            .then(data => {
                loadDataToDocument(data);


            })
            .catch(error => console.error('Error fetching data:', error));
    }
};

function loadDataToDocument(data) {
    // console.log(data);

    // Update the document 
    document.getElementById('address').innerHTML = data.address;
    document.getElementById('phoneEmail').innerHTML = data.phone1 + "<br>" + data.phone2 + "<br>" + data.email;

    let timingData = "";
    Object.values(data.timings).map((timing) => {
        timingData += timing + "<br>";
    });

    document.getElementById('timings').innerHTML = timingData;
    document.getElementById('footerAboutChurch').innerHTML = data.aboutChurch;


    //------------------------------------------------------------------
    //home page data insertion
    //------------------------------------------------------------------

    const chapterName1Elem = document.getElementById("chapterName1");
    const chapterName2Elem = document.getElementById("chapterName2");
    const scripture1Elem = document.getElementById("scripture1");
    const scripture2Elem = document.getElementById("scripture2");

    if (chapterName1Elem) {
        chapterName1Elem.innerHTML = data.home.hero.chapterName1;
    }

    if (chapterName2Elem) {
        chapterName2Elem.innerHTML = data.home.hero.chapterName2;
    }

    if (scripture1Elem) {
        scripture1Elem.innerHTML = data.home.hero.scripture1;
    }

    if (scripture2Elem) {
        scripture2Elem.innerHTML = data.home.hero.scripture2;
    }

    var text1 = data.home.hero.imageText1.t1 + "<span style='font-size:39px;text-decoration:underline;color:#D3CAFFB1;font-style:italic;'> " + data.home.hero.imageText1.t2 + "</span>";
    var text2 = data.home.hero.imageText2.t1 + "<span style='font-size:39px;text-decoration:underline;color:#CEC3FFB3;font-style:italic;'> " + data.home.hero.imageText2.t2 + "</span>";
    var url1 = data.home.hero.image1;
    var url2 = data.home.hero.image2;
    const heroImage1Elem = document.getElementById("heroImage1");
    const heroImage2Elem = document.getElementById("heroImage2");
    const imageText1Elem = document.getElementById("imageText1");
    const imageText2Elem = document.getElementById("imageText2");

    if (heroImage1Elem) {
        heroImage1Elem.style.backgroundImage = "url(" + url1 + ")";
        heroImage1Elem.style.backgroundSize = "cover";
    }

    if (heroImage2Elem) {
        heroImage2Elem.style.backgroundImage = "url(" + url2 + ")";
        heroImage2Elem.style.backgroundSize = "cover";
    }

    if (imageText1Elem) {
        imageText1Elem.innerHTML = text1;
    }

    if (imageText2Elem) {
        imageText2Elem.innerHTML = text2;
    }

    let heroImageEvent = document.getElementById('heroImageEvent');

    if (heroImageEvent) {

        if (data.event.events) {
            let closestEvent = getClosestFutureEvent(data.event);
            if (closestEvent) {
                heroImageEvent.style.backgroundImage = "url(" + closestEvent.image + ")";
                heroImageEvent.style.backgroundSize = "cover";
                heroImageEvent.style.backgroundPosition = "center";
                heroImageEvent.style.backgroundRepeat = "no-repeat";
            }
            //load if any image is to be loaded by default
        }
    }

    var aboutCardHtml = "";
    Object.values(data.home.aboutUs).map(element => {
        aboutCardHtml += "<div class='col-md-4 col-sm-4 featured-block'>"
        aboutCardHtml += "<h3 >" + element.title + "</h3>";
        aboutCardHtml += "<figure>";
        aboutCardHtml += "<a href='" + element.link + "'>"
        aboutCardHtml += "<img src='" + element.image + "' alt=" + element.title + " width='800' height='500' /></a>";
        aboutCardHtml += "</figure>";
        aboutCardHtml += "<p>" + element.description + "</p>";
        aboutCardHtml += "<a href='" + element.buttonLink + "' class='btn btn-success'>" + element.buttonText + "</a>";
        aboutCardHtml += "</div>";
    }
    );

    const aboutCard = document.getElementById("aboutCard");
    if (aboutCard) {
        aboutCard.innerHTML = aboutCardHtml;
    }


    let homeEventRow = document.getElementById('homeEventRow');

    if (homeEventRow && data.event.events) {
        let eventHtml = "";
        eventHtml += `<div><h2 class="text-center">${data.event.title}</h2></div> <div >`;
        Object.values(data.event.events).map((event) => {

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

    //------------------------------------------------------------------
    //About page data insertion
    //------------------------------------------------------------------
    const aboutHeroImage = document.getElementById('aboutHeroImage');
    let aboutChurch = document.getElementById('aboutChurchTitle');
    let aboutChurchDesc = document.getElementById('aboutChurchDesc');
    let aboutInfoCards = document.getElementById('aboutInfoCards');
    let aboutLeaders = document.getElementById('aboutLeaders');
    let history = document.getElementById('aboutHistory');

    if (aboutHeroImage) {
        aboutHeroImage.style.backgroundImage = "url(" + data.about.aboutHeroImage + ")";
        aboutHeroImage.style.backgroundSize = "cover";
    }


    if (aboutChurch) {
        aboutChurch.innerHTML = data.about.aboutChurch.title;
    }
    if (aboutChurchDesc) {
        aboutChurchDesc.innerHTML = data.about.aboutChurch.description;
    }

    if (aboutInfoCards) {
        let aboutInfoHtml = "";
        Object.values(data.about.infoCards).map((infoCard) => {
            aboutInfoHtml += `<div class="col-md-4 col-sm-4">
                <div class="icon-box icon-box-style1">
                  <div class="icon-box-head">
                  <span class="ico"><i class="${infoCard.icon}"></i></span>
                            <h4>${infoCard.title}</h4>
                            </div>
                            <p>${infoCard.description}</p>
                        </div>
                    </div>
                </div>`;
        }
        );
        aboutInfoCards.innerHTML = aboutInfoHtml;
    }

    if (aboutLeaders) {
        let aboutLeadersHtml = "";
        Object.values(data.about.leaders).map((leader) => {
            aboutLeadersHtml += `<div class="col-md-4 col-sm-4">
                <div class="grid-item staff-item format-standard">
                  <div class="grid-item-inner">
                    <a href="staff.html" class="media-box">
                      <img src="${leader.image}" alt="" />
                    </a>
                    <div class="grid-content">
                      <div class="staff-item-name">
                        <h5>${leader.name}</h5>
                        <span class="meta-data">${leader.title}</span>
                      </div>
                      <ul class="social-icons-colored">
                        <li class="phone">
                          <a href="tel:${leader.phone}"><i class="fa fa-phone"></i></a>
                        </li>
                        <li class="email">
                          <a href="mailto:${leader.email}"><i class="fa fa-mail-forward"></i></a>
                        </li>
                      </ul>
                      </div>
                  </div>
                </div>
              </div>`;
        }
        );
        aboutLeaders.innerHTML = aboutLeadersHtml;
    }

    let historyHtml = "";
    if (history && data.about.history) {
        Object.values(data.about.history).map((historyData) => {
            historyHtml += `<div class="col-md-4 col-sm-4">
                        <div class="card horizontal">
                            <div class="row no-gutters">
                                <div class="col-md-4">
                                    <img src="${historyData.image}" class="card-img" alt="...">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">${historyData.title}</h5>
                                        <hr>
                                        <p class="card-text">${historyData.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;


        });
        history.innerHTML = historyHtml;
    }






    //------------------------------------------------------------------
    //Contacts page data insertion
    //------------------------------------------------------------------
    const contactHeroImage = document.getElementById('contactHeroImage');
    let contactAddress = document.getElementById('contactAddress');
    let contactPhone1 = document.getElementById('contactPhone1');
    let contactPhone2 = document.getElementById('contactPhone2');
    let contactEmail = document.getElementById('contactEmail');

    if (contactHeroImage) {
        contactHeroImage.style.backgroundImage = "url(" + data.contact.contactHeroImage + ")";
        contactHeroImage.style.backgroundSize = "cover";
    }


    if (contactAddress) {
        contactAddress.innerHTML = data.address;
    }
    if (contactPhone1) {
        contactPhone1.innerHTML = "📞" + data.phone1;
        contactPhone1.href = "tel:" + data.phone1;
    }
    if (contactPhone2) {
        contactPhone2.innerHTML = "📞" + data.phone2;
        contactPhone2.href = "tel:" + data.phone2;
    }
    if (contactEmail) {
        contactEmail.innerHTML = "✉️" + data.email;
        contactEmail.href = "mailto:" + data.email;
    }
}


function getClosestFutureEvent(data) {
    // Get current date and time
    const now = new Date().getTime();
    console.log("Current Date and Time:", now);

    // Initialize variables to store the closest event
    let closestEvent = null;
    let minTimeDiff = Infinity;

    // Iterate through events
    for (const eventId in data.events) {
        const event = data.events[eventId];
        const eventDateTimeStr = `${event.date} ${event.time}`;

        // Parse date and time using a more robust approach
        const eventDateTime = new Date(event.date + 'T' + convertTo24HourFormat(event.time)).getTime();

        // Check if the date parsing was successful
        if (isNaN(eventDateTime)) {
            console.error("Invalid Date:", eventDateTimeStr);
            continue;
        }

        console.log("Event Date and Time: ", eventDateTimeStr, eventDateTime);

        // Calculate time difference
        const timeDiff = eventDateTime - now;

        // Check if the event is in the future and if it's the closest one
        if (timeDiff > 0 && timeDiff < minTimeDiff) {
            minTimeDiff = timeDiff;
            closestEvent = event;
        }
    }

    // Output the closest event
    console.log("Closest event to the near future:", closestEvent);
    return closestEvent;
}

// Helper function to convert 12-hour time format to 24-hour time format
function convertTo24HourFormat(timeStr) {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':');

    if (hours === '12') {
        hours = '00';
    }

    if (modifier === 'PM') {
        hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}:00`;
}