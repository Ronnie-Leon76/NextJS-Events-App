import classes from "./newsletter-registration.module.css";
import { useRef } from "react";

function NewsletterRegistration() {
  const emailInputRef = useRef();
  function registrationHandler(event) {
    event.preventDefault();
    //console.log(event.target.value);
    const enteredEmail = emailInputRef.current.value;
    //console.log(enteredEmail);

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API

    const reqBody = { email: enteredEmail };
    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
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
