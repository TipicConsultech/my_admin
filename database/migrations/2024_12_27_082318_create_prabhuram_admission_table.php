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
        Schema::create('prabhuram_admission', function (Blueprint $table) {
            $table->id(); // BIGINT Primary Key, auto-incremented
            $table->string('studentName', 255);
            $table->string('email', 255);
            $table->string('mobileNumber', 255);
            $table->string('gender', 255);
            $table->string('bloodGroup', 255);
            $table->string('transportOption', 255)->nullable(); // Allows NULL
            $table->string('standard', 255);
            $table->string('address', 255);
            $table->tinyInteger('terms')->default(0); // Assuming 0 = not accepted, 1 = accepted
            $table->string('parentName', 255);
            $table->string('parentOccupation', 255);
            $table->string('healthInstructions', 255);
            $table->string('studentImage', 255);
            $table->string('birthCertificate', 255);
            $table->string('Aadharcard', 255);
            $table->timestamps(); // Adds created_at and updated_at columns
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prabhuram_admission');
    }
};
