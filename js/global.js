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
                eventHtml += `<div><h2 class="text-center">${data.event.title}</h2></div> <div >`;
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

            //------------------------------------------------------------------
            //about page data insertion
            //------------------------------------------------------------------
            let aboutChurch = document.getElementById('aboutChurchTitle');
            let aboutChurchDesc = document.getElementById('aboutChurchDesc');
            let aboutInfoCards = document.getElementById('aboutInfoCards');
            let aboutLeaders = document.getElementById('aboutLeaders');
            let history = document.getElementById('aboutHistory');

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
                        <span class="meta-data">Events Manager</span>
                      </div>
                      <ul class="social-icons-colored">
                        <li class="phone">
                          <a href="${leader.phone}"><i class="fa fa-phone"></i></a>
                        </li>
                        <li class="email">
                          <a href="${leader.email}"><i class="fa fa-mail-forward"></i></a>
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
            if (history) {
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


                }
                );
            }
            history.innerHTML = historyHtml;





            //------------------------------------------------------------------
            //contacts page data insertion
            //------------------------------------------------------------------
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