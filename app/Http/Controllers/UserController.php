<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\ChangeRoleRequest;
use App\Http\Requests\User\UpdateRequest;
use App\Models\Order;
use App\Models\Project;
use App\Services\UserService;
use App\Models\User;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    private UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }
    public function index()
    {
        if (!auth()->user()->can('vizualizare-utilizatori')) abort(403);
        $data = request()->all();
        $users = $this->userService->getPaginatedUsers($data);
        return Inertia::render('Users/Index', ['users' => $users, 'roles' => Role::all()]);
    }

    public function edit(string $id)
    {
        if (!auth()->user()->can('adaugare-utilizatori')) abort(403);
        $user = $this->userService->find($id);
        return Inertia::render('Users/Edit', [
            'user' => $user,
            'roles' => Role::all()
        ]);
    }

    public function changeRole(ChangeRoleRequest $request, int $id)
    {
        if (!auth()->user()->can('schimbare-status-comenzi')) abort(403);
        $data = $request->validated();
        $this->userService->updateUserRole($id, $data['role']);
        return back()->with('message', 'Rol schimbat cu success!');
    }

    public function update(UpdateRequest $request, int $id)
    {
        if (!auth()->user()->can('adaugare-utilizatori')) abort(403);
        $data = $request->validated();
        $user = $this->userService->find($id);
        $this->userService->updateUser($user, $data);
        return back()->with('message', 'Utilizator editat cu success!');
    }

    public function destroy(string $id)
    {
        if (auth()->user()->can('stergere-utilizatori')) {
            $this->userService->deleteUser($id);
            return back()->with('message', 'Utilizator sters cu success');
        }
    }

    public function dashboard()
    {
        return Inertia::render('Dashboard', [
            'usersCount' => User::count(),
            'projectsCount' => Project::count(),
            'ordersCount' => [
                'livrata' => Order::where('status', 'livrata')->count(),
                'nepreluata' => Order::where('status', 'nepreluata')->count(),
                'preluata' => Order::where('status', 'preluata')->count(),
                'asteptare' => Order::where('status', 'asteptare')->count(),
                'blocata' => Order::where('status', 'blocata')->count(),
                'partial' => Order::where('status', 'partial')->count(),
            ],
        ]);
    }
}
