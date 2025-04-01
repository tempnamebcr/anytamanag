<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;

interface IEloquent
{
    /**
     * Find a model
     *
     * @param [type] $id
     * @return Model|null
     */
    public function find($id): ?Model;

    /**
     * Create a model and save it to DB
     *
     * @param array $attributes
     * @return Model
     */
    public function create(array $attributes): Model;

    /**
     * Update a model
     *
     * @param array $attributes
     * @param Model|string $id
     * @return boolean
     */
    public function update(array $attributes, Model|string $id): bool;

    /**
     * Attach a model to a relation
     *
     * @param Model $base
     * @param string $relation
     * @param Model|integer|string $toAttach
     * @param array|null $attributes
     * @return void
     */
    public function attach(Model $base, string $relation, Model|int|string $toAttach, array $attributes = null): void;

    /**
     * Update or create a model
     *
     * @param array $search
     * @param array $update
     * @return Model
     */
    public function updateOrCreate(array $search, array $update): Model;
}
