jQuery(document).ready(function(){
let isAutoUpdateSet = true;
let isAutoUpdateCheckboxSet = document.querySelector('input[value="autoUpdate"]');
let refreshPeriodInSeconds = 3;

//Stop autorefresh after certain time and reload page
let maxTimeBeforeAutorefreshInMinutes = 10;
let rebootLoopFunction = function() {
    window.location.reload();
}

//Set loop and proceed with it for certain timeout - then restart page
var rebootLoop = setInterval(rebootLoopFunction, maxTimeBeforeAutorefreshInMinutes*60*1000);


let mainLoopFunction = function() {
    if (isAutoUpdateSet === true){
        //TODO: Update all tags depending on the tag name
        var seconds = ((new Date().getTime() / 1000) % 60).toFixed(2);

        let i = 1;
        for(var item of allActiveTags) {
            var tag = $("."+item.classList[0]);
            let value = parseFloat(seconds) + i;
                    if (value != ''){
                        tag.removeClass('offscan');
                    }
            tag.html(value.toString().substring(0,5)); //Float values sometimes have long fraction
            console.log('Update [' + item.classList[0] + '] with ['+ tag.html() + ']' + '. NOTE: float value = ' + value);
            i++;
        }
    } else {
        for(var item of allActiveTags) {
                    var tag = $("."+item.classList[0]);
                    tag.addClass('offscan');
                    tag.html("NaN");
        }
    }
}

isAutoUpdateCheckboxSet.addEventListener('change', () => {
    isAutoUpdateSet = isAutoUpdateCheckboxSet.checked;
    console.log("isAutoUpdateSet = " + isAutoUpdateSet);
});

//Collect all dynamic tags
let allActiveTags = $(".active");

//Implement request
let requestGetBaseUrl = 'localhost:8088/phd';
let requestGetString = '?';
let i = 1;
for(var item of allActiveTags) {
    requestGetString += item.classList[0] + '=NaN';
    if (i < allActiveTags.length){
        requestGetString += '&';
    }
    i++;
}
console.log('URL for PHD get request: ' + requestGetBaseUrl + requestGetString); //TODO: to use it in future


/* MAIN JOB */
//First execution
mainLoopFunction();

//Main loop - autorefresh data
var mainLoop = setInterval(mainLoopFunction, refreshPeriodInSeconds*1000);
});