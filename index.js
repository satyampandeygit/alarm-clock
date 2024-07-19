const AlarmClock = require("./AlarmClock");
const readline = require("readline");

const io = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const alarmClock = new AlarmClock();

function handleUserInput(userInput) {
  switch (userInput) {
    case "1":
      alarmClock.displayTime();
      console.log("\n");
      displayMenu();
      break;
    case "2":
      io.question(
        "Select day from below options: \n1. Sunday\n2. Monday\n3. Tuesday\n4. Wednesday\n5. Thursday\n6. Friday\n7. Saturday\nEnter a day: ",
        (day) => {
          let isValid = true;

          switch (day) {
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
              console.log(
                "Invalid day selected. Please select a day from above options i.e. 1 for Monday and so on.",
              );
          }
          if (isValid) {
            io.question("Enter time (HH:mm): ", (timeInput) => {
              // validating input
              const inputArray = timeInput.split(":");
              if (inputArray.length !== 2) {
                console.log(
                  "Invalid input. Please enter time in HH:mm format.",
                );
              } else {
                let hour = parseInt(inputArray[0]);
                let minutes = parseInt(inputArray[1]);

                if (hour < 0 || hour > 24 || minutes < 0 || minutes > 59) {
                  console.error(
                    "Hour and minutes input are not valid. Please try again with valid values",
                  );
                } else {
                  let suffix = "AM";

                  if (hour >= 12) {
                    suffix = "PM";
                    if (hour > 12) {
                      hour -= 12;
                    }
                  }

                  hour = String(hour).padStart(2, "0");
                  minutes = String(minutes).padStart(2, "0");

                  const time = `${hour}:${minutes} ${suffix}`;
                  alarmClock.addAlarm(day, time);
                }
              }
              console.log("\n");
              displayMenu();
            });
          }
        },
      );
      break;
    case "3":
      alarmClock.displayAllAlarms();
      io.question("Choose from listed alarms to delete: ", (input) => {
        alarmClock.deleteAlarm(parseInt(input - 1));
        console.log("\n");
        displayMenu();
      });

      break;
    case "4":
      alarmClock.displayAllAlarms();
      console.log("\n");
      displayMenu();
      break;
    case "5":
      console.log("Now checking for alarms...");
      break;
    default:
      console.log("Invalid input, please choose again");
      console.log("\n");
      displayMenu();
  }
}

function displayMenu() {
  console.log("Menu");
  console.log("1. Display time");
  console.log("2. Add a new alarm");
  console.log("3. Delete a alarm");
  console.log("4. Display all alarm");
  console.log("5. Check for alarms");
  io.question("Select an option from above: ", (input) => {
    handleUserInput(input);
  });
}

function checkForAlarm() {
  try {
    if (alarmClock.alarms.length === 0) {
      console.log("No alarms added to clock!!");
      return;
    }
    const currentTime = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
    );
    // currentTime = currentTime.toLocaleString('en-US', { timeZone: 'Asia/Kolkata'});
    // currentTime = new Date(clock);
    let hour = currentTime.getHours();
    let minute = currentTime.getMinutes();
    const todayDay = currentTime.getDay();

    let suffix = "AM";

    if (hour >= 12) {
      suffix = "PM";
      if (hour > 12) {
        hour -= 12;
      }
    }

    let textHour = String(hour).padStart(2, "0");
    let textMinute = String(minute).padStart(2, "0");

    alarmClock.alarms.forEach((alarm) => {
      if (
        alarm.getScheduledTime() === `${textHour}:${textMinute} ${suffix}` &&
        alarm.getScheduledDay() === todayDay
      ) {
        console.log("triggering alarm");
        io.question(
          "Enter 1 to stop alarm and other key to snooze: ",
          (input) => {
            if (parseInt(input) === 1) {
              alarm.stopAlarm();
            } else {
              minute += 5;
              if (minute > 59) {
                minute -= 59;
                hour += 1;

                if (hour >= 12) {
                  if (suffix === "PM") {
                    hour -= 12;
                    suffix = "AM";
                  } else {
                    suffix = "PM";
                    if (hour > 12) {
                      hour -= 12;
                    }
                  }
                }
              }
              alarm.setToSnooze(hour, minute, suffix);
            }
          },
        );
      }
    });
  } catch (err) {
    console.log("Error when checking for alarm!!");
    console.error(err);
  }
}

setInterval(() => {
  alarmClock.displayTime();
  checkForAlarm();
}, 60000);

displayMenu();
