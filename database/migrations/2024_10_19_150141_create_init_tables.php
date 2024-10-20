<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('authors', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('second_name');
            $table->string('surname');
            $table->timestamp('day_of_birth');
        });

        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('author_id')->unsigned();
            $table->string('title');
            $table->integer('publication_type');
            $table->timestamp('day_of_publication');

            $table->foreign('author_id')->references('id')->on('authors');
        });

        Schema::create('genres', function (Blueprint $table) {
            $table->id();
            $table->string('name');
        });

        Schema::create('book_genre', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('book_id')->unsigned();
            $table->bigInteger('genre_id')->unsigned();

            $table->foreign('book_id')->references('id')->on('genres');
            $table->foreign('genre_id')->references('id')->on('books');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('authors');
        Schema::dropIfExists('books');
        Schema::dropIfExists('genres');
        Schema::dropIfExists('book_genre');
    }
};
