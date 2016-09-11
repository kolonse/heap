/**
 * Created by kolonse on 2016/9/11.
 */
/**
 *
 * @param opt = {
 *  size: default 0x7fffffff
 *  cmp: funciton(a,b){return 0 or 1 or -1}   比较函数返回 0 表示 元素相等,不会进行交换元素,1表示 a>b,-1表示a<b
 *  arr: 传入需要建堆的元素列表
 * }
 * @constructor
 */
function Heap(opt){
    this.size = opt.size || 0x7fffffff ;
    this.cmp = opt.cmp || (function(a,b){ return a - b;});
    this.arr = opt.arr || [] ;
    this.heap = [] ;
    this.initHeap();
    this.createHeap();
}

Heap.prototype = {
    getElemsByHeap:function(){
        var arr = [] ;
        for(var i = 0;i < this.heap.length;i ++){
            arr.push(this.elem(i));
        }
        return arr ;
    },
    getElems:function(){
        return this.arr ;
    },
    push:function(e,replace){
        replace = replace !== false?true:false ;
        if( this.arr.length >= this.size){
            // 对 根和元素进行比较 如果需要替换那么进行自上而下调整
            var r = this.cmp(this.elem(0),e);
            if( r > 0 || (r === 0 && replace === true)){
                this.arr[this.heap[0]] = e ;
                this.adjustHeap(0) ;
            }
        }else{
            // 将元素插入队尾  然后进行自下而上调整
            this.arr.push(e);
            this.heap.push(this.arr.length - 1);
//            this.adjustHeapUp(this.heap.length - 1);
            this.createHeap() ;
        }
    },
    reset:function(arr){
        this.arr = arr ;
        this.initHeap();
    },
    createHeap:function(){
        var l = this.arr.length;
        var lp = Math.floor((l - 1) / 2);
        if( l === 0 ){
            return ;
        }
        for (var i = lp; i >= 0; i--) {
            this.adjustHeap(i);
        }
    },
    adjustHeap:function(i){
        var lchild = 2*i + 1;
        var rchild = 2*i + 2;
        var l = this.heap.length;
        if (lchild >= l) { // 当前结点没有子结点
            return
        } else if( rchild <= l-1) { // 当前有左右子节点
            var r1 = this.cmp(this.elem(i),this.elem(lchild));//less(i, lchild)
            var r2 = this.cmp(this.elem(i),this.elem(rchild))
            if (r1<0 && r2<0) { //当前结点已经是最小值 无需替换
                return
            }
            var r3 = this.cmp(this.elem(lchild), this.elem(rchild))
            if (r1 > 0 && r3 < 0) { // 左孩子值最小  i > l, l < r
                this.swap(i,lchild);
                this.adjustHeap(lchild);
                return
            }
            if (r2 >0 && r3 >0)  { // 右孩子值最小  i > r, l > r
                this.swap(i,rchild);
                this.adjustHeap(rchild);
                return
            }
        } else { // 只有左结点
            var r = this.cmp(this.elem(i),this.elem(lchild));
            if (r > 0) {
                this.swap(i,lchild);
                this.adjustHeap(lchild);
            }
        }
    },
    adjustHeapUp:function(i){
        var j = Math.floor((i - 1) / 2) ;
        while(j >= 0&&i > 0){
            var r = this.cmp(this.elem(i),this.elem(j));
            if(r > 0){
                this.swap(i,j);
                i = j;
                j =  Math.floor((i - 1) / 2) ;
            }else{
                break;
            }
        }
        //this.assign(i,t);
    },
    elem:function(i){
        return this.arr[this.heap[i]]
    },
    assign:function(i,j){
        this.heap[i] = this.heap[j];
    },
    swap:function(i,j){
        var tmp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = tmp ;
    },
    initHeap:function(){
        this.heap = [] ;
        for(var i = 0;i < this.arr.length;i ++){
            this.heap.push(i);
        }
    },
    debug:function(){
        var str = '';
        for(var i = 0;i < this.heap.length;i ++){
            str += this.elem(i) + ' ';
        }
        console.log(str);
    }
}
if(module && module.exports){
    module.exports = Heap ;
}
