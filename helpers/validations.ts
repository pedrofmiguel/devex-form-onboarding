
import { Either, left, right, chain } from 'fp-ts/Either'
import { pipe } from 'fp-ts/lib/function'
//import { useState, useEffect, useRef, useCallback } from "react"

const readAsDataURL = (file: File) => {
    return new Promise((resolve, reject) => {
        const fr = new FileReader()
        fr.onerror = reject
        fr.onload = function () {
            resolve(fr.result)
        }
        console.log("file ➡️", fr.readAsText(file))
    })
}

const minLength = (s: string): Either<string, string> =>
s.length >= 6 ? right(s) : left('at least 6 characters')

const oneCapital = (s: string): Either<string, string> =>
/[A-Z]/g.test(s) ? right(s) : left('at least one capital letter')

const oneNumber = (s: string): Either<string, string> =>
/[0-9]/g.test(s) ? right(s) : left('at least one number')

const isFileValid = (f: File): Either<File, File> => f.type != 'image' ? right(f) : left('The fyle type is not correct')

const noNumber = (s: string): Either<string, string> => /\d/.test(s) ? right(s) : left('Cannot have any number')

const cannotBeEmpty = (s: string): Either<string, string> => s.trim().length ? right(s) : left('cannot be empty')

const validateLineNoNumber = (s: string): Either<string, string> => pipe(
s,
cannotBeEmpty,
chain(noNumber),
chain(oneCapital),
)

const validateLineWithnoSpaces = (s: string): Either<string, string> => pipe(
s,
cannotBeEmpty
)
    
// validators using pipe and chain -> will only show the first validations
export const validateName =  (name: string): Either<string, string> => pipe(
    name, 
    oneCapital,
    chain(cannotBeEmpty),
);

export const validateEmail =  (email: string): Either<string,string>  => pipe(
    email,
    cannotBeEmpty
);

export const validatePassword = (password: string): Either<string, string> => pipe(
    password,
    minLength, 
    chain(oneNumber), 
    chain(oneCapital)
);

export const processFile = (f: HTMLInputElement): Either<HTMLInputElement, File> => pipe(
    f,
    isFileValid,
    chain(readAsDataURL),
);

//future function to read file content, first separate all lines
//and receive from array
const readAllFileLines = (lines: Array<string>): Either<Array<string>, Array<string>> => pipe()