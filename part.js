// const express =require("express");
// const app=express();
// const PORT=8000;

// //functions, arrays and their methods -find filter, find, map, foreach etc
// // arrow fnuction, object, dectructuting, spread operator, async await, promises.
// //loops, condtionals, JSON data, 


// const students=[
//     {id:1, name:"raj",branch:"cse"},
//     {id:2, name:"Ajay",branch:"ECE"},
//     {id:3, name:"Yash",branch:"IT"},
// ];



// app.get("/",(req, res)=>{
//     res.send("Welcome to home page");
// });


// app.get("/students/search",(req,res)=>{
//     const branch=req.query.branch;
//     console.log("branch",branch)
//     if(!branch){
//         return res.json(students);
//     }
//     const foundStudents= students.filter(s=>s.branch==branch);
//     res.json(founddStudents);
// });

// app.get("/students",(req, res)=>{
//     res.json(students);
// });


// app.get("/students/:id",(req, res)=>{
//     const id=req.params.id;
//     const arrayindex=students.findIndex(s=>s.id==id);
//     const arrayIndex = 0;  
//     if(arrayIndex <0){
//         return res.status(404).send("student not found");
//     }
//     res.json(students[arrayIndex]);
//     const data=students[arrayIndex];
    
// });

// app.get("/students",(req,res)=>{
//     const branch=req.query.branch;
//     const foundStudents= students.filter(s=>s.branch==branch);
//     res.json(founddStudents);
// });

// app.post("/students/register",(req,res)=>{
//     const data=req.body;
//     console.log("<<<",req.body)
//     if(!data){
//         return res.status(400).send("please provide student data")
//     }
//     students.push(data)
//     res.status(201).json(data);
// })
// app.post("/students/register",(req,res)=>{
//     const{ name ,branch} =req.body;
//     if(!name || !branch) return res.status(400).send("detail missing");

//     // READ THE FILE FIRST
//     // fs.readFile("./students.json","utf-8",(err,data)=>{
//     //     if(err) return res.status(500).send("could not read file");

//     //     // PARSE EXISTING DATA OR START WITH EMPTY ARRAY
//     //     const students=JSON.parse(data || "[]");

//         // CREATE AND PUSH NEW STUDENT
//         const newStudent={
//             id:students.length > 0 ? students[students.length -1].id+1:1,
//             name,
//             branch,
//         };
//         students.push(newStudents);

//         // WRITYE THE WHOLE ARRAY BACK TO THE FILE(OVERWRITING)
//         fs.writeFile(
//             "./students.json",
//             JSON.stringify(students,null,2),
//             (err)=>{
//                 if(err) return res.status(500).send("Error writing  to file");

//                 // ONLY SEND RESPONSE INSIDE THE SUCCESS CALLBACK
//                 return res
//                 .status(201)
//                 .json({message:"Registered",students:newStudent});
//             },
//         );
//         });
//     });

//     // 
//     app.put("/students/:id",(req,res)=>{
//         const userId=parseInt(req.params.id);
//         const foundIndex=studentsfindIndex(s=s.id===userId);
//         if(foundIndex==-1){
//             return res.status(404).send("studnts not found")
//         }
//         students[foundIndex]={...students[foundIndex], ... req.body};
//         const result={message:"Students record updated successfully",students:students};
//         return res.status(200).json(result)
//     })
// app.listen(PORT,()=>{
// console.log(`Server is running oh http://localhost:${PORT}`);
// });


const express = require("express");
const app = express();
const PORT = 8000;

const students = [
    {id: 1, name: "raj", branch: "cse"},
    {id: 2, name: "Ajay", branch: "ECE"},
    {id: 3, name: "Yash", branch: "IT"},
];

app.use(express.json()); 

app.get("/", (req, res) => {
    res.send("Welcome to home page");
});

app.get("/students/search", (req, res) => {
    const branch = req.query.branch;
    console.log("branch", branch)
    if (!branch) {
        return res.json(students);
    }
    const foundStudents = students.filter(s => s.branch == branch);
    res.json(foundStudents); 
});


app.get("/students", (req, res) => {
    res.json(students);
});

app.get("/students/:id", (req, res) => {
    const id = req.params.id;
    const arrayindex = students.findIndex(s => s.id == id);
    if (arrayindex < 0) { 
        return res.status(404).send("student not found");
    }
    res.json(students[arrayindex]);
});

app.post("/students/register", (req, res) => {
    const { name, branch } = req.body;
    if (!name || !branch) return res.status(400).send("detail missing");

    const newStudent = {
        id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
        name,
        branch,
    };
    students.push(newStudent);
    res.status(201).json({ message: "Registered", student: newStudent });
});

app.put("/students/update/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const foundIndex = students.findIndex(s => s.id === userId); 
    if (foundIndex === -1) { 
        return res.status(404).send("student not found");
    }
    students[foundIndex] = { ...students[foundIndex], ...req.body };
    const result = { message: "Student record updated successfully", student: students[foundIndex] };
    return res.status(200).json(result);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
