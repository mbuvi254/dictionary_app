import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {useState} from "react"

const [wordSearch, setWordSearch]=useState("");
const handleSubmit = (e:any) => {
    e.preventDefault();

    if (!wordSearch.trim()) {
      alert(`Please Provide a Word`);
    }
    //refetch();
  
};
const SearchForm = ()=>{
    return (
        <>
        <form onSubmit={handleSubmit}>
        <Input type="text" onChange={(e)=>setWordSearch(e.target.value)} placeholder="Enter Word to Search" />
        <Button type="submit">Search</Button> 
        </form>
        </>
       
    )
}

export default SearchForm;