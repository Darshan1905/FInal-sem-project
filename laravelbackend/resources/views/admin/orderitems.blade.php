@extends('master')

@section('title','Order Items')

@section('main')

<div class="container">
    <div class="d-flex align-items-center justify-content-between mb-3">
        <h2>Order Items</h2>
        {{-- <a href="{{url('/createproduct')}}" class="btn btn-primary mb-3 float-end">Add Users</a> --}}
    </div>

    @if(count($orderitem)>0)
    <form action="admin/multipledeleteuser" method="post">
        @csrf
    <table class="table table-bordered text-center border border-1 dash-table">

            <thead>
              <tr>
                {{-- <th scope="col">Select</th> --}}
                <th scope="col">Index</th>
                <th scope="col">Product</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>



              </tr>
            </thead>
            <tbody>
                @foreach ($orderitem as $item)
              <tr>
                {{-- <td>
                    <input type="checkbox" name="ids[{{$item->id}}]" value="{{$item->id}}">
                </td> --}}
                <th scope="row">{{$loop->index+1}}</th>
                <td> <img src="{{ asset ('storage/uploads/'.$item->product->image)}}" alt="image" width="100px"></td>
                <td>{{$item->product->title}}</td>
                <td>{{$item->price}}</td>
                <td>{{$item->quantity}}</td>


                {{-- <td>
                    <a href="admin/delete/{{$item->id}}" class="btn btn-red mx-1">Delete</a>
                </td> --}}
              </tr>
              @endforeach

            </tbody>
      </table>

    </form>
    @else
    <h6 class="text-center">No Product found!!!</h6>
    @endif
</div>


@endsection
