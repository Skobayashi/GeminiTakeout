Ext.define("TAKEOUT.Events",{extend:"Ext.util.Observable",singleton:!0,showInfoWindow:function(a){Ext.Msg.show({title:"Success!",msg:a,icon:Ext.Msg.INFO,buttons:Ext.Msg.OK})},showCautionWindow:function(a){Ext.Msg.show({title:"Caution!",msg:a,icon:Ext.Msg.ERROR,buttons:Ext.Msg.OK})}});Ext.ns("TAKEOUT","TAKEOUT.Controllers");TAKEOUT.Controllers=["TAKEOUT.controller.menu.DatabaseSelector","TAKEOUT.controller.takeout.SettingForm","TAKEOUT.controller.takeout.ListGrid"];Ext.Loader.setConfig({enabled:!0,paths:{Ext:"/ext/src","Ext.ux":"/src/ux",TAKEOUT:"/src/app"}});Ext.application({controllers:TAKEOUT.Controllers,launch:function(){Ext.get("database-selector")?Ext.create("TAKEOUT.view.menu.DatabaseSelector",{renderTo:"database-selector"}):Ext.create("TAKEOUT.view.takeout.Panel",{renderTo:"takeout-container"})}});
