<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            [
                'fname' => 'Jane',
                'lname' => 'Smith',
                'mname' => '',
                'email' => 'jane@example.com',
                'password' => bcrypt('1234'),
                'phone_no' => "078"
            ],
            [
                'fname' => 'Mike',
                'lname' => 'Johnson',
                'mname' => '',
                'email' => 'mike@example.com',
                'password' => bcrypt('1234'),     
               'phone_no' => "078"

            ],
        ]);    }
}
