# heap
堆算法
在写nodejs的时候可能遇到下面的场景：
*  需要对一个数列中的最小值进行新元素的替换
   这种场景最快也需要O(n)按照传统方法,而使用堆则只需要O(lgn),因为只有个调整堆的过程
*  找出一个数列中的第K小
   这种场景简单的做法是直接对数列进行排序,但是排序最快的算法复杂度也需要O(n*lgn),
   而使用大/小顶堆做这些场景就会非常快速,只需要O(lgn)的时间复杂度。

# 使用方法
``````javascript
var Heap = require("heap.js");
var heap = new Heap({
    // 表示该堆的最大元素个数,默认无穷大, 如果push元素时,当前堆数量已经达到上限,那么会根据cmp返回1时替换堆顶元素。
    size:10,
    cmp:function(a,b){ // 比较函数,  返回三种值, >0表示 a > b, =0表示a=b, <0表示a小于b 
                       // 如果逻辑a < b返回<0的值,那么堆是小顶堆,返回>0则是大顶堆
        return b - a;
    }
    //,arr:arr  // 如果已经有一个数列存在 那么可以直接传入  arr即可
});
for(var i = 0;i < 5;i ++){
    var v = Math.floor(Math.random() * 100);
    heap.push(v,true);
}
// 输出建堆后结果 是一个数组
console.log(heap.getElemsByHeap());
// 输出所有元素内容
console.log(heap.getElems());
``````
