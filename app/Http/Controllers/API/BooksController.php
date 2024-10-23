<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Author;
use App\Models\Book;
use Illuminate\Http\Request;

class BooksController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Вывод данных с полем связанной сущности,
     * в нашем случае: это какая-либо часть автора
     */
    public function indexWith(Request $request)
    {
        // обрабатываем параметр доп. вывода данных об авторе
        $param = $request->input('author_field', 'id');
        $newPropName = 'author_'.$param;

        $books = Book::paginate(10);
        // добавляем к каждой книге выбранное поле
        foreach ($books as $book) {
            $author = Author::find($book->author_id);
            $book->$newPropName = $author->$param;
        }

        return response()->json($books);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
