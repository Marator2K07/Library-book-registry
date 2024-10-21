<?php

namespace Database\Factories;

use App\PublicationType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Book>
 */
class BookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(5, false),
            'publication_type' => fake()->numberBetween(
                PublicationType::GRAPHIC,
                PublicationType::PRINTED
            ),
            'day_of_publication' => fake()
                ->dateTimeBetween('-30 years', '-5 years')
                ->format('Y-m-d H:i:s')
        ];
    }
}
