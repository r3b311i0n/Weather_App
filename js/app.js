const api = "http://api.openweathermap.org/data/2.5/weather?";
const apiKey = "&APPID=6f500a9fa2f6cf6915ebda32f2c03f35";

var latitude;
var longitude;

var main = function () {

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (loc) {
            latitude = loc.coords.latitude;
            longitude = loc.coords.longitude;
            console.log(latitude + " " + longitude);

            $.ajax({
                url: api + "lat=" + latitude + "&lon=" + longitude + apiKey,
                method: "GET",
                dataType: "json",
                success: function (weatherData) {
                    //noinspection JSJQueryEfficiency
                    $(".error").html(weatherData["name"]);

                    if (weatherData["cod"] == "404") {
                        $(".error").html("City Not Found.");
                    }
                }
            });
        }, function (error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    //noinspection JSJQueryEfficiency
                    $(".error").html("User denied the request for Geolocation.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    //noinspection JSJQueryEfficiency
                    $(".error").html("Location information is unavailable.");
                    break;
                case error.TIMEOUT:
                    //noinspection JSJQueryEfficiency
                    $(".error").html("The request to get user location timed out.");
                    break;
            }
        });
    }
    else {
        console.log("Geolocation is unavailable.");
    }
};

$("#temp").on("click", function () {
    if ($("#temp").prop("checked") === true) {
        console.log("retarded");
    }
    else {
        console.log("!retarded");
    }
});

$(document).ready(main());