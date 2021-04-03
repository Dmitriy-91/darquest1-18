<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Quest\TeamController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => 'auth:sanctum'], function(){

    /*
     * Авторизованный пользователь
     */
    Route::get('auth-user', [AuthController::class, 'user'])
        ->name( 'auth-user');

    Route::group(['prefix' => 'quest'], function(){

        /*
         * Teams
         */
        Route::apiResource('team', TeamController::class);

        Route::get('team/name-is-unique/{name}', [TeamController::class, 'nameIsUnique']);

    });

});
