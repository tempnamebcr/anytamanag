<?php

namespace App\Repositories\Eloquent;

use App\Models\Order;
use App\Repositories\IOrderRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Arr;

class OrderRepository extends BaseRepository implements IOrderRepository
{
    protected Order $model;

    public function __construct(Order $model)
    {
        parent::__construct($model);
        $this->model = $model;
    }

    public function findByProject(int $projectId): ?Collection
    {
        return $this->model->where('project_id', $projectId)->get();
    }

    public function delete(int $orderId): bool
    {
        return $this->model->where('id', $orderId)->delete();
    }

    public function getPaginatedOrders(array $data): ?LengthAwarePaginator
    {
        return $this->model->when(Arr::get($data, 'search'), function ($query, $search) {
            return $query->where(function ($q) use ($search) {
                $q->where('description', 'like', "%{$search}%")
                    ->orWhere('title', 'like', "%{$search}%");
            });
        })
            ->when(Arr::has($data, 'orderBy') && !empty($data['orderBy']), function ($query) use ($data) {
                return $query->orderBy($data['orderBy'], $data['orderDirection'] ?? 'desc');
            })
            ->when(Arr::has($data, 'projectId') && !empty($data['projectId']), function ($query) use ($data) {
                return $query->where('project_id', $data['projectId']);
            })
            ->when(Arr::has($data, 'status') && !empty($data['status']), function ($query) use ($data) {
                return $query->whereIn('status', (array) $data['status']);
            })
            ->orderBy($data['orderBy'] ?? 'id', $data['orderDirection'] ?? 'desc')
            ->paginate($data['perPage'] ?? 10)
            ->withQueryString();
    }
}
