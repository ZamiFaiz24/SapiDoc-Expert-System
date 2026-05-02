<?php

namespace Database\Seeders;

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
        // Admin account
        User::factory()->create([
            'name' => 'Admin SapiDoc',
            'email' => 'admin@sapidoc.com',
            'password' => bcrypt('admin123'),
        ]);

        // Test user account
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        // Petani account
        User::factory()->create([
            'name' => 'Petani Budi',
            'email' => 'petani@example.com',
            'password' => bcrypt('password123'),
        ]);
    }
}
