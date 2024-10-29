<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Genre;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GenreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $genres = Genre::paginate(constant('DEFAULT_PAGINATE_VALUE'));

        return Inertia::render('Genre/Genres', [
            'genres' => $genres,
            'links' => [
                'previous' => $genres->previousPageUrl(),
                'next' => $genres->nextPageUrl()
            ]
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $genre = Genre::find($id);

        return Inertia::render('Genre/GenreDetails', [
            'genre' => $genre
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // т.к. сущность простая, валидацию можно провести на месте
        $request->validate(
            ['name' => 'required|unique:genres,name|string|max:65']
        );

        Genre::create(['name' => $request->name]);

        return redirect()->route(
            'genres.index',
            ['page' => $request->page]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Genre $genre)
    {
        $request->validate(
            ['name' => 'required|unique:genres,name|string|max:65']
        );

        $genre->update($request->toArray());

        return redirect()->route(
            'genres.show',
            [
                'id' => $genre->id,
                'page' => $request->page
            ]
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Genre $genre)
    {
        // каскадное удаление жанра вместе со связью с книгами
        $genre->delete();

        return redirect()->route(
            'genres.index',
            ['page' => $request->page]
        );
    }
}
