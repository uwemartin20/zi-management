<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Services\PermissionService;
use App\Models\OwnerCompany;
use App\Models\Label;
use App\Models\Project;
use App\Models\Task;

class TaskController extends Controller
{
    public function show($project, $task) {
        $project = Project::findOrFail($project->id);
        $task = Task::findOrFail($task->id);
        // Authorize the user
        $this->authorize('viewAny', [Task::class, $project]);

        // Load default relations (like loadDefault in your Inertia version)
        $task->loadDefault();

        // Prepare JSON response
        return response()->json([
            'task' => $task,
            'project' => $project,
            'users_with_access' => PermissionService::usersWithAccessToProject($project),
            'labels' => Label::select('id', 'name', 'color')->get(),
            'currency' => [
                'symbol' => OwnerCompany::with('currency')->first()->currency->symbol,
            ],
        ]);
    }
}
