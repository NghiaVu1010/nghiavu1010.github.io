/*
* Description: Search and populate table based on JSON file and selection
*
* Author: Neo
*/
"use strict";

/*
* Insertion function for table based on data
* 
* @param row (Object) - Inserts row after every data object
* @param img (Object) - Create a img to show
* @param cell1 (Object) - Populate specified cell with data
* @param cell2 (Object) - Populate specified cell with data
* @param cell3 (Object) - Populate specified cell with data
* @param cell4 (Object) - Populate specified cell with data
* @param cell5 (Object) - Populate specified cell with data
* @param cell6 (Object) - Populate specified cell with data
* @param cell7 (Object) - Populate specified cell with data
*/
function insertTableData(list, dataBody) {
        let img = document.createElement("img");
        img.src = "images/" + list.img;
        img.alt = list.img;

        let row1 = dataBody.insertRow(-1);
        let cell1_1 = row1.insertCell(0);
        cell1_1.innerHTML = "Mountain Name";
        let cell1_2 = row1.insertCell(1);
        cell1_2.innerHTML = list.name;

        let row2 = dataBody.insertRow(-1);
        let cell2_1 = row2.insertCell(0);
        cell2_1.innerHTML = "Elevation";
        let cell2_2 = row2.insertCell(1);
        cell2_2.innerHTML = list.elevation;

        let row3 = dataBody.insertRow(-1);
        let cell3_1 = row3.insertCell(0);
        cell3_1.innerHTML = "Effort";
        let cell3_2 = row3.insertCell(1);
        cell3_2.innerHTML = list.effort;

        let row4 = dataBody.insertRow(-1);
        let cell4_1 = row4.insertCell(0);
        cell4_1.innerHTML = "Image";
        let cell4_2 = row4.insertCell(1);
        cell4_2.appendChild(img);

        let row5 = dataBody.insertRow(-1);
        let cell5_1 = row5.insertCell(0);
        cell5_1.innerHTML = "Description";
        let cell5_2 = row5.insertCell(1);
        cell5_2.innerHTML = list.desc;

        let row6 = dataBody.insertRow(-1);
        let cell6_1 = row6.insertCell(0);
        cell6_1.innerHTML = "Coordinates";
        let cell6_2 = row6.insertCell(1);

        let row7 = dataBody.insertRow(-1);
        let cell7_1 = row7.insertCell(0);
        cell7_1.innerHTML = "Best View Times";
        let cell7_2 = row7.insertCell(1);

        $.getJSON("https://api.sunrise-sunset.org/json?lat=" + list.coords.lat + "&lng=" + list.coords.lng + "&date=today", 
            function(timeObj) {
                cell6_2.innerHTML = "Latitude: " + list.coords.lat + "<br>Longitude: " + list.coords.lng;
                cell7_2.innerHTML = "Sunrise: " + timeObj.results.sunrise + "<br>Sunset: " + timeObj.results.sunset;

                let x = timeObj.results.sunrise

                let y = new Date(x)
        });
}

/*
* Display the results that matched the selection
* 
* @param dataBody (Object) - Grab the field of the ID
*/
function displayResults(selection, list) {
    let dataBody = document.getElementById("dataBody");

    for(let i = 0; i < list.length; i++) {
        if(selection == list[i].name) {
            insertTableData(list[i], dataBody);
        }
    }
}

/*
* Reset the table and replace
* 
* @param dataBody (Object) - Grab the field of the ID
* @param newBody (Object) - Create a new element to replace
*/
function resetTable(table) {
    let dataBody = document.getElementById("dataBody");
    let newBody = document.createElement("tbody");
    newBody.setAttribute("id", "dataBody");

    table.replaceChild(newBody, dataBody);
}

window.onload = function() 
{
    //grab mountains data
    let objs;
    $.getJSON("data/mountains.json", function(data) {
        objs = data.mountains;

        //build ddl based on mountain data
        for(let i = 0; i < objs.length; i++) {
            let element = document.createElement("option");
            element.text = objs[i].name;
            element.value = objs[i].name;
            mountainField.appendChild(element);
        }
    });

    //grab each of the fields and assign
    let mountainField = document.getElementById("mountainField");
    let table = document.getElementById("tours");

    //search mountain info
    const mountainSearchBtn = document.getElementById("mountainSearchBtn");
    mountainSearchBtn.onclick = function(event) {
        event.preventDefault();
        resetTable(table);
        table.style.display = 'initial';
        displayResults(mountainField.value, objs);
    };

    var resetBtn = document.getElementById('resetBtn');
    // Bind Click Event Handler to Reset Buttom
    resetBtn.onclick = function() {
        table.style.display = 'none';
        resetTable(table);
    };
};