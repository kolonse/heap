/**
 * Created by kolonse on 2016/9/11.
 */
var Heap = require("../heap.js");
var arr = [];
for(var i = 0;i < 10;i ++){
    arr.push(Math.floor(Math.random() * 100));
}
var heap = new Heap({
    size:10,
    cmp:function(a,b){
        return b - a;
    },
    arr:arr
});
heap.debug();
console.log("-------------------------------------");
for(var i = 0;i < 5;i ++){
    var v = Math.floor(Math.random() * 100);
    console.log(v);
    heap.debug();
    heap.push(v,true);
    heap.debug();
    console.log("++++++++++++++++++++++++++++++++");
}
console.log("-------------------------------------");
heap.debug();
console.log(heap);