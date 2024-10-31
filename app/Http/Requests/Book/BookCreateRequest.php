<?php

namespace App\Http\Requests\Book;

use Illuminate\Foundation\Http\FormRequest;

class BookCreateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255|unique:books,title',
            'publication_type' => 'required|string|max:255',
            'day_of_publication' => 'required|after:01.01.1970|date_format:d.m.Y',
            'author_id' => 'required|exists:authors,id',
            'genres_ids' => 'required',
            'genres_ids.*' => 'required|exists:genres,id',
        ];
    }
}
