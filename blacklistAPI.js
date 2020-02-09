console.log('initialize(file name) to run the program and add the blacklist to the list');
console.log('enter name,phone_number to check the person is it blacklisted or not');

class Person{
    constructor(name,phoneNumber){
        this.personName = name;
        this.personphNumber = phoneNumber;
    }

}

const readline = require('readline');
var blacklistList = [];

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.on('line', (line) => {
    //console.log(`Received: ${line}`);
    var splitter;
    if(line.includes('initialize')){
        //console.log('this is initialize');
        splitter = line.split('(');
        filename = splitter[1].slice(0,-1);
        //console.log(filename);
        InitializeFile(filename);
    }
    else if(line === 'q'){
        process.exit(1);
    }
    else{
        console.log('checking blacklist');
        if(line.includes(',')){
            blacklistLine = line.split(',');
            checkBlacklist(blacklistLine[0], blacklistLine[1]);
        }
        else{
            console.log('use , as the seperator between name and phone number');
        }
    }
});



function InitializeFile(filename){
    const fs = require('fs');
    var readbyLine = fs.readFileSync(`${filename}`,'utf8',(err,data) => {
        if(err) throw err;        
    }).toString().split('\n');

    for(var i = 0; i < readbyLine.length; i++){
        var lineTrim = readbyLine[i].trim('\r');
        var lineSplitter = lineTrim.split(' ');
        var personInfo = new Person(lineSplitter[0], lineSplitter[1]);
        blacklistList.push(personInfo);
        console.log(blacklistList);
    }
    return console.log('Person added ' + i);
}

function checkBlacklist(name, phonenumber){
    for(var i = 0; i < blacklistList.length; i++){
        var personCheck = blacklistList[i];
        console.log(personCheck);
        if(personCheck.personName === name && personCheck.personphNumber === phonenumber){
            return console.log('Person is blacklisted');
        }
    }
    console.log('Person is not in blacklist');
}

