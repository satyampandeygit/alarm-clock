class Alarm {
    constructor() {
      this._id = Math.random(Math.random() * 1000);
      this.scheduledDay = "";
      this.scheduledTime = "";
      this.snoozedTimes = 0;
      this.active = false;
      this.afterSnoozeTime = "";
    }
  
    setScheduledTime(scheduledTime) {
      this.scheduledTime = scheduledTime;
    }
  
    getScheduledTime() {
      if (this.snoozedTimes > 0) {
        return this.afterSnoozeTime;
      }
      return this.scheduledTime;
    }
  
    setScheduledDay(scheduledDay) {
      this.scheduledDay = scheduledDay;
    }
  
    getScheduledDay() {
      if (this.scheduledDay === "Sunday") {
        return 0;
      } else if (this.scheduledDay === "Monday") {
        return 1;
      } else if (this.scheduledDay === "Tuesday") {
        return 2;
      } else if (this.scheduledDay === "Wednesday") {
        return 3;
      } else if (this.scheduledDay === "Thursday") {
        return 4;
      } else if (this.scheduledDay === "Friday") {
        return 5;
      } else {
        return 6;
      }
    }
  
    setToSnooze(tempHour, tempMinute, tempSuffix) {
      if (this.snoozedTimes === 3) {
        console.log("Alarm already snoozed three times. Deactivating for today.");
        this.afterSnoozeTime = "";
        this.snoozedTimes = 0;
        this.active = false;
      } else {
        this.snoozedTimes = this.snoozedTimes + 1;
        this.afterSnoozeTime = `${tempHour}:${tempMinute} ${tempSuffix}`;
        console.log(`Alarm snoozed to ${this.afterSnoozeTime}.`);
      }
    }
  
    getSnoozedTimes() {
      return this.snoozedTimes;
    }
  
    startAlarm() {
      console.log(
        `Alarm for ${this.scheduledDay} on ${this.scheduledTime} activated!!`,
      );
      this.active = true;
    }
  
    stopAlarm() {
      this.active = false;
      this.snoozedTimes = 0;
      this.afterSnoozeTime = "";
      console.log("Alarm stopped!!");
    }
}
  
module.exports = Alarm;
  