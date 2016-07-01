import { Paging } from '../../src/index.js';
import $ from 'jquery';

(()=>{
   new Paging({
      pageSize:5,
      total:192,
      showNum:5,
      showTip:false,
      leftTip:true,
      clickCallBack:function(num){
         console.log('第'+num+'页');
      }
   });
})();