@extends('master')

@section('title','Edit Category')

@section('main')

<div class="container">
    <div class="row justify-content-center">
        <div class="col-lg-6">
            <form action="{{url('admin/updatecategory/'.$category->id)}}" method="post" enctype="multipart/form-data">
                @csrf
                <h4 class="my-3">Add Product</h4>
                <input class="form-control my-2" type="text" name="title" id="" value="{{$category->title}}" placeholder="Product name">
                @error('title')
                    <p class="text-danger"> {{$message}} </p>
                @enderror
                <textarea class="form-control my-2" name="description" id=""  cols="5" rows="5">{{$category->description}}</textarea>
                @error('description')
                    <p class="text-danger"> {{$message}} </p>
                @enderror
                @if ("/storage/uploads/{{ $category->image }}")
                <img src="{{ asset ('storage/uploads/'.$category->image) }}" width="50px">
                @else
                    <p>No image found</p>
                @endif
                <input class="form-control my-2" type="file" name="image" id="" value="{{$category->name}}" >

                @error('image')
                    <p class="text-danger"> {{$message}} </p>
                @enderror
                <button type="submit" name="submit" class="btn btn-site">Update Product</button>
            </form>
        </div>
    </div>
</div>

@endsection
