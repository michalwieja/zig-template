<?php
get_header();


if ( is_page( 'dolacz' ) ) {
	include 'join.php';
} else {
	the_content();
}
?>


<section class="newsletter">
	<?php
	dynamic_sidebar( 'newsletter' )
	?>

</section>



<?php
get_footer();

?>

<script type="text/javascript" src="/wp-content/themes/zig-template/js/join.js"></script>
<script>
console.warn('warn from page.php');

</script>
