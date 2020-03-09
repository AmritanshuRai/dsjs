const QUESTION_DATA = [
    {
        id : 1 ,
        question : "Write a JavaScript function to check whether an `input` is a string or not",
        solution : `function even_or_odd(number) {
                         if(number%2===0){
                            return"Even";
                        } else {
                    return "Odd";
                        }
                    }`
    },
    {
        id : 2 ,
        question : "Convert a Number to a String!",
        solution : `numberToString = String;`
    },
    {
        id : 3 ,
        question : "Detect Pangram",
        solution : `function isPangram(str){
            let newArr = [];
              newArr = [...str].map(function(char){
                let code = char.toLowerCase().charCodeAt(0);
                 if( code>=97 && code<=122){
                   return char.toLowerCase();
                 }
               }).join("");
              let uniqueChars =  [...new Set(newArr)];
              if(uniqueChars.length === 26){
                return true;
              }
              return false;
            }`
    },
    {
        id : 4 ,
        question : "lol",
        solution : `import React from 'react';

                    const QuestionContainer = () => (
                        <div className='questionContainer4'>
                
                        </div>
                    );`
    }
    
]

export default QUESTION_DATA;