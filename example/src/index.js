import { Paging } from '../../src/index.js';
import $ from 'jquery';

(()=>{
   Paging({
      pageSize:5,
      total:192,
      showNum:5,
      showTip:true,
      leftTip:false,
      clickCallBack:function(num){
         location.hash = num;
         console.log('第'+num+'页');
      }
   });
  /* $('#pages').Paging({
      clickCallBack:function(num){
         location.hash = num;
         console.log('第'+num+'页');
      }
   });*/
})();