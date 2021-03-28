<footer class="footer">
  <div class="column">
    <div class="logo row">
      <img alt="logo" src="/wp-content/themes/zig-template/assets/zig-logo-white.svg">
    </div>
    <div class="row">
      <img alt="location" src="/wp-content/themes/zig-template/assets/location.svg">
      <span class="text">
          Sienkiewicza 6a, p.107, I piętro
          41-300 Dąbrowa Górnicza
        </span>
    </div>
    <a class="row" href="mailto:biuro@zig.org.pl">
      <img alt="email" src="/wp-content/themes/zig-template/assets/email.svg">
      <span class="text">
          biuro@zig.org.pl
        </span>
    </a>
    <a class="row" href="tel:505 582 720">
      <img alt="phone" src="/wp-content/themes/zig-template/assets/call.svg"> <span class="text">
          505 582 720
        </span>
    </a>
  </div>
  <div class="column">
	  <?php
	  dynamic_sidebar( 'footer_map' )
	  ?>
  </div>
</footer>

<?php wp_footer() ?>

</body>
</html>
