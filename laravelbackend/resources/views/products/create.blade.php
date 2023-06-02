@extends('master')

@section('title','Add Product')

@section('main')

<div class="container">
    <div class="row justify-content-center">
        <div class="col-lg-6">
            <form action="{{url('admin/addproduct')}}" method="post" enctype="multipart/form-data">
                @csrf
                <h4 class="my-3">Add Product</h4>
                <input class="form-control my-2" type="text" name="title" id="" value="{{old('title')}}" placeholder="Product name">
                @error('title')
                    <p class="text-danger"> {{$message}} </p>
                @enderror
                <input class="form-control my-2" type="number" name="price" id="" value="{{old('price')}}" placeholder="Product price">
                @error('price')
                    <p class="text-danger"> {{$message}} </p>
                @enderror
                <input class="form-control my-2" type="number" name="quantity" id="" value="{{old('quantity')}}" placeholder="Product Quantity">
                @error('quantity')
                    <p class="text-danger"> {{$message}} </p>
                @enderror
                <textarea class="form-control my-2" name="description" id=""  cols="5" rows="5">{{old('description')}}</textarea>
                @error('description')
                    <p class="text-danger"> {{$message}} </p>
                @enderror
                <select name="cat_id" id="cat_id" class="form-control">
                    <option value="">Select any category</option>
                    @foreach ($categories as $cat_data)
                        <option value='{{ $cat_data->id }}'>{{ $cat_data->title }}</option>
                    @endforeach
                </select>
                <input class="form-control my-2" type="file" name="image" id="" value="{{old('image')}}" >
                @error('image')
                    <p class="text-danger"> {{$message}} </p>
                @enderror
                <button type="submit" name="submit" class="btn btn-site">Add Product</button>
            </form>
        </div>
    </div>
</div>

@endsection
