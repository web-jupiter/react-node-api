// import { SubmissionError } from 'redux-form'

function addTourSubmitDispatch(values) {
    console.log(values);
    // return fetch('http://www.silvanium.com/api/v1/Users/Register', {
    //     method: 'POST',
    //     headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         firstName : values.firstName,
    //         lastName : values.lastName,
    //         password : "password",
    //         email : "nisargm4@microsoft.com",
    //         phoneNumber : "4243551547",
    //     }),
    //     }).then((res) => {
    //     console.log("This is the res: ", res)
    //     }).catch((err) => {
    //     console.log(err)
    //      throw new SubmissionError({ password: 'Wrong password', _error: 'Login failed!' })
    //     })
}

export default addTourSubmitDispatch