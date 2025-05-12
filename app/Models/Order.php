<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Order extends Model
{
    protected $fillable = ['user_id', 'project_id', 'title', 'description', 'status'];

    protected $with = ['user', 'project'];

    protected $casts = [
        'log' => 'array',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($order) {
            $user = Auth::user();
            if(!$user) return;
            $statusLog = json_encode([
                '<strong>' . e($user->name) . '</strong> a creat comanda cu statusul
                <strong>' . e($order->status) . '</strong> la data de
                <strong>' . now()->format('d.m.Y H:i') . '</strong>'
            ]);
            $orderLog = json_encode([
                '<strong>' . e($user->name) . '</strong> a creat comanda cu descrierea
                <strong>' . e($order->description) . '</strong> la data de
                <strong>' . now()->format('d.m.Y H:i') . '</strong>'
            ]);
            $order->log = [$statusLog, $orderLog];
        });

        static::updating(function ($order) {
            $user = Auth::user();
            $changes = $order->getDirty();
            if(!$user) return;
            $existingLog = $order->log ?? [];
            if (isset($changes['status'])){
                $logEntry = json_encode([
                    '<strong>' . e($user->name) . '</strong> a schimbat statusul comenzii in
                    <strong>' . e($changes['status']) . '</strong> la data de
                    <strong>' . now()->format('d.m.Y H:i') . '</strong>'
                ]);
                $existingLog[] = $logEntry;
            }
            if (isset($changes['description'])){
                $logEntry = json_encode([
                    '<strong>' . e($user->name) . '</strong> a schimbat descrierea in
                    <span class="font-bold text-gray-800">' . e($changes['description']) . '</span>
                    la data de <strong>' . now()->format('d.m.Y H:i') . '</strong>'
                ]);
                $existingLog[] = $logEntry;
            }
            $order->log = $existingLog;
        });
    }


    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
