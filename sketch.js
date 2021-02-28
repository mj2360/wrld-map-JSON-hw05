var url = "https://restcountries.eu/rest/v2/all?fields=name;capital;population;latlng;nativeName;flag";
var countriesData; 
var input; 
var countryName; 
var nativeName; 
var countryFlag;
var mapImg; 
var lat; 
var lng; 
var pop; 
var Color;
var dots = []; 

function preload(){
    loadJSON(url, countryInfo);
    mapImg = loadImage ("assets/wrld-map.png"); 
    

}

function countryInfo (data){
    countriesData = data; 
}

function setup(){
    createCanvas(windowWidth, windowHeight); 
    print(countriesData);

    var button = select('#submit');
    input = select('#country');
    print(input);
    button.mousePressed(getCountry)

}

function getCountry(){
    for (var i=0; i<countriesData.length; i++){
        if(input.value() == countriesData[i].name){
            countryName = countriesData[i].name; 
            nativeName = countriesData[i].nativeName;
            countryFlag = countriesData[i].flag; 
            lat = map(countriesData[i].latlng[0], -180, 180, 0, windowWidth); 
            lng = map(countriesData[i].latlng[1], -180, 180, 0, windowHeight); 
            pop = countriesData[i].population;  
            print(countriesData[i].name, lat, lng, pop);

          //creating a new Dot object and storing in dot array
            Color = color(random(255), random(255), random(255));
            dots.push(new Dot(lng, lat, 2, color));
            print(dots);
           
        }
    }
}

function draw(){
    background (200);
    image(mapImg, 0, 0, windowWidth, windowHeight);

    //box to hold text --> map key
    fill(255); 
    stroke(0); 
    strokeWeight(2);
    rect(2, 602, 400, 150); 

    fill(0); 
    noStroke();
    textSize(24);
    text(countryName, 12, 632);
    text(nativeName, 12,682); 
    text(countryFlag, 12, 732);

    //draws dots on the map
    //doesn't register as a function -- need to find different solution for drawing the dots
    dots.render();


}