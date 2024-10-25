<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Traits\AuthorControllerTrait;
use App\Models\Author;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    use AuthorControllerTrait;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Получение списка авторов с количеством книг
     */
    public function indexWithBooksCount()
    {
        $authors = Author::withCount('books')
            ->paginate(constant('DEFAULT_PAGINATE_VALUE'));

        return response()->json($authors);
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
     * Показ автора со списком его книг
     */
    public function showWithBooks(string $id)
    {
        try {
            $author = $this
                ->authorExists($id)
                ->with('books')
                ->findOrFail($id);
        } catch (\Throwable $th) {
            return response()->json([
                'error' => $th->getMessage()
            ], 422);
        }

        return response()->json($author);
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
