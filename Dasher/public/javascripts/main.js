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


//on document load
insertClock();
insertWeather('Atlanta, GA', 'f');
insertDate();
insertGreeting('Jennifer');


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

function greeting(elt) {
    var $front = $(elt).parent().prev();
    $front.removeClass(); //removes class
    $front.addClass('front widget4');
    insertGreeting('Jennifer');
}

