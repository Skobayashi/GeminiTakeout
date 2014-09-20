/**
 * TAKEOUT.view.takeout.SettingForm
 *
 * @author suguru
 **/
Ext.define('TAKEOUT.view.takeout.SettingForm', {

    extend: 'Ext.form.Panel',

    alias: 'widget.takeout-SettingForm',


    bodyStyle: 'padding: 20px;',
    style: 'background-color: white;',
    border: false,


    initComponent: function () {
        var me = this;

        me.childItems = [];
        me.buildIndexGroupField();
        me.buildSearchField();

        Ext.apply(me, {
            items: [{
                xtype: 'container',
                layout: 'hbox',
                items: me.childItems
            }],
            buttons: [{
                text: '戻る',
                action: 'back'
            }, {
                text: 'submit',
                action: 'submit'
            }]
        });

        me.buildBookTypeField();
        me.buildBookColumnField();

        me.callParent(arguments);
    },



    /**
     * インデックスグループコンボボックス
     *
     * @author suguru
     **/
    buildIndexGroupField: function () {
        var me = this,
            store = Ext.create('Ext.data.Store', {
                autoLoad: true,
                fields: [{
                    name: 'id'
                }, {
                    name: 'title'
                }],
                proxy: {
                    type: 'direct',
                    directFn: Takeout.getIndexGroup
                }
            });

        me.childItems.push({
            xtype: 'combo',
            name: 'ig',
            store: store,
            allowBlank: false,
            displayField: 'title',
            valueField: 'id',
            fieldLabel: 'インデックスグループ',
            typeAhead: true,
            forceSelection: true,
            selectOnFocus: true,
            editable: false,
            queryMode: 'local',
            labelWidth: 150,
            width: 450
        });
    },




    /**
     * 検索クエリフィールド
     *
     * @author suguru
     **/
    buildSearchField: function () {
        var me = this;

        me.childItems.push({
            xtype: 'textfield',
            name: 'query',
            fieldLabel: '検索語句',
            width: 400,
            margin: '0 0 0 70'
        });
    },



    /**
     * 校了ブック・トランクブック
     *
     * @author suguru
     **/
    buildBookTypeField: function () {
        var me = this;

        me.items.push({
            xtype: 'checkboxgroup',
            fieldLabel: 'ブックタイプ',
            defaultType: 'checkboxfield',
            allowBlank: false,
            vertical: true,
            columns: 1,
            items: [{
                boxLabel: 'トランクブック',
                name: 'trunk',
                inputValue: true
            }, {
                boxLabel: '校了ブック',
                name: 'proofread',
                inputValue: true,
                checked: true
            }],
            margin: '10 0'
        });
    },



    /**
     * 必要フィールド
     *
     * @author suguru
     **/
    buildBookColumnField: function () {
        var me = this;

        me.items.push({
            xtype: 'checkboxgroup',
            fieldLabel: '必要カラム',
            defaultType: 'checkboxfield',
            defaults: {
                inputValue: true,
                checked: false
            },
            allowBlank: false,
            columns: 6,
            items: [{
                boxLabel: 'ブックID',
                name: 'book_id',
                checked: true
            }, {
                boxLabel: 'ブック名',
                name: 'book_name',
                checked: true
            }, {
                boxLabel: 'インデックスグループ名',
                name: 'index_group'
            }, {
                boxLabel: '言語名',
                name: 'language'
            }, {
                boxLabel: 'モデル名',
                name: 'model'
            }, {
                boxLabel: 'トランク or 校了',
                name: 'trunk_proof'
            }],
            margin: '10 0'
        });
    }

});
