$(function(){
let restApiUrl = 'https://worldtimeapi.org/api/timezone/Europe/Warsaw';

$(".refreshButton").click(function(){
    $.get(restApiUrl, function(data) {
        let dateTime = data.datetime.substring(11, 19);
        if (dateTime != ''){
            $(".valTime").removeClass('offscan');
        }
        $(".valTime").html(dateTime);
        console.log('Update [valTime] with ['+ dateTime +']')
        });
	});
});