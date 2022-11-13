import React, {Component} from 'react';
import clases from './app.module.scss'
import Toggle from '../components/toggle/toggleTheme';
import NumPad from '../components/numPad/numPad';
import Display from '../components/display/display';

class App extends Component {
  
  constructor(){
    super()
    this.state={
      prevSymbol:undefined,
      theme:'dark',
      activeSymbol:"",
      historyCalc:undefined,
      total:false,
      symbols:[
        {name:'%',type:'symbol', id:0},
        {name:'C',type:'symbol', id:1},
        {name:'AC',type:'symbol', id:2},

        {name:'/',type:'symbol', id:3},
        {name:'*',type:'symbol', id:4},
        {name:'+',type:'symbol', id:5},
        {name:'-',type:'symbol', id:6},
        {name:'=',type:'num', id:19},

        {name:0 ,type:'num', id:7},
        {name:'00',type:'num', id:8},
        {name:1,type:'num', id:9},
        {name:2,type:'num', id:10},
        {name:3,type:'num', id:11},
        {name:4,type:'num', id:12},
        {name:5,type:'num', id:13},
        {name:6,type:'num', id:14},
        {name:7,type:'num', id:15},
        {name:8,type:'num', id:16},
        {name:9,type:'num', id:17},

        {name:'.',type:'num', id:18},
      ],
      
    }
  }
  

  toggleHandler=()=>{
    
    if(this.state.theme=== 'light'){
      this.setState({theme:'dark'})
    }
    else{
      this.setState({theme:'light'})
    }
  }

  
  symbolHandler= (name, id)=>{

    const displayTotalCalc=()=>{
       console.log('displayTotalCalc')
      this.setState({activeSymbol: `${eval(this.state.historyCalc)}` })
    }

    const displayHistory=()=>{
      this.setState({historyCalc: this.state.activeSymbol})
      console.log('displayHistory')
    }
    const clearDisplay=()=>{
      this.setState({prevSymbol:undefined, activeSymbol:""})
      console.log('clearDisplay')
    }

    const savePrevSymbol=()=>{
      this.setState({prevSymbol: name})
    }

    const addSymbolOnDisplay=()=>{
      this.setState({activeSymbol: this.state.activeSymbol.toString() + name});
    }
    const deleteLastSymbol= ()=>{
      console.log('deleteLastSymbol')
      if(this.state.activeSymbol){
        
        this.setState(()=>{
          let activeSymbol = [...this.state.activeSymbol];
          activeSymbol.splice(activeSymbol.length-1,1);
          return {activeSymbol:activeSymbol.join('')}
        })

      }
    }

   

    const thenHandlerNotNum=()=>{ // (* - + = % / C . AC 00)
     
      switch(id){
        case 8: // (00)
          if((typeof this.state.prevSymbol==='number'&& this.state.activeSymbol) || this.state.prevSymbol==='.'|| this.state.prevSymbol==='00') {
            addSymbolOnDisplay();
            savePrevSymbol();
          }
        break;
        case 1: // (C)
           deleteLastSymbol();
          break;
        case 2: // (AC)
          this.setState({historyCalc:''})
          clearDisplay();
          break;
        case 6:// (-)
          if(!this.state.activeSymbol  && !this.state.prevSymbol!=='-' && this.state.prevSymbol!=='00'){addSymbolOnDisplay();  }
        case 0: // (%)
        case 3: // (/)
        case 4: // (*)
        case 5: // (+)
        case 18: // (.)
        if(this.state.prevSymbol=='%'){
          addSymbolOnDisplay();
          return
        }
          if(typeof this.state.prevSymbol==='number'){
            addSymbolOnDisplay(); 
          }
          if(this.state.prevSymbol==='00' ){
            addSymbolOnDisplay();
          }
          else if(this.state.activeSymbol){
            this.setState(prevState=>{
              let activeSymbol = [...prevState.activeSymbol];
              activeSymbol.splice(activeSymbol.length-1, 1, name );
              return {activeSymbol:activeSymbol.join('')}
            })
          }
          savePrevSymbol();
         break;
        case 19: // (=)
           new Promise((resolve, reject) => {
            if(typeof this.state.prevSymbol==='string' ){ resolve(deleteLastSymbol())}
            else{resolve()}
          })
            .then(()=>{displayHistory();})
            .then(()=>{clearDisplay();})
            .then(()=>{displayTotalCalc();})
            .finally(()=>{
              this.setState({prevSymbol: +this.state.activeSymbol});
              
            })
            .catch(()=>{console.error('error in promise')} )
            // this.setState({total:true})
            
            
          break;
      }
    }

    if(typeof(name)==='number'){ // (0 1 2 3 4 5 6 7 8 9)
      
      
      addSymbolOnDisplay();
      savePrevSymbol();
    }
    else{
       thenHandlerNotNum();
    }
  }
  
  render(){
    return(

      <div className={clases.app +" "+ clases[this.state.theme] }>
        <Toggle 
          clickToggle={()=>this.toggleHandler} 
          theme={this.state.theme}
        />
        
        <Display 
          theme={this.state.theme}
          activeSymbol={this.state.activeSymbol}
          historyCalc = {this.state.historyCalc}
        />

        <NumPad 
          theme={this.state.theme}
          symbols={this.state.symbols}
          onClickSymbol={this.symbolHandler}
          onKeyPressed ={this.onKeyPressed}
        />
      </div>

      
    );
  } 
}

export default App;
