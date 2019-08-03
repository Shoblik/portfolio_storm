<html>
<head>
    <title>App Name - @yield('title')</title>
    <link href="https://fonts.googleapis.com/css?family=Raleway:400,400i,700,800&display=swap" rel="stylesheet">
    <link rel="{{ asset('css/app.css') }}" />
    <script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
</head>
<body>

<div class="container">
    @yield('content')
</div>
</body>
</html>