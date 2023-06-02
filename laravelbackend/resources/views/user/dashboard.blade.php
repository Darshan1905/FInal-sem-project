@extends('master')

@section('title', 'Dashboard')

@section('main')

    <div class="container">


        <div class="container d-flex align-items-center justify-content-between">
            <h2 class="fw-bold">User Dashboard</h2>
            <h5> <i class="fa-sharp fa-solid fa-user"></i> {{Auth::user()->name}}</h5>
        </div>

        <div class="row my-5">
            <div class="col-lg-3">
                <div class="card border-dark border-2">

                    <div class="card-body">
                    <div class="card-title">
                        <div class="d-flex align-items-center justify-content-between">
                            <img width="40px" src="{{asset('/assets/images/products.png')}}" alt="">

                        <h1>{{(\App\Models\Product::countActiveProduct())}}</h1>
                        </div>
                        <h3 class="my-2"> Products </h3>
                    </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="card border-dark border-2">

                    <div class="card-body">
                    <div class="card-title">
                        <div class="d-flex align-items-center justify-content-between">
                            <img width="40px" src="{{asset('/assets/images/category.png')}}" alt="">

                            <h1>{{(\App\Models\Category::countActiveCategory())}}</h1>
                        </div>
                        <h3 class="my-2"> Categories </h3>

                    </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="card border-dark border-2">

                    <div class="card-body">
                    <div class="card-title">
                        <div class="d-flex align-items-center justify-content-between">
                            <img width="40px" src="{{asset('/assets/images/user.png')}}" alt="">

                        <h1>{{(\App\Models\User::countActiveUser())}}</h1>
                        </div>
                        <h3 class="my-2"> Users </h3>
                    </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

@endsection
