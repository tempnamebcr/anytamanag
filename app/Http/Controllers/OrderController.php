<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Order\ChangeStatusRequest;
use App\Http\Requests\Order\StoreRequest;
use App\Http\Requests\Order\UpdateRequest;
use App\Models\Order;
use App\Models\Project;
use App\Services\OrderService;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class OrderController extends Controller
{
    private OrderService $orderService;

    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }
    public function index()
    {
        if (!auth()->user()->can('vizualizare-comenzi')) abort(403);
        $data = request()->all();
        $orders = $this->orderService->getPaginatedOrders($data);
        return Inertia::render('Orders/Index', ['orders' => $orders, 'projects' => Project::all()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        if (!auth()->user()->can('adaugare-comenzi')) abort(403);
        return Inertia::render('Orders/Create', ['projects' => Project::all()]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        if (!auth()->user()->can('adaugare-comenzi')) abort(403);
        $response = $this->orderService->create($request->validated());
        return back()->with('message', 'Comanda adaugata cu success');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        if (!auth()->user()->can('adaugare-comenzi')) abort(403);
        $order = $this->orderService->find($id);
        return Inertia::render('Orders/Edit', [
            'order' => $order,
            'projects' => Project::all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, int $id)
    {
        if (!auth()->user()->can('adaugare-comenzi')) abort(403);
        $data = $request->validated();
        $order = $this->orderService->find($id);
        $this->orderService->updateOrder($order, $data);
        return back()->with('message', 'Comanda editata cu success!');
    }
    public function changeStatus(ChangeStatusRequest $request, int $id)
    {
        if (!auth()->user()->can('schimbare-status-comenzi')) abort(403);
        $data = $request->validated();
        $order = $this->orderService->find($id);
        $this->orderService->updateOrder($order, $data);
        return back()->with('message', 'Status schimbat cu success!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if (auth()->user()->can('stergere-comenzi')) {
            $this->orderService->deleteOrder($id);
            return Redirect::route('projects.index')
                ->with('message', 'Proiect șters cu succes!');
        }
    }
}
