<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Book extends Model
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'publication_type',
        'day_of_publication',
    ];

    /**
     * Get the attributes that should be cast.
     */
    protected function casts(): array
    {
        return [
            'day_of_publication' => 'date'
        ];
    }

    public function genres()
    {
        return $this->belongsToMany(
            Genre::class,
            'book_genre',
            'book_id',
            'genre_id'
        );
    }

    public function author()
    {
        return $this->belongsTo(Author::class, 'author_id');
    }

    /**
     * Получение связанной записи из таблицы отношения книг и жанров
     * по айди книги
     */
    public function bookGenreRelatedRow()
    {
        return DB::table('book_genre')->where('book_id', $this->id);
    }
}
