@extends('master')

@section('title', 'Dashboard')

@section('main')

    <div class="container">


        <div class="container d-flex align-items-center justify-content-between">
            <h2 class="fw-bold">User Dashboard</h2>
            <h5> <i class="fa-sharp fa-solid fa-user"></i> {{Auth::user()->name}}</h5>
        </div>

       
    </div>

@endsection
