<section class="">
    <div class="contnet ps-4">

     <h1 class="  pt-5">
        <a href="{{ url(Auth::user()->role === 'admin' ? 'admin/dashboard' : 'user/dashboard') }}"><img src="{{asset('/assets/images/logo.png')}}" alt="" width="50%"></a>
    </h1>

        <div class="spacer"></div>
        <ul class="ps-2">

         <li class="my-4">

             <a href="{{ url(Auth::user()->role === 'admin' ? 'admin/user' : 'user/user') }}" class="d-flex align-items-center justify-content-start gap-3 ms-2"> <i class="fa-sharp fa-solid fa-user"></i> All Users </a>
            </li>
         <li class="my-4">
             <a href="{{ url(Auth::user()->role === 'admin' ? 'admin/getproduct' : 'user/getproduct') }}" class="d-flex align-items-center justify-content-start gap-3 ms-2" >
                <i class="fa-sharp fa-solid fa-shop"></i> All Products  </a>
            </li>
            <li class="my-4">
                <a href="{{ url(Auth::user()->role === 'admin' ? 'admin/getcategory' : 'user/getcategory') }}" class="d-flex align-items-center justify-content-start gap-3 ms-2" >
                    <i class="fa-sharp fa-solid fa-chart-simple"></i> All Category  </a>
               </li>
        </ul>
<div class="container ">
            <form method="POST" action="{{url('/logout')}}">
                @csrf
                <button class="btn btn-site mt-3" type="submit">Logout</button>
            </form>
    </div>

    </div>
</section>
