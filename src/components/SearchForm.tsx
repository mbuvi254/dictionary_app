import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {useState} from 'react'
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Spinner } from "./ui/spinner";
import { useSearchResultStore} from "../store/SearchStore"
import SearchResultCard from "./SearchResultCard";


const SearchForm = ()=>{
const [wordSearch,setWordSearch]=useState("");
const setResults = useSearchResultStore(state=>state.setResults);
     
  const { isLoading, error,refetch } = useQuery({
    queryKey: ["get-word-meaning",wordSearch],
    queryFn: async () => {
      const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordSearch}`,);
      console.log(res.data);
      setResults(res.data);
      return res.data;
    },
    enabled : false,
  });

 if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-4 mt-12">
        <Spinner className="size-20" />
        <p className="text-gray-600 text-lg">
          Please Wait, data is still loading...
        </p>
      </div>
    );
  }

  if (error) {
    return <p>Something went wrong</p>;
  }



const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!wordSearch.trim()) {
      alert(`Please Provide a Word`);
      return
    }
    refetch();
  
};
  return(
    <>
      <h1 className="text-2xl font-bold mb-4">WORD RESULT</h1>

       <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={wordSearch}
          onChange={(e) => setWordSearch(e.target.value)}
          placeholder="Enter Word to Search"
        />
        <Button type="submit">Search</Button>
      </form>

      {isLoading && (
         <div className="flex flex-col items-center gap-4 mt-12">
        <Spinner className="size-20" />
        <p className="text-gray-600 text-lg">
          Please Wait, data is still loading...
        </p>
      </div>
      )}
      {error && (
        <>
        <p>Something Went Wrong</p>
        </>
      )}

         <SearchResultCard />

      

      
    </>
  );
}

export default SearchForm;
