import {
  makeObservable,
  observable,
  action,
  computed,
  makeAutoObservable,
} from "mobx";

export const storeClock = () => {
  return makeAutoObservable(
    {
      timerOn: false,
      setTimerOn(props) {
        this.timerOn = props;
      },
      second: 0,
      minute: 0,
      hour: 0,
      setSecond() {
        this.second++;
        if (this.second === 60) {
          this.minute++;
          this.second = 0;
        }
        if (this.minute === 60) {
          this.hour++;
          this.minute = 0;
        }
      },
      resetSecond() {
        this.second = 0;
      },
      get time() {
        return `${normalizeTime(this.hour)}:${normalizeTime(
          this.minute
        )}:${normalizeTime(this.second)}`;
      },
      resetTime() {
        this.second = 0;
        this.minute = 0;
        this.hour = 0;
      },
    }
    // {
    //   timerOn: observable,
    //   setTimerOn: action.bound,
    //   second: observable,
    //   setSecond: action.bound,
    //   resetSecond: action.bound,
    //   minute: observable,
    //   hour: observable,
    //   time: computed,
    //   resetTime: action.bound,
    // }
  );
};

function normalizeTime(time) {
  return time < 10 ? `0${time}` : time;
}
