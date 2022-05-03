<?php

namespace App\Services\Common;
use \Illuminate\Pagination\LengthAwarePaginator;
/**
 * Class LengthAwarePaginatorService
 * @package App\Services\Common
 */
class Pagination extends LengthAwarePaginator
{
    public function toArray()
    {
        return [
          'total' => $this->total(),
          'list'  => $this->items->toArray(),
        ];
    }
}