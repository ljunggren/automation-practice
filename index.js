<html>
<script src="/js/CtrlDriver.js"></script>
<script src="/js/jquery-3.1.1.min.js"></script>
<style>
  li{
    background:red;
  }
  ul div{
    background:green;
    color:#FFF;
  }
</style>
<script>
  //The module, a, could be in a js file and insert by script tag
  var a={
    //_CtrlDriver._buildProxy is the function to bind data on UI
    data:_CtrlDriver._buildProxy({list:[],map:{firstName:"wensheng",lastName:"Li"}}),
    init:function(){
      //To generate UI
      _CtrlDriver._execute(this, this.data, this.viewDef);
    },
    viewDef:{
      _tag:"div",
      _items:[
        //bind data on label
        {
          _tag:"div",
          _text:"a.data.name"
        },
        {
          _tag:"label",_items:[
            {
              _text:"change in time"
            },
            {
              _tag:"input",_dataModel:"a.data.name"
            }
          ]
        },
        {
          _tag:"br"
        },
        //data bind with input
        {
          _tag:"label",_items:[
            {
              _text:function(){
                return "update after change (blur)"
              }
            },
            {
              _tag:"input",_attr:{value:"a.data.name"},
              //put event function in _jqext. the event name is the same as jquery
              _jqext:{
                change:function(){
                  a.data.name=this.value;
                }
              },
              _focus:1
            }
          ]
        },
        {
          _tag:"br"
        },
        //data bind with input in special format
        {
          _tag:"label",_items:[
            {
              _text:"Formatted value input"
            },
            {
              _tag:"input",_dataModel:"a.data.name",
              _formatGet:function(v){
                v=v.toUpperCase();
                if(v.startsWith("SET:")){
                  v=v.substring(4)
                }
                return v;
              },
              _formatSet:function(v){
                return "set:"+v
              }
            }
          ]
        },
        {
          _tag:"hr"
        },
        //static data loop on array
        {
          _if:"!a.data.list.length || a.data.list[a.data.list.length-1].name!='a'",
          _tag:"div",
          _animation:{
            _hide:function(e,_fun){$(e).fadeOut("slow",_fun)}
          },
          _items:[
            {
              _tag:"h3",
              _html:"<b>Data Repeat in static data(_dataRepeat in array)</b>"
            },
            {
              _tag:"ul",
              _items:[
                {
                  _tag:"li",
                  _text:"_data._item",
                  _dataRepeat:[1,2,3,4]
                }
              ]
            },
          ]
        },
        {
          _tag:"hr"
        },
        //data bind in map
        {
          _if:"!a.data.list.length || a.data.list[a.data.list.length-1].name!='b'",
          _tag:"div",
          _animation:{
            _show:function(e,_fun){$(e).fadeIn("slow",_fun)},
            _hide:function(e,_fun){$(e).fadeOut("slow",_fun)},
          },
          _items:[
            {
              _tag:"h3",
              _html:"<b>Data Repeat in map (_dataRepeat in map)</b>"
            },
            {
              _tag:"ul",
              _items:[
                {
                  _tag:"li",
                  _text:function(d){
                    return d._key+':'+d._item
                  },
                  _dataRepeat:"a.data.map"
                }
              ]
            },
          ]
        },
        {
          _tag:"hr"
        },
        {
          _tag:"div",
          _items:[
            {
              _tag:"label",
              _items:[
                {_text:"_data._item+': '"},
                {
                  _tag:"input",_dataModel:"a.data.map[_data._item]",
                },
                {_tag:"br"}
              ],
              _dataRepeat:function(){
                return Object.keys(a.data.map);
              }
            }
          ]
        },
        {
          _tag:"hr"
        },
        {
          _tag:"h3",_html:"<b>Data Repeat in module data (_dataRepeat in array)</b>"
        },
        {
          _tag:"div",_text:"try add letter 'a','b' and html content (like:<a href='#'>boozang</a>)"
        },
        //data bind in data array
        {
          _tag:"ul",
          _items:[
            {
              //dynamic tag
              _tag:"_data._idx%2?'li':'div'",
              _attr:{style:"height:30px;"},
              _items:[
                {
                  _html:"_data._item.name"
                },
                {
                  _tag:"button",_text:"Delete",
                  _attr:{
                    style:"float:right"
                  },
                  _jqext:{
                    click:function(){
                      a.data.list.splice(this._data._idx,1)
                    }
                  }
                }
              ],
              _dataRepeat:"a.data.list"
            }
          ]
        },
        {
          _tag:"input",_dataModel:"a.data.tmpName"
        },
        {
          _tag:"button",
          _text:"Add",
          _jqext:{
            click:function(){
              a.data.list.push({name:a.data.tmpName});
              a.data.tmpName=""
            }
          }
        },
        {
          _tag:"hr"
        },
        {
          _tag:"button",
          _attr:{
            //support string event as well
            onclick:"a.data.page='/fragments/launch.html'"
          },
          _text:"load static page"
        },
        //load static page
        {
          _if:"a.data.page",
          _tag:"div",
          _items:[
            {_load:'a.data.page'}
          ]
        },
        {
          _tag:"hr"
        },
        {
          _tag:"div",
          _text:"load dynamic component at below(/example/exPage.js)"
        },
        //load template page
        {
          _load:function(){
            return '/example/exPage.js';
          }
        }
      ]
    }
  }
  
  $(document).ready(function(){
    a.init()
  })
  
</script>
<body>
  boozang key words:<br/> 
  <b>
    _tag *,<br/> 
    _attr (collection of element html attributes *),<br/> 
    _text *,<br/> 
    _html *,<br/> 
    _jqext (collection of event function),<br/> 
    _items (collection of sub-element),<br/> 
    _if *,<br/> 
    _dataModel *,<br/> 
    _dataRepeat * (_data, _item, _idx, _key, _supData),<br/> 
    _formatGet **,<br/> 
    _formatSet **,<br/> 
    _load *,<br/> 
    _focus *,<br/>
    _animation (_show, _hide)</b><br/><br/>
    Note: <br/>
    * supports function and expression (text and databind)<br/>
    ** supports function only <br/><br/>
    Examples:
    <hr>
</body>
</html>