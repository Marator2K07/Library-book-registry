<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\BookUpdateRequest;
use App\Http\Traits\BookControllerTrait;
use App\Models\Author;
use App\Models\Book;
use App\Services\LogService;
use Illuminate\Http\Request;

class BooksController extends Controller
{
    use BookControllerTrait;

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
        try {
            $book = $this->bookExists($id);
        } catch (\Throwable $th) {
            return response()->json([
                'error' => $th->getMessage()
            ], 422);
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

        try {
            // подготовка (предпроверки по совместительству через trait)
            $book = $this->bookExists($id);
            $user = json_decode($request->header('Auth-User'));
            $this->authorsСompliance($user, $book);
            // смотрим какие поля нужно поменять и меняем (+логирование)
            $params = $request->all();
            foreach ($params as $key => $value) {
                $preValue = $book->getOriginal($key);
                $book->update([$key => $value]);
                $log->info(
                    'Обновление полей книги',
                    ['prev_' . $key => $preValue, 'new_' . $key => $book->$key]
                );
            }
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 422);
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
