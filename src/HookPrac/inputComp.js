import react , {Component} from "react";

export default class TextComp extends Component {
    constructor(props){
        super(props)
        this.state={
            value:props.value?props.value:''
        }
        this.TextHandle=this.TextHandle.bind(this)
        this.ClickHandle=this.ClickHandle.bind(this)
    }

    TextHandle(e){  //e for evt
        let tempState = this.state
        tempState.value=e.target.value
        this.setState(tempState)
        if(this.props.onChange)
            this.props.onChange(e)
    }

    ClickHandle(e){
        if(this.props.onClick)
            this.props.onClick(e) //this.props.onClick(e,1) 
    }

    render(){return(<>
        <input type='text' value={this.state.value} onChange={this.TextHandle} onClick={this.ClickHandle} />
    </>)    
    }
}
