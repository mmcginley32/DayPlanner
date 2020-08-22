var container = $(".container");


// get the current date
$("#currentDay").text(moment().format('MMMM Do YYYY'))

// make hour blocks
for (i = 9; i !== 6; i++) {
    makeHrSegment(i);

    // if hour = 12 then rest to start hrs back at 1
    if (i === 12) {
        i = 0;
    }
}

// function to make an hour segment
function makeHrSegment(hr) {
    // console.log("makeHrSegment -> hr", hr)
    var tm = hr;
    if (hr < 12 && hr > 6) {
        tm += "am";
    } else { 
        tm += "pm";
    }
    // make a row to append to 
    var row = $("<div>");
    row.addClass("row time-block ");
    row.attr("data-time",hr);
    // row.attr("data-id",tm);

    //hr section
    var hour = $("<div>").text(tm);
    hour.addClass("col-1 hour");

    //text area for editing
    var txt = $("<textarea>");
    txt.addClass("col-10");
    txt.val(localStorage.getItem("hour-" + hr) || "")
    
    //save section for click
    var saveIt = $("<button>");
    saveIt.addClass("col-1 saveBtn");
    saveIt.html(`<i class="far fa-save" style="font-size: 30px;"></i>`);
    
    // var saveImg = $("<img>");
    // saveImg.attr("src", "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTgglvvDWl2EKSUIPoQscNSdy5DiuIm7eRnWA&usqp=CAU"); 
    // saveImg.attr("style","width: 25px;");
    // saveIt.append(saveImg);
    // console.log("makeHrSegment -> saveImg", saveImg)
    
    // saveIt.text("save");
    
    //append section to container
    row.append(hour, txt, saveIt);
    container.append(row);
    
    // color an hour segment
    
    var hrInt = parseInt(hr)
    var curHr = parseInt(moment().format("h"));
    // console.log("makeHrSegment -> hr", hr);
    // console.log("makeHrSegment -> curHr", curHr);

    if (hr === curHr) {
        row.addClass("present");
    } else if ((curHr > 8 && hr > curHr) || (curHr < 6 && hr < 6 && hr > curHr) || (hr < 6 && curHr > 8)) {
        row.addClass("future");
    } else {
        row.addClass("past");
    }

}

// click event for saving a note
$(".saveBtn").on("click", function(e) {
    console.log($(this));
    
    // get hour for segment
    var parentEl = $(this).parent();
    var hr = parentEl.data("time");
    var id = parentEl.data("id");
    // var hr = row

    console.log("hr", hr)

    // get appointments for segment
    var appointment = $(this).prev().val(); 

    console.log("appointment", appointment)

    // save schedule in hr
    var storage = "hour-" + hr;
    if (appointment !== "") {
        localStorage.setItem(storage, appointment);
    } else {
        localStorage.removeItem(storage);
    }
    
})