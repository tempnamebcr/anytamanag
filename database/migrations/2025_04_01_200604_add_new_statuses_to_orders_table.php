<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->enum('status', ['livrata', 'nepreluata', 'preluata', 'asteptare', 'blocata', 'partial'])
                ->default('nepreluata')
                ->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->enum('status', ['livrata', 'nepreluata', 'preluata'])
                ->default('nepreluata')
                ->change();
        });
    }
};
