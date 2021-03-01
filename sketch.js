var url = "https://restcountries.eu/rest/v2/all?fields=name;capital;population;latlng;nativeName;flag";
var countriesData; 
var input; 
var table;

var countryName; 
var nativeName; 
var countryFlag;

var lat; 
var lng;
var convert_y; 
var convert_x;  
var pop; 
var Color;

//variables for checkerboard
var rects = []; 
var r = 40; //rect width
var i;
var j;
var rectFill;


function preload(){
    loadJSON(url, countryInfo);
    table = loadTable('assets/country_Info.csv', 'csv', 'header');
}

function countryInfo (data){
    countriesData = data; 
}

function getCountry(){
    for (var i=0; i<countriesData.length; i++){
        if(input.value() == countriesData[i].name){
            countryName = countriesData[i].name; 
            nativeName = countriesData[i].nativeName;
            countryFlag = countriesData[i].flag; 
        //scaling long and lat based on 640x360 canvas
            lng = (countriesData[i].latlng[1] + 180) * 2;
            lat = (90 - countriesData[i].latlng[0]) * 2;
        //mapping long and lat to windowWidth and Height
            convert_x = map(lng, 0, 640, 0, windowWidth-90);
            convert_y = map(lat, 0, 360, 0, windowHeight);
        //mapping population size to circle size
            pop = map(countriesData[i].population, 0, 1377422166, 5, 100);  
        //choosing a random color for each Country
            Color = color(random(255), random(255), random(255));
            print(countriesData[i].name, lng, lat, pop);
        
        //saves the info for current country
            var newRow = table.addRow();
        //saving a new row for country name, x(lng), y(lat), pop
            newRow.setString("countryName", countryName);
            newRow.setString("xLoc", convert_x);
            newRow.setString("yLoc", convert_y);
            newRow.setString("population", pop);
            newRow.setString("Colors", Color);
            saveTable(table, 'country_Info.csv', 'csv');
            table = loadTable('assets/country_Info.csv', 'csv', 'header');
            print(table);
           
        }
    }
}

function setup(){
    createCanvas(windowWidth, windowHeight); 
    print(countriesData);

    var button = select('#submit');
    input = select('#country');
    print(input);
    button.mousePressed(getCountry)
    print(windowWidth, windowHeight);

    for (i = 0; i < width; i++) {
        for (j = 0; j < height; j++) {
            if ((i+j) % 2 == 0) {
               rectFill = color(255,255,255);
              } else {
                rectFill = color(0,0,0);
              }
           
            rects.push(new Rect(i*r, j*r, r, rectFill));
        }
    } 
}


function draw(){
    background (200);

    for (var k=0; k<rects.length; k++){
        rects[k].render();
    }

    //box to hold text --> map key
    fill(255); 
    stroke(0); 
    strokeWeight(2);
    rect(2, 602, 400, 150); 

    for(var i=0; i<table.getRowCount(); i++){
        var x = table.get(i,1);
        var y = table.get(i,2);
        var size = table.get(i, 3);
        var col = table.get(i,4);
        fill(col); 
        noStroke();
        circle(x, y, size);
        text(table.getString(i,0), x+20, y-15);
      }

    fill(0); 
    noStroke();
    textSize(24);
    text(countryName, 12, 632);
    text(nativeName, 12,682); 
    text(countryFlag, 12, 732);

}