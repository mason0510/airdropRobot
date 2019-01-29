let Internal=require('../db/internal');

test=async ()=>{
   let aa= await Internal.get_Internal();
   console.log(typeof aa);
   return aa
}
let bb=test();
console.log(bb);