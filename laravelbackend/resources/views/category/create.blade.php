@extends('master')

@section('title','Add Category')

@section('main')

<div class="container">
    <div class="row justify-content-center">
        <div class="col-lg-6">
            <form action="{{url('admin/addcategory')}}" method="post" enctype="multipart/form-data">
                @csrf
                <h4 class="my-3">Add Category</h4>
                <input class="form-control my-2" type="text" name="title" id="" value="{{old('title')}}" placeholder="Category name">
                @error('title')
                    <p class="text-danger"> {{$message}} </p>
                @enderror
                <textarea class="form-control my-2" name="description" id=""  cols="5" rows="5">{{old('description')}}</textarea>
                @error('description')
                    <p class="text-danger"> {{$message}} </p>
                @enderror
                <input class="form-control my-2" type="file" name="image" id="" value="{{old('image')}}" >
                @error('image')
                    <p class="text-danger"> {{$message}} </p>
                @enderror
                <button type="submit" name="submit" class="btn btn-site">Add Category</button>
            </form>
        </div>
    </div>
</div>

@endsection
