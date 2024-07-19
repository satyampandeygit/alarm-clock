const Alarm = require("./Alarm");

class AlarmClock {
  constructor() {
    this.alarms = [];
  }

  displayTime() {
    try {
      let clock = new Date();
      clock = clock.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
      clock = new Date(clock);
      let hour = clock.getHours();
      let minute = clock.getMinutes();
      let second = clock.getSeconds();

      let suffix = "AM";
      if (hour >= 12) {
        suffix = "PM";
        if (hour > 12) {
          hour = hour - 12;
        }
      }

      hour = String(hour).padStart(2, "0");
      minute = String(minute).padStart(2, "0");

      const time = `${hour}:${minute}:${second}`;
      console.log(`${time} ${suffix}`);
    } catch (e) {
      console.log("Error while displaying time!!");
      console.log(e);
    }
  }

  addAlarm(scheduledDay, scheduledTime) {
    try {
      const newAlarm = new Alarm();
      newAlarm.scheduledTime = scheduledTime;
      newAlarm.scheduledDay = scheduledDay;
      this.alarms.push(newAlarm);

      console.log(
        "Alarm for " + scheduledDay + " on " + scheduledTime + " added.",
      );
    } catch (err) {
      console.log(err);
    }
  }

  deleteAlarm(indexOfAlarmToDelete) {
    try {
      if (this.alarms.length === 0) {
        console.log("No alarm for the user. Please add alarm!!");
        return;
      }
      console.log("Deleting " + indexOfAlarmToDelete);
      if (
        indexOfAlarmToDelete < 0 ||
        indexOfAlarmToDelete > this.alarms.length
      ) {
        console.error("Please select alarm from the given list");
        return;
      }
      this.alarms = this.alarms.filter(
        (alarm, index) => index != indexOfAlarmToDelete,
      );
      this.displayAllAlarms();
    } catch (err) {
      console.log(
        "Error when deleting alarm for " +
          scheduledDay +
          " on " +
          scheduledTime,
      );
      console.error(err);
    }
  }

  displayAllAlarms() {
    console.log("Alarms");
    this.alarms.forEach((alarm, index) => {
      console.log(`${index + 1}. ${alarm.scheduledDay} ${alarm.scheduledTime}`);
    });
  }
}

module.exports = AlarmClock;
