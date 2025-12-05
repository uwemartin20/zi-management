<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;

class ProjectController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $query = Project::with(['clientCompany'])
            ->withCount('tasks');

        // If user is not admin, filter by projects assigned
        if (! $user->isAdmin()) {
            $query->whereIn('id', $user->projects()->pluck('id'));
        }

        return $query->orderBy('name')->get();
    }

    public function show($id)
    {
        $user = auth()->user();
        $project = Project::with(['tasks', 'taskGroups', 'clientCompany'])
            ->findOrFail($id);

        if (! $user->isAdmin() && ! $user->hasProjectAccess($project)) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return $project;
    }
}
