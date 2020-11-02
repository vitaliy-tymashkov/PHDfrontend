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

$(".trendK1_TT0221PV").click(function(){
    let url = 'chart01.html';
    console.log('Call chart01.html');
    var win = window.open(url, '_blank');
    win.focus();
});

});