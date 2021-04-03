<?php

namespace Database\Factories\Quest;

use App\Models\Quest\Team;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class TeamFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Team::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        // Время создания
        $created = now();

        // Определим основателя команды
        $users = User::all();

        // Если Пользователей нет в БД, то создадим нового
        if($users->isNotEmpty())
        {
            $user = $this->faker->randomElement($users);
        } else {
            $user = User::factory()->create();
        }

        return [
            'name'          => $this->faker->userName(),
            'founder'       => $user->id,
            'created_at'    => $created,
        ];
    }
}
