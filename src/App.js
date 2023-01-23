import { useRef, useState } from "react";
import "./App.css";
import ReCAPTCHA from "react-google-recaptcha";

function App() {
  const recaptcha = useRef();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  async function submitForm(event) {
    event.preventDefault();
    const captchaValue = recaptcha.current.getValue();
    if (!captchaValue) {
      alert("Please verify the Recaptcha!");
    } else {
      const res = await fetch("http://localhost:8000/verify", {
        method: "POST",
        body: JSON.stringify({ captchaValue }),
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success) {
        // make form submission
        alert("Form submission successful!");
      } else {
        alert("Recaptcha validation failed!");
      }
    }
  }

  return (
    <div>
      <h1>Sign up for Newsletter</h1>
      <form onSubmit={submitForm}>
        <input
          name="Email"
          type={"email"}
          value={email}
          required
          placeholder="joe@example.com"
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          name="Name"
          type={"name"}
          value={name}
          required
          placeholder="Joe"
          onChange={(event) => setName(event.target.value)}
        />
        <button type="submit">Sign up</button>
        <ReCAPTCHA ref={recaptcha} sitekey={process.env.REACT_APP_SITE_KEY} />
      </form>
    </div>
  );
}

export default App;
