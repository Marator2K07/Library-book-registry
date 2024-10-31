<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Http\Controllers\Controller;
use App\Http\Requests\Book\BookCreateRequest;
use App\Http\Requests\Book\BookUpdateRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $books = Book::with('author', 'genres')
            ->paginate(constant('DEFAULT_PAGINATE_VALUE'));

        return Inertia::render('Book/Books', [
            'books' => $books,
            'links' => [
                'previous' => $books->previousPageUrl(),
                'next' => $books->nextPageUrl()
            ]
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function search(Request $request)
    {
        $title = $request->title;
        $sort = $request->sort;
        $authorId = $request->author_id;
        $genresIds = $request->genres_ids;
        // предобработка по названию книги
        $books = Book::where('title', 'like', '%' . $title . '%')
            ->with('author', 'genres');
        // в случае наличия фильтрации по автору
        if (!empty($authorId)) {
            $books = $books->where('author_id', $authorId);
        }
        // в случае выбора жанров для фильтрации
        if (!empty($genresIds)) {
            //return response()->json();
            $books = $books->whereHas('genres', function ($query) use ($genresIds) {
                $query->whereIn('genres.id', $genresIds);
            });
        }
        // заключительная обработка списка книг
        $books = $books
            ->orderBy('title', $sort)
            ->paginate(constant('DEFAULT_PAGINATE_VALUE'));
        // корректная обработка пагинации с учетом входящих параметров
        $queryParams = http_build_query($request->all([
            'title',
            'sort',
            'author_id',
            'genres_ids'
        ]));
        $prevPageLink = $books->previousPageUrl()
            ? $books->previousPageUrl() . '&' . $queryParams
            : null;
        $nextPageLink = $books->nextPageUrl()
            ? $books->nextPageUrl() . '&' . $queryParams
            : null;

        return Inertia::render('Book/Books', [
            'books' => $books,
            'links' => [
                'previous' => $prevPageLink,
                'next' => $nextPageLink
            ]
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $book = Book::with('author', 'genres')->find($id);

        return Inertia::render('Book/BookDetails', [
            'book' => $book
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(BookCreateRequest $request)
    {
        $book = Book::create([
            'title' => $request->title,
            'publication_type' => $request->publication_type,
            'day_of_publication' => Carbon::createFromFormat(
                'd.m.Y',
                $request->day_of_publication
            )->format('Y-m-d'),
            'author_id' => $request->author_id
        ]);
        // задаем связи между жанрами и книгой
        $book->genres()->sync($request->genres_ids);

        return redirect()->route(
            'books.store',
            ['page' => $request->page]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(BookUpdateRequest $request, Book $book)
    {
        $book->update([
            'title' => $request->title,
            'publication_type' => $request->publication_type,
            'day_of_publication' => Carbon::createFromFormat(
                'd.m.Y',
                $request->day_of_publication
            )->format('Y-m-d'),
            'author_id' => $request->author_id
        ]);
        // обновляем связи между жанрами и книгой
        $book->genres()->sync($request->genres_ids);

        return redirect()->route(
            'books.show',
            [
                'id' => $book->id,
                'page' => $request->page // кидаем, но пока не используем
            ]
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book)
    {
        //
    }
}
