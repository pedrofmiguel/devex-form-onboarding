import type { NextPage } from 'next'
import styles from '../styles/Onboard.module.css'
import { useState, useEffect } from "react"
import { pipe } from 'fp-ts/lib/function'
import { Either, left, right, chain } from 'fp-ts/Either'
import Emoji from '../components/Emoji'

//todo: refactor and add the correct 
// add the pipe functions to make corrections to the validations
// add Option validations to the variables
// Either to validate
type FormBody = {
    name: string,
    email: string,
    password: string
}

type Validation = {
    left?: any,
    right?: any
}

const Onboarding: NextPage = () => {
    const [name, setName]  =  useState("")
    const [password, setPassword]  =  useState("")
    const [email, setEmail]  =  useState("")
    const [errors, setErrors] = useState([])
    //error messages
    const [errorName, setErrorName] = useState(null )
    const [errorPassword, setErrorPassword] = useState(false)
    const [errorEmail, setErrorEmail] = useState(false)


   useEffect(() => {
        console.log("errorsState", errors)
        if(errorEmail) {

        }
        
   }, [errors, errorPassword, errorName, errorEmail])
   
    const minLength = (s: string): Either<string, string> =>
    s.length >= 6 ? right(s) : left('at least 6 characters')
    
    const oneCapital = (s: string): Either<string, string> =>
    /[A-Z]/g.test(s) ? right(s) : left('at least one capital letter')
    
    const oneNumber = (s: string): Either<string, string> =>
    /[0-9]/g.test(s) ? right(s) : left('at least one number')

    const cannotBeEmpty = (s: string): Either<string, string> => s.trim().length ? right(s) : left('cannot be empty')


    
    // validators using pipe and chain -> will only show the first validations
    const validateName =  (name: string): Either<string, string> => pipe(
        name, 
        oneCapital,
        chain(cannotBeEmpty),
    );

    const validateEmail =  (email: string): Either<string,string>  => pipe(
        email,
        cannotBeEmpty
    );

    const validatePassword = (password: string): Either<string, string> => pipe(
        password,
        minLength, 
        chain(oneNumber), 
        chain(oneCapital)
    );
    


    const handleEmailChange = (e: any) => { 
        setEmail(e.target.value)
        const inputValue = e.target.value;
        const validate: Validation = validateEmail(inputValue);

        if(validate?.left) {
            setErrorEmail(true)
        }
        else if(validate?.right) { console.log('email all good 🥳') }
        else { console.log("fallback 👺")}
    }

    const handleNamechange = (e: any) => {
        setName(e.target.value);
        const validate: Validation = validateName(e.target.value);
        let errArr: Array<String> = []
        if(validate?.left) {
            console.log("LEFT 🔥", validate?.left);
            setErrorName(true)
            if(!errors.includes(`name ${validate.left}`)) {
                 errArr =  [`name ${validate.left}`]
            }
            let newArray: Array<String> = errArr.concat(errors)
            setErrors(newArray);
        }
        else if(validate?.right) { 
            console.log('name all good 🥳');
            setErrors([])
            setErrorName(false);
        }
    } 

    const handlePasswordChange = (e: any) => { 
        setPassword(e.target.value)
        const validate: Validation = validatePassword(e.target.value);
        let errArr: Array<String> = []

        if(validate?.left) {
            if(!errors.includes(`password ${validate.left}`)) {
                errArr =  [`password ${validate.left}`]
            }
            let newArray: Array<String> = errArr.concat(errors)
            setErrors(newArray);
        }
        else if(validate?.right) { 
            console.log('password all good 🥳') 
            setErrorPassword(false);
        }
    } 

    const handleFormSubmission = () => {
        console.log('form submited. 🔥')
        setErrors([])
    }

  return (
    <div>
        <main>
            <h1 className="onboard_form_title">Onboard</h1>
            <div className="onboard_form_container">
                <form className="onboard_form" onsubmit={handleFormSubmission}>
                    <div>   
                        <label htmlFor="nameInput">Name</label>
                        <div className="onboard_form_input_container"> 
                            { errorName ? <Emoji emoji="❌" label=""/> : <Emoji emoji="✅" label="check"/> }
                            <input type="text" name='name' id='nameInput' onChange={handleNamechange} value={name} className={errorName ? 'red' : 'neutral'}/>
                        </div>
                       
                    </div>
                    <div>
                        <label htmlFor="emailInput">Email</label>
                        <div className="onboard_form_input_container"> 
                            { errorEmail     ? <Emoji emoji="❌" label=""/> : <Emoji emoji="✅" label="check"/> }
                            <input type="email" name='email' id='emailInput'  onChange={handleEmailChange} value={email} className={errorEmail? 'red' : 'neutral'}/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="passwordInput">Password</label>
                        <div className="onboard_form_input_container"> 
                            { errorPassword ? <Emoji emoji="❌" label=""/> : <Emoji emoji="✅" label="check"/> }
                            <input type="password" name='password' id='passwordInput'  onChange={handlePasswordChange} value={password} className={errorPassword ? 'red' : 'neutral'}/>
                        </div>
                    </div>
                    <div className="onboarding_form_errors">
                        {errors}
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </main>
    </div>
  )
}

export default Onboarding