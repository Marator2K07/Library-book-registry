<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\BookUpdateRequest;
use App\Http\Traits\BookControllerTrait;
use App\Models\Book;
use App\Services\LogService;

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
     * Вывод книг с именем автора
     */
    public function indexWithAuthorName()
    {
        $books = Book::with('author:id,name')
            ->paginate(constant('DEFAULT_PAGINATE_VALUE'));

        return response()->json($books);
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
                    'Обновление книги',
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
    public function destroy(
        LogService $log,
        BookUpdateRequest $request,
        string $id
    ) {
        try {
            // подготовка (предпроверки по совместительству через trait)
            $book = $this->bookExists($id);
            $user = json_decode($request->header('Auth-User'));
            $this->authorsСompliance($user, $book);
            // удаление (+лог)
            $book->bookGenreRelatedRow()->delete();
            $book->delete();
            $log->info('Удаление книги', ['book' => $book]);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 422);
        }

        return response()->json([
            'message' => 'Book succesfully deleted'
        ]);
    }
}
