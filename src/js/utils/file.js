/*
  Sample CSV Input: 
  column_a,column_b,column_c
  1,2,3
  4,5,6
  Sample JSON Output:
  [
    {
      column_a: 1,
      column_b: 2,
      column_c: 3
    },
    {
      column_a: 4,
      column_b: 5,
      column_c: 6
    }
  ]
*/


export const parseCsv = (text) => {
    //splitting the text at those carriage return and new line characters
     let lines = text.split("\r\n");
    
     if(lines.length <  3) return null;
    
     //intitialize an array that will hold our data that will be coming in at each row
     let data = [];
     // this will split each section of the csv by the comma and give us an array of those column headings EX. schoolID, SchoolName, LowestGrade,
     let fields = lines[0].split(",");
    
     //start of our loop which will start at 1 because we want to start at 2nd line because 1st line contains column headings
     for(let i = 1; i < lines.length; i++) {
         //this will represent a fresh JSON object
         let row = {};
         // this will give the values of that given row by splitting the line at position [i] on the comma character
         let values = lines[i].split(",");
    
        //this loop will keep going until we run out fields given
         for (let j = 0; j < fields.length; j++)
         row[fields[j]] = values[j];
    
         data.push(row);
     }
    
        return{
            fields,
            data
        };
    }
    
    export const parseJson = (text) => JSON.parse(text);