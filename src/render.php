<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
?>

<div <?php echo get_block_wrapper_attributes(['data-post-id' => $attributes['postId']]); ?>>
	<ul class="navigation-links">
		<?php if ($h2tags = $attributes['h2tags']) { ?>
			<?php foreach ($h2tags as $key => $h2tag) { ?>
				<li class="navigation-link"><a class="anchor-link" href="#<?php echo $h2tag['id']; ?>"><?php echo esc_html_e($h2tag['text']); ?></a></li>
			<?php } ?>
		<?php } ?>
	</ul>
</div>