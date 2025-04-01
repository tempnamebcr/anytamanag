<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
class Project extends Model
{
    protected $fillable = ['name', 'status'];

    protected $withCount = ['orders'];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
    public function getOrdersCountAttribute()
    {
        return $this->orders()->count();
    }
}
