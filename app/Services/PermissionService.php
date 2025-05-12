<?php

namespace App\Services;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class PermissionService
{

    public function __construct()
    {
    }

    public function createRole(string $name){
        Role::create(['name' => $name]);
    }
    public function createPermission(string $name){
        Permission::create(['name' => $name]);
    }
    public function givePermission(string $roleName, string $permName){
        $role = Role::findByName($roleName);
        $role->givePermissionTo($permName);
    }
    public function revokePermission(string $roleName, string $permName){
        $role = Role::findByName($roleName);
        $role->revokePermissionTo($permName);
    }
    public function syncPermissions(string $roleName, array $permNames){
        $role = Role::findByName($roleName);
        $role->syncPermissions($permNames);
    }
    public function assignRole(Permission $permission, Role $role){
        $permission->assignRole($role);
    }
    public function getRolesWithPermissions(){
        return Role::with('permissions')->get();
    }
    public function getPermissionsByRole(Permission $permission, Role $role){
        $permission->assignRole($role);
    }
    public function getPermissions(){
        return Permission::all();
    }
}
