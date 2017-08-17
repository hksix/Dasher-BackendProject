
function clock(elt) {
    let div = elt.parentElement.parentElement.parentElement.children[0]
    console.log(div);
    elt.addEventListener("click", function(){
        // div.style.display = "block";
    });
    function checkTime(i) {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
      }
      
      function startTime() {
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        // add a zero in front of numbers<10
        m = checkTime(m);
        s = checkTime(s);
        div.innerHTML = h + ":" + m + ":" + s;
        t = setTimeout(function() {
          startTime()
        }, 500);
      }
      startTime();  
}
function weather(elt){
    let div = elt.parentElement.parentElement.parentElement.children[0]
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
        html = '<h2><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';
        html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
        html += '<li class="currently">'+weather.currently+'</li>';
        html += '<li>'+weather.wind.direction+' '+weather.wind.speed+' '+weather.units.speed+'</li></ul>';
    
        div.innerHTML = (html);
      },
      error: function(error) {
        div.innerHTML = ('<p>'+error+'</p>');
      }
    });
}

}

