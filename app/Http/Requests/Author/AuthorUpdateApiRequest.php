<?php

namespace App\Http\Requests\Author;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;

class AuthorUpdateApiRequest extends FormRequest
{
    public $validator = null;

    /**
     * В случае ошибки валидации, мы сможем получить доступ к ошибкам вручную
     */
    protected function failedValidation(Validator $validator)
    {
        $this->validator = $validator;
    }

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'string|max:255|min:2',
            'day_of_birth' => 'before:now|date_format:Y-m-d'
        ];
    }
}
