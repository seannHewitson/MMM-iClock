Module.register("MMM-iClock", {
  defaults: {
    timeFormat: config.timeFormat,
    displaySeconds: false,
    showDate: true,
    showDay: true,
  },
  getStyles: function(){
    return ["MMM-iClock.css"];
  },
  start: function(){
    Log.info("Starting module: " + this.name);
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var wait = 60;
    updateClock = function(killwait = false) {
      now = new Date();
      hour = now.getHours(), minute = now.getMinutes(), second = now.getSeconds(), day = now.getDay(), date = now.getDate(), month = now.getMonth();
      if(!killwait)
        wait -= second;
      else wait = 60;
      var element =  document.getElementById('iClock');
      if(typeof(element) == 'undefined' || element == null){
        if(hour < 10) hour = "0" + hour;
        if(minute < 10) minute = "0" + minute;
        document.getElementById('iTime').innerHTML = hour + ":" + minute;
        document.getElementById('iDate').innerHTML = days[day] + " " + date + " " + months[month];
      } else wait = 0.1;
        setTimeout(updateClock, wait * 1000);
    }
    setTimeout(updateClock, 1000);
  },
  getDom: function(){
    var wrapper = document.createElement("div");
    wrapper.className = "iClock light";
    var clock = document.createElement("div");
    clock.id = "iTime";
    clock.className = "bright"
    wrapper.appendChild(clock);
    var calendar = document.createElement("div");
    calendar.id = "iDate";
    calendar.className = "normal";
    wrapper.appendChild(calendar);
    return wrapper;
  }
});