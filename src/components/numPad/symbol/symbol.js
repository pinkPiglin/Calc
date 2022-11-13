import React, {Component}from "react";
import clases from './symbol.module.scss'


class Symbol extends Component{
    constructor(props){
        super(props);
    }
    keyDown(e){
        const clickSymbol=()=> this.props.onClickSymbol(this.props.name, this.props.id);

        if(this.props.name === +e.key || this.props.name === e.key) {clickSymbol();return}
        
        if(this.props.name  ==='C' && e.key === 'Backspace'){clickSymbol();return}
        
        if(this.props.name  ==='=' && e.key === 'Enter'){clickSymbol();return}
        if(this.props.name  ==='AC' && e.key === 'Delete'){clickSymbol()}
    }
    componentWillMount() {
        document.addEventListener("keydown", (e)=>{
            this.keyDown(e)
        })
      }

    specialStyle=()=>{
        let result="";
        switch(this.props.id){
            case 2:
                result= {order:-1};
                break;
            case 7:
            case 8:
                result= {order:1};
                break;
        }
        return result? result:{alignItems:'center'}
    }
    
    
    render(){
        
        return(
            <div 
                id={this.props.id}
                className={clases[this.props.type] +" "+clases[this.props.type+"-"+ this.props.theme] }
                style={this.specialStyle()}
                onClick={()=>{this.props.onClickSymbol(this.props.name, this.props.id)}}
                
            >
                <li>{this.props.name}</li>
            </div>
        )
    }
    
}

export default Symbol