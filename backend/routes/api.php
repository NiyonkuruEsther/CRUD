<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentTeacher;
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

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
// Route::get('/studentTeachers/teacher', 'StudentTeacher@index');
Route::get('/studentTeachers/{role}', [StudentTeacher::class, 'index']);
Route::post('/students', [StudentTeacher::class, 'store']);
Route::delete('/studentTeachers/delete/{id}', [StudentTeacher::class, 'destroy']);
Route::put('/studentTeachers/update/{id}', [StudentTeacher::class, 'update']);


