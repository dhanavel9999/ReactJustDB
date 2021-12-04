// JavaScript source code
//table compo for both view and functionality  (more flexible than the one at xml form)

import { useFilters, useTable} from 'react-table'
import './tableGnrlStyle.css'
import './hook1.css'
import { useMemo, useRef, useEffect }  from 'react'
import CustCell1 from './custCell1'
import  SelectComp from './selectComp'
import  TextComp from './inputComp'
import react , {Component, createRef} from "react";
import { render } from '@testing-library/react'

///table on filtering, sorting, grouping (collapsing), 
export default class InputTable extends Component{
    
    constructor(props){
        super(props)
        this.state ={

        }
        
        this.ipData = createRef(this.props.tblData);
        this.prevTblData = createRef(this.props.tblData);
        this.initialize();
        
    }
    
    componentDidMount(){
        
    }

    componentDidUpdate(prevProps, prevState){
        this.ipData.current=this.props.tblData
        
    }
    
    initialize (){
        //
        let tblCol2 = [
            {
                Header: 'Student Full Name',
                columns: [
                    {
                        Header: 'First Name', accessor: 'studentName',
                        Filter: () => { return(<></>)},  //we can pass empty jsx, even though "Filter" is compulsory
                        //filter: xyz  //by default its includes type
                    },
                    {
                        Header: 'Last Name', accessor: 'lastName',
                        Filter: this.TextFilter,
                        //filter: Genderfilter
                    }
                ]
            },
    
            {
                Header: 'Phone No.',
                accessor: 'phone', 
                Filter: this.TextFilter, 
                filter: 'includes'
            },
            
            {
                Header: 'Gender',
                accessor: 'gender',
                //canFilter: true,
                //disableFilters: false
                Filter:   this.GenderFilter,      //"Filter" - function that renders custom filter + sets filter value (based on ip to the custom filter) //setting of filter value (which is a property of column) auto triggers the "filter" funciton
                filter: 'equals'      //function that returns filtered rows based on the new filter value
            }, 
            {
                Header: 'Owning Car', sortable: false,
                accessor: 'xtraCol',
                //id: 'mira', 
                Filter: this.TextFilter,
                filter: 'includes' , //this wont work because this is a customCell not just displayin, something simi to progress filter should be created
                Cell: this.SelecCell,
    
            },
            {
                Header: 'New Car', sortable: false,
                accessor: 'NewCol',
                //id: 'mira', 
                Filter: this.TextFilter,
                filter: 'includes' , 
                 Cell: ({row, column}) => {
                     return (<SelectComp value={row.original[column.id]} />) },
    
            },
            {
                Header: 'Text Only', 
                accessor: 'Text',
                Filter: this.TextFilter,
                filter: 'equals' , 
                Cell: () => {
                    return (<TextComp />) 
                    //return 'conti' 
                },
            }
        ]
        this.tblCol = createRef(tblCol2);

        const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            rows,
            prepareRow
            
        } = useTable({ columns: this.tblCol.current, data: this.ipData.current }, useFilters )

        this.getTableProps=getTableProps;
        this.getTableBodyProps=getTableBodyProps;
        this.headerGroups=headerGroups;
        this.rows=rows;
        this.prepareRow=prepareRow;
    }
    //when we pass "undefined" to setFilter the filter is removed, 
    GenderFilter({ column: { filterValue, setFilter, preFilteredRows, id } }) {

        return (<>
            <select value={filterValue || ''} name="Gender" id="GenderDD" onChange={e => {
                setFilter(e.target.value == "" ? undefined: e.target.value)
                        }}>
                <option key ="all" value="">All</option>
                <option key="male" value="male">Male</option>
                <option key="female" value="female">Female</option>
            </select>
        </>)
        }
    
    TextFilter({ column: { filterValue, setFilter, preFilteredRows, id } }) {

        return (<>
            <input value={filterValue || ''} onChange={e => setFilter(e.target.value)} />
        </>)
    }

    onChange (e ){
        //change at child not parent to know if the reference change affects the other row (given it intakes the new local)
        if(this.props.DataChangeEvt){
            this.props.DataChangeEvt(e, this.ipData.current, this.prevTblData.current)
        }
    }

    SelecCell(FullInfo){
        //
        let r = FullInfo.row
        let rs = FullInfo.rows
        let c = FullInfo.column
        let cs = FullInfo.columns
        let d = FullInfo.data
        let v = FullInfo.value
        let newVal = ''

        //
        function SelecChange(e, value){
            //
            this.prevTblData.current=this.ipData.current;
            let newTblData = this.ipData.current;
            let rowLength = newTblData.length;
            for (let i=0;i<rowLength; i++){
                if(newTblData[i]['id'] == r.original['id']){  //later correct = to ==
                    newTblData[i][c.id]=e.target.value
                    newTblData[i]['NewCol']=e.target.value
                    //r[c.id]
                }
            }
            this.ipData.current = newTblData
            this.onChange(e)
        }
        return (<SelectComp onChange={SelecChange} value={r.original[c.id]}  />) 

    }
    
    

    render(){
        if(!this.tblData)
        {return(<></>)}

        return (<>
            {/*comments*/}
    
            <br/>
            
            
            
            <table {...this.getTableProps()} >
                <thead>
                    {this.headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                    {/* Render the columns filter UI */}
                                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...this.getTableBodyProps()}>
                    {this.rows.map(row => {
                        this.prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
                
        </>)
    }
   
}



