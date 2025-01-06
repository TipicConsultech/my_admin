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
        Schema::create('ragas_order', function (Blueprint $table) {
            $table->id(); // BIGINT UNSIGNED NOT NULL AUTO_INCREMENT
            $table->string('name', 255);
            $table->string('email', 255)->nullable();
            $table->string('contact_number', 255);
            $table->string('delivery_address', 255);
            $table->integer('product_price');
            $table->string('product_name', 255);
            $table->tinyInteger('weight_type')->nullable(); // Nullable tinyint
            $table->integer('number_qty')->nullable(); // Nullable integer
            $table->mediumText('payment_image')->nullable(); // Payment image in medium text
            $table->string('upi_transaction_id', 255)->nullable();
            $table->text('message')->nullable(); // Nullable text for additional message
            $table->tinyInteger('updated_by')->nullable();
            $table->tinyInteger('status')->unsigned()->default(0);
            $table->timestamps(); // Includes `created_at` and `updated_at`
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ragas_order');
    }
};
