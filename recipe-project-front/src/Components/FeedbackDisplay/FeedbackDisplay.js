import React from 'react';
import styles from "./FeedbackDisplay.module.css";

function FeedbackDisplay({ feedbackData }) {
  return (
    <div className={styles.allfeedbacks}>
      {feedbackData.map((feedback) => (
        <div key={feedback.id} className={styles.feedbackitem}>
          <div className={styles.userprofile}>
           <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="white" d="M12 6c1.654 0 3 1.346 3 3s-1.346 3-3 3s-3-1.346-3-3s1.346-3 3-3m0-2C9.236 4 7 6.238 7 9s2.236 5 5 5s5-2.238 5-5s-2.236-5-5-5zm0 13c2.021 0 3.301.771 3.783 1.445c-.683.26-1.969.555-3.783.555c-1.984 0-3.206-.305-3.818-.542C8.641 17.743 9.959 17 12 17m0-2c-3.75 0-6 2-6 4c0 1 2.25 2 6 2c3.518 0 6-1 6-2c0-2-2.354-4-6-4z"/></svg>            {/* <img src={feedback.userPhoto} alt={`${feedback.userName}'s profile`} /> */}
          </div>
          <div className={styles.userinfo}>
            <p className={styles.username}>{feedback.userName}</p>
            <p className={styles.feedbackcontent}>{feedback.feedbackContent}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FeedbackDisplay;
