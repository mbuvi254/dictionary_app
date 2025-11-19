//SearchResultCard
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "./ui/card";

import { useSearchResultStore,type SearchResultData,type Meaning } from "../store/SearchStore";
//import {useState} from 'react'
//const [results,setResults]=useState([]);

export const SearchResultCard = ()=>{
    const results = useSearchResultStore(state=>state.results)

    if(!results || results.length==0){
      return <p>No Results</p>
    }
    return (
        <>
        {results?.map((item:SearchResultData, index: number) => (
        <Card key={index} className="mb-6">
          <CardHeader>
            <CardTitle>{item.word}</CardTitle>
            <CardDescription>
              {/* {item.phonetics[0].text ?? "No phonetic available"} */}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {item.meanings.map((meaning:Meaning , mIndex: number) => (
              <div key={mIndex} className="mb-4">
                <p className="font-semibold">
                  Parts of Speech: {meaning.partOfSpeech}
                </p>
                {meaning.definitions.map((def, dIndex: number) => (
                  <p key={dIndex} className="text-gray-700">
                    - {def.definition}
                  </p>
                ))}
              </div> 
            ))}
          </CardContent>
        </Card>
     
    ))}
    </>
    )   
}

export default SearchResultCard;
