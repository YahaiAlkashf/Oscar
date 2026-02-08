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
        Schema::table('projects', function (Blueprint $table) {

            $table->foreignId('location_id')->nullable()->constrained('locations');
            $table->foreignId('category_id')->nullable()->constrained('categories');
            $table->enum('Residential_Coastal',['residential','coastal'])->default('residential');
            $table->enum('Payment',['cash','installments','cash_and_installments'])->default('cash');
            $table->date('delivery_date')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            //
        });
    }
};
