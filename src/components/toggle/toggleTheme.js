import React from "react";
import clases from './toggle.module.scss'
import stylSlid from './slider.module.scss'


const Toggle=(props)=>{
    return(
        <div className={clases[props.theme]+" "+ clases.toggle}>
            <div 
            className={stylSlid.slider + " "+ stylSlid[props.theme]}
            onClick={props.clickToggle()}
            >

            </div>
        </div>
    )
}

export default Toggle