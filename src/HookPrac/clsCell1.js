import React, {Component} from 'react'

class SelecCell extends Component {
    constructor(props){
        super(props);
        this.ClkHandle = this.ClkHandle.bind(this)
    }
    state = {
        name: 'bikash',
        selecn: 'condor'
    }
    

    ClkHandle (e){
        //
        let tempState = this.state
        tempState.name = 'mirana'
        this.setState(tempState)
        console.log(this.state.selecn)
    }

    render() {
      return(<>
                <h2>Hello, world</h2>
                <h2>hello, {this.state.name}</h2>
                <button onClick = {this.ClkHandle}>Class Cell</button> 
            </>)
    }
}

export default SelecCell

