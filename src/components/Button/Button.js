import React from 'react'
import './Button.css'

function Button(props) {
    return (
    <div>
        <a className='btn btn-primary'>{props.title}</a>
    </div>
    )
}

export default Button