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
        Schema::create('real_states', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->string("rooms");
            $table->string("bathrooms");
            $table->string("price");
            $table->string("area");
            $table->string("rent_or_sale");
            $table->string("phone_number");
            $table->string("whatsapp_number");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('real_states');
    }
};
