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
        Schema::create('svatol_appoinement', function (Blueprint $table) {
            $table->id(); // Auto-incrementing primary key
            $table->string('name', 50);
            $table->string('email', 50);
            $table->string('mobile', 25);
            $table->string('treatment_type', 50); // Corrected spelling for consistency
            $table->string('time', 20);
            $table->string('date', 40);
            $table->timestamps(); // Adds created_at and updated_at columns
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('svatol_appoinement');
    }
};
