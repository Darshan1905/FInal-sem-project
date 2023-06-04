@extends('master')

@section('title','All Users')

@section('main')

<div class="container">
    <div class="d-flex align-items-center justify-content-between mb-3">
        <h2>Users List</h2>
        {{-- <a href="{{url('/createproduct')}}" class="btn btn-primary mb-3 float-end">Add Users</a> --}}
    </div>

    @if(count($user)>0)
    <form action="admin/multipledeleteuser" method="post">
        @csrf
    <table class="table table-bordered text-center border border-1 dash-table">

            <thead>
              <tr>
                <th scope="col">Select</th>
                <th scope="col">Index</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
                @foreach ($user as $item)
              <tr>
                <td>
                    <input type="checkbox" name="ids[{{$item->id}}]" value="{{$item->id}}">
                </td>
                <th scope="row">{{$loop->index+1}}</th>
                <td>{{$item->name}}</td>
                <td>{{$item->email}}</td>
                <td>{{$item->role}}</td>
                <td>
                    {{-- <a class="btn btn-green mx-1">Edit</a> --}}
                    <a href="admin/delete/{{$item->id}}" class="btn btn-red mx-1">Delete</a>
                </td>
              </tr>
              @endforeach

            </tbody>
      </table>
      <input type="submit" class="btn btn-red" value="Delete user">
    </form>
    @else
    <h6 class="text-center">No User found!!!</h6>
    @endif
</div>


@endsection
