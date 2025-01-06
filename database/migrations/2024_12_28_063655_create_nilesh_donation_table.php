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
        Schema::create('nilesh_donation', function (Blueprint $table) {
            $table->id(); // id, BIGINT UNSIGNED, Auto Increment, Primary Key
            $table->string('name', 256); // VARCHAR(256), Not Null
            $table->decimal('amount', 15, 2); // DECIMAL(15, 2), Nullable
            $table->string('mobile', 15); // VARCHAR(15), Not Null
            $table->string('address', 250)->nullable(); // VARCHAR(250), Nullable
            $table->string('fileName', 20000)->nullable(); // VARCHAR(20000), Nullable
            $table->string('upi_transactionId_Id', 255)->nullable(); // VARCHAR, Nullable
            $table->timestamps(); // Created at and Updated at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nilesh_donation');
    }
};
