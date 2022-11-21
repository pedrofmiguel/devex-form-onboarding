import type { NextPage } from 'next'
import { useState, useEffect, useRef, useCallback } from "react"
import { pipe } from 'fp-ts/lib/function'
import { Either, left, right, chain } from 'fp-ts/Either'
import Emoji from '../components/Emoji'
import styles from '../styles/FileChecker.module.css'
import { render } from 'react-dom'

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
    const dropRef = useRef(null);
    const [fileText, setFileText] = useState('')
    const [boxText, setBoxText] = useState("Drop it like it's hot 🔥")
    // Similar to componentDidMount and componentDidUpdate:


    // I used the use effect here to load the event listeners of the drop area
    // they weren't listening correctly so this was the only way i found to make it work
    //everything was working fine, 
    // but the log in line 64 returns null and does not read the file
    // check this link to see the logs -> https://prnt.sc/5ZvzWHlkcWbY
    useEffect(() => {
        // Update the document title using the browser API
        console.log("Loaded Use Effect 🌧")
        const dropArea: any = dropRef.current;
        dropArea.addEventListener('dragenter', (event: any) => {
            event.stopPropagation();
            event.preventDefault();
            console.log("Drag Enter 🚪")
            setBoxText("Let it Go 👋")
            console.log("Event ➡️", event);
        });
        dropArea.addEventListener('dragleave', (event: any) => {
            event.stopPropagation();
            event.preventDefault();
            setBoxText("Drop it like it's hot 🔥")
        })
        // prevent the browser to open a tab with the file when dropping.
        dropArea.addEventListener('dragover', (event: any) => {
            event.stopPropagation();
            event.preventDefault();
        })

        const readAsDataURL = (file: any) => {
            return new Promise((resolve, reject) => {
                const fr = new FileReader()
                fr.onerror = reject
                fr.onload = function () {
                    resolve(fr.result)
                }
                console.log("file ➡️", fr.readAsText(file))
            })
        }

        dropArea.addEventListener('drop', (event: any) => {
            console.log("File drop analyzer 👇")
            event.stopPropagation();
            event.preventDefault();
            const files = event.target.files || event.dataTransfer.files;
            const file = files[0]
            if (file.type != "image") {
                readAsDataURL(file)
            }
        });
    }, []);


    const minLength = (s: string): Either<string, string> =>
        s.length >= 6 ? right(s) : left('at least 6 characters')

    const oneCapital = (s: string): Either<string, string> =>
        /[A-Z]/g.test(s) ? right(s) : left('at least one capital letter')

    const oneNumber = (s: string): Either<string, string> =>
        /[0-9]/g.test(s) ? right(s) : left('at least one number')

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

    return (
        <div>
            <main className={styles.fileContainer}>
                <h1 className="onboard_form_title"> Drop your file here 👇</h1>
                <div ref={dropRef} className={styles.fileDrop}>
                    {boxText}
                </div>
            </main>
        </div>
    )
}

export default Onboarding