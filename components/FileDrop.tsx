import type { NextPage } from 'next'
import { useState, useEffect, useRef, useCallback } from "react"
import styles from '../styles/FileChecker.module.css'
import { render } from 'react-dom'
import { processFile } from '../helpers/validations'


type FileDropProps = {
    dropRef?: any
}

export default function FileDrop({ dropRef }): FileDropProps {
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

        dropArea.addEventListener('drop', (event: any) => {
            console.log("File drop analyzer 👇")
            event.stopPropagation();
            event.preventDefault();
            const files = event.target.files || event.dataTransfer.files;
            const file = files[0]
            if (file.type != "image") {
                processFile(file)
            }
        });
    }, []);

    return (
        <div>
            <div ref={dropRef} className={styles.fileDrop}>
                {boxText}
            </div>
        </div>
    )
}

