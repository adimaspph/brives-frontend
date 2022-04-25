import "./NeutralNotification.css"
import React, {useState, useEffect} from 'react'

function NeutralNotification(props) {
    const [show, setStyle] = useState("");

    const changeStyle = () => {
        setStyle("notif-hide");
    };

    return (
        <div className={`nn-notif ${show}`} >
            <div className='notif-left'>
                <div >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" height={20}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                
                <span>{props.text}</span>
            </div>
            <div className='notif-right' onClick={changeStyle}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" height={20}>
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
            </div>
            
        </div>
    )
}

export default NeutralNotification