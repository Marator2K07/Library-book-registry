<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Author\AuthorCreateRequest;
use App\Http\Requests\Author\AuthorUpdateRequest;
use App\Models\Author;
use App\Models\User;
use App\Services\LogService;
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
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $author = Author::with('user')->find($id);

        return Inertia::render('Author/AuthorDetails', [
            'author' => $author
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
     * Update the specified resource in storage.
     */
    public function update(AuthorUpdateRequest $request, Author $author)
    {
        $author->update($request->toArray());
        //
        $author->user()->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        return redirect()->route(
            'authors.show',
            [
                'id' => $author->id,
                'page' => $request->page
            ]
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(
        LogService $log,
        Request $request,
        Author $author
    ) {
        // (+лог для удаленных вместе с автором книг)
        $books = $author->books;
        foreach ($books as $book) {
            $log->info('Удаление книги', ['book' => $book]);
        }
        // каскадно вместе аккаунтом удаляем автора и его книги (и связь жанров)
        $author->user()->delete();

        return redirect()->route(
            'authors.index',
            ['page' => $request->page]
        );
    }
}
