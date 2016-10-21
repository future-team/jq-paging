import { Paging } from '../../src/index.js';
import $ from 'jquery';

(()=>{
   let a = null;
   a = Paging({
      pageSize:5,
      total:32,
      showNum:5,
      showTip:true,
      leftTip:false,
      clickCallBack:function(num){
         location.hash = num;
         console.log('第'+num+'页');
      },
      isLink: true,
      /**
       * 配置link参数
       * */
      linkOpts:{
         /**
          * 基本url,不指定默认location.href
          * */
         baseUrl:location.href,
         /**
          * 每次需要根据页数改变的key
          * 例如page = 1 每次更改page。
          * */
         key:'page'
      }
   });
   let b = $('#pages1').Paging({
       root:'#pages1',
      pageSize:5,
      total:132,
      showNum:5,
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