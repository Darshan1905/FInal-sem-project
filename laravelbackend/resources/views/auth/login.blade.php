<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Login</title>
    <link rel="stylesheet" href="{{ asset('/assets/css/bootstrap5.css') }}">
    <link rel="stylesheet" href="{{ asset('/assets/css/style.css') }}">
</head>
<body>

    <div class="container login-form">
        <form action="{{url('/login')}}" method="POST">
            @csrf
        <div class="row shadow-lg justify-content-center">

            <a class="text-center" href="/"><img src="{{asset('/assets/images/logo.png')}}" alt="" width="20%"></a>
            <hr>
            <h1 class="text-center my-4">Dashboard</h1>

            <div class="col-12 my-3">
            <input type="email" name="email" class="form-control py-3" placeholder="Enter Email">
            @error('email')
            <span class="text-danger">{{ $message }}</span>
            @enderror
            </div>
            <div class="col-12 my-3">
                <input type="password" name="password" class="form-control py-3" placeholder="Enter Password">
                @error('password')
                <span class="text-danger">{{ $message }}</span>
                @enderror
            </div>
            <div class="col-12 my-3">
                <input type="submit" class="btn btn-site" value="Login">
            </div>

        </div>
    </form>
    </div>

    <script src="{{ asset('/assets/js/bootstrap5.js') }}"></script>
    <script src="https://kit.fontawesome.com/423dc4fb65.js" crossorigin="anonymous"></script>

    @include('sweetalert::alert')


</body>
</html>
