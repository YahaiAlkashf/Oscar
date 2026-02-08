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
            $table->string('name_en');
            $table->string('view_en');
            $table->string('finishing_type_en');
            $table->string('description_en');
            $table->string('broker_name_en');
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
