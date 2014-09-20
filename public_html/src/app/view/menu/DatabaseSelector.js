/**
 * TAKEOUT.view.menu.DatabaseSelector
 *
 * @author suguru
 **/
Ext.define('TAKEOUT.view.menu.DatabaseSelector', {

    extend: 'Ext.form.field.ComboBox',

    alias: 'widget.menu-DatabaseSelector',


    name: 'client',
    displayField: 'client',
    valueField: 'client',
    hideLabel: true,
    typeAhead: true,
    forceSelection: true,
    selectOnFocus: true,
    editable: false,
    queryMode: 'local',
    width: 300,


    initComponent: function () {
        var me = this;

        me.buildStore();
        me.callParent(arguments);
    },



    /**
     * ストアの構築
     *
     * @author suguru
     **/
    buildStore: function () {
        var me = this;

        me.store = Ext.create('Ext.data.Store', {
            autoLoad: true,
            fields: [{
                name: 'client'
            }],
            proxy: {
                type: 'direct',
                directFn: Takeout.getDatabaseClient
            }
        });
    }

});
