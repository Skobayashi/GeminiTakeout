<?php


namespace Takeout\Model\Column;

class IndexGroupColumn implements ColumnInterface
{
    protected
        $columns = array(
        );


    /**
     * テーブルのカラム情報を取得する
     *
     * @author app2641
     **/
    public function getColumns ()
    {
        return $this->columns;
    }
}
