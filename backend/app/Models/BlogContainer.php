<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @method static insertGetId(array $data)
 */
class BlogContainer extends Model
{
    protected $table = 'blog_container';

    const UPDATED_AT = 'lastdate';

    public function index($tag, $query, $pageSize, $pageNum) {
      // 先把顶置(istop)分组.并倒序排序,然后再根据帖子创建时间倒序排序
      $paginate = $this->where('title', 'LIKE', "%".$query."%");
      if (!empty($tag)) {
          $tag = explode(',', $tag);
          $paginate = $paginate->whereIn('tag', $tag);
      }
      $paginate = $paginate->orderBy('istop', 'DESC')->orderBy('createdate', 'DESC')->paginate($pageSize,'*', 'page', $pageNum);

      /** @var LengthAwarePaginator  $paginate */
      $paginate = $paginate;
      return $paginate;
    }

    public function getTag() {
      return $this->select('tag')->distinct()->orderBy('tag')->get();
    }

    public function updateView($id) {
      return $this->where('id', $id)->increment('views');
    }
}
