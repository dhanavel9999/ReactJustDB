// JavaScript source code
//table compo for both view and functionality  (more flexible than the one at xml form)

import { useFilters, useTable, useGlobalFilter } from 'react-table'
import './tableGnrlStyle.css'
import './hook1.css'
import { useMemo, useRef, useEffect }  from 'react'
import CustCell1 from './custCell1'
import  SelectComp from './selectComp'
import  TextComp from './inputComp'

///table on filtering, sorting, grouping (collapsing), 
export default function InputTable({ msg = 'Hello World' , tblData, DataChangeEvt}) {
    
    
    //when we pass "undefined" to setFilter the filter is removed, 
    function GenderFilter({ column: { filterValue, setFilter, preFilteredRows, id } }) {

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
    
    function TextFilter({ column: { filterValue, setFilter, preFilteredRows, id } }) {

        return (<>
            <input value={filterValue || ''} onChange={e => setFilter(e.target.value)} />
        </>)
    }
    function DdlRowFilter(rows, id, filterValue){
        if(!filterValue || filterValue=='')
            return rows;
        
        return rows.filter(row=>{return row.values[id[0]].includes(filterValue) })  //here id is list becuz??
    }

    var tblCol2 = [
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
                    Filter: TextFilter,
                    //filter: Genderfilter
                }
            ]
        },

        {
            Header: 'Phone No.',
            accessor: 'phone', 
            Filter: TextFilter, 
            filter: 'includes'
        },
        
        {
            Header: 'Gender',
            accessor: 'gender',
            //canFilter: true,
            //disableFilters: false
            Filter:   GenderFilter,      //"Filter" - function that renders custom filter + sets filter value (based on ip to the custom filter) //setting of filter value (which is a property of column) auto triggers the "filter" funciton
            filter: 'equals'      //function that returns filtered rows based on the new filter value
        }, 
        {
            Header: 'Owning Car', sortable: false,
            accessor: 'xtraCol',
            //id: 'mira', 
            Filter: TextFilter,
            filter: DdlRowFilter , 
            Cell: SelecCell,

        },
        {
            Header: 'New Car', sortable: false,
            accessor: 'NewCol',
            //id: 'mira', 
            Filter: TextFilter,
            filter: 'includes' , 
             Cell: ({row, column}) => {
                 return (<SelectComp value={row.original[column.id]} />) },

        },
        {
            Header: 'Text Only', 
            accessor: 'Text',
            Filter: TextFilter,
            filter: 'equals' , 
            Cell: () => {
                return (<TextComp />) 
                //return 'conti' 
            },
        }
    ]

    let ipData = useRef(tblData);
    let prevTblData = useRef(tblData);
    let tblCol = useRef(tblCol2);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter
    } = useTable({ columns: tblCol.current, data: ipData.current }, useFilters, useGlobalFilter )

    function onChange (e ){
        //change at child not parent to know if the reference change affects the other row (given it intakes the new local)
        if(DataChangeEvt){
            DataChangeEvt(e, ipData.current, prevTblData.current)
        }
    }

    function SelecCell(FullInfo){
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
            prevTblData.current=ipData.current;
            let newTblData = ipData.current;
            let rowLength = newTblData.length;
            for (let i=0;i<rowLength; i++){
                if(newTblData[i]['id'] == r.original['id']){  //later correct = to ==
                    newTblData[i][c.id]=e.target.value
                    newTblData[i]['NewCol']=e.target.value
                    //r[c.id]
                }
            }
            ipData.current = newTblData
            onChange(e)
        }
        return (<SelectComp onChange={SelecChange} value={r.original[c.id]}  />) 

    }
    
    // useEffect(()=>{
    //     ipData.current = tblData
    // },[tblData])

    if(!tblData)
        return(<></>)

    return (<>
        {/*comments*/}

        <br/>
        
        <input value={state.globalFilter || ''} onChange={e => setGlobalFilter(e.target.value)}  />
        <p>table text {ipData.current[0]['xtraCol']}</p>
        <table {...getTableProps()} >
            <thead>
                {headerGroups.map(headerGroup => (
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
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row)
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



