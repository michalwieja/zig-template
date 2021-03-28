<?php get_header(); ?>

<section class="hero">
  <div class="hero__content">
    <div class="hero__title main-title">TU SĄ MOŻLIWOŚCI
    </div>
    <div class="hero__text">Sukcesu w biznesie nie buduje się w pojedynkę, dlatego tworzymy
      społeczność, która daje wartość
    </div>
    <div class="button-wrapper">
      <button class="button light-blue">Dołącz</button>
      <button class="button light-blue"/>
      więcej</button>
    </div>
    <div class="socials">
		<?php
		dynamic_sidebar( 'hero_social' )
		?>
    </div>


  </div>
  <div class="hero__image">
	  <?php

	  $args     = array(
		  'posts_per_page'      => 1,
		  'post__in'            => get_option( 'sticky_posts' ),
		  'ignore_sticky_posts' => 1
	  );
	  $my_query = new WP_Query( $args );

	  $do_not_duplicate = array();
	  while ( $my_query->have_posts() ) : $my_query->the_post();
		  $do_not_duplicate[] = $post->ID; ?>

        <div id="post-<?php the_ID(); ?>" <?php post_class( '' ); ?> >
			<?php the_post_thumbnail( 'full' ); ?>

        </div>
        <div class="hero__description">
          <div class="title">
			  <?php the_title() ?>
          </div>
          <div class="text">
			  <?php the_excerpt() ?>
          </div>
          <button class="read-more light-blue"><a href="<?php the_permalink(); ?>" rel="bookmark"
                                                  title="Permanent Link to <?php the_title_attribute(); ?>">Czytaj
              więcej</a></button>
        </div>

	  <?php endwhile; ?>
	  <?php wp_reset_postdata(); //VERY VERY IMPORTANT?>

  </div>
</section>
<section class="news padding-left post-carousel">
  <div class="news__title sub-title">
    Sporo się u nas dzieje. Bądź zawsze na bieżąco
  </div>
	<?php echo do_shortcode( '[psac_post_carousel autoplay="false" design="design-2" arrows="true" dots="false" show_author="false" show_tags="false" show_comments="false" show_category="false" media_size="medium" sliderheight="230" slide_show="4" category="posty"]' ); ?>
  <button class="button grenade">ZOBACZ WSZYSTKIE</button>
</section>
<section class="announcements container">
  <div class="announcements__title sub-title">
    Najnowsze komunikaty
  </div>
  <div class="announcements__cards">
	  <?php query_posts( array(
		  'category_name'  => 'komunikaty',
		  'posts_per_page' => 4
	  ) ); ?>
	  <?php if ( have_posts() ) : ?>
		  <?php while ( have_posts() ) : the_post(); ?>
          <div class="announcements__card" id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
            <div class="title"><a href="<?php the_permalink(); ?>" rel="bookmark"
                                  title="Permanent Link to <?php the_title_attribute(); ?>"><?php the_title(); ?></a>
            </div>
            <div class="read-more">Czytaj więcej</div>
            <!--end entry-->
          </div><!--end post-->
		  <?php endwhile; /* rewind or continue if all posts have been fetched */ ?>
	  <?php else : ?>
	  <?php endif; ?>

  </div>
</section>
<section class="slogan slogan--white-bg container">
  <div class="slogan__title main-title main-title--blue">
    Lepszy biznes, lepsze życie
  </div>
  <div class="slogan__text">
    Jesteśmy tu, aby inspirować, wspierać i rozwijać się. Stwarzamy możliwości i potrafimy z nich
    korzystać. Pamiętamy też, że za każdym biznesem stoi człowiek
  </div>
</section>
<section id="profits">
  <div class="profits container">
    <div class="profits__title main-title main-title--blue">
      CO ZYSKUJESZ?
    </div>
    <div class="profits__cards">

      <div class="profits__card">
        <div class="title">
          CENNE KONTAKTY
        </div>
        <div class="text">
          Dołącz do społeczności, która tworzy biznes na Śląsku i w zagłębiu.
          Zdobądź nowych klientów i poznaj dostawców rozwiązań dla Twojej firmy
        </div>
        <div class="arrow">
          <img alt="" src="wp-content/themes/zig-template/assets/arrow-right.svg">
        </div>
      </div>
      <div class="profits__card">
        <div class="title">
          INSPIRUJĄCE SPOTKANIA
        </div>
        <div class="text">
          Szkolenia, warsztaty, spotkania, wspólne pasje. Tu znajdziesz inspiracje,
          motywację i odpowiednich partnerów
        </div>
        <div class="arrow">
          <img alt="" src="wp-content/themes/zig-template/assets/arrow-right.svg">
        </div>
      </div>
      <div class="profits__card">
        <div class="title">
          WIEDZA I DOŚWIADCZENIE
        </div>
        <div class="text">
          Korzystaj z wiedzy innych, dziel
          się własnymi doświadczeniami.
          Razem budujmy wartość
        </div>
        <div class="arrow">
          <img alt="" src="wp-content/themes/zig-template/assets/arrow-right.svg">
        </div>
      </div>
    </div>

  </div>
  <div class="relations">
    <div class="relations__image">
      <img alt="laura" src="/wp-content/themes/zig-template/assets/laura.png">
    </div>
    <div class="relations__content">
      <div class="relations__title main-title main-title--blue">
        Relacje są najważniejsze

      </div>
      <div class="relations__text">
        <p>Razem jesteśmy silniejsi i mamy większy wpływ nie tylko na świat biznesu. Wierzymy w
          skuteczność efektu synergii wiedzy, doświadczenia i odpowiedzialnego podejścia. To na
          nich budujemy przewagę naszych biznesów i Zagłębiowskiej Izby Gospodarczej.</p>
        <p>Dbam o jakość relacji w Zagłębiowskiej Izbie Gospodarczej. Poznam Cię z odpowiednimi
          ludźmi </p>
        <p>Paulina Piętowska Relationship Menager</p>
      </div>
      <div class="button">POŁĄCZMY SIŁY</div>
    </div>

  </div>
</section>
<section class="motto container">
  <div class="motto__title">
    Jesteśmy społecznością przedsiębiorców opartą o
    wartości i
    poczucie wpływu na nasze firmy, miasto, region i ich
    mieszkańców.
  </div>
  <div class="motto__subtitle">
    Wierzymy, że biznes to coś więcej niż pieniądze.
    Bierzemy odpowiedzialność, chcemy się rozwijać, szukamy
    inspiracji
    i dajemy przykład. Dobrze wiemy, że razem jesteśmy silniejsi,
    a nasz
    wspólny głos ma znaczenie.
  </div>
</section>
<section class="full-width-carousel">
	<?php echo do_shortcode( '[psac_post_carousel autoplay="false" design="design-2" show_date="false" show_author="false" show_tags="false" show_comments="false" show_category="false" sliderheight="750" slide_show="1" dots="false" category="posty"]' ); ?>

</section>
<section class="newsletter">
	<?php
	dynamic_sidebar( 'newsletter' )
	?>

</section>


<?php get_footer(); ?>
