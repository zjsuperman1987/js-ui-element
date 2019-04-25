(function (scope) {
	var RUNWAY_ITEMS = 10;
	var RUNWAY_ITEMS_OPPSITE = 10;
	var ANIMATIONS_DURATION_MS = 200;
	var SCROLL_RUNWAY = 2000;

	// 资源类
	function InfiniteScrollSource () {};
	InfiniteScrollSource.prototype = {
		fetch: function () {},
		createTombstone: function () {},
		render: function() {}
	};

	// 滚动类
	function InfiniteScroller (scroller, source) {
		this.anchorItem = { index: 0, offset: 0 };
		this.firstAttachedItem_ = 0;
		this.lastAttachedItem_ = 0;
		this.anchorScrollTop = 0;
		this.tombstoneSize_ = 0;
		this.tombstoneWidth_ = 0;
		this.tombstones_ = [];
		this.scroller_ = scroller;
		this.source_ = source;
		this.items_ = [];
		this.loadedItems_ = 0;
		this.requestInProgress_ = false;
		
		this.scroller_.addEventListener('scroll', this.onScroll_.bind(this));
		window.addEventListener('resize', this.onResize_.bind(this));

		// Create an element to force the scroller to allow scrolling to a certain point.
		this.scrollRunway_  = document.createElement('div');
		// Internet explorer seems to require some text in this div in order to ensure that it can be scrolled to.
		this.scrollRunway_.textContent =  ' ';
		this.scrollRunwayEnd_ = 0;
		this.scrollRunway_.style.position = 'absolute';
		this.scrollRunway_.style.width = '1px';
		this.scrollRunway_.style.height = '1px';
		this.scrollRunway_.style.transition = 'transform .2s';
		this.scroller_.appendChild(this.scrollRunway_);
		this.onResize_();
	};
	InfiniteScroller.prototype = {
		onResize_: function () {
			var tombstone = this.source_.createTombstone();
			tombstone.style.position = 'absolute';
			this.scroller_.appendChild(tombstone);
			tombstone.classList.remove('invisible');

			for (var i = 0; i < this.items_.length; i++) {
				this.items_[i].height = this.items_[i].width = 0;
			}
			this.onScroll_();
		},
		/**
		 *	Called when the scroller scrolls. This determines the newly anchored item and offset
		 *	and then updates the visible elements, requesting more items from the source
		 *	if we've scrolled past the end of the currently available content.
		 */
		onScroll_: function () {
			var delta = this.scroller_.scrollTop - this.anchorScrollTop;
			// Special case, if we get to very top, always scroll to top.
			if (this.scroller_.scrollTop === 0) {
				this.anchorItem = { index: 0, offset: 0 };
			}else {
				this.anchorItem = this.calculateAnchoredItem(this.anchorItem, delta);
			}

			this.anchorScrollTop = this.scroller_.scrollTop;
			var lastScreenItem = this.calculateAnchoredItem(this.anchorItem, this.scroller_.offsetHeight);

			if (delta < 0) {
				this.fill(this.anchorItem.index - RUNWAY_ITEMS, lastScreenItem + RUNWAY_ITEMS_OPPSITE);
			}else {
				this.fill(this.anchorItem.index - RUNWAY_ITEMS_OPPSITE, lastScreenItem + RUNWAY_ITEMS);		
			}
		},
		/**
		 *	Calculates the item that should be anchored after scrolling by delta from
		 *	the initial anchored item.
		 *	@param {{index: number, offset number}} initialAnchor The initial position
		 *		to scroll from the before calculating the new anchor position
		 *	@param {number} delta the offset from the initial item to scroll by.
		 *	return {{index: number, offset: number}} Returns the new item and offset
		 * 		scroll should be anchored to.
		 */
		calculateAnchoredItem: function (initialAnchor, delta) {
			if (delta === 0)
				return initialAnchor;
				
		},
		fill: function (start, end) {},
		getTombstone: function () {},
		attahContent: function () {},
		maybeRequestContent: function () {},
		addItem: function () {},
		addContent: function () {}
	}

})(self);