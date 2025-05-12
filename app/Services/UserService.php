<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\IUserRepository;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\Permission\Models\Role;

class UserService
{
    private IUserRepository $userRepository;

    public function __construct(
        IUserRepository $userRepository,
    ) {
        $this->userRepository = $userRepository;
    }
    public function create(array $attributes): User
    {
        return $this->userRepository->create($attributes);
    }

    public function find(string $id): ?User
    {
        return $this->userRepository->find($id);
    }

    public function logout(User $user): bool
    {
        return $this->userRepository->logout($user);
    }
    public function updateUser(User $user, array $data): User
    {
        if (!empty($data['password'])) {
            $pass = $data['password'];
            unset($data['password']);
            $this->userRepository->updatePassword($user, $pass);
        }
        $this->userRepository->update($data, $user->id);
        $this->updateUserRole($user->id, $data['role']);
        return $user->refresh();
    }

    public function updateUserRole(int $userId, string $newRole): void
    {
        $user = User::findOrFail($userId);
        $role = Role::findByName($newRole);

        if (!$role) return;
        $user->syncRoles([$role]);
    }

    public function deleteUser(int $userId): bool
    {
        return $this->userRepository->delete($userId);
    }
    public function getPaginatedUsers(array $data): ?LengthAwarePaginator
    {
        return $this->userRepository->getPaginatedUsers($data);
    }
}
