import "./ErrorNotification.css"
import React, {useState, useEffect} from 'react'

function ErrorNotification(props) {
    const [show, setStyle] = useState("");

    const changeStyle = () => {
        console.log("you just clicked");
        setStyle("notif-hide");
    };

    // useEffect(() => {
    //     console.log("did mount");
    //     setStyle("notif-show");
    // });

    return (
        <div className={`n-notif ${show}`} >
            <div className='notif-left'>
                <div >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.86671 3.07524L14.334 10.5159C14.976 11.5846 14.6607 12.9906 13.6294 13.6559C13.2832 13.88 12.8797 13.9995 12.4674 13.9999H3.53204C2.31804 13.9999 1.33337 12.9799 1.33337 11.7206C1.33337 11.2946 1.44871 10.8779 1.66537 10.5159L6.13337 3.07524C6.77471 2.00657 8.13071 1.67924 9.16204 2.34457C9.44737 2.52857 9.68871 2.77857 9.86671 3.07524ZM8.38671 3.63457C8.30509 3.58208 8.21368 3.54667 8.118 3.53049C8.02232 3.51431 7.92435 3.5177 7.83001 3.54044C7.73568 3.56318 7.64693 3.60481 7.56913 3.66281C7.49133 3.72082 7.4261 3.79399 7.37737 3.87791L2.91004 11.3199C2.83747 11.4412 2.79922 11.5799 2.79937 11.7212C2.79937 12.1412 3.12737 12.4812 3.53271 12.4812H12.4667C12.604 12.4812 12.738 12.4412 12.854 12.3666C13.0205 12.256 13.1379 12.0854 13.1817 11.8905C13.2255 11.6955 13.1925 11.4911 13.0894 11.3199L8.62204 3.87791C8.56345 3.77992 8.48317 3.69668 8.38737 3.63457H8.38671ZM8.00004 11.3332C7.82323 11.3332 7.65366 11.263 7.52864 11.138C7.40361 11.013 7.33337 10.8434 7.33337 10.6666C7.33337 10.4898 7.40361 10.3202 7.52864 10.1952C7.65366 10.0701 7.82323 9.99991 8.00004 9.99991C8.17685 9.99991 8.34642 10.0701 8.47145 10.1952C8.59647 10.3202 8.66671 10.4898 8.66671 10.6666C8.66671 10.8434 8.59647 11.013 8.47145 11.138C8.34642 11.263 8.17685 11.3332 8.00004 11.3332ZM8.00004 5.33324C8.17685 5.33324 8.34642 5.40348 8.47145 5.5285C8.59647 5.65353 8.66671 5.82309 8.66671 5.99991V8.66657C8.66671 8.84338 8.59647 9.01295 8.47145 9.13798C8.34642 9.263 8.17685 9.33324 8.00004 9.33324C7.82323 9.33324 7.65366 9.263 7.52864 9.13798C7.40361 9.01295 7.33337 8.84338 7.33337 8.66657V5.99991C7.33337 5.82309 7.40361 5.65353 7.52864 5.5285C7.65366 5.40348 7.82323 5.33324 8.00004 5.33324Z" fill="black"/>
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

export default ErrorNotification

// import React, { Component } from 'react'

// export default class ErrorNotification extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isNotifVisible: true,
//         };
        
//     }

//     closeNotif = () => {
//         console.log('clicked');
//         this.setState({ isNotifVisible: false});
//     }

//     // componentDidMount() {
//     //     // this.setState({ isNotifVisible: true});
//     //     console.log('did mount');
//     // }

//     // componentDidUpdate() {
//     //     // this.setState({ isNotifVisible: true});
//     //     console.log('did update');
//     // }

//     render() {
//         return (
//             <div className={`n-notif ${this.isNotifVisible ? "true" : "false"}`} >
//                 <div className='notif-left'>
//                     <div >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" height={20}>
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                         </svg>
//                     </div>
                    
//                     <span>{this.props.text}</span>
//                 </div>
//                 <div className='notif-right' onClick={this.closeNotif}>
//                     <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" height={20}>
//                         <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
//                     </svg>
//                 </div>
                
//             </div>
//         )
//     }
// }
