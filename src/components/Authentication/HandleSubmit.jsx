const handleSubmit = (email, password) => {
    const loginPayLoad = {
        email: 'ceege@reqres.in',
        password: 'chicken'
    }

    axios.post("https://reqres.in/api/login", loginPayLoad)
        .then( response => {
            const token = response.data.token;
            localStorage.setItem('token', token);
            setAuthToken(token);

            window.location.href = '/'
        })
        .catch(err => console.log(err));
}