//every hour is a minute

document.addEventListener("keypress",(e) => {
    if (e.key.toLowerCase() == "r") {
        if (confirm("Are you sure you want to reset your progress?")) {reset()}
    }
})

var game = {
    planes: {},
    routes: {},
}

var data = {
    money: 2500,
    costForRoute: 1000,
    planes: {},
    routes: {},
}


class plane {
    constructor(name, pax, fuelEfficiency, speed, range, cost) {
        this.name = name
        this.pax = pax
        this.fuelEfficiency = fuelEfficiency
        this.speed = speed
        this.cost = cost
        this.range = range

        var object = {
            pax: this.pax,
            fuelEfficiency: this.fuelEfficiency,
            speed: this.speed,
            cost: this.cost,
            range: this.range,
        };  

        game.planes[this.name] = object
    }
}

class route {
    //distance is round trip
    constructor(name, demand, distance) {
        this.name = name;
        this.demand = demand;
        this.distance = distance;
        
        this.earn = Math.floor(this.distance/3)

        var object = {
            demand: this.demand,
            distance: this.distance,
            earn: this.earn,
        }

        game.routes[this.name] = object
    }
}

const B737 = new plane("B737", 189, 2, 528, 3000, 1500);
const B747 = new plane("B747", 516, 5, 614, 8000, 10000);
const B757 = new plane("B757", 239, 3, 540, 4100, 4500);
const B767 = new plane("B767", 275, 3, 530, 6385, 5000);
const B777 = new plane("B777", 396, 4, 560, 7370, 6000);
const B787 = new plane("B787", 350, 4, 593, 7635, 7500);

const A220 = new plane("A220", 160, 5, 713, 6297, 2000);
const A320 = new plane("A320", 180, 3, 522, 6200, 2500);
const A330 = new plane("A330", 385, 4, 541, 6350, 6000);
const A340 = new plane("A340", 375, 4, 567, 7400, 5900);
const A350 = new plane("A350", 440, 4, 567, 8100, 6000);
const A380 = new plane("A380", 853, 5, 634, 8000, 12000);


{ /* airports*/

const a1 = new route("Tokyo", 2500, 300);
const a2 = new route("New York City", 2000, 150);
const a3 = new route("London", 1800, 200);
const a4 = new route("Paris", 1700, 250);
const a5 = new route("Moscow", 2900, 400);
const a6 = new route("Beijing", 2200, 350);
const a7 = new route("Rio de Janeiro", 1500, 100);
const a8 = new route("Sydney", 2700, 450);
const a9 = new route("Mumbai", 1900, 300);
const a10 = new route("Mexico City", 2100, 200);
const a11 = new route("Istanbul", 2300, 250);
const a12 = new route("Cairo", 1600, 150);
const a13 = new route("Bangkok", 2400, 400);
const a14 = new route("Toronto", 2000, 100);
const a15 = new route("Buenos Aires", 1400, 150);
const a16 = new route("Johannesburg", 1700, 300);
const a17 = new route("Berlin", 1900, 150);
const a18 = new route("Rome", 1800, 200);
const a19 = new route("Madrid", 1700, 250);
const a20 = new route("Seoul", 2200, 350);
const a21 = new route("Jakarta", 2500, 400);
const a22 = new route("Los Angeles", 2000, 300);
const a23 = new route("Lima", 1500, 100);
const a24 = new route("Lagos", 2100, 250);
const a25 = new route("Chicago", 1900, 100);
const a26 = new route("Osaka", 2400, 350);
const a27 = new route("Houston", 2000, 200);
const a28 = new route("Ho Chi Minh City", 2200, 400);
const a29 = new route("Dhaka", 2500, 300);
const a30 = new route("Manila", 2400, 450);
const a31 = new route("Miami", 1800, 150);
const a32 = new route("Kinshasa", 1700, 100);
const a33 = new route("Philadelphia", 1900, 150);
const a34 = new route("Baghdad", 1600, 200);
const a35 = new route("Shenzhen", 2200, 400);
const a36 = new route("Wuhan", 2100, 350);
const a37 = new route("Istanbul", 2300, 250);
const a38 = new route("Moscow", 2900, 400);
const a39 = new route("Lagos", 2100, 250);
const a40 = new route("Mumbai", 1900, 300);
const a41 = new route("Tianjin", 2200, 350);
const a42 = new route("Karachi", 2000, 200);
const a43 = new route("Guangzhou", 2400, 400);
const a44 = new route("Bangalore", 2500, 300);
const a45 = new route("Kolkata", 2200, 350);
const a46 = new route("Chennai", 2100, 400);
const a47 = new route("Taipei", 1800, 150);
const a48 = new route("Bangkok", 2400, 400);
const a49 = new route("Chongqing", 2200, 350);
const a50 = new route("Singapore", 2700, 450);
const a51 = new route("Ankara", 2300, 250);
const a52 = new route("Khartoum", 1700, 100);
const a53 = new route("Baghdad", 1600, 200);
const a54 = new route("Melbourne", 2600, 450);
const a55 = new route("Riyadh", 1900, 250);
const a56 = new route("Saint Petersburg", 1800, 200);
const a57 = new route("Sydney", 2700, 450);
const a58 = new route("Berlin", 1900, 150);
const a59 = new route("Madrid", 1300, 175);
const a60 = new route("Bogota", 1700, 100);
const a61 = new route("Barcelona", 1800, 200);
const a62 = new route("Alexandria", 1600, 150);
const a63 = new route("Abidjan", 1500, 100);
const a64 = new route("Kano", 1400, 150);
const a65 = new route("Addis Ababa", 1700, 200);
const a66 = new route("Nairobi", 1900, 250);
const a67 = new route("Casablanca", 1600, 150);
const a68 = new route("Accra", 1500, 100);
const a69 = new route("Dakar", 1400, 150);
const a70 = new route("Maputo", 1700, 200);
const a71 = new route("Harare", 1900, 250);
const a72 = new route("Luanda", 1600, 150);
const a73 = new route("Tunis", 1500, 100);
const a74 = new route("Algiers", 1400, 150);
const a75 = new route("Kampala", 1700, 200);
const a76 = new route("Lusaka", 1900, 250);
const a77 = new route("Yaounde", 1600, 150);
const a78 = new route("Brazzaville", 1500, 100);
const a79 = new route("Kinshasa", 1400, 150);
const a80 = new route("Bamako", 1700, 200);
const a81 = new route("Nouakchott", 1900, 250);
const a82 = new route("Freetown", 1600, 150);
const a83 = new route("Monrovia", 1500, 100);
const a84 = new route("Conakry", 1400, 150);
const a85 = new route("Bissau", 1700, 200);
const a86 = new route("Banjul", 1900, 250);
const a87 = new route("Djibouti", 1600, 150);
const a88 = new route("Asmara", 1500, 100);
const a89 = new route("Mogadishu", 1400, 150);
const a90 = new route("Kigali", 1700, 200);
const a91 = new route("Bujumbura", 1900, 250);
const a92 = new route("Gaborone", 1600, 150);
const a93 = new route("Maseru", 1500, 100);
const a94 = new route("Antananarivo", 1400, 150);
const a95 = new route("Port Louis", 1700, 200);
const a96 = new route("Victoria", 1900, 250);
const a97 = new route("Moroni", 1600, 150);
const a98 = new route("N'Djamena", 1500, 100);
const a99 = new route("Bangui", 1400, 150);
const a100 = new route("Libreville", 1700, 200);

}

var page = "myPlanes"

function buyPlane(name) {
    // Check if player has enough money to buy the plane
    if (data.money >= game.planes[name].cost) {
        let planeName = "";
        // Keep asking for a name until a valid name is entered
        while (planeName === "" || data.planes[planeName] !== undefined) {
            planeName = prompt("Enter a name for your new plane:");
        }
        // Save the new plane to the data object
        data.planes[planeName] = {
            model: name,
            wear: 0,
            results: 0,

            range: game.planes[name].range,

            //assigned route for the plane
            route: 0,

            //time fro trip
            timeForAssignedRoute: 10,
            position: 9,

            interval: 0,

            flying: false,

            status: "On the Ground",
        };
        // Subtract the cost of the plane from the player's money
        data.money -= game.planes[name].cost;
    } else {
        alert("You don't have enough money to buy this plane!");
    }
}

function sellPlane(name,a=true) {
    data.money += game.planes[data.planes[name].model].cost

    try {
    data.routes[data.planes[name].route].remainingDemand += game.planes[data.planes[name].model].pax

    data.routes[data.planes[name].route].planesOnThisRoute.splice(data.routes[data.planes[name].route].planesOnThisRoute.indexOf(name),1)
    }
    catch(err){}
    clearInterval(data.planes[name].interval)
    delete data.planes[name]

    if (a) {
        window.alert(`Successfully sold plane ${name}`)
    }
}


function buyRoute(name) {
    // Check if player has enough money to buy the route
    if (data.routes[name] != undefined){
        window.alert("You already have this route!")
        return false
    }
    if (data.money >= data.costForRoute) {
        // Save the route name to the data object
        data.routes[name] = {
            route: name,
            planesOnThisRoute: [],
            remainingDemand: game.routes[name].demand,
            boughtFor: data.costForRoute,
        };

        data.money -= data.costForRoute
        data.costForRoute += 100
    } else {
        alert("You don't have enough money to buy this route!");
    }
}   

function sellRoute(name) {
    for (i of data.routes[name].planesOnThisRoute) {
        if (data.planes[i].flying) {
            clearInterval(data.planes[i].interval)
            data.planes[i].status = "Awaiting Route..."
        }
    }


    data.money += data.routes[name].boughtFor

    for (var i of data.routes[name].planesOnThisRoute) {
        data.planes[i].route = 0
    }

    delete data.routes[name]
    window.alert(`Successfully sold route ${name}`)
}


function setRouteForPlane(planeName, routeName) {

    if (data.routes[routeName].planesOnThisRoute.includes(planeName) ) {return false}
    // Set the plane's assigned route to the given route name
    data.planes[planeName].route = routeName;
    // Calculate the time it will take for the plane to complete the assigned route
    let timeForRoute = Math.round(Math.floor((game.routes[routeName].distance / game.planes[data.planes[planeName].model].speed) * 60000)/1000) * 1000;
    // Set the plane's time for assigned route to the calculated time
    data.planes[planeName].timeForAssignedRoute = timeForRoute;
    data.planes[planeName].position = 0


    data.routes[routeName].planesOnThisRoute.push(planeName)

    data.routes[routeName].remainingDemand -= game.planes[data.planes[planeName].model].pax

    data.planes[planeName].demandWhenRouted = data.routes[routeName].remainingDemand
    console.log(data.routes[routeName].planesOnThisRoute)
    document.querySelector(".routeSetPopup").style.display = "none"



    if (data.routes[routeName].remainingDemand < 0) {
        window.alert("WARNING: If demand goes below 0, you will not get any profits from that flight!")
    }
}


function removeRouteFromPlane(planeName, routeName) {
    try {
    data.planes[planeName].timeForAssignedRoute = 0;
    data.planes[planeName].position = 0;
    data.planes[planeName].route = 0;
    const index = data.routes[routeName].planesOnThisRoute.indexOf(planeName);
    data.routes[routeName].planesOnThisRoute.splice(index, 1);
    data.routes[routeName].remainingDemand += game.planes[data.planes[planeName].model].pax
    }
    catch(err) {}
}


function flyPlane(name, alert = true) {
    if (data.planes[name].route == 0) {window.alert("You need to assign a route for this plane first!"); return false}
    if (data.planes[name].position == 0 && data.planes[name].flying == false)  {
        if (alert) {
            window.alert(`${name} is flying.`);
        }
        data.planes[name].flying = true
        data.money -= Math.floor(game.routes[data.planes[name].route].earn/2)
        data.planes[name].interval = setInterval(() => {
            if (data.planes[name].position >= data.planes[name].timeForAssignedRoute) {

                data.planes[name].position = 0;
                clearInterval(data.planes[name].interval)
                data.planes[name].interval = 0
                data.planes[name].wear += game.planes[data.planes[name].model].fuelEfficiency;

                if (data.planes[name].demandWhenRouted < 0) {
                    var m = 0
                }
                else {
                    var m = 1
                }
                
                data.money += (game.routes[data.planes[name].route].earn + game.planes[data.planes[name].model].pax * 2) * m
                data.planes[name].flying = false
                data.planes[name].status = "On the Ground"
                data.planes[name].results += (game.routes[data.planes[name].route].earn + game.planes[data.planes[name].model].pax * 2) * m
                

                data.money -= getIncident(name)
            } else {
                data.planes[name].position += 1000;

                var time = (data.planes[name].timeForAssignedRoute - data.planes[name].position)/1000
                data.planes[name].status = `Flying (${time})`
                console.log(data.planes[name].position, data.planes[name].timeForAssignedRoute)
            }
        }, 1000);
    } else {
        if (alert) {
            window.alert(`${name} is already flying.`);
        }
    }
}


function flyAllPlanes() {
    for (var i in data.planes) {
        flyPlane(i, false)
    }
    
}

function updatePlanes() {
    if (JSON.stringify(data.planes) == "{}"){document.querySelector(".myPlanes").innerHTML = "You need to buy some planes from the shop!";return false;}

    document.querySelector(".myPlanes").innerHTML = '<button class="flyAll" onclick="flyAllPlanes()">Takeoff All</button><button class="flyAll" onclick="fixAllPlanes()">Maintain All</button><br><br>'
    for (var i in data.planes) {
        document.querySelector(".myPlanes").innerHTML += `
            <div class="plane"> <img src="Airplane Images/${data.planes[i].model}.png" alt="Description of the image" width="200px" height="75px"> ${data.planes[i].model} / ${i}  wear: ${data.planes[i].wear} range: ${data.planes[i].range} results: $${data.planes[i].results} seats: ${game.planes[data.planes[i].model].pax} route: ${data.planes[i].route} <button onclick="setRouteForPlanePopup('${i}')">set route</buttom>  <button class="sellPlane" onclick="sellPlane('${i}')">sell plane</button>  <button onclick="flyPlane('${i}')">depart</button> <button onclick="fixPlane('${i}')">Fix Plane</button>${data.planes[i].status}</div><br>
        `
    }   
}

//

function updateRoutes() {
    if (JSON.stringify(data.routes) == "{}") {document.querySelector(".myRoutes").innerHTML = "You need to buy some routes!";return false}

    document.querySelector(".myRoutes").innerHTML = ""
    for (var i in data.routes) {
        document.querySelector(".myRoutes").innerHTML += `
            <div class="route">${i} - Remaining demand: ${data.routes[i].remainingDemand}, distance: ${game.routes[i].distance} <button class="sellRoute" onclick="sellRoute('${i}')">Sell Route</button></div>
        `
    }   
}

function setRouteForPlanePopup(plane) {
    document.querySelector(".routeSetPopup").style.display = "block"
    if (JSON.stringify(data.routes) == "{}") {document.querySelector(".myRoutes2").innerHTML = "You need to buy some routes!";return false}
    document.querySelector(".myRoutes2").innerHTML = ""
    document.querySelector(".myRoutes2").innerHTML += `
    <div class="route"><button class="setRoute" onclick="removeRouteFromPlane('${plane}', '${data.planes[plane].route}')">Remove Route</button></div>`
    for (var i in data.routes) {
        document.querySelector(".myRoutes2").innerHTML += `
            <div class="route">${i} - Remaining demand: ${data.routes[i].remainingDemand}, distance: ${game.routes[i].distance} <button class="setRoute" onclick="setRouteForPlane('${plane}', '${i}')">Set Route</button></div>
        `
    } 
}

function fixPlane(name,c=true) {
    var cost = (game.planes[data.planes[name].model].cost/100) * data.planes[name].wear

    var e = 0

    if (c) {
        if (confirm(`Are you sure you want to maintain ${name} for $${cost}`)) {
            e = true
        }
    }
    else {
        e = true
    }

    if (e == true) {
        data.planes[name].wear = 0
        data.money -= cost
    }

}

function fixAllPlanes() {
    totalCost = 0
    for (var name in data.planes) {
        var cost = (game.planes[data.planes[name].model].cost/100) * data.planes[name].wear
        totalCost += cost
    }

    if (confirm(`Are you sure you want to maintain all planes for $${cost}`)) {
        for (var name in data.planes) {
            fixPlane(name,c=false)
        }
    }
}


function getIncident(plane) {
    var wear = data.planes[plane].wear
    if (wear >= 100) {
        //plane blew up and got destoryed and you lose all your money from law suits
        window.alert("Your plane blew up mid flight...your airlines funds got comprimised...")
        sellPlane(plane,false)
        return data.money + 100000
    }
    else if (wear >= 90) {
        //both engines blew up and you had to emergancy land. - plane cost + 20000
        window.alert("All of the engines blew up and your plane had to make an emergancy landing in the ocean.")
        return 20000
    }
    else if (wear >= 80) {
        //one engines had blew up, but everytging fine. - plane cost / 2 + 10000
        window.alert("One of the engines blew up mid flight but still landed safely.")
        return 10000
    }
    else if (wear >= 70) {
        //False bomb alert and the cops had to come - 5000
        window.alert("False bomb alert, and the cops had to come.")
        return 5000
    }
    else if (wear >= 60) {
        //the plane had a bird strike - 1000
        window.alert("One of the engines had a birdstrike.")
        return 1000
    }
    else if (wear >= 50) {
        //the toilot broke - 500
        window.alert("The toilet broke.")
        return 500
    }
    else if (wear >= 40) {
        //The fridge broke so no food or drnks - 200
        window.alert("The fridge broke so passengers could not have food or drinks.")
        return 200
    }
    else {
        return 0
    }
}


function updateRoutesShop() {
    document.querySelector(".buyRoutes").innerHTML = ""
    for (var i in game.routes) {
        if (data.routes[i] == undefined) {
            document.querySelector(".buyRoutes").innerHTML += `
                <div class="plane">${i} Distance: ${game.routes[i].distance} cost: ${data.costForRoute} <button class="buyRoute" onclick="buyRoute('${i}')">Buy</button></div>
            `
        }
    }   
}

function updatePlaneShop() {
    document.querySelector(".buyPlanes").innerHTML = ""
    for (var i in game.planes) {
        document.querySelector(".buyPlanes").innerHTML += `
        <div class="plane"> <img src="Airplane Images/${i}.png" alt="Description of the image" width="200px" height="75px"> ${i} cost: ${game.planes[i].cost} range: ${game.planes[i].range}  seats: ${game.planes[i].pax} <button class="buyPlane" onclick="buyPlane('${i}')">buy</buttom></div>
    `
    }
}

function updatePage() {
    var pages = document.getElementsByClassName("page");
    for (var i = 0; i < pages.length; i++) {
    // Do something with each div with classname "page"
    pages[i].style.display = "none"
    }
    document.querySelector(`.${page}`).style.display = "block"
}

function update() {
    updatePage();
    updatePlanes()
    updateRoutes()
    updateRoutesShop();
    updatePlaneShop();

    document.querySelector(".moneyDisplay").innerHTML = `Money: $${data.money}`
}

function save() {
    localStorage.setItem("AIRLINE MANAGER TYCOON SAVE",JSON.stringify(data))
}

function load() {
    if (JSON.parse(localStorage.getItem("AIRLINE MANAGER TYCOON SAVE")) == undefined) {return false}

    data = JSON.parse(localStorage.getItem("AIRLINE MANAGER TYCOON SAVE"))
    for (var i in data.planes) {
        data.planes[i].flying = false
        data.planes[i].interval = 0
        data.planes[i].status = "On the Ground"
        data.planes[i].position = 0
    }
}

function reset() {
    data = {
        money: 2500,
        costForRoute: 1000,
        planes: {},
        routes: {},
    }

    save()
}

load()
update()


setInterval(() => {
    update()
    save()
}, (1000));


document.querySelector(".cancel").onclick = () => {
    document.querySelector(".routeSetPopup").style.display = "none"
}

console.log(`Money ${data.money}`)
