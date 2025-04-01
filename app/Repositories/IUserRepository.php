<?php

namespace App\Repositories;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Pagination\LengthAwarePaginator;

interface IUserRepository extends IEloquent
{

    public function updatePassword(User $user, string $password);

    public function logout(User $user): bool;
    public function findByName(string $name): ?User;

    public function delete(int $userId): bool;
    public function getPaginatedUsers(array $data): ?LengthAwarePaginator;
}
