<template>
    <div class="rhindle"></div>
</template>

<script>
export default {
	name: 'Rhindle'
};
</script>

<style scoped lang="scss">
$pixel-size: 1em!default;

$rhindle: (
		(r t t t t t t t)
		(t r t t t t t t)
		(t t r t t r r t)
		(t t t r r r r r)
		(t t t t r t r r)
		(t t t t r r r t)
		(t t t r r r r t)
		(t t r t t r t t)
		(t r t t t r t t)
		(r t t t r r r t)
		(t t t r r r r t)
		(t t r r r r r r)
		(t r r r r r r r)
		(t r r r r r r r)
		(t r r r r r r r)
		(t r r r r r r r)
		(t t r r r r r t)
		(t t t r r r t t)
		(t t t t r t t t)
		(r r r r r t t t)
		(r t t t t t t t)
		(r r r t t t t t)
);

$color-map: (
	't': transparent,
	'r': #f00
);

@function drawAvatar($matrix, $size) {
	@return drawMatrix($rhindle, $pixel-size);
}

@function drawMatrix($matrix, $size) {
    $rowsCount: length($matrix);
    $shadowString: '';
    @for $rowIdx from 1 through $rowsCount {
		$row: nth($matrix, $rowIdx);
		@for $charIdx from 1 through length($row) {
			$pixel: nth($row, $charIdx);
			@if map-has-key($color-map, $pixel) {
				$shadowString:  $shadowString + ($charIdx*$size) + ' ' + ($rowIdx*$size) + ' ' + map-get($color-map, $pixel);
			}
			@else {
				@warn 'No color for: "#{$pixel}"';
			}
			@if not ($charIdx == length($row) and $rowIdx == $rowsCount) {
				$shadowString: $shadowString + ',';
			}
		}
    }
    @return unquote($shadowString);
}

@mixin draw($matrix, $size) {
	width:($size * length(nth($matrix, 1)));
	height:($size * length($matrix));
	&:after {
		content: '';
		position: absolute;
		top: (-$size);
		left: (-$size);
		width: $size;
		height: $size;
		box-shadow: drawAvatar($matrix, $size);
	}
}

.rhindle {
	position: absolute;
	font-size: 5px;
	@include draw($rhindle, $pixel-size);
}
</style>