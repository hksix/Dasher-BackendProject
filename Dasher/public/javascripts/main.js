// widget card toggle handler //
$(function(){
    $(".flipBox").flip({
        trigger: 'click'
    });
});

//add clock in widget1 locatiojn
function insertClock(){
    $('.widget1').html('<div class="clockwidget"></div>');
    // FlipClock initialization  
    var ServerTime = $('#my_time').val();
    var d = new Date();
    var n = d.getHours();
    var diff = ServerTime - n;
    clockwidget = $('.clockwidget').FlipClock(diff,{  
        clockFace: 'TwentyFourHourClock',
        showSeconds: false  
    });  
}
insertClock();

function insertWeather(){

}



// function clock(elt) {
//     // let div = elt.parentElement.parentElement.parentElement.parentElement;
//     let div = elt.parentElement.previousSibling.previousSibling;
//     // let div = elt.parentElement.previousSibling.previousSibling.previousSibling.nextSibling; 
    
//     console.log(div);
//     elt.addEventListener("click", function(){
//         // div.style.display = "block";
//     });
//     function checkTime(i) {
//         if (i < 10) {
//           i = "0" + i;
//         }
//         return i;
//       }
      
//       function startTime() { //this causes the clock to reappear automatically even when a different widget is selected
//         var today = new Date();
//         var h = today.getHours();
//         var m = today.getMinutes();
//         var s = today.getSeconds();
//         // add a zero in front of numbers<10
//         m = checkTime(m);
//         s = checkTime(s);
//         div.innerHTML = h + ":" + m + ":" + s;
//         t = setTimeout(function() {
//           startTime()
//         }, 500);
//       }
//       startTime();  
// }

function weather(elt){
    console.log('weather');
    // let div = elt.parentElement.previousSibling.previousSibling.previousSibling.nextSibling; 
    let div = elt.parentElement.previousSibling.previousSibling;
    console.log(div);
    elt.addEventListener("click", function(){
        // div.style.display = "block";
    });
    $(document).ready(function() {
        getWeather(); //Get the initial weather.
        setInterval(getWeather, 600000);  
    });
        function getWeather(){
            $.simpleWeather({
          location: 'Atlanta, GA',
          woeid: '',
          unit: 'f',
          success: function(weather) {
            var html = '<h2><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';
            html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
            html += '<li class="currently">'+weather.currently+'</li>';
            html += '<li>'+weather.wind.direction+' '+weather.wind.speed+' '+weather.units.speed+'</li></ul>';
            div.innerHTML = html;
            console.log(html);
          },
          error: function(error) {
            div.innerHTML = '<p>'+error+'</p>';
          }
        });
    }
}
function rss(elt){
    let div = elt.parentElement.previousSibling.previousSibling;
    console.log(div);
    elt.addEventListener("click", function(){
        
    });
    function getNews(){
        div.innerHTML = '';
        $.get('http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml', function (data) {
            // console.log(data);
            $(data).find("channel>item:lt(5)").each(function () { // or "item" or whatever suits your feed
                var el = $(this);
                console.log("title      : " + el.find("title").text());
                div.innerHTML = div.innerHTML + '</br>' + el.find("title").text();
                
            });
        });
    }
    getNews();
}
    
function forcastweather(elt){
    console.log('weather');
    // let div = elt.parentElement.previousSibling.previousSibling.previousSibling.nextSibling; 
    let div = elt.parentElement.previousSibling.previousSibling;
    console.log(div);
    elt.addEventListener("click", function(){
        // div.style.display = "block";
    });
    $(document).ready(function() {
        getWeather(); //Get the initial weather.
        setInterval(getWeather, 600000);  
    });
        function getWeather(){
            $.simpleWeather({
          location: 'Atlanta, GA',
          woeid: '',
          unit: 'f',
          success: function(weather) {
            html = '<h2>'+weather.temp+'&deg;'+weather.units.temp+'</h2>';
            html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
            html += '<li class="currently">'+weather.currently+'</li>';
            html += '<li>'+weather.alt.temp+'&deg;C</li></ul>';
            
            for(var i=0;i<weather.forecast.length;i++) {
              html += '<p>'+weather.forecast[i].day+': '+weather.forecast[i].high+'</p>';
              html +='<h2><i class="icon-'+weather.forecast[i].code+'"></i></h2>'
            }
            div.innerHTML = html;
            console.log(html);
          },
          error: function(error) {
            div.innerHTML = '<p>'+error+'</p>';
          }
        });
    }
}


//need a module.exports here so we can require these functions withn dashboard.js

// function getNews(){
//     $.get('http://rss.cnn.com/rss/cnn_topstories.rss', function (data) {
//         console.log(data);
//         $(data).find("channel>item").each(function () { // or "item" or whatever suits your feed
//             var el = $(this);
    
//             console.log("------------------------");
//             console.log("title      : " + el.find("item>title").text());
//             // console.log("headline: "+ el.find("content").text());
//             // console.log("------------------------");
//             // console.log("author     : " + el.find("author").text());
//             // console.log("description: " + el.find("description").text());
//         });
//     });
// }
// getNews();

