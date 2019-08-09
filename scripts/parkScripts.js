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
* @param cell1 (Object) - Populate specified cell with data
* @param cell2 (Object) - Populate specified cell with data
* @param cell3 (Object) - Populate specified cell with data
* @param cell4 (Object) - Populate specified cell with data
* @param cell5 (Object) - Populate specified cell with data
* @param cell6 (Object) - Populate specified cell with data
*/
function insertTableData(list, dataBody) {
        let row = dataBody.insertRow(-1);

        let cell1 = row.insertCell(0);
        cell1.innerHTML = list.LocationName;

        let cell2 = row.insertCell(1);
        cell2.innerHTML = list.City + ", " + list.State;

        let cell3 = row.insertCell(2);
        if(list.Phone != 0)
            cell3.innerHTML = list.Phone;
        else
            cell3.innerHTML = "&nbsp";

        let cell4 = row.insertCell(3);
        if(list.Fax != 0)
            cell4.innerHTML = list.Fax;
        else
            cell4.innerHTML = "&nbsp";

        let cell5 = row.insertCell(4);
        if(list.Visit) 
            cell5.innerHTML = "<a href=" + list.Visit + " target=\"_blank\">" + list.Visit + "</a>";
            
        let cell6 = row.insertCell(5);
        cell6.innerHTML = "Latitude: " + list.Latitude + "<br>Longitude: " + list.Longitude;
}

/*
* Build generic dropdown list from 1D array
* 
* @param element (Object) - Create an option element to build drop down
*/
function buildList(dropdown, list) {
    for(let i = 0; i < list.length; i++) {
        let element = document.createElement("option");
        element.text = list[i];
        element.value = list[i];
        dropdown.appendChild(element);
    }
}

/*
* Display results based on location
* 
* @param dataBody (Object) - Grab the field of the ID
*/
function displayByLocation(selection, list) {
    let dataBody = document.getElementById("dataBody");

    for(let i = 0; i < list.length; i++) {
        if(selection == list[i].State) {
            insertTableData(list[i], dataBody);
        }
    }
}

/*
* Search through the park type
* 
* @param regExp (Regular Expression) - Create a regular expression with the selection (case insensitive)
* @param dataBody (Object) - Grab the field of the ID
*/
function displayByParkType(selection, list) {
    let regExp = new RegExp(selection, "i");
    let dataBody = document.getElementById("dataBody");

    //iterate over the entire array based on selection
    for(let i in list) {
        if(regExp.exec(list[i].LocationName)) {
            insertTableData(list[i], dataBody);
        }
    }
}

/*
* View all national parks in data base
* 
* @param dataBody (Object) - Grab the field of the ID
*/
function displayAllNationalParks(list) {
    let dataBody = document.getElementById("dataBody");

    //iterate over the entire array
    for(let i in list) {
        insertTableData(list[i], dataBody);
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
    //grab national parks data
    let objs;
    $.getJSON("data/nationalparks.json", function(data) {
        objs = data.parks;
    });

    let parkTypes = [
        "National Park",    
        "National Monument",     
        "Recreation Area",  
        "Scenic Trail",    
        "Battlefield",
        "Historic", 
        "Memorial",    
        "Preserve",
        "Island",
        "River",    
        "Seashore",
        "Trail",        
        "Parkway"
    ];
    //build park type ddl from above array
    let parkField = document.getElementById("parkField");
    buildList(parkField, parkTypes);
    
    let locations = [
      "Alabama",
      "Alaska",
      "American Samoa",
      "Arizona",
      "Arkansas",
      "California",
      "Colorado",
      "Connecticut",
      "Delaware",
      "DC",
      "Florida",
      "Georgia",
      "Guam",
      "Hawaii",
      "Idaho",
      "Illinois",
      "Indiana",
      "Iowa",
      "Kansas",
      "Kentucky",
      "Louisiana",
      "Maine",
      "Maryland",
      "Massachusetts",
      "Michigan",
      "Minnesota",
      "Mississippi",
      "Missouri",
      "Montana",
      "Nebraska",
      "Nevada",
      "New Hampshire",
      "New Jersey",
      "New Mexico",
      "New York",
      "North Carolina",
      "North Dakota",
      "Ohio",
      "Oklahoma",
      "Oregon",
      "Pennsylvania",
      "Puerto Rico",
      "Rhode Island",
      "South Carolina",
      "South Dakota",
      "Tennessee",
      "Texas",
      "Utah",
      "Vermont",
      "Virgin Islands",
      "Virginia",
      "Washington",
      "West Virginia",
      "Wisconsin",
      "Wyoming"
    ];
    //build location(states) ddl from above array
    let stateField = document.getElementById("stateField");
    buildList(stateField, locations);

    //grab the table to be populated
    let table = document.getElementById("tours");

    //search by park type button
    const parkSearchBtn = document.getElementById("parkSearchBtn");
    parkSearchBtn.onclick = function(event) {
        event.preventDefault();
        resetTable(table);
        table.style.display = 'initial';
        displayByParkType(parkField.value, objs);
    };
    
    //search by location button
    const stateSearchBtn = document.getElementById("stateSearchBtn");
    stateSearchBtn.onclick = function(event) {
        event.preventDefault();
        resetTable(table);
        table.style.display = 'initial';
        displayByLocation(stateField.value, objs);
    };

    //find all national parks
    const nationalSearchBtn = document.getElementById("nationalSearchBtn");
    nationalSearchBtn.onclick = function(event) {
        event.preventDefault();
        resetTable(table);
        table.style.display = 'initial';
        displayAllNationalParks(objs);
    };

    var resetBtn = document.getElementById('resetBtn');
    // Bind Click Event Handler to Reset Buttom
    resetBtn.onclick = function() {
        table.style.display = 'none';
        resetTable(table);
    };
};