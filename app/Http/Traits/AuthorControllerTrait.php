<?php

namespace App\Http\Traits;

use App\Models\Author;

trait AuthorControllerTrait
{
    protected function authorExists($id): Author
    {
        $author = Author::find($id);
        if (!$author) {
            throw new \Exception("Author not found");
        }

        return $author;
    }

    /**
     * проверка на соотвествие автора и авторизованного пользователя
     */
    protected function userСompliance($author, $user)
    {
        $authorUser = $author->user;
        if ($user->id !== $authorUser->id) {
            throw new \Exception('You do not have access to this author data.');
        }
    }
}
