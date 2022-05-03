<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BlogContainer;
class BlogContainerController extends BaseController
{

  public function __construct(BlogContainer $model)
  {
    $this->model = $model;
  }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      $tag      = request()->query('tag', '');
      $query    = request()->query('query', '');
      $pageNum = request()->query('pageNum', 10);
      $pageSize = request()->query('pageSize', 1);

      $list = $this->model->index($tag, $query, $pageSize, $pageNum);

      return response()->success($list->toArray());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
