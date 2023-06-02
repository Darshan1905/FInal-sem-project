@extends('master')

@section('title','All Categories')

@section('main')


<div class="container">
    <div class="d-flex align-items-center justify-content-between mb-3">
        <h2>Categories List</h2>
        <a href="{{url('admin/createcategory')}}" class="btn btn-site mb-3 float-end">Add Category</a>
    </div>


    @if(count($category)>0)
    <form action="admin/multipledeletecat" method="post">
        @csrf

   <table class="table table-bordered  text-center border border-1">
    <tr>
        <th>Select</th>
        <th>#</th>
        <th>Name</th>
        <th>Slug</th>
        <th>Description</th>
        <th>Image</th>
        <th>Action</th>
    </tr>
    @foreach ($category as $item)
    <tr>
        <td>
            <input type="checkbox" name="ids[{{$item->id}}]" value="{{$item->id}}">
        </td>
        <td> {{$loop->index+1}}</td>
        <td> {{$item->title}}</td>
        <td> {{$item->slug}}</td>
        <td> {{$item->description}}</td>
        <td> <img src="{{ asset ('storage/uploads/'.$item->image)}}" alt="image" width="100px"> </td>

        <td>
            <a href="{{url('admin/editcategory/'.$item->id)}}" class="btn btn-green">Edit</a>
            <a href="{{url('admin/deletecategory/'.$item->id)}}" class="btn btn-red">Delete</a>
            </td>
    </tr>
    @endforeach

   </table>
   <input type="submit" class="btn btn-red" value="Delete Category">
</form>
@else
<h6 class="text-center">No Category found!!! Please add </h6>
@endif
</div>

@endsection
