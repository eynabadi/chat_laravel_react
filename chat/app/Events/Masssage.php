<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class Masssage implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;


    public function __construct(public  string $message, public string $username)
    {
        //
    }


    public function broadcastOn()
    {
        return ['chat'];
    }

    public function broadcastAs()
    {
        return 'message';
    }
}
