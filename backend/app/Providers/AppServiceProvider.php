<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\Common\Pagination;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
        app()->singleton('Illuminate\Pagination\LengthAwarePaginator', function ($app, $options) {
          return (new Pagination($options['items'], $options['total'], $options['perPage'], $options['currentPage'], $options['options']));
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
