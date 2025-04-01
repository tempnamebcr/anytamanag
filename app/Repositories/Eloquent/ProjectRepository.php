<?php

namespace App\Repositories\Eloquent;

use App\Models\Project;
use App\Repositories\IProjectRepository;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Arr;

class ProjectRepository extends BaseRepository implements IProjectRepository
{
    protected Project $model;

    public function __construct(Project $model)
    {
        parent::__construct($model);
        $this->model = $model;
    }

    public function findByName(string $name): ?Project
    {
        return $this->model->where('name', $name)->first();
    }

    public function delete(int $projectId): bool
    {
        return $this->model->where('id', $projectId)->delete();
    }
    public function getPaginatedProjects(array $data): ?LengthAwarePaginator
    {
        return $this->model->when(Arr::get($data, 'search'), function ($query, $search) {
            return $query->where('name', 'like', "%{$search}%");
        })
            ->when(Arr::has($data, 'orderBy') && !empty($data['orderBy']), function ($query) use ($data) {
                return $query->orderBy($data['orderBy'], $data['orderDirection'] ?? 'desc');
            })
            ->orderBy($data['orderBy'] ?? 'id', $data['orderDirection'] ?? 'desc')
            ->paginate($data['perPage'] ?? 10)
            ->withQueryString();
    }
}
