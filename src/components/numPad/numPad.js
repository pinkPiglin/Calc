import React from "react";
import Symbol from "./symbol/symbol";
import clases from './numPad.module.scss'

const NumPad =(props)=>{

    const createGroopSymbols = (arrId)=>{
        return props.symbols.map(symbol=>{ 
            if(!arrId.includes(symbol.id)){
                return null 
            }

            return(
                <Symbol
                    key={symbol.id}
                    id={symbol.id}
                    name={symbol.name}
                    type={symbol.type}
                    theme={props.theme}
                    onClickSymbol={props.onClickSymbol}
                    onKeyPressed = {props.onKeyPressed}
                />
            )
             
        })
    }
    
    return ( 
        <div className={clases.NumPad+" "+ clases[props.theme]}>
            <div className={clases.trioSymbols +" "+ clases[props.theme+"-trioSymbols"]}>
                {createGroopSymbols([0,1,2])}
            </div>

            <div className={clases.rightSymbols +" "+ clases[props.theme+"-rightSymbols"] }>
                {createGroopSymbols([3,4,5,6,19])}
            </div>
            <div className={clases.frame1}>{createGroopSymbols([9,12,15,18])}</div>
            <div className={clases.frame2}>{createGroopSymbols([10,13,16,7])}</div>
            <div className={clases.frame3}>{createGroopSymbols([11,14,17,8])}</div>
            <div className={clases.line +" "+clases[props.theme +"-line"]}></div>
        </div>
    )
}

export default NumPad