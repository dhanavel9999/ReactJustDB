import react , {Component, createRef} from "react";


//state: value, data 
//props: onChange, value, data
export default class SelectComp extends Component {
    constructor(props){
        super(props)
        this.state={
            value:this.props.value||null, 
            data:this.props.data
        }
        this.refVar = createRef('empty')
        this.SelectHandle=this.SelectHandle.bind(this)
        this.ClickHandle=this.ClickHandle.bind(this)
        this.RenderOptions=this.RenderOptions.bind(this)
    }

    SelectHandle(e){  //e for evt
        //this.setState({...this.state, value:e.target.value})

        if(this.props.onChange){
            this.props.onChange(e, e.target.value)    //remem the state value might have diff structure from e.target.value
            this.refVar.current = e.target.value
        }
            
    }

    ClickHandle(e){
        if(this.props.onClick)
            this.props.onClick(e, this.state.value) //this.props.onClick(e,1) 
    }

    componentDidUpdate(prevProps){
        let newVal=this.props.value
        if(newVal!=prevProps.value){
            //side effect needed to perform
            this.setState({...this.state, value:this.props.value})
        }
        
    }

    RenderOptions(){
        if(!this.props.data || this.props.data.length==0 || !this.props.data[0].value || !this.props.data[0].Display){
            //console.log('input data to select render is not in correct format')
            return(<></>)
        }

        return(<>
            {this.props.data.map(x=> <option key={(x.key||x.value.toString())} value={x.value}>{x.Display}</option>)}
        </>)
    }

    render(){
        //signal redering : no. of msgs will show 
        //console.log('selectComp render') 
        return(<>
            <select value={this.state.value||''} onChange={this.SelectHandle} onClick={this.ClickHandle} >
                <option key='none' value={''} ></option>
                {this.RenderOptions()}
                
                <option key={'volvo'} value="volvo">Volvo</option>
                <option key={'saab'} value="saab">Saab</option>
                <option key={'opel'} value="opel">Opel</option>
                <option key={'audi'} value="audi">Audi</option>
                <option key={'current'} value="current">current</option>
            </select>
        </>)    
    }
}
