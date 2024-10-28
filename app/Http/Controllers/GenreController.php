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
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // т.к. сущность простая, валидацию можно провести на месте
        $request->validate(['name' => 'required|unique:genres,name|string|max:65']);

        Genre::create(['name' => $request->name]);

        return redirect()->route('genres.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
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
        $genre = Genre::find($id);
        // сначала удаляем связанную строку и потом саму сущность
        $genre->genreBookRelatedRow()->delete();
        $genre->delete();

        return redirect()->route('genres.index');
    }
}
