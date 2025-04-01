<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\UpdateRequest;
use App\Services\UserService;
use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;

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
        return Inertia::render('Users/Index', ['users' => $users]);
    }

    public function edit(string $id)
    {
        if (!auth()->user()->can('adaugare-utilizatori')) abort(403);
        $user = $this->userService->find($id);
        return Inertia::render('Users/Edit', [
            'user' => $user,
        ]);
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
}
