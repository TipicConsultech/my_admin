<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id(); // Auto-increment ID
            $table->string('company_id'); // Foreign key for company ID
            $table->string('sidebar_items'); // Name of the sidebar item (e.g., "contactUs")
            $table->boolean('yes_or_no')->default(true); // Visibility flag (true/false)
            $table->timestamps(); // Created at and updated at fields

            // Add a foreign key constraint if there’s a companies table
            $table
                ->foreign('company_id')
                ->references('company_id')
                ->on('company_info')
                ->onDelete('cascade'); // Cascade delete if a company is removed
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('settings');
    }
}
