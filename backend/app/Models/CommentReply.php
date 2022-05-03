<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CommentReply extends Model
{

    protected $table = 'comment_replay';
    public $timestamps = false;

    public function reply($blog_container_id) {
      return $this->select()->where('blog_container_id', $blog_container_id)->orderBy('id', 'ASC')->get();
    }

    public function add($data) {
      $blog_id     = $data['blog_container_id'];
      $osName      = $data['osName'];
      $osVersion   = $data['osVersion'];
      $topic_title = $data['topic_title'];
      $comment     = str_replace("'", '"', $data['comment']);
      $username    = $data['username'] ?? "anonymous";
      $comment_id  = $data['comment_id'];

    $this->insert([
          'blog_container_id' => $blog_id,
          'comment_id'        => $comment_id,
          'username'          => $username,
          'comment'           => $comment,
          'createdate'        => date("Y-m-d H:i:s"),
          'osName'            => $osName,
          'osVersion'         => $osVersion,
          'topic_title'       => $topic_title,
      ]);
    }
}
