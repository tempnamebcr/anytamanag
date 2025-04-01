<?php

use Illuminate\Database\Migrations\Migration;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;

return new class extends Migration {
    public function up()
    {
        $roles = ['admin'];
        $permissions = [
            'vizualizare-comenzi',
            'adaugare-comenzi',
            'schimbare-status-comenzi',
            'stergere-comenzi',
            'vizualizare-utilizatori',
            'adaugare-utilizatori',
            'stergere-utilizatori',
            'vizualizare-proiecte',
            'adaugare-proiecte',
            'stergere-proiecte',
            'vizualizare-permisiuni',
            'adaugare-permisiuni',
        ];

        foreach ($roles as $roleName) {
            $role = Role::firstOrCreate(['name' => $roleName]);

            foreach ($permissions as $permissionName) {
                $permission = Permission::firstOrCreate(['name' => $permissionName]);
                $role->givePermissionTo($permission);
            }
        }

        $admin = User::first();
        if ($admin) {
            $admin->assignRole('admin');
        }
    }

    public function down()
    {
        $permissions = [
            'vizualizare-comenzi',
            'adaugare-comenzi',
            'schimbare-status-comenzi',
            'stergere-comenzi',
            'vizualizare-utilizatori',
            'adaugare-utilizatori',
            'stergere-utilizatori',
            'vizualizare-proiecte',
            'adaugare-proiecte',
            'stergere-proiecte',
            'vizualizare-permisiuni',
            'editare-permisiuni',
        ];

        foreach ($permissions as $permissionName) {
            Permission::where('name', $permissionName)->delete();
        }

        Role::where('name', 'admin')->delete();
    }
};
