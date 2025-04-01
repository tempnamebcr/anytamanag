<?php

namespace App\Services;

use App\Models\Project;
use App\Repositories\IProjectRepository;
use Illuminate\Pagination\LengthAwarePaginator;

class ProjectService
{
    private IProjectRepository $projectRepository;

    public function __construct(
        IProjectRepository $projectRepository,
    ) {
        $this->projectRepository = $projectRepository;
    }
    public function create(array $attributes): Project
    {
        return $this->projectRepository->create($attributes);
    }

    public function find(string $id): ?Project
    {
        return $this->projectRepository->find($id);
    }

    public function updateProject(Project $project, array $data): Project
    {
        $this->projectRepository->update($data, $project->id);
        return $project->refresh();
    }

    public function deleteProject(int $projectId): bool
    {
        return $this->projectRepository->delete($projectId);
    }
    public function getPaginatedProjects(array $data): ?LengthAwarePaginator
    {
        return $this->projectRepository->getPaginatedProjects($data);
    }
}
