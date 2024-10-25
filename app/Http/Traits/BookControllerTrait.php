<?php

namespace App\Http\Traits;

use App\Models\Book;

trait BookControllerTrait
{
    protected function bookExists($id): Book
    {
        $book = Book::find($id);
        if (!$book) {
            throw new \Exception("Book not found");
        }

        return $book;
    }

    /**
     * проверка на соотвествие автора и книги
     */
    protected function authorsСompliance($user, $book)
    {
        $bookAuthor = $book->author;
        if ($user->id !== $bookAuthor->user->id) {
            throw new \Exception('You do not have access to this book.');
        }
    }
}
