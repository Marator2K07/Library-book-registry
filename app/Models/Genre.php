<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Genre extends Model
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory;

    /**
     * Скрывает данные от показа
     */
    protected $hidden = [
        'pivot',
        'created_at',
        'updated_at'
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name'
    ];

    public function books()
    {
        return $this->belongsToMany(
            Book::class,
            'book_genre',
            'genre_id',
            'book_id'
        );
    }

    public function genreBookRelatedRow()
    {
        return DB::table('book_genre')->where('genre_id', $this->id);
    }
}
