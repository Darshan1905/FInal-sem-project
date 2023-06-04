@extends('master')

@section('title','All Products')

@section('main')

<div class="container">
    <div class="d-flex align-items-center justify-content-between mb-3">
        <h2>Products List</h2>
        <a href="{{url('admin/createproduct')}}" class="btn btn-site mb-3 float-end">Add Product</a>
    </div>


    @if(count($products)>0)
    <form action="/multipledeleteprod" method="post">
        @csrf


   <table class="table table-bordered  text-center border border-1">
    <tr>
        <th>Select</th>
        <th>#</th>
        <th>Name</th>
        <th>Category</th>
        {{-- <th>Description</th> --}}
        <th>Image</th>
        <th>Price</th>
        <th>Action</th>
    </tr>
    @foreach ($products as $item)
    <tr>
        <td>
            <input type="checkbox" name="ids[{{$item->id}}]" value="{{$item->id}}">
        </td>
        <td> {{$loop->index+1}}</td>
        <td> {{$item->title}}</td>
        <td> {{$item->category->title ?? 'No category' }}</td>
        {{-- <td> {{$item->description}}</td> --}}
        <td> <img src="{{ asset ('storage/uploads/'.$item->image)}}" alt="image" width="100px"> </td>
        <td> {{$item->price}}</td>
        <td>
            <a href="{{url('admin/editproduct/'.$item->id)}}" class="btn btn-green">Edit</a>
            <a href="{{url('admin/deleteproduct/'.$item->id)}}" class="btn btn-red">Delete</a>

            </td>
    </tr>
    @endforeach

   </table>
   <input type="submit" class="btn btn-red" value="Delete Products">
</form>
   @else
    <h6 class="text-center">No Products found!!! Please add </h6>
    @endif

</div>

@endsection
