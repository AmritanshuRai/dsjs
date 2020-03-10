const QUESTION_DATA = [
    {
        id: 1,
        question:
            "Write a JavaScript function to check whether an `input` is a string or not",
        solution: `function even_or_odd(number) {
                         if(number%2===0){
                            return"Even";
                        } else {
                    return "Odd";
                        }

                    }`
    },
    {
        id: 2,
        question: "Convert a Number to a String!",
        solution: `numberToString = String;`
    },
    {
        id: 3,
        question: "Detect Pangram",
        solution: `function isPangram(str){
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
        id: 4,
        question: "Persistent Bugger.",
        solution: `function persistence(num) {
                    let totalCount = 0;
                      while([...num+''].length !== 1){
                        totalCount++;
                      num = [...num+''].reduce(function(p,n){
                        return p*n;
                        },1);
                        }
                    return totalCount;
                    }`
    }
];

export default QUESTION_DATA;
