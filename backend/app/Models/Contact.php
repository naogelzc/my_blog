<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
  protected $table = 'contact';
  public $timestamps = false;

  public function add($data) {
    $name     = $data['username'];
    $email      = $data['email'];
    $detail   = $data['detail'];
    $this->insert([
          'name'    => $name,
          'email'   => $email,
          'detail'  => $detail,
    ]);
  }
}
