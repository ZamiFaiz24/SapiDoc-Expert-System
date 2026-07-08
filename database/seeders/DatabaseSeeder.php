<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\PenyakitSeeder;
use Database\Seeders\GejalaSeeder;
use Database\Seeders\AturanSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed penyakit data
        $this->call(PenyakitSeeder::class);

        // Seed gejala data
        $this->call(GejalaSeeder::class);

        // Seed aturan/knowledge base data
        $this->call(AturanSeeder::class);

        // Admin account
        User::factory()->create([
            'name' => 'Admin SapiDoc',
            'email' => 'admin@sapidoc.com',
            'password' => bcrypt('admin123'),
        ]);

    }
}
