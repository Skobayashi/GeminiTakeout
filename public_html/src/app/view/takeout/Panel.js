/**
 * TAKEOUT.view.takeout.Panel
 *
 * @author suguru
 **/
Ext.define('TAKEOUT.view.takeout.Panel', {

    extend: 'Ext.container.Viewport',

    alias: 'widget.takeout-Panel',

    requires: [
        'TAKEOUT.view.takeout.SettingForm',
        'TAKEOUT.view.takeout.ListGrid'
    ],



    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            layout: 'border',
            items: [{
                xtype: 'takeout-SettingForm',
                region: 'north',
                api: {
                    submit: Takeout.search
                },
                height: 200
            }, {
                xtype: 'takeout-ListGrid',
                region: 'center'
            }]
        });

        me.callParent(arguments);
    }

});
