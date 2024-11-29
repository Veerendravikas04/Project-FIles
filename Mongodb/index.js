const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/thanu');
main()
  .then(()=>{
    console.log("connection successful");
  })
   .catch((err)=>console.log(err));

   async function main()
   {
    await mongoose.connect('mongodb://127.0.0.1:27017/thanu');
   }

   const userSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required: true,
        },
        email:String,
        age:Number,
    }
   );

   const User= mongoose.model("User",userSchema);

//    const user2=new User({name:"Vikas",email:"Vikas@gmail.com",age:20});
//    user2.save().then((res)=>console.log(res));


//    User.insertMany([
//     {name:"Tony",email:"tony@email.com",age:50},
//     {name:"Peter",email:"Peter@email.com",age:20},
//     {name:"Bruce",email:"Bruce@email.com",age:10},
//    ]).then((res)=>
// {
//     console.log(res);
// })


// User.find({age:{$gt:20}}).then((res)=>
// {
//     console.log(res[0].name);
// })
// .catch((err)=>{
//     console.log(err);
// })


// User.updateOne({age:20},{name:"vikas"}).then((res)=>
//     {
//         console.log(res);
//     })
//     .catch((err)=>{
//         console.log(err);
//     })


//     User.find({age:20}).then((res)=>
// {
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// })


// User.findOneAndUpdate({name:"vikas"},{email:"thanu@123"}).then((res)=>
//     {
//         console.log(res);
//     })
//     .catch((err)=>{
//         console.log(err);
//     })


User.deleteOne({name:"Bruce"}).then((res)=>
{
    console.log(res);
});

User.find().then((res)=>
{
    console.log(res);
})