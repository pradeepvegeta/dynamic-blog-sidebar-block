<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
?>
<?php if ($h2tags = $attributes['h2tags']) { ?>
<div <?php echo get_block_wrapper_attributes(['data-post-id' => $attributes['postId']]); ?>>
	<ul class="navigation-links">
		<?php foreach ($h2tags as $key => $h2tag) { ?>
			<li class="navigation-link"><a class="anchor-link" href="#<?php echo $h2tag['id']; ?>"><?php echo esc_html_e($h2tag['text']); ?></a></li>
		<?php } ?>
	</ul>
</div>
<?php } else { ?>
		<p><?php echo esc_html_e('Please make sure the content was on the post and h2 tags'); ?></p>
<?php } ?>