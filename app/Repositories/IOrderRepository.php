<?php

namespace App\Repositories;

use Illuminate\Pagination\LengthAwarePaginator;

interface IOrderRepository extends IEloquent
{

    public function delete(int $orderId): bool;

    public function getPaginatedOrders(array $data): ?LengthAwarePaginator;
}
