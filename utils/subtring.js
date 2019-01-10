str="10.0001 EOS"
// let arr = str.toString().split(" ");
let arr;
if (typeof str[0] == 'string') {
    arr = str[0,5].split(' ')
    //console.log(arr);
} else {
    arr = [];

}
arr=str.split(" ")
console.log(arr[0]);
console.log(parseFloat(arr[0]));

let sum=0;
for (let i = 0; i < 100; i++) {
    sum+=i
}
console.log(sum);