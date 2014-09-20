/**
 * TAKEOUT.view.takeout.ListGrid
 *
 * @author suguru
 **/
Ext.define('TAKEOUT.view.takeout.ListGrid', {

    extend: 'Ext.grid.Panel',

    alias: 'widget.takeout-ListGrid',

    config: {
        values: null
    },


    layout: 'fit',
    autoScroll: true,
    margin: '20 0 0 0',


    initComponent: function () {
        var me = this;

        me.buildColumns();
        me.store = me.buildStore(['']);

        me.callParent(arguments);
    },




    /**
     * カラムの構築
     *
     * @author suguru
     **/
    buildColumns: function () {
        var me = this;

        me.columns = [{
            title: 'dummy',
            dataIndex: 'dummy'
        }];
    },



    /**
     * ストア構築
     *
     * @author suguru
     **/
    buildStore: function (fields) {
        var me = this;

        return Ext.create('Ext.data.Store', {
            autoLoad: false,
            fields: fields,
            proxy: {
                type: 'direct',
                directFn: Takeout.search,
                extraParams: {
                    values: me.getValues()
                }
            }
        });
    }

});
