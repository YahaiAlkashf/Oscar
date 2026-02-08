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
        Schema::table('real_states', function (Blueprint $table) {
            $table->string('view')->nullable();
            $table->string('finishing_type')->nullable();
            $table->string('unit_code')->nullable();
            $table->string('email')->nullable();
            $table->string('description')->nullable();
            $table->string('broker_name')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('real_states', function (Blueprint $table) {
            //
        });
    }
};
