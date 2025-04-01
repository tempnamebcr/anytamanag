<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Project\StoreRequest;
use App\Http\Requests\Project\UpdateRequest;
use App\Services\ProjectService;
use Inertia\Inertia;

class ProjectController extends Controller
{
    private ProjectService $projectService;

    public function __construct(ProjectService $projectService)
    {
        $this->projectService = $projectService;
    }
    public function index()
    {
        if (!auth()->user()->can('vizualizare-proiecte')) abort(403);
        $data = request()->all();
        $projects = $this->projectService->getPaginatedProjects($data);
        return Inertia::render('Projects/Index', ['projects' => $projects]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        if (!auth()->user()->can('adaugare-proiecte')) abort(403);
        return Inertia::render('Projects/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        if (!auth()->user()->can('adaugare-proiecte')) abort(403);
        $this->projectService->create($request->validated());
        return back()->with('message', 'Proiect adaugat cu success');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        if (!auth()->user()->can('adaugare-proiecte')) abort(403);
        $project = $this->projectService->find($id);
        return Inertia::render('Projects/Edit', [
            'project' => $project,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, int $id)
    {
        if (!auth()->user()->can('adaugare-proiecte')) abort(403);
        $data = $request->validated();
        $user = $this->projectService->find($id);
        $this->projectService->updateProject($user, $data);
        return back()->with('message', 'User edited successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if (auth()->user()->can('stergere-proiecte')) {
            $this->projectService->deleteProject($id);
            return back()->with('message', 'Proiect sters cu success');
        }
    }
}
