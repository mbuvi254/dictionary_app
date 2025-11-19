import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Spinner } from "./components/ui/spinner";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "./components/ui/card";

import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import {useState} from 'react'



function App() {
  const [wordSearch,setWordSearch]=useState("");


  const { data, isLoading, error,refetch } = useQuery({
    queryKey: ["get-word-meaning"],
    queryFn: async () => {
      const res = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${wordSearch}`,
      );
      console.log(res.data);
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

const handleSubmit = (e:any) => {
    e.preventDefault();

    if (!wordSearch.trim()) {
      alert(`Please Provide a Word`);
    }
    refetch();
  
};

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">WORD RESULT</h1>

       <form onSubmit={handleSubmit}>
        <Input
          type="text"
          onChange={(e) => setWordSearch(e.target.value)}
          placeholder="Enter Word to Search"
        />
        <Button type="submit">Search</Button>
      </form>

      {data?.map((item: any, index: number) => (
        <Card key={index} className="mb-6">
          <CardHeader>
            <CardTitle>{item.word}</CardTitle>
            <CardDescription>
              {item.phonetic ?? "No phonetic available"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {item.meanings.map((meaning: any, mIndex: number) => (
              <div key={mIndex} className="mb-4">
                <p className="font-semibold">
                  Parts of Speech: {meaning.partOfSpeech}
                </p>
                {meaning.definitions.map((definition: any, dIndex: number) => (
                  <p key={dIndex} className="text-gray-700">
                    - {definition.definition}
                  </p>
                ))}
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </>
  );
}


export default App;
