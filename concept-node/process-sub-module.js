console.log('Sub Module')

setInterval(() => {
    console.log('I am Sub Module ')
}, 5000);

let num = 0
function count(){
    console.log(++num);
}

module.exports.count = count;