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
            $table->string('view_en')->nullable()->change();
            $table->string('finishing_type_en')->nullable()->change();
            $table->string('description_en')->nullable()->change();
            $table->string('broker_name_en')->nullable()->change();
            $table->string('view')->nullable()->change();
            $table->string('finishing_type')->nullable()->change();
            $table->string('description')->nullable()->change();
            $table->string('broker_name')->nullable()->change();
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
