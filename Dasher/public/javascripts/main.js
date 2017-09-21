

// widget card toggle handler //
$(function(){
    $(".flipBox").flip({
        trigger: 'click'
    });
});




function insertCal(){
    $('.front.widget7').html('<div class="calendarWidget"></div>');
    $('.calendarWidget').jqxCalendar({theme: "arctic", width:250, height:250});
}


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
                html += '<div class="location">'+weather.city+', '+weather.region+'</div>';
                html += '<div class="currently">'+weather.currently+'</div>';
                html += '<div class="wind">'+weather.wind.direction+' '+weather.wind.speed+' '+weather.units.speed+'</div>';
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
    if(!name){
        name = $('[data-name]').attr('data-name');
    }
    $('.front.widget4').html('<div class="greetingWidget"></div>');
    
    var d = new Date();
    var hours = d.getHours();
    if (hours < 12) {
        $('.greetingWidget').html('Good morning, ' + name);
    }
    else if(hours < 17){
        $('.greetingWidget').html('Good afternoon, ' + name);
    }  
    else if(hours < 22){
        $('.greetingWidget').html('Good evening, ' + name);
    }  
    else{
        $('.greetingWidget').html('Good night, ' + name);
    }
}



function insertNews() {
    $('.front.widget5').html('<div class="newsWidget"></div>');
    // var html = [];
    var news = ['Cute Video: Cat Trust Falls Into Owner\'s Lap', 
    'Pet Scoop: Residents Rescue Blind Dog From Lake, Penguin Chicks Hand-Reared at Zoo',
    '5 Adoption Stories We Can’t Get Enough Of'];
    //console.log(html.length < 1);
        function getNews(){
            //$.get('http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml', function (data) {
                //$.get('http://www.vetstreet.com/rss/news-feed.jsp?Categories=siteContentTags:dog-news:cat-news:inspiring-stories:animal-news', function (data) {  
                
                // console.log(data);
                //$(data).find("channel>item:lt(5)").each(function () { // or "item" or whatever suits your feed
                    var el = $(this);
                    // console.log("title      : " + el.find("title").text());
                    //html.push('</br>' +   '<a target="_blank" rel="noopener noreferrer" href="' + el.find("link").text() + '">' +el.find("title").text() + '</a>');              
                    $('.newsWidget').html('</br>' + news[0] + '</a>');
                //});
            //});
            //console.log(html);  
        }
        getNews();
        setInterval(getNews, 600000);
        var i = 0;
        setInterval(()=>{
            if(i < news.length){
                $('.newsWidget').html(news[i += 1])
            }else{
                i = 0;
                $('.newsWidget').html(news[0])
            }
        }, 10000); 
}


function insertForecast(city, units) {
    $('.front.widget6').html('<div class="forecastWidget"></div>');
    $(document).ready(function() {
        getWeather(); //Get the initial weather.
        setInterval(getWeather, 600000);  
    });
    function getWeather(){
        $.simpleWeather({
        location: city,
              woeid: '',
              unit: units,
              success: function(weather) {
                var html = '';    
                for(var i=0;i<weather.forecast.length;i++) {
                    
                    html += '<div class="forecastDiv"><i class="weatherIcon icon-'+weather.forecast[i].code+'"></i> '+weather.forecast[i].day+': '+weather.forecast[i].high+'</p></div>';
                  
                }
                $('.forecastWidget').html(html)
              },
              error: function(error) {
                $('.forecastWidget').html(error)
              }
        });
    }
}

function insertReminder(reminderText) {
    if(!reminderText){
        reminderText = $('[data-reminder]').attr('data-reminder');
    }
    $('.front.widget8').html('<div class="reminderWidget"></div>');
    $('.reminderWidget').html(reminderText);
    
}


//on document load
insertClock();
insertWeather('Atlanta, GA', 'f');
insertDate();

insertGreeting();
insertForecast('Atlanta, GA', 'f');
insertNews();
insertReminder();
insertCal();

//on widget selection
function clock(elt) {
    var $front = $(elt).parent().prev();
    $front.removeClass(); //removes class
    $front.addClass('front widget1');
    var parentElement = $front[0]['parentElement'].id;
    sendWidgetIdBack("widget1",parentElement);
    insertClock();
}

function weather(elt) {
    var $front = $(elt).parent().prev();
    $front.removeClass(); //removes class
    $front.addClass('front widget3');
    insertWeather('Atlanta, GA', 'f'); 
    var parentElement = $front[0]['parentElement'].id;
    sendWidgetIdBack("widget3",parentElement);
}

function date(elt) {
    var $front = $(elt).parent().prev();
    $front.removeClass(); //removes class
    $front.addClass('front widget2');

    var parentElement = $front[0]['parentElement'].id;
    sendWidgetIdBack("widget2",parentElement);
    insertDate();
}

function greeting(elt,name) {
    var $front = $(elt).parent().prev();
    $front.removeClass(); //removes class
    $front.addClass('front widget4');
   
    var parentElement = $front[0]['parentElement'].id;
    sendWidgetIdBack("widget4",parentElement);
    // console.log(parentElement);
    // console.log($front);
    insertGreeting(name);
}

function news(elt) {
    var $front = $(elt).parent().prev();
    $front.removeClass(); //removes class
    $front.addClass('front widget5');
    var parentElement = $front[0]['parentElement'].id;
    sendWidgetIdBack("widget5",parentElement);
    insertNews();
}

function forecast(elt) {
    var $front = $(elt).parent().prev();
    $front.removeClass(); //removes class
    $front.addClass('front widget6');
    insertForecast('Atlanta, GA', 'f');
    var parentElement = $front[0]['parentElement'].id;
    sendWidgetIdBack("widget6",parentElement);
}

function calendar(elt) {
    var $front = $(elt).parent().prev();
    $front.removeClass(); //removes class
    $front.addClass('front widget7');
    var parentElement = $front[0]['parentElement'].id;
    sendWidgetIdBack("widget7",parentElement);
    insertCal();  
}

function reminder(elt,text) {
    var $front = $(elt).parent().prev();
    $front.removeClass(); //removes class
    $front.addClass('front widget8');
    var parentElement = $front[0]['parentElement'].id;
    sendWidgetIdBack("widget8",parentElement);
    insertReminder(text);
}

function sendWidgetIdBack(widgetID,placementID){
    var pathname = window.location.pathname;
    pathname = pathname.substr(pathname.length -2);
    console.log(pathname);
    $.post('http://localhost:3000/dashboard/'+pathname,{widgetID : widgetID, placementID : `${placementID}`}, function(results){
    // $.post('http://ec2-52-207-242-113.compute-1.amazonaws.com/dashboard/'+pathname,{widgetID : widgetID, placementID : `${placementID}`}, function(results){
            
    // console.log(placementID);
        
    });
}

function secretMessage(){
    $('.container').css("background-color", "#3c4656")
    var $front = $(".container").children();
    $front.removeClass(); //removes class
    $front.addClass('momentoftruth');
    $('#box1').html('Kayleigh');
    $('#box2').html('Elizabeth');
    $('#box3').html('Hatch');
    $('#box4').html('I love you more than life itself');
    $('#box5').html('I cant see my life without you and I want to spend every waking minute with you');
    $('#box6').html('Will');
    $('#box7').html('You');
    $('#box8').html('Marry me?');
}
secretMessage()





// function defaultSettings(){
//     var pathname = window.location.pathname;
//     pathname = pathname.substr(pathname.length -1);
//     $.get('http://localhost:3000/dashboard/'+pathname, function(results){
//         // console.log('HEY'+results)
//         // insertClock();
//         // insertWeather('Atlanta, GA', 'f');
//         // insertDate();
//         // insertGreeting(results.nickname);
//         // insertForecast('Atlanta, GA', 'f');
//         // insertNews();
//         // insertCal();
//         // insertReminder('Call Doctor');
//         $('body').html(results);
//     })
// }
// defaultSettings();

