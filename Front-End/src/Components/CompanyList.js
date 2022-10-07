import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  Link
} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import TableData from './TableData';

const CompanyList = () => {

    const navigate = useNavigate();
    const [companyListData, setcompanyListData] = useState([])
    useEffect(() => {
      axios.get('http://localhost:3001/api')
      .then((response)=>{
        setcompanyListData(response.data)
        
      })
    }, []);
    
  return (

    <div className='container'>
      {/* <Link to="/"><h1 className='text-dark row justify-content-md-center my-4 bg-light'>Add Company</h1></Link> */}
      <div className='my-3'><button type="button" className="btn btn-primary" 
      onClick={()=>{
        navigate("/")
      }}>Add Company</button>
      </div>
      {/* <table className="table table-hover">
  <thead>
  <tr>
      <th scope="col">#</th>
      <th scope="col">Company Name</th>
      <th scope="col">Company ID</th>
      
    </tr>
  </thead>
  <tbody>
  {
        companyListData.map((company,index)=>{
            return (
                <tr key={company.companyId}>
                    <th key={index} scope="row" >{index}</th>
                    <th key={company.companyName} scope="row">{company.companyName}</th>
                    <th key={company.companyId} scope="row">{company.companyId}</th>
                </tr>
            )
        })
    }
    
  </tbody>
</table> */}
  <TableData item={companyListData}/>
    </div>
  )
}

export default CompanyList