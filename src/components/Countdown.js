import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  countdown: {
    fontSize: '14px',
    fontWeight: 'bold',
  },
});

const Countdown = ({ expiryDate }) => {
  const [timeRemaining, setTimeRemaining] = useState('');
  const classes = useStyles();

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = moment();
      const expiration = moment(expiryDate);
      const duration = moment.duration(expiration.diff(now));
      const days = Math.floor(duration.asDays());
      const hours = duration.hours();
      const minutes = duration.minutes();
      const seconds = duration.seconds();
      setTimeRemaining(
        `${days} days ${hours} hrs ${minutes} mins ${seconds} secs`
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, [expiryDate]);

  return <span className={classes.countdown}>{timeRemaining}</span>;
};

export default Countdown;
