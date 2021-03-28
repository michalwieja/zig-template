<!doctype html>
<html lang=pl>
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
	<?php wp_head(); ?>

</head>
<body>
<header class="header">
  <div class="header__logo">
    <?php
    if(function_exists('the_custom_logo')){
the_custom_logo();
    };
  ?>
  </div>

	<?php
	wp_nav_menu( array(
		'menu'           => 'primary',
		'container'      => '',
		'theme_location' => 'primary',
		'items_wrap'     => '<ul class="header__nav">%3$s</ul>'
	) )
	?>
<!--  <div class="header__phone">-->
<!--    <img alt="phone" src="/wp-content/themes/zig-template/assets/phone-blue.svg">-->
<!--    <a href="tel:505582720">505 582 720</a>-->
<!--  </div>-->
  <div class="hamburger">
    <div class="hamburger__icon">
      <div class="hamburger__line"></div>
      <div class="hamburger__line"></div>
      <div class="hamburger__line"></div>
    </div>
    <div class="hamburger__text">MENU</div>

  </div>
</header>

