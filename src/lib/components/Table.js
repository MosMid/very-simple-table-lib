import React, { useState, useEffect } from 'react';
import './styles/table.css';

function Table(prop){
    const tableKeys = prop.tableKeys
    const [data, setData] = useState(prop.data)
    const keys = Object.keys(tableKeys)
    const search = (event) =>{
        setOffset(0)
        setCurrentPage(1)
        setData(prop.data.filter((item) => keys.some((key) => item[key].toLowerCase().includes(event.target.value))))
    }

    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(25);
    const [dataToShow, setDataToShow] = useState([])
    useEffect(() => {
        setDataToShow(data.slice(offset, offset + limit));
    }, [data, offset, limit]);

    const handleLimitChange = event => {
        setLimit(parseInt(event.target.value, 10));
        setOffset(0);
        setCurrentPage(1)
    }

    const beforeStyle = {
        position: "absolute",
        display: "block",
        width: 0,
        height: 0,
        borderLeft: '3.5px solid transparent',
        borderRight: '3.5px solid transparent',
        borderBottom: '3.5px solid #E0E0E0',
        top: "25%",
        right: "-5px"
    };

    const afterStyle = {
        position: "absolute",
        display: "block",
        width: 0,
        height: 0,
        borderLeft: '3.5px solid transparent',
        borderRight: '3.5px solid transparent',
        borderTop: '3.5px solid #E0E0E0',
        bottom: "25%",
        right: "-5px"
    };

    const [sortOrder, setsortOrder] = useState("desc")
    function sortBy(column){
        let key = Object.keys(tableKeys).find(k=>tableKeys[k]===column);
        if(sortOrder === "desc") setsortOrder("asc")
        else setsortOrder("desc")
        if(sortOrder === "asc"){
            data.sort((a, b) => (a[key] > b[key]) ? 1 : -1)
        } else {
            data.sort((a, b) => (a[key] < b[key]) ? 1 : -1)
        }
        setDataToShow(data.slice(offset, offset + limit));
    }

    function changeStyle(e){
        for(let i = 0; i < e.parentElement.parentElement.childNodes.length; i++){
            e.parentElement.parentElement.childNodes[i].childNodes[1].childNodes[0].style.borderBottom = '3.5px solid #E0E0E0'
            e.parentElement.parentElement.childNodes[i].childNodes[1].childNodes[1].style.borderTop = '3.5px solid #E0E0E0'
        }
        if(sortOrder === "asc"){
            e.parentElement.childNodes[1].childNodes[0].style.borderBottom = '3.5px solid black'
            e.parentElement.childNodes[1].childNodes[1].style.borderTop  = '3.5px solid #E0E0E0'
        } else {
            e.parentElement.childNodes[1].childNodes[0].style.borderBottom = '3.5px solid #E0E0E0'
            e.parentElement.childNodes[1].childNodes[1].style.borderTop  = '3.5px solid black'
        }
    }

    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        handlePageChange(currentPage);
    }, [currentPage])

    const handlePageChange = (pageNumber) => {
        if(pageNumber > 0 && pageNumber <= Math.ceil(data.length / limit)){
            setOffset((pageNumber - 1) * limit);
    }
    }

    return <div id="employee-div" className="container">
        <div id='head'>
            <label>
                show
                <select value={limit} onChange={handleLimitChange}>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
                entries
            </label>
            <input type="text" placeholder='search' onKeyUp={search}/>
        </div>
        <table id="employee-table" className="display">
            <thead>
                <tr>
                   {Object.values(tableKeys).map((key, index) => <td key={index} className='tableKeys'><button onClick={(e)=>{sortBy(key); changeStyle(e.currentTarget);}}>{key}</button><div className={`sortArrow ${sortOrder ? "asc" : "desc"}`}><div className='before' style={beforeStyle}/><div className='after' style={afterStyle}/></div></td>)}
                </tr>
            </thead>
            <tbody>
                {dataToShow.map((employee, index) => <tr className='lines' key={index}>
                    {Object.keys(tableKeys).map((key, index) => <td key={index}>{employee[Object.keys(employee).find(k=>k===key)]}</td>)}
                </tr>)}
            </tbody>
        </table>
        <div id='foot'>
            <p>showing {dataToShow.length} of {data.length} entries</p>
            <div id='pageNo'>
                <button onClick={()=>setCurrentPage(1)}  disabled={currentPage <= 1}>&#8810;</button>
                <button onClick={()=>setCurrentPage(currentPage - 1)} disabled={currentPage <= 1}>&#8826;</button>
                <span>{currentPage} / {Math.ceil(data.length / limit)}</span>
                <button onClick={()=>setCurrentPage(currentPage + 1)} disabled={currentPage >= Math.ceil(data.length / limit)}>&#8827;</button>
                <button onClick={()=>setCurrentPage(Math.ceil(data.length / limit))}  disabled={currentPage >= Math.ceil(data.length / limit)}>&#8811;</button>   
            </div>
        </div>
    </div>
}

export default Table