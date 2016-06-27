# jq-paging
 pagination for jQuery 
 分页组件

## 使用
 - 使用时，应指定在何处插入分页，即传入root对应的选择器，配置项如下：
 
 ```
       /**
        * 当前页
        * */
       currentPage:1,
       /**
        * 每页展示条目数量
        * */
       pageSize:5,
       /**
        * 总条目数量
        * */
       total:20,
       /**
        * 列表每次显示多少页
        * */
       showNum: 5,
       /**
        * 插入分页的元素标记
        * */
       root:'#pages',
       /**
        * 点击回调事件
        * 返回参数为要显示的页数
        * */
       clickCallBack: function(num){
   
       }
       
 ```
 使用实例：
 js:
 
 ```
    import { Paging } from '../../src/index.js';
    (()=>{
       new Paging({
          pageSize:5,
          total:203,
          showNum:9,
          root:'#pages',
          clickCallBack:function(num){
             console.log('第'+num+'页');
          }
       });
    })();
 ```
 html:
 
 ```
    <div id="root" style="padding: 10px">
        <div id="pages" class="jq-pages"></div>
    </div>
 ```

## Command

```
	#测试	
	npm run test	
	#打包	
	npm run build	
	#例子演示	
	npm run demo	
```
