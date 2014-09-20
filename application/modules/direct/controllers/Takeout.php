<?php


use Takeout\Database\Helper;

use Takeout\Container,
    Takeout\Factory\ModelFactory;

class Takeout
{

    /**
     * データベース用クライアントを取得する
     *
     * @author suguru
     **/
    public function getDatabaseClient ($request)
    {
        $clients = new \Zend_Config_Ini(APPLICATION_PATH.'/configs/database.ini');
        $data = array();

        foreach ($clients as $key => $val) {
            $data[] = array('client' => $key);
        }

        return $data;
    }



    /**
     * インデックスグループを取得する
     *
     * @author suguru
     **/
    public function getIndexGroup ($request)
    {
        try {
            $client = $_SESSION['client'];
            
            Helper::getConnection($client);

            $container = new Container(new ModelFactory);
            $table = $container->get('IndexGroupQuery');
            $results = $table->fetchAll();

            $all = new \stdClass;
            $all->id = 'all';
            $all->title = '全選択';
            $results = array_merge(array($all), $results);

        } catch (\Exception $e) {
            var_dump($e->getMessage());
            exit();
            throw $e;
        }

        return $results;
    }



    /**
     * グリッドで使うカラムを取得する
     *
     * @author suguru
     **/
    public function getColumns ($request)
    {
        $values = $request->values;

        $field = new \stdClass;
        $column = new \stdClass;
        $column->flex = 1;

        $fields = array();
        $columns = array();


        // bookID
        if (isset($values->book_id)) {
            $field->name = 'book_name';
            $fields[] = clone $field;

            $column->text = 'ブックID';
            $column->dataIndex = $field->name;
            $columns[] = clone $column;
        }

        // book名
        if (isset($values->book_name)) {
            $field->name = 'book_title';
            $fields[] = clone $field;

            $column->text = 'ブックタイトル';
            $column->dataIndex = $field->name;
            $columns[] = clone $column;
        }

        // インデックスグループ名
        if (isset($values->index_group)) {
            $field->name = 'index_group';
            $fields[] = clone $field;

            $column->text = 'インデックスグループ';
            $column->dataIndex = $field->name;
            $columns[] = clone $column;
        }

        // 言語
        if (isset($values->language)) {
            $field->name = 'language';
            $fields[] = clone $field;

            $column->text = '言語名';
            $column->dataIndex = $field->name;
            $columns[] = clone $column;
        }

        // モデル名
        if (isset($values->model)) {
            $field->name = 'model';
            $fields[] = clone $field;

            $column->text = 'モデル名';
            $column->dataIndex = $field->name;
            $columns[] = clone $column;
        }

        // トランク or 校了
        if (isset($values->trunk_proof)) {
            $field->name = 'trunk_proof';
            $fields[] = clone $field;

            $column->text = 'トランク or 校了';
            $column->dataIndex = $field->name;
            $columns[] = clone $column;
        }


        return array(
            'success' => true,
            'fields' => $fields,
            'columns' => $columns
        );
    }



    /**
     * 条件検索
     *
     * @param stdClass $values  テイクアウト設定情報
     * @author suguru
     **/
    public function search ($request)
    {
        // 検索条件整理
        set_time_limit(0);
        $results = $this->_executeSQL($request->values, 100);
        return $results;
    }



    /**
     * csvの生成
     *
     * @author suguru
     **/
    public function generateCsv ($request)
    {
        set_time_limit(0);
        $results = $this->_executeSQL($request->values);
        $csv = '';

        foreach ($results as $result) {
            unset($result->id);
            unset($result->proofread);

            foreach ($result as $value) {
                $csv .= $this->_encode('"'.$value.'",');
            }

            $csv = substr($csv, 0, strlen($csv) - 1).PHP_EOL;
        }

        $unique = md5(time());
        $file_path = '/tmp/'.$unique.'_gemini_takeout.csv';
        touch($file_path);
        chmod($file_path, 0777);

        $fp = fopen($file_path, 'w');
        fwrite($fp, $csv);
        fclose($fp);

        return array('success' => true, 'unique' => $unique);
    }



    /**
     * 検索SQLの実行
     *
     * @author suguru
     **/
    private function _executeSQL ($values, $limit = null)
    {
        $proofread   = (isset($values->proofread)) ? true: false;
        $trunk       = (isset($values->trunk)) ? true: false;
        $ig_id       = $values->ig;
        $query       = $values->query;


        Helper::getConnection($_SESSION['client']);
        $db = \Zend_Registry::get('db');

        $field = 'SELECT b.id, b.proofread, ';
        $from  = 'FROM book AS b ';
        $join  = '';
        $where = 'WHERE b.is_active = ? ';
        $bind  = array(true);


        // ブックID
        if (isset($values->book_id)) {
            $field .= 'b.name AS book_name, ';
        }

        // ブック名
        if (isset($values->book_name)) {
            $field .= 'b.title AS book_title, ';
        }

        // インデックスグループ
        if (isset($values->index_group)) {
            $field .= 'ig.title AS index_group, ';
            $join .= 'INNER JOIN book_type ig ON ig.id = b.book_type_id ';
        }

        // 言語
        if (isset($values->language)) {
            $field .= 'l.description AS language, ';
            $join .= 'INNER JOIN language l ON l.id = b.language_id ';
        }


        // トランク/校了 指定
        if ($proofread === false && $trunk === true) {
            $where .= 'AND b.proofread = ? ';
            $bind[] = false;

        } elseif ($proofread === true && $trunk === false) {
            $where .= 'AND b.proofread = ? ';
            $bind[] = true;
        }

        // インデックスグループ指定
        if ($ig_id !== 'all') {
            $where .= 'AND b.book_type_id = ? ';
            $bind[] = $ig_id;
        }


        // 検索クエリ付与
        if ($query !== '') {
            $query = str_replace('　', ' ', $query);
            $query = explode(' ', $query);

            foreach ($query as $q) {
                $where .= 'AND (b.name LIKE ? OR b.title LIKE ?) ';
                $bind[] = "%$q%";
                $bind[] = "%$q%";
            }
        }



        try {
            // 文末のコンマとスペースを除去
            $field = substr($field, 0, strlen($field) - 2);

            $sql = $field.' '.$from.$join.$where.'  ORDER BY b.name ASC ';
            $sql .= (!is_null($limit)) ? 'LIMIT '.$limit.' ': '';
            $results = $db->state($sql, $bind)->fetchAll();


            foreach ($results as $key => $result) {
                // モデル名
                if (isset($values->model)) {
                    $sql = 'SELECT model_name.name FROM b_mn
                        INNER JOIN model_name ON b_mn.model_name_id = model_name.id
                        WHERE b_mn.book_id = ?';
                    $models = $db->state($sql, $result->id)->fetchAll();
                    $txt = '';

                    foreach ($models as $model) {
                        $txt .= $model->name.', ';
                    }
                    $result->model = substr($txt, 0, strlen($txt) - 2);
                    $results[$key] = $result;
                }

                // トランク or 校了
                if (isset($values->trunk_proof)) {
                    $result->trunk_proof = ($result->proofread) ? '校了': 'トランク';
                    $results[$key] = $result;
                }
            }
        
        } catch (\Exception $e) {
            var_dump($e->getMessage());
            exit();
            throw $e;
        }

        return $results;
    }



    /**
     * SJISへエンコードする
     *
     * @author suguru
     **/
    private function _encode ($string)
    {
        return mb_convert_encoding($string, 'SJIS', 'UTF-8');
    }
}
