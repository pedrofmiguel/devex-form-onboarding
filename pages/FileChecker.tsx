import type { NextPage } from 'next'
import { useState, useEffect, useRef, useCallback } from "react"
import Emoji from '../components/Emoji'
import styles from '../styles/FileChecker.module.css'
import { render } from 'react-dom'
import { validateEmail, validateName } from '../helpers/validations'
import FileDrop from '../components/FileDrop'
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

const FileChecker: NextPage = () => {
    const dropRef = useRef<HTMLDivElement>(null);
    return (
        <div>
            <main className={styles.fileContainer}>
                <h1 className={styles.fileContainerTitle}> Drop your file here 👇</h1>
                <FileDrop dropRef={dropRef} />
            </main>
        </div>
    )
}

export default FileChecker