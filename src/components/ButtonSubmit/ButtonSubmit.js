import React from 'react'
import './ButtonSubmit.css'

function ButtonSubmit(props) {
    return (
    <div>
        <button className={props.className} type="submit">{props.children}</button>
    </div>
    )
}

export default ButtonSubmit