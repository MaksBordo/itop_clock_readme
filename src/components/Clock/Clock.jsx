import React, { useState, useEffect } from "react";
import classes from "./Clock.module.scss";
import { observer } from "mobx-react";
import { storeClock } from "../../mobx/Clock/storeClock";
const store = storeClock();

export const Clock = observer(() => {
  const [timeStamp, setTimeStamp] = useState(0);
  useEffect(() => {
    if (store.timerOn) {
      const interval = setInterval(() => {
        store.setSecond();
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [store.timerOn]);
  return (
    <div className={classes["clock"]}>
      <p className={classes["clock__display"]}>{store.time}</p>
      <div className={classes["clock__btns"]}>
        <button
          className={`${classes["clock__btn"]} ${classes["clock__btn_start"]}`}
          onClick={() => {
            if (!store.timerOn) {
              store.setTimerOn(!store.timerOn);
            } else {
              store.setTimerOn(!store.timerOn);
              store.resetTime();
            }
          }}
        >
          Start/Stop
        </button>
        <button
          className={`${classes["clock__btn"]} ${classes["clock__btn_wait"]}`}
          onClick={(e) => {
            if (e.timeStamp - timeStamp < 300) {
              store.setTimerOn(false);
            }
            setTimeStamp(e.timeStamp);
          }}
        >
          Wait
        </button>
        <button
          className={`${classes["clock__btn"]} ${classes["clock__btn_reset"]}`}
          onClick={() => {
            store.resetTime();
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
});
