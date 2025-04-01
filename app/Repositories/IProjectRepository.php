<?php

namespace App\Repositories;

use App\Models\Project;
use Illuminate\Pagination\LengthAwarePaginator;

interface IProjectRepository extends IEloquent
{
    public function findByName(string $name): ?Project;
    public function delete(int $projectId): bool;
    public function getPaginatedProjects(array $data): ?LengthAwarePaginator;
}
