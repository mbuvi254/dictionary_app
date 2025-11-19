//SearchResult.ts
import { create} from "zustand";


export interface Meaning {
    partOfSpeech:string;
    definitions :{definition:string ;example?:string,synonyms:string[],antonyms:string[]}[];

};

export interface SearchResultData {
    word:string;
    phonetics?:{text?:string;audio?:string}[];
    meanings : Meaning[];
};

export interface SearchResultsStore {
    results:SearchResultData[],
    setResults: (data: SearchResultData[])=>void,
    clearResults: () => void;

};

export const useSearchResultStore = create<SearchResultsStore>((set)=>({
    results:[],
    setResults: (data)=> set({results:data}),
    clearResults: () => set({results: []}),

}));

