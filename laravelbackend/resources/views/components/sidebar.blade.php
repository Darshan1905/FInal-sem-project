<section class="">
    <div class="contnet ps-4">

        @if(Auth::user()->role === 'admin')
     <h1 class="  pt-5">
        <a href="{{ url('admin/dashboard') }}"><img src="{{asset('/assets/images/logo.png')}}" alt="" width="50%"></a>
    </h1>
    @else
    <h1 class="  pt-5">
        <a href="{{ url('user/dashboard') }}"><img src="{{asset('/assets/images/logo.png')}}" alt="" width="50%"></a>
    </h1>
    @endif

        <div class="spacer"></div>

        @if(Auth::user()->role === 'admin')
        <ul class="ps-2 my-5">
            <h4>Admin</h4>
         <li class="my-4">

             <a href="{{ url('admin/user') }}" class="d-flex align-items-center justify-content-start gap-3 ms-2"> <i class="fa-sharp fa-solid fa-user"></i>Admin Profile </a>
            </li>
            <li class="my-4">

                <a href="{{ url('admin/user') }}" class="d-flex align-items-center justify-content-start gap-3 ms-2"> <i class="fa-sharp fa-solid fa-user"></i>Edit Profile </a>
               </li>
        </ul>

        <ul class="ps-2 my-5">
            <h4>Category</h4>

            <li class="my-4">
                <a href="{{ url('admin/getcategory') }}" class="d-flex align-items-center justify-content-start gap-3 ms-2" >
                    <i class="fa-sharp fa-solid fa-chart-simple"></i>Category  </a>
               </li>
               <li class="my-4">

                <a href="{{ url('admin/createcategory') }}" class="d-flex align-items-center justify-content-start gap-3 ms-2"> <i class="fa-sharp fa-solid fa-chart-simple"></i>Add Category </a>
               </li>

        </ul>
        <ul class="ps-2 my-5">
            <h4>Product</h4>
            <li class="my-4">
                <a href="{{ url('admin/getproduct') }}" class="d-flex align-items-center justify-content-start gap-3 ms-2" >
                   <i class="fa-sharp fa-solid fa-shop"></i>Products  </a>
               </li>
            <li class="my-4">
                <a href="{{ url('admin/createproduct') }}" class="d-flex align-items-center justify-content-start gap-3 ms-2" >
                   <i class="fa-sharp fa-solid fa-shop"></i>Add Products  </a>
               </li>
        </ul>
        <ul class="ps-2 my-5">
            <h4>User</h4>
         <li class="my-4">

             <a href="{{ url('admin/user') }}" class="d-flex align-items-center justify-content-start gap-3 ms-2"> <i class="fa-sharp fa-solid fa-user"></i>All Users </a>
            </li>
        </ul>
        @else
        {{-- If the dashboard is for User --}}
        <ul class="ps-2 my-5">
            <h4>User</h4>
            <li class="my-4">

                <a href="{{ url('user/user') }}" class="d-flex align-items-center justify-content-start gap-3 ms-2"> <i class="fa-sharp fa-solid fa-user"></i>User Profile </a>
               </li>
            <li class="my-4">
                <a href="{{ url('user/getproduct') }}" class="d-flex align-items-center justify-content-start gap-3 ms-2" >
                   <i class="fa-sharp fa-solid fa-user"></i> Edit Profile  </a>
               </li>

           </ul>
           <ul class="ps-2">
            <h4>Order</h4>
            <li class="my-4">

                <a href="{{ url('user/user') }}" class="d-flex align-items-center justify-content-start gap-3 ms-2"> <i class="fa-sharp fa-solid fa-user"></i>Order Items </a>
               </li>

           </ul>
          @endif

            <div class="container ">
                    <form method="POST" action="{{url('/logout')}}">
                        @csrf
                        <button class="btn btn-site mt-3" type="submit">Logout</button>
                    </form>
            </div>

    </div>
</section>
