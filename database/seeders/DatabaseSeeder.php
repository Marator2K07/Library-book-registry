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
        // сначала добавляем админа и других пользователей
        User::factory()->create([
            'role' => json_encode(['admin' => true, 'author' => true]),
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => 'testAdminPass12345'
        ]);
        User::factory(55)->create([
            'password' => 'testPass12345'
        ]);
        // связываем юзеров с авторами
        $users = User::all();
        foreach ($users as $user) {
            if ($user->isAdmin()) {
                continue;
            }
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
        // ставим жанры еще раз уже полностью случайно
        for ($i = 0; $i < 1111; $i++) {
            $book = $books->random();
            $genre = $genres->random();
            // Проверяем, есть ли уже этот жанр у книги
            if (!$book->genres->contains($genre->id)) {
                $book->genres()->attach($genre->id); // Добавляем жанр, если его нет
            }
        }
    }
}
