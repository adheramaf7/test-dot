<?php

namespace App\Http\Controllers;

use App\Http\Requests\SaveCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
{

    public function index(Request $request)
    {
        $categories = Category::query()
            ->when($request->query('search'), fn ($query) => $query->where(DB::raw('LOWER(name)'), 'like', '%' . strtolower($request->query('search')) . '%'))
            ->get();

        return inertia('Category/Index', [
            'categories' => CategoryResource::collection($categories),
            'search' => $request->query('search'),
        ]);
    }

    public function create()
    {
        return inertia('Category/Create');
    }

    public function store(SaveCategoryRequest $request)
    {
        Category::create($request->validated());

        return redirect()->route('categories.index')->with('message', 'Data saved successfully.');
    }

    public function show(Category $category)
    {
        //
    }

    public function edit(Category $category)
    {
        return inertia('Category/Edit', [
            'category' => CategoryResource::make($category),
        ]);
    }

    public function update(SaveCategoryRequest $request, Category $category)
    {
        $category->update($request->validated());
        return redirect()->route('categories.index')->with('message', 'Data saved successfully.');
    }

    public function destroy(Category $category)
    {
        try {
            $category->delete();
        } catch (\Throwable $th) {
            return redirect()->route('categories.index')->with('message', 'There was a problem deleting data.');
        }
        return redirect()->route('categories.index')->with('message', 'Data deleted successfully.');
    }
}
