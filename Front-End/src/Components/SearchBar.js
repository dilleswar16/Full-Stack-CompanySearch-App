import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import parse from "html-react-parser";
import { useNavigate } from 'react-router-dom';
import {
  Link
} from 'react-router-dom';

let ConvertStringToHTML = function (str) {
    let parser = new DOMParser();
    let doc = parser.parseFromString(str, 'text/html');
    return doc.body;
  };

const SearchBar = () => {

  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [myCompanyList,setMyCompanyList] = useState([]);
  const [htmlData, sethtmlData] = useState("");
  const [companyId, setcompanyId] = useState("");
  const [companyName, setcompanyName] = useState("");
    
  useEffect(() => {
    axios.post("/custom-search",{
      search:inputValue,
      filter:"company"
    })
    .then((response)=>{
      sethtmlData(response.data);
      var temp = ConvertStringToHTML(response.data);
            let dataFromAPi = [];
            for(let i=0;i<temp.getElementsByClassName("show").length;i++){
              dataFromAPi.push(temp.getElementsByClassName("show")[i].innerHTML);
            }
            
            setMyCompanyList(dataFromAPi);
    })
  }, [inputValue])

  const GetSelectedValue = (e) => {
    if(!inputValue.length >0){
      alert("Company Name Cannot be empty")
    }

    else {
    // console.log(inputValue);
    // console.log(htmlData);
    let impData = ConvertStringToHTML(htmlData).getElementsByTagName('div');
    const companyData = [];
    for(let i=0;i<impData.length;i++){
      companyData.push(impData[i].id);
    }
    
    let locCompanyDetails = companyData[0];
    let allData = locCompanyDetails.toLowerCase().lastIndexOf("/");
    let locCompanyId =  locCompanyDetails.toUpperCase().slice((allData+1));
    let firstIndexOf = locCompanyDetails.indexOf("/");
    let locComapnyName = locCompanyDetails.slice((firstIndexOf+1),(allData));
    // console.log(locComapnyName);
    setcompanyId(locCompanyId);
    setcompanyName(locComapnyName);
    // console.log(locCompanyId); 
    axios.post("http://localhost:3001/api/addCompany",
    {
      companyName:locComapnyName,
      companyId:locCompanyId
    })
    .then(()=>{
      console.log("sucess")
    })
  }

  navigate("/companyList")
    
  }
  

  return (
    <div className='container'>

    {/* <div className='row justify-content-md-center'>
    <div className='col-md-auto'>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
      <div className='col-md-auto'>{`inputValue: '${inputValue}'`}</div>
 <br /> */}
 {/* <Link to="/companyList"><h3 className='text-dark row justify-content-md-left my-4 bg-primary'>Show Listed Entries</h3></Link> */}
     <div className='my-3'><button type="button" className="btn btn-info" 
      onClick={()=>{
        navigate("/companyList")
      }}>Show Listed Entries</button>
      </div>

     <div className='row justify-content-md-center'> <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        getOptionSelected={(myCompanyList)=>myCompanyList}
        options={myCompanyList}
        style={{ width: 300 }}
        renderInput={(params) => 
        <TextField {...params} label="Search" variant="outlined" />}
      />
      <br />
      
      </div>
      <div className='text-right'>
        
      <button type="button" className="btn btn-success" 
      onClick={GetSelectedValue}>Add to Database</button>
      </div>

      
     </div>
  )

        }

export default SearchBar