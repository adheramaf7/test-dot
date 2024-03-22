<?php

namespace App\Http\Controllers;

use App\Http\Requests\SaveProductRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{

    public function index(Request $request)
    {
        $products = Product::query()
            ->with('category')
            ->when($request->query('search'), fn ($query) => $query->where(DB::raw('LOWER(name)'), 'like', '%' . strtolower($request->query('search')) . '%'))
            ->get();

        return inertia('Product/Index', [
            'products' => ProductResource::collection($products),
            'search' => $request->query('search'),
        ]);
    }

    public function create()
    {
        return inertia('Product/Create', [
            'categories' => fn () => CategoryResource::collection(Category::all()),
        ]);
    }

    public function store(SaveProductRequest $request)
    {
        Product::create($request->validated());

        return redirect()->route('products.index')->with('message', 'Data saved successfully.');
    }
    public function edit(Product $product)
    {
        return inertia('Product/Edit', [
            'categories' => fn () => CategoryResource::collection(Category::all()),
            'product' => ProductResource::make($product),
        ]);
    }

    public function update(SaveProductRequest $request, Product $product)
    {
        $product->update($request->validated());
        return redirect()->route('products.index')->with('message', 'Data saved successfully.');
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->route('products.index')->with('message', 'Data deleted successfully.');
    }
}
