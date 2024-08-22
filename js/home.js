// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function () {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
            || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () { callback(currTime + timeToCall); },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
}());


(function () {

    var width, height, largeHeader, canvas, ctx, circles, target, animateHeader = true;

    // Main
    initHeader();
    addListeners();

    function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight - 120;
        target = { x: 0, y: height };


        canvas = document.getElementById('canvas-animation');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        // create particles
        circles = [];
        for (var x = 0; x < width * 0.5; x++) {
            var c = new Circle();
            circles.push(c);
        }
        animate();
    }

    // Event handling
    function addListeners() {
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    }

    function scrollCheck() {
        console.log("Scroll event detected");
    }

    function resize() {
        console.log("Resize event detected");
        initHeader(); // Reinitialize header on resize
    }


    $(window).resize(function () {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    });

    function animate() {
        if (animateHeader) {
            ctx.clearRect(0, 0, width, height);
            for (var i in circles) {
                circles[i].draw();
            }
        }
        requestAnimationFrame(animate);
    }

    // Canvas manipulation
    function Circle() {
        var _this = this;

        // constructor
        (function () {
            _this.pos = {};
            init();
            //console.log("Circle constructor");
        })();

        function init() {
            _this.pos.x = Math.random() * width;
            _this.pos.y = height + Math.random() * 100;
            _this.alpha = 0.1 + Math.random() * 0.3;
            _this.scale = 0.1 + Math.random() * 0.3;
            _this.velocity = Math.random();
        }

        this.draw = function () {
            if (_this.alpha <= 0) {
                init();
            }
            _this.pos.y -= _this.velocity;
            _this.alpha -= 0.0005;
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.scale * 10, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(255,255,255,' + _this.alpha + ')';
            ctx.fill();
        };
    }

})();

(function () {
    fetch('./../data/SiteData.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById("chapterName1").innerHTML = data.home.hero.chapterName1;
            document.getElementById("chapterName2").innerHTML = data.home.hero.chapterName2;
            document.getElementById("scripture1").innerHTML = data.home.hero.scripture1;
            document.getElementById("scripture2").innerHTML = data.home.hero.scripture2;

            var text1 = data.home.hero.imageText1.t1 + "<span style='font-size:39px;text-decoration:underline;color:#D3CAFFB1;font-style:italic;'> " + data.home.hero.imageText1.t2 + "</span>";
            var text2 = data.home.hero.imageText2.t1 + "<span style='font-size:39px;text-decoration:underline;color:#CEC3FFB3;font-style:italic;'> " + data.home.hero.imageText2.t2 + "</span>";
            var url1 = data.home.hero.image1;
            var url2 = data.home.hero.image2;
            document.getElementById("heroImage1").style.backgroundImage = "url(" + url1 + ")";
            document.getElementById("heroImage2").style.backgroundImage = "url(" + url2 + ")";
            document.getElementById("heroImage1").style.backgroundSize = "cover";
            document.getElementById("heroImage2").style.backgroundSize = "cover";
            document.getElementById("imageText1").innerHTML = text1;
            document.getElementById("imageText2").innerHTML = text2;

            var aboutCard = "";
            Object.values(data.home.aboutUs).map(element => {
                aboutCard += "<div class='col-md-4 col-sm-4 featured-block'>"
                aboutCard += "<h3 >"+element.title+"</h3>";
                aboutCard += "<figure>";
                aboutCard += "<a href='"+element.link+"'>"
                aboutCard += "<img src='"+element.image+"' alt='Our Community' /></a>";
                aboutCard += "</figure>";
                aboutCard += "<p>"+element.description+"</p>";
                aboutCard += "<a href='"+element.buttonLink+"' class='btn btn-success'>"+element.buttonText+"</a>";
                aboutCard += "</div>";
            }
            );

            document.getElementById("aboutCard").innerHTML = aboutCard;
        });
})();