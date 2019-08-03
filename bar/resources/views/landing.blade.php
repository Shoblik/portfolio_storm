@extends('layouts.master')

<style>
    * {
        margin: 0;
        font-family: 'Raleway', sans-serif;
    }
    body, html {
        width: 100%;
        height: 100%;
        overflow-x: hidden;
    }
    .container {
        width: 100%;
    }
    header {
        background-image: url({{asset('images/bar.jpg')}});
        height: 100vh;
        width: 100%;
        background-size: cover;
        background-repeat: no-repeat;
        filter: blur(0px);
        position: relative;
    }
    h1.landingTitle {
        color: white;
        font-size: 115px;
        width: 591px;
        margin: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        line-height: 162px;
    }
    .mainContent {
        width: 100%;
        padding: 0 8px;
    }
    .orangify {
        color: white;
    }
    .individualDrink {
        padding: 220px 0;
    }
    .individualDrink h4 {
        text-align: center;
        font-size: 50px;
        margin-top: 20px;
        color: #1d1d1d;
    }
    .individualDrink h3 {
        text-align: center;
        font-size: 80px;
    }
</style>

@section('title', 'Crown Pointe Bar')

@section('content')
<header>
    <h1 class="landingTitle">The <span class="orangify">C</span>rown <span class="orangify">P</span>ointe <span class="orangify">B</span>ar</h1>
</header>
<div class="mainContent">
    <div class="individualDrink">
        <h3>Vodka Cranberry</h3>
        <h4>Vodka</h4>
    </div>
    <div class="lineSpace"></div>
    <div class="individualDrink">
        <h3>Long Island Ice Tea</h3>
        <h4>Vokda, Gin, Tequila, Triple Sec, Rum</h4>
    </div>
    <div class="lineSpace"></div>
    <div class="individualDrink">
        <h3>Classic Daquiri</h3>
        <h4>White Rum</h4>
    </div>
    <div class="lineSpace"></div>
    <div class="individualDrink">
        <h3>Tequila Sunrise</h3>
        <h4>Tequila</h4>
    </div>
    <div class="lineSpace"></div>
    <div class="individualDrink">
        <h3>Mojito</h3>
        <h4>Tequila</h4>
    </div>
    <div class="lineSpace"></div>
    <div class="individualDrink">
        <h3>The Southside</h3>
        <h4>Gin</h4>
    </div>
    <div class="lineSpace"></div>
    <div class="individualDrink">
        <h3>Rum and Coke</h3>
        <h4>Rum</h4>
    </div>
    <div class="lineSpace"></div>
    <div class="individualDrink">
        <h3>Sweet &amp; Sour</h3>
        <h4>Vodka</h4>
    </div>
    <div class="lineSpace"></div>
</div>
@stop

