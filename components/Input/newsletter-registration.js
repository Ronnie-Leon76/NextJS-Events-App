import classes from "./newsletter-registration.module.css";
import { useContext, useRef } from "react";
import NotificationContext from "../../store/notification-context";

function NewsletterRegistration() {
  const notificationCtx = useContext(NotificationContext);
  const emailInputRef = useRef();
  function registrationHandler(event) {
    event.preventDefault();
    //console.log(event.target.value);
    const enteredEmail = emailInputRef.current.value;
    //console.log(enteredEmail);

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API

    notificationCtx.showNotification({
      title: "Signing Up!",
      message: "Registering for newsletter.",
      status: "pending",
    });

    const reqBody = { email: enteredEmail };
    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then((data) => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: "Success!",
          message: "Successfully registered for the newsletter!",
          status: "success",
        });
        console.log(data);
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error",
          message: error.message || "Something went wrong!",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            ref={emailInputRef}
            placeholder="Your email"
            aria-label="Your email"
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
