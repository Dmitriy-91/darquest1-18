<?php

namespace Tests\Unit\Controllers\Quest\TeamController;

use App\Models\Quest\Team;
use Tests\TestCase;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use App\Http\Controllers\Quest\TeamController;

class NameIsUniqueTest extends TestCase
{
    use DatabaseMigrations;

    protected function setUp(): void
    {
        parent::setUp();
        $this->runDatabaseMigrations();
    }

    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_nameIsUnique()
    {
        $name = 'Команда';

        // Создадим команды
        Team::factory()->create(['name' => 'Команда 1']);
        Team::factory()->create(['name' => 'Команда 2']);
        Team::factory()->create(['name' => 'Команда 3']);

        $result1 = (new TeamController())->nameIsUnique($name);

        Team::factory()->create(['name' => $name]);

        $result2 = (new TeamController())->nameIsUnique($name);

        $this->assertTrue($result1);
        $this->assertNotTrue($result2);
    }
}
