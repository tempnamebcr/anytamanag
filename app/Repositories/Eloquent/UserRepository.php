<?php

namespace App\Repositories\Eloquent;

use App\Models\User;
use App\Repositories\IUserRepository;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Arr;

class UserRepository extends BaseRepository implements IUserRepository
{
    protected User $model;

    public function __construct(User $model)
    {
        parent::__construct($model);
        $this->model = $model;
    }

    /**
     * Update a user's password
     *
     * @param User $user
     * @param string $password
     * @return void
     */
    public function updatePassword(User $user, string $password)
    {
        $user->forceFill([
            'password' => $password,
        ]);
        $user->save();
    }

    /**
     * Logout a user
     *
     * @param User $user
     * @return boolean
     */
    public function logout(User $user): bool
    {
        return $user->currentAccessToken()->delete();
    }

    /**
     * Retrieve a user by email
     *
     * @param string $email
     * @return User|null
     */
    public function findByName(string $name): ?User
    {
        return $this->model->where('name', $name)->first();
    }

    /**
     * Delete a user
     *
     * @param int $userId
     * @return boolean
     */
    public function delete(int $userId): bool
    {
        return $this->model->where('id', $userId)->delete();
    }
    public function getPaginatedUsers(array $data): ?LengthAwarePaginator
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
