
import React from 'react';
type EmojiType = {
    emoji: string,
    label: string,
}

const Emoji = (props: EmojiType) => (
    <span
        className="emoji"
        role="img"
        aria-label={props.label ? props.label : ""}
        aria-hidden={props.label ? "false" : "true"}
    >
        {props.emoji}
    </span>
);
export default Emoji;