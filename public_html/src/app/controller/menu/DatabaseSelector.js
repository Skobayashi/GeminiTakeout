/**
 * TAKEOUT.controller.menu.DatabaseSelector
 *
 * @author suguru
 **/
Ext.define('TAKEOUT.controller.menu.DatabaseSelector', {

    extend: 'Ext.app.Controller',


    init: function () {
        var me = this;

        me.control({
            'menu-DatabaseSelector': {
                select: function (field, records) {
                    var client = field.getValue();
                    window.location.href = '/index/setting?client='+client;
                }
            }
        });
    }

});
