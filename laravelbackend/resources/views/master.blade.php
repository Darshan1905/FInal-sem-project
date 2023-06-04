<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>@yield('title')</title>
    <link rel="stylesheet" href="{{ asset('/assets/css/bootstrap5.css') }}">
    <link rel="stylesheet" href="{{ asset('/assets/css/style.css') }}">
    {{-- <link rel="stylesheet" href="https://kit.fontawesome.com/423dc4fb65.css" crossorigin="anonymous"> --}}
</head>

<body>


    <div class="wrapper">
        <div class="sidebar bg-light text-dark shadow-lg">
            <x-sidebar />
        </div>
        <div class="main-content px-2 py-5">
            {{-- <x-header /> --}}


            <div class="scrollbar ">
            @yield('main')
            </div>

        </div>
    </div>

    @include('sweetalert::alert')


    <script src="{{ asset('/assets/js/bootstrap5.js') }}"></script>
    <script src="https://kit.fontawesome.com/423dc4fb65.js" crossorigin="anonymous"></script>
    


</body>

</html>
