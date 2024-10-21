<?php

namespace Database\Seeders;

use App\Models\Author;
use App\Models\Book;
use App\Models\Genre;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // сначала добавляем админа и десять других пользователей
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => 'rootDB12345'
        ]);
        User::factory(55)->create();
        // связываем юзеров с авторами
        $users = User::all();
        foreach ($users as $user) {
            Author::factory()->create([
                'name' => $user->name,
                'user_id' => $user->id
            ]);
        }
        // добавляем книги для авторов
        for ($i = 0; $i < 555; $i++) {
            Book::factory()->create([
                'author_id' => fake()->numberBetween(1, 55)
            ]);
        }
        // пусть будет 33 жанра
        Genre::factory(33)->create();
        // ставим жанры книгам или книгам жанры
        $genres = Genre::all();
        $books = Book::all();
        foreach ($books as $book) {
            $book->genres()->attach($genres->random()->id);
        }
    }
}
