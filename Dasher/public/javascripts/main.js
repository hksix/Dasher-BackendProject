// widget card toggle handler //
$(function(){
    $(".flipBox").flip({
        trigger: 'click'
    });
});

//add clock in widget1 location
function insertClock(){
    $('.front.widget1').html('<div class="clockWidget"></div>');
    // FlipClock initialization  
    var ServerTime = $('#my_time').val();
    var d = new Date();
    var n = d.getHours();
    var diff = ServerTime - n;
    $('.clockWidget').FlipClock(diff,{  
        clockFace: 'TwentyFourHourClock',
        showSeconds: false  
    });  
}

//add weather in widget3 location
function insertWeather(city, units){
    $('.front.widget3').html('<div class="weatherWidget"></div>')
    $(document).ready(function() {
        getWeather(); //Get the initial weather.
        setInterval(getWeather, 600000); //refresh every 10 minutes 
    });
        function getWeather(){
            $.simpleWeather({
                location: city,
                woeid: '',
                unit: units,
                success: function(weather) {
                var html = '<h2><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';
                html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
                html += '<li class="currently">'+weather.currently+'</li>';
                html += '<li>'+weather.wind.direction+' '+weather.wind.speed+' '+weather.units.speed+'</li></ul>';
                $('.weatherWidget').html(html)
          },
            error: function(error) {
                $('.weatherWidget').html(error)
            }
        });
    }
}

//add date in widget2 location
function insertDate(){
    $('.front.widget2').html('<div class="dateWidget"></div>');
    var d = new Date();
    var dayOfWeek = d.getDay();
    var dayOfMonth = d.getDate();
    var month = d.getMonth();
    var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 
    'August', 'September', 'October', 'November', 'December'];
    var year = d.getFullYear();
    $('.dateWidget').html(
        '<div class="DOW">'+ dayNames[dayOfWeek] + '</div>'+
        '<div class "DateString">'+ monthNames[month] + ' ' + dayOfMonth + ' '+ year +'</div>');
}

// add greeting to widget4 location
function insertGreeting(name) {
    $('.front.widget4').html('<div class="greetingWidget"></div>');
    
    var d = new Date();
    var hours = d.getHours();
    if (hours <= 12) {
        $('.greetingWidget').html('Good morning, ' + name);
    }
    else if(hours < 17){
        $('.greetingWidget').html('Good afternoon, ' + name);
    }  
    else if(hours < 22){
        $('.greetingWidget').html('Good evening, ' + name);
    }  
    else {
        $('.greetingWidget').html('Good night, ' + name);
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


//on document load
insertClock();
insertWeather('Atlanta, GA', 'f');
insertDate();
// insertGreeting('Jennifer');


//on widget selection
function clock(elt) {
    var $front = $(elt).parent().prev();
    $front.removeClass(); //removes class
    $front.addClass('front widget1');
    insertClock();
}

function weather(elt) {
    var $front = $(elt).parent().prev();
    $front.removeClass(); //removes class
    $front.addClass('front widget3');
    insertWeather('Atlanta, GA', 'f'); 
}

function date(elt) {
    var $front = $(elt).parent().prev();
    $front.removeClass(); //removes class
    $front.addClass('front widget2');
    insertDate();
}

function greeting(elt,name) {
    var $front = $(elt).parent().prev();
    $front.removeClass(); //removes class
    $front.addClass('front widget4');
    insertGreeting(name);
}

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

