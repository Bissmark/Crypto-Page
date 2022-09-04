import React from 'react';
import axios from 'axios';

const Login = () => {
  const handleSubmit = (email, password) => {
    const loginPayLoad = {
        email: 'ceege@reqres.in',
        password: 'chicken'
    }

    axios.post("https://reqres.in/api/login", loginPayLoad)
        .then( response => {
            const token = response.data.token;
            localStorage.setItem('token', token);
            // SetAuthToken(token);

            window.location.href = '/'
        })
        .catch(err => console.log(err));
}

  return (
    <div>
      <form
       onSubmit={(e) => {
        e.preventDefault();
        const [email, password] = e.target.children;
        handleSubmit(email, password);
       }}>
        {/* <div>{error && JSON.stringify(error)}</div> */}

        <label for="email">Email</label><br />
        <input type="email" id="email" name="email"/><br />
        <label for="password">Password</label><br />
        <input type="password" id="password" name="password"/><br></br>

        <br />

        <input type="submit" value="Submit" />
      </form>
      <br />
      {/* <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p> */}
    </div> 
  )
}

export default Login;