<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Project\UpdateRequest;
use App\Services\PermissionService;
use Inertia\Inertia;

class PermissionController extends Controller
{
    private PermissionService $permissionService;

    public function __construct(PermissionService $permissionService)
    {
        $this->permissionService = $permissionService;
    }
    public function index()
    {
        if (!auth()->user()->can('vizualizare-permisiuni')) abort(403);
        $roles = $this->permissionService->getRolesWithPermissions();
        $permissions = $this->permissionService->getPermissions();
        return Inertia::render('Permissions/Index', ['roles' => $roles, 'permissions' => $permissions]);
    }

    public function updateRole(UpdateRequest $request, int $id)
    {
        if (!auth()->user()->can('adaugare-permisiuni')) abort(403);
        $data = $request->validated();
        // $user = $this->permissionService->find($id);
        // $this->permissionService->updateUser($user, $data);
        return back()->with('message', 'Rol actualizat cu success!');
    }

    public function create()
    {
        if (!auth()->user()->can('adaugare-permisiuni')) abort(403);
        return Inertia::render('Permissions/Create');
    }
    public function store(UpdateRequest $request, int $id)
    {
        if (!auth()->user()->can('adaugare-permisiuni')) abort(403);
        $this->permissionService->createRole($request->validated());
        return back()->with('message', 'Rol adaugat cu success');
    }


}
