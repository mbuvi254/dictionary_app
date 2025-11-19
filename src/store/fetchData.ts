import {useState} from 'react'
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const wordResult ={
    const [submittedWord,setSubmittedWord]=useState("");
    queryKey: ["get-word-meaning",submittedWord],
    queryFn: async () => {
                const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${submittedWord}`)
                return res.data;
            }
        }