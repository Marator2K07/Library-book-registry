<?php

namespace Database\Seeders;

use App\Models\Author;
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
        User::factory(10)->create();
        // связываем юзеров с авторами
        $users = User::all();
        foreach ($users as $user) {
            Author::factory()->create([
                'name' => $user->name,
                'user_id' => $user->id
            ]);
        }
    }
}
