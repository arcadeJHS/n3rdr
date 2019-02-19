<template>
    <div class="avatar"></div>
</template>

<script>
export default {
	name: 'Avatar'
};
</script>

<style scoped lang="scss">
.avatar {font-size: 3px;}
$pixel-size: 1em!default;

$faces: (
	(
		(t a t a t a t a t)
		(t a t a t a t a t)
		(t a a a a a a a t)
		(a a a a a a a a a)
		(a b b b b b b b a)
		(a b a b b b a b a)
		(b b b b b b b b b)
		(b b b b b b b b b)
		(t b b e e e b b t)
		(t b b b b b b b t)
		(t t t b b b t t t)
		(t t d d d d d t t)
		(t t d d d d d t t)
		(t t d d d d d t t)
	) 
	(
		(t a a a a a a a t)
		(a a a a a a a a a)
		(a a a a a a a a a)
		(a b b b b a a a a)
		(a b b b b b b a a)
		(a b a b b b a b a)
		(b b b b b b b b b)
		(b b b b b b b b b)
		(t b b e e e b b t)
		(t b b b b b b b t)
		(t t t b b b t t t)
		(t t d d d d d t t)
		(t t d d d d d t t)
		(t t d d d d d t t)
	)  
	(
		(t t b b b b b t t)
		(t b b b b b b b t)
		(b b b b b b b b b)
		(b b b b b b b b b)
		(b b a b b b a b b)
		(b b b b b b b b b)
		(t b b b b b b b t)
		(t b b e e e b b t)
		(t b b b b b b b t)
		(t t t b b b t t t)
		(t t d d d d d t t)
		(t t d d d d d t t)
		(d d d d d d d d d)
		(d d d d d d d d d)
	) 
);

@function randomNum($min, $max) {
	$rand: random();
	@return $min + floor($rand * (($max - $min) + 1));
}

@function randomColor() {
  @return rgb(random(255), random(255), random(255));
}

@function setColorMap() {
	@return (
		't': transparent,
		'a': randomColor(),
		'b': randomColor(),
		'c': randomColor(),
		'd': randomColor(),
		'e': randomColor()
	);
}

@function drawAvatar($matrix, $size) {
	@return drawMatrix(nth($faces, randomNum(1, length($faces))), $pixel-size);
}

@function drawMatrix($matrix, $size) {
	$color-map: setColorMap();
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

.avatar {
	position: absolute;
	&:before {
		display: block;
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		width: 100%;
		height: 100%;
		background-color: #f5f5f5;
		border-radius: 50%;
		padding: 8.5em;
		border: 1px solid darken(#00d1b2, 5%);
	}

	@include draw(nth($faces, 1), $pixel-size);

	@for $itemIdx from 0 through 100 {
		&.avatar--#{$itemIdx} {
			@include draw(nth($faces, 1), $pixel-size);
		}
	}
}
</style>
