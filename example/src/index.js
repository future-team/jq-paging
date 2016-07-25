import { Paging } from '../../src/index.js';
import $ from 'jquery';

(()=>{
   let a = null;
   a = Paging({
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
   let b = $('#pages1').Paging({
       root:'#pages1',
      clickCallBack:function(num){
         location.hash = num;
         console.log('第'+num+'页');
      }
   });
   $('#test').on('click',function(){
      a.setOpts({
         pageSize:10,
         total:37,
         showNum:3,
         clickCallBack:function(num){
            //console.log('第'+num+'页2');
         }
      });
   })
})();