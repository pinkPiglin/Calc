import React from "react";
import clases from './display.module.scss';

const Display =(props)=>{
    function inputValue(){
        if(props.activeSymbol.length < 17){
            return props.activeSymbol
        }  
        else{
            let value =  [...props.activeSymbol]
            value.length =14  
           return `${value.join('') }...`
        }
    }

    return(
        <div className={clases.display}>
            <div className={clases.historyDisplay +" "+clases[props.theme +"-historyDisplay"]}>
                {props.historyCalc} 
            </div>

            <div className={clases.inputDisplay +" "+clases[props.theme +'-inputDisplay']}>
                {inputValue()}
            </div>
        </div>
    )
}

export default Display