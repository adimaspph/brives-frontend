import React from 'react'
import './Button.css'

function Button(props) {
    return (
    <div>
        <a className={props.className} href={props.href}>{props.children}</a>
    </div>
    )
}

export default Button