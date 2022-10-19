import type { NextPage } from 'next'
import Link from 'next/link';
import style from '../styles/Onboard.module.css'
import { useState } from "react"
import { pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/Option'
import { Either, left, right } from 'fp-ts/Either'

const Onboarding: NextPage = () => {
    const [name, setName]  =  useState("")
    const [address, setAddress]  =  useState("")
    const [email, setEmail]  =  useState("")
    //error messages
    const [errorName, setErrorName] = useState(null)
    const [errorPassword, setErrorPassword] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    
    //todo: refactor and add the correct 
    // add the pipe functions to make corrections to the validations
    // add Option validations to the variables
    // Either to validate
    type FormBody = {
        name: string,
        email: string,
        address: string
    }

   //validation functions for the form
   // password - 6 characters at least, one capital and one number
   
    const minLength = (s: string): Either<string, string> =>
    s.length >= 6 ? right(s) : left('at least 6 characters')
    
    const oneCapital = (s: string): Either<string, string> =>
    /[A-Z]/g.test(s) ? right(s) : left('at least one capital letter')
    
    const oneNumber = (s: string): Either<string, string> =>
    /[0-9]/g.test(s) ? right(s) : left('at least one number')

    const cannotBeEmpty = (s: string): Either<string, string> => s != null ? right(s) : left('cannot be empty')

    // must have one capitalLetter


    const validateName = (name: string): Either<string, string> => pipe(oneCapital(name))
    const validateEmail = (email: string): Either<string, string> => pipe(cannotBeEmpty(email))
    const validatePassword = (password: string): Either<string,string> => pipe(minLength(password), oneCapital(password), oneNumber(password))
    
    //const formValidation = flow()()
    const formBody: FormBody = {
        name: name,
        email: email,
        address: address
    }
    
  return (
    <div>
        <main>
            <h1 className={style.title}>Onboard</h1>
            <div className={style.container}>
                <form className={style.form} onsubmit="formValidation()">
                    <div>   
                        <input type="text" name='name' id='nameInput' onChange={handleNameChange} value={name}/>
                        <div></div>
                    </div>
                    <div>
                        <input type="email" name='email' id='emailInput'  onChange={handleEmailChange} value={email}/>
                        <div></div>
                    </div>
                    <div>
                        <input type="address" name='address' id='addressInput'  onChange={handleAddressChange} value={address}/>
                        <div></div>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </main>
    </div>
  )
}

export default Onboarding