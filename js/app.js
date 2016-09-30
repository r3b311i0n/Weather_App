const api = "http://api.openweathermap.org/data/2.5/weather?";
const apiKey = "&APPID=6f500a9fa2f6cf6915ebda32f2c03f35";

var latitude;
var longitude;
var kelvin;

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
                    else {
                        var weatherId = "owf-" + weatherData["weather"][0]["id"];
                        console.log(weatherId);
                        $(".owf").addClass(weatherId);
                        $(".description").html(weatherData["weather"][0]["description"]);
                        kelvin = weatherData["main"]["temp"];
                        if ($("#converter").prop("checked") === true) {
                            $(".temperature").html(kelvin * (9 / 5) - 459.67);
                        }
                        else {
                            $(".temperature").html(kelvin - 273.15);
                        }
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

$("#converter").on("click", function () {
    if ($("#converter").prop("checked") === true) {
        console.log("retarded");
        $(".temperature").html(kelvin * 9 / 5 - 459.67);
    }
    else {
        console.log("!retarded");
        $(".temperature").html(kelvin - 273.15);
    }
});

$(document).ready(main());