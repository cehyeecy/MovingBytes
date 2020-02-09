const readline = require('readline');
var parkingLot = [];

class Car{
    constructor(CarRegNumber, CarColour){
        this.carClassregNumber = CarRegNumber;
        this.carClassColour = CarColour;
    }
}

if (process.argv.length === 3) {
    var fs = require('fs');
    var filename = process.argv[2];
    var fileInputData = fs.readFileSync(filename, 'utf8', function(err, data) {
        if (err) throw err;
        }).toString().split('\n');
    for(var i = 0; i < fileInputData.length; i++){
        processInput(fileInputData[i].trim("\r"));
    }
}
else{
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    
    rl.on('line', (line) => {
        processInput(line.toString());
    })
}

function processInput(inputLine){
    var splitter = inputLine.split(' ');
    //console.log(inputLine);
    switch(splitter[0]){
        case "create_parking_lot":
            var slot = parseInt(splitter[1], 10);
            if(splitter[1] > 0 && Number.isInteger(slot)){
                createParkingLot(slot);
            }else if(splitter[1] <= 0){
                console.log("Enter number bigger than 0");
            }
            else{
                console.log("Enter a number");
            }
            break;
        case "park":
            if(splitter.length === 3){
                parkCar(splitter[1], splitter[2]);
            }
            else{
                console.log('park {registration number} {car colour}');
            }
            break;
        case "leave":
            if(splitter.length === 2){
                removeCar(splitter[1]);
            }
            else{
                console.log('leave {slot number}');
            }
            break;
        case "registration_numbers_for_cars_with_colour":
            checkRegisNumFromCarColour(splitter[1]);
            break;
        case "slot_numbers_for_cars_with_colour":
            checkSlotFromCarColour(splitter[1]);
            break;
        case "slot_number_for_registration_number":
            checkSlotFromRegisNum(splitter[1]);
            break;
        default:
            parkingLotStatus();
    }
}

function createParkingLot(slots){
    if(Number.isInteger(slots)){
        parkingLot = new Array(slots);
        for(var i = 0; i < parkingLot.length; i++){
            parkingLot[i] = null;
        }
        //console.log(parkingLot.length);
        //console.log(parkingLot);
        if(slots === 1){
            return console.log(`Created a parking lot with ${slots} slot`);
        }
        else{
            return console.log(`Created a parking lot with ${slots} slots`);
        }
    }    
}

function parkCar(carRegisNum, carBodyColour){
    var car = new Car(carRegisNum, carBodyColour);
    for(var i = 0; i < parkingLot.length; i++){
        if(!parkingLot[i]){
            parkingLot[i] = car;
            console.log(`Allocated slot number: ${i + 1}`);
            return;
        }
    }
    return console.log("Sorry, parking lot is full");
    
}
  
function removeCar(parkIndex){
    parkingLot[parkIndex - 1] = null;
    return console.log("Slot number " + parkIndex + " is free");
}


function checkRegisNumFromCarColour(colour){
    var regisNum = "";
    //console.log(parkingLot);
    for(var i = 0; i < parkingLot.length; i++){
        var parkedCar = parkingLot[i];
        if(parkedCar.carClassColour === colour){
            regisNum = regisNum + parkedCar.carClassregNumber + ", ";
        }
    }
    if(regisNum === ""){
        console.log("Not found");
    }
    else{
        console.log(regisNum.substring(0, regisNum.length - 2));
    }
}

function checkSlotFromCarColour(colour){
    var slotNum = "";
    for(var i = 0; i < parkingLot.length; i++){
        var parkedCar = parkingLot[i];
        if(parkedCar.carClassColour === colour){
            var inumber = i + 1;
            slotNum = slotNum + inumber + ", ";
        }
    }
    if(slotNum === ""){
        console.log("Not found");
    }
    else{
        console.log(slotNum.substring(0, slotNum.length - 2));
    }
}

function checkSlotFromRegisNum(registrationNumber){
    //console.log(registrationNumber);
    var regNuminput = registrationNumber;
    var slotNum = "";
    for(var i = 0; i< parkingLot.length; i++){
        var parkedCarInfo = parkingLot[i];
        if(regNuminput === parkedCarInfo.carClassregNumber){
            slotNum = i+1;
        }
    }
    if(slotNum !== ""){
        console.log(slotNum);
    }
    else{
        console.log("Not found");
    }
}

function parkingLotStatus(){
    console.log('Slot No\t\tRegistration No.\tColour');
    for(var i = 0; i< parkingLot.length; i++){
        var carInfo = parkingLot[i];
        if(!carInfo){
            continue;
        }
        else{
            console.log(`${i+1}\t\t${carInfo.carClassregNumber}\t\t${carInfo.carClassColour}`);
        }
        
    }
}
