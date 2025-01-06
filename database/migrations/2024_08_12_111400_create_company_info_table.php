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
        Schema::create('company_info', function (Blueprint $table) {
            $table->string('company_id')->primary(); 
            $table->string('company_name')->unique()->nullable();
            $table->string('block_status')->nullable();
            $table->string('contact')->nullable(); 
            $table->string('logo')->nullable();
            $table->string('sign')->nullable();
            $table->string('registration_no')->nullable();
            $table->string('GST_no')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('company_info');
    }
};
