<?php

namespace App\Http\Requests\Author;

use Illuminate\Validation\Rules;
use Illuminate\Foundation\Http\FormRequest;

class AuthorCreateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'string|max:255|min:5|required',
            'email' => 'required|string|email|max:255',
            'password' => ['required', Rules\Password::defaults()],
            'day_of_birth' => 'before:now|after:1970-01-01|date_format:Y-m-d|required'
        ];
    }
}
