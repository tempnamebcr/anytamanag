<?php

namespace App\Services;

use App\Models\Order;
use App\Repositories\IOrderRepository;
use Illuminate\Pagination\LengthAwarePaginator;

class OrderService
{
    private IOrderRepository $orderRepository;

    public function __construct(
        IOrderRepository $orderRepository,
    ) {
        $this->orderRepository = $orderRepository;
    }
    public function create(array $attributes): Order
    {
        return $this->orderRepository->create($attributes);
    }

    public function find(string $id): ?Order
    {
        return $this->orderRepository->find($id);
    }

    public function updateOrder(Order $order, array $data): Order
    {
        $this->orderRepository->update($data, $order->id);
        return $order->refresh();
    }
    public function changeStatus(Order $order, array $data): Order
    {
        $this->orderRepository->update($data, $order->id);
        return $order->refresh();
    }

    public function deleteOrder(int $orderId): bool
    {
        return $this->orderRepository->delete($orderId);
    }
    public function getPaginatedOrders(array $data): ?LengthAwarePaginator
    {
        return $this->orderRepository->getPaginatedOrders($data);
    }
}
