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
        Schema::create('prabhuram_enquiry', function (Blueprint $table) {
            $table->id(); // Primary key (auto increment)
            $table->string('name', 255); // Name column
            $table->string('email', 255); // Email column
            $table->string('mobileNumber', 255); // Mobile number column
            $table->string('gender', 255); // Gender column
            $table->string('years', 255); // Years column
            $table->timestamps(); // Created at and updated at timestamps
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prabhuram_enquiry');
    }
};
