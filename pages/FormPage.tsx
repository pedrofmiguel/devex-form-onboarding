import type { NextPage } from 'next'
import styles from '../styles/Onboard.module.css'
import { useState, useEffect } from "react"
import { pipe } from 'fp-ts/lib/function'
import { Either, left, right, chain } from 'fp-ts/Either'
import Emoji from '../components/Emoji'
import { validateEmail, validateName, validatePassword } from '../helpers/validations'

type FormBody = {
    name: string,
    email: string,
    password: string
}

type Validation = {
    left?: any,
    right?: any
}

const FormPage: NextPage = () => {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [errors, setErrors] = useState([])
    //error messages
    const [errorName, setErrorName] = useState(null)
    const [errorPassword, setErrorPassword] = useState(false)
    const [errorEmail, setErrorEmail] = useState(false)

    const handleEmailChange = (e: any) => {
        setEmail(e.target.value)
        const inputValue = e.target.value;
        const validate: Validation = validateEmail(inputValue);

        if (validate?.left) {
            setErrorEmail(true)
        }
        else if (validate?.right) { console.log('email all good 🥳') }
        else { console.log("fallback 👺") }
    }

    const handleNamechange = (e: any) => {
        setName(e.target.value);
        const validate: Validation = validateName(e.target.value);
        let errArr: Array<String> = []
        if (validate?.left) {
            console.log("LEFT 🔥", validate?.left);
            setErrorName(true)
            if (!errors.includes(`name ${validate.left}`)) {
                errArr = [`name ${validate.left}`]
            }
            let newArray: Array<String> = errArr.concat(errors)
            setErrors(newArray);
        }
        else if (validate?.right) {
            console.log('name all good 🥳');
            setErrors([])
            setErrorName(false);
        }
    }

    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value)
        const validate: Validation = validatePassword(e.target.value);
        let errArr: Array<String> = []

        if (validate?.left) {
            if (!errors.includes(`password ${validate.left}`)) {
                errArr = [`password ${validate.left}`]
            }
            //change newArray type to the correct one.
            let newArray: any = errArr.concat(errors)
            setErrors(newArray);
        }
        else if (validate?.right) {
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
                    <form className="onboard_form" onSubmit={handleFormSubmission}>
                        <div>
                            <label htmlFor="nameInput">Name</label>
                            <div className="onboard_form_input_container">
                                {errorName ? <Emoji emoji="❌" label="" /> : <Emoji emoji="✅" label="check" />}
                                <input type="text" name='name' id='nameInput' onChange={handleNamechange} value={name} className={errorName ? 'red' : 'neutral'} />
                            </div>

                        </div>
                        <div>
                            <label htmlFor="emailInput">Email</label>
                            <div className="onboard_form_input_container">
                                {errorEmail ? <Emoji emoji="❌" label="" /> : <Emoji emoji="✅" label="check" />}
                                <input type="email" name='email' id='emailInput' onChange={handleEmailChange} value={email} className={errorEmail ? 'red' : 'neutral'} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="passwordInput">Password</label>
                            <div className={styles.onBoardingInputContainer}>
                                {errorPassword ? <Emoji emoji="❌" label="" /> : <Emoji emoji="✅" label="check" />}
                                <input type="password" name='password' id='passwordInput' onChange={handlePasswordChange} value={password} className={errorPassword ? 'red' : 'neutral'} />
                            </div>
                        </div>
                        <div className={styles.onBoardingFormErrors}>
                            {errors}
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default FormPage