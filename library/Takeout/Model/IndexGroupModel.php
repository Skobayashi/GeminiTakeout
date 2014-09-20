<?php


namespace Takeout\Model;

use Takeout\Container,
    Takeout\Factory\ModelFactory;

class IndexGroupModel extends AbstractModel
{
    public $query;


    public function __construct ()
    {
        $container = new Container(new ModelFactory);
        $this->query = $container->get('IndexGroupQuery');
    }
}
