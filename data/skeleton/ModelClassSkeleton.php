<?php


namespace Takeout\Model;

use Takeout\Container,
    Takeout\Factory\ModelFactory;

class {:Model}Model extends AbstractModel
{
    public $query;


    public function __construct ()
    {
        $container = new Container(new ModelFactory);
        $this->query = $container->get('{:Model}Query');
    }
}
