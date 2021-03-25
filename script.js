var image = "https://images.unsplash.com/photo-1542329532-9e89b9cb7e73?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80"; 
var Max_size = 4995374;

function ShowProgressMessage(msg) {
    if (console) 
    {
        if (typeof msg == "string") 
        {
            console.log(msg);
        } 
        else 
        {
            for (var i = 0; i < msg.length; i++) 
            {
                console.log("Speed in Bps:",msg[i]);
            }
        }
    }
    
    var value = document.getElementById("temp");
    if (value)
     {
        if(typeof msg == "string")
        {
            var Actual_value= msg;
        }
        else
        {
            var Actual_value=  msg.join("<br />");
        }
        value.innerHTML = Actual_value;
    }
}






function Starting_speed() {
    ShowProgressMessage("Loading the image, please wait...");
    window.setTimeout(MeasureConnectionSpeed, 1);
};    

if (window.addEventListener) 
{
    window.addEventListener('load',Starting_speed,false);
} 
else if (window.attachEvent) 
{
    window.attachEvent('onload', Starting_speed);
}

function MeasureConnectionSpeed() {
    var startTime, endTime;
    var download = new Image();
    download.onload = function(){
        endTime = (new Date()).getTime();
        showResults();
    }
    //if there will be any error
    download.onerror = function (err, msg)
     {
        if(image==null)
        ShowProgressMessage( "Image is Not available or Network Connection Not working");
    }
    
    startTime = (new Date()).getTime();
    var cacheBuster = "?nnn=" + startTime;
    download.src = image + cacheBuster;
    //formula to  calculate the speed of connection
    function showResults() {
        var duration = (endTime - startTime) / 1000;
        var bitsLoaded = Max_size * 8;
        var speedBps = (bitsLoaded / duration).toFixed(2);
        var speedKbps = (speedBps / 1024).toFixed(2);
        var speedMbps = (speedKbps / 1024).toFixed(2);
        ShowProgressMessage([
            "My connection speed is:", 
            speedKbps + " kbps", 
            speedMbps + " Mbps"
        ]);
    }
}