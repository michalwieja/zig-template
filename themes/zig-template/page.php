<?php
get_header();
the_content();
?>


<section class="newsletter">
	<?php
	dynamic_sidebar( 'newsletter' )
	?>

</section>

<?php
get_footer();

?>

