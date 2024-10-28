<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Author\AuthorCreateRequest;
use App\Models\Author;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AuthorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $authors = Author::withCount('books')
            ->paginate(constant('DEFAULT_PAGINATE_VALUE'));

        return Inertia::render('Author/Authors', [
            'authors' => $authors,
            'links' => [
                'previous' => $authors->previousPageUrl(),
                'next' => $authors->nextPageUrl()
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AuthorCreateRequest $request)
    {
        // аккаунт для автора
        $user = User::create([
            'role' => json_encode(['admin' => false, 'author' => true]),
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        event(new Registered($user));
        // и только потом новый автор с привязкой к аккаунту
        Author::create([
            'user_id' => $user->id,
            'name' => $request->name,
            'day_of_birth' => $request->day_of_birth
        ]);

        return redirect()->route(
            'authors.store',
            ['page' => $request->page]
        );
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
        //
    }
}
