<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Permission\StoreRequest;
use App\Http\Requests\Permission\UpdateRequest;
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

    public function updateRole(UpdateRequest $request)
    {
        if (!auth()->user()->can('adaugare-permisiuni')) abort(403);
        $data = $request->validated();
        $this->permissionService->syncPermissions($data['roleName'], $data['permNames']);
        return back()->with('message', 'Rol actualizat cu success!');
    }

    public function create()
    {
        if (!auth()->user()->can('adaugare-permisiuni')) abort(403);
        return Inertia::render('Permissions/Create');
    }
    public function store(StoreRequest $request)
    {
        if (!auth()->user()->can('adaugare-permisiuni')) abort(403);
        $data = $request->validated();
        $this->permissionService->createRole($data['name']);
        return back()->with('message', 'Rol adaugat cu success');
    }


}
