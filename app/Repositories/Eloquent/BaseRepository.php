<?php

namespace App\Repositories\Eloquent;

use App\Repositories\IEloquent;
use Illuminate\Database\Eloquent\Model;

class BaseRepository implements IEloquent
{
    public function __construct(
        private Model $model,
    ) {
    }

    /**
     * Find a model
     *
     * @param [type] $id
     * @return Model|null
     */
    public function find($id): ?Model
    {
        return $this->model->find($id);
    }

    /**
     * Create a model
     *
     * @param array $attributes
     * @return Model
     */
    public function create(array $attributes): Model
    {
        return $this->model->create($attributes);
    }

    /**
     * Update a model's attributes
     *
     * @param array $attributes
     * @param Model|string|int|array $id
     * @return boolean
     */
    public function update(array $attributes, Model|string|int|array $id): bool
    {
        if (gettype($id) !== 'array') {
            $id = [$id instanceof Model ? $id->id : $id];
        }

        $orders = $this->model->whereIn('id', $id);

        foreach ($orders->get() as $order) {
            $order->update($attributes);
        }
        return $orders->exists();
    }

    /**
     * Attach a model to a relation
     *
     * @param Model $base
     * @param string $relation
     * @param Model|integer|string $toAttach
     * @param array|null $attributes
     * @return void
     */
    public function attach(Model $base, string $relation, Model|int|string $toAttach, array $attributes = null): void
    {
        $base->{$relation}()->attach($toAttach, $attributes);
    }

    /**
     * Update or create a model
     *
     * @param array $search
     * @param array $update
     * @return Model
     */
    public function updateOrCreate(array $search, array $update): Model
    {
        return $this->model->updateOrCreate($search, $update);
    }
}
