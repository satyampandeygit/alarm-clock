const fs = require('fs');
const AlarmClock = require('./AlarmClock');

const alarmClock = new AlarmClock();

function readInput() {
    fs.readFile("./input.txt", "utf8", (err, data) => {
        if(err) {
            console.error(err);
        }else {
            const inputArray = data.split("\n");
            inputArray.forEach(input => {
                const inputString = input.split(" ");

                switch(inputString[0]) {
                    case "1":
                        alarmClock.displayTime();
                        break;
                    case "2":
                        let isValid = true;
                        let day = inputString[1];
                
                        switch(day) {
                            case "1":
                                day = "Sunday";
                                break;
                            case "2":
                                day = "Monday";
                                break;
                            case "3":
                                day = "Tuesday";
                                break;
                            case "4":
                                day = "Wednesday";
                                break;
                            case "5":
                                day = "Thursday";
                                break;
                            case "6":
                                day = "Friday";
                                break;
                            case "7":
                                day = "Saturday";
                                break;
                            default:
                                isValid = false;
                                console.log("Invalid day selected. Please select a day from above options i.e. 1 for Monday and so on.");
                        }
                
                        if(isValid) {
    
                            // validating input
                            const inputArray = inputString[2].split(":");
                            if(inputArray.length !== 2) {
                                console.log("Invalid input. Please enter time in HH:mm format.");
                            } else {
                    
                                let hour = parseInt(inputArray[0]);
                                let minutes = parseInt(inputArray[1]);
                        
                                if(hour < 0 || hour > 24 || minutes < 0 || minutes > 59) {
                                    console.error("Hour and minutes input are not valid. Please try again with valid values");
                                }else {
                        
                                    let suffix = "AM";
                            
                                    if(hour >= 12) {
                                        suffix = "PM";
                                        if(hour > 12) {
                                            hour -= 12;
                                        }
                                    }

                                    hour = String(hour).padStart(2, "0");
                                    minutes = String(minutes).padStart(2, "0");
                            
                                    const time = `${hour}:${minutes} ${suffix}`;
                                    alarmClock.addAlarm(day, time);
                                }
                            }
                        }
                        break;
                    case "3":
                        alarmClock.deleteAlarm(parseInt(inputString[1])-1);
                        break;
                    case "4":
                        alarmClock.displayAllAlarms();
                        break;
                    default:
                        console.log("Invalid input given. Please try again!!");
                        break;
                }
            });
        }
    })
}

readInput();