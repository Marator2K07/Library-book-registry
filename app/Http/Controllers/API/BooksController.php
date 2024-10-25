<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\BookUpdateRequest;
use App\Models\Author;
use App\Models\Book;
use App\Services\LogService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
     * Выдача книги по указанному айди
     */
    public function show(string $id)
    {
        $book = Book::find($id);
        if (!$book) {
            return response()->json(['error' => 'Book not found']);
        }

        return response()->json($book);
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
     * Update the specified resource in storage.
     */
    public function update(
        LogService $log,
        BookUpdateRequest $request,
        string $id
    ) {
        // прежде всего проверка на валидность
        if ($request->validator->fails()) {
            return response()->json([
                'errors' => $request->validator->getMessageBag()
            ], 422);
        }
        // возможен ли доступ к книге
        $book = Book::find($id);
        if (!$book) {
            return response()->json(['error' => 'Book not found']);
        }
        // проверка на принадлежность книги автору
        $user = json_decode($request->header('Auth-User'));
        $bookAuthor = $book->author;
        if ($user->id !== $bookAuthor->user->id) {
            return response()->json([
                'error' => 'You do not have access to this book.'
            ], 422);
        }
        // смотрим какие поля нужно поменять и меняем (+логирование)
        $params = $request->all();
        foreach ($params as $key => $value) {
            $preValue = $book->getOriginal($key);
            $book->update([$key => $value]);
            $log->info(
                'Обновление полей книги',
                ['prev_'.$key => $preValue, 'new_'.$key => $book->$key]
            );
        }

        return response()->json([
            'message' => 'Book succesfully updated'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
