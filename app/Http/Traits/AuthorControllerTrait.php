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

}
