<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
  protected $table = 'comment';
  public $timestamps = false;

  public function index($query, $pageSize, $blog_id) {
    if (empty($query) && empty($blog_id)) {
      $paginate = $this->paginate($pageSize);
    }else{
        $queryBuilder = $paginate = $this->orderBy('createdate', 'desc');
        if (!empty($blog_id)){
            $queryBuilder->where('blog_container_id', $blog_id);
        }
        if (!empty($query)){
            $queryBuilder->where('comment', 'LIKE', "%".$query."%");
        }
        $paginate = $queryBuilder->paginate($pageSize);
    }
    /** @var LengthAwarePaginator  $paginate */
    $paginate = $paginate;
    return $paginate;
  }

  public function store($data) {
    $blog_id     = $data['blog_container_id'];
    $osName      = $data['osName'];
    $osVersion   = $data['osVersion'];
    $topic_title = $data['topic_title'];
    $comment     = str_replace("'", '"', $data['comment']);
    $username    = $data['username'] ?? "anonymous";

    $this->insert([
      'blog_container_id' => $blog_id,
      'username'          => $username,
      'comment'           => $comment,
      'createdate'        => date("Y-m-d H:i:s"),
      'osName'            => $osName,
      'osVersion'         => $osVersion,
      'topic_title'       => $topic_title,
    ]);
  }
}
