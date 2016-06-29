import { Paging } from '../../src/index.js';
import $ from 'jquery';

(()=>{
   new Paging({
      pageSize:5,
      total:203,
      showNum:5,
      clickCallBack:function(num){
         console.log('第'+num+'页');
      }
   });
})();