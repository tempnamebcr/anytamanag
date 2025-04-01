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
            $log = json_encode([$user->name . ' a creat comanda cu statusul ' . $order->status . ' la data de ' . now()->format('d.m.Y H:i')]);
            $order->log = [$log];
        });

        static::updating(function ($order) {
            $user = Auth::user();
            $changes = $order->getDirty();
            if(!$user) return;
            $existingLog = $order->log ?? [];
            if (isset($changes['status'])){
                $oldStatus = $order->getOriginal('status');
                $logEntry = json_encode([$user->name . ' a schimbat statusul comenzii din ' . $oldStatus . ' la ' . $changes['status'] . ' la data de ' . now()->format('d.m.Y H:i')]);
                $existingLog[] = $logEntry;
            }
            if (isset($changes['description'])){
                $oldDescription = $order->getOriginal('description');
                $logEntry = json_encode([$user->name . ' a schimbat descrierea din ' . $oldDescription . ' in => ' . $changes['description'] . ' la data de ' . now()->format('d.m.Y H:i')]);
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
