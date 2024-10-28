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

        return Inertia::render('Genres',[
            'genres' => $genres,
            'links' => [
                'previous' => $genres->previousPageUrl(),
                'next' => $genres->nextPageUrl()
            ]
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

        return redirect()->route('genres.index');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Genre $genre)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Genre $genre)
    {
        // сначала удаляем связанную строку и потом саму сущность
        $genre->genreBookRelatedRow()->delete();
        $genre->delete();

        return redirect()->route('genres.index');
    }
}
