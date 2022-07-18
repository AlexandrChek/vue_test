Vue.component('rating', {
	template: `<div class="rating">
					<div>
						<img v-bind:src="like" alt="Like" id="click-like" v-on:click="counter">
						<p id="sum-likes">{{sumLikes}}</p>
					</div>
					<p id="week-prod" v-if="weekProduct">Product of the week !!!</p>
					<p id="month-prod" v-else-if="monthProduct">Product of the month !!!</p>
			   </div>`,
	data () {
		return {
			like: "https://raw.githubusercontent.com/AlexandrChek/vue_test/master/like.jpg",
			sumLikes: 0,
			weekProduct: false,
			monthProduct: false,
		}
	},
	methods: {
		counter: function (event) {
			if (event) {
				this.sumLikes += 1;
			}
			if (this.sumLikes >= 5 && this.sumLikes < 10) {
				this.weekProduct = true;
			} else {
				this.weekProduct = false;
			}
			if (this.sumLikes >= 10) {
				this.monthProduct = true;
			}
		}
	}
});

Vue.component('features-list', {
	props: ['item'],
	template: `<ul>
					<li class="size-14">{{item.feature}}</li>
			   </ul>`
});

Vue.component('other-features', {
	template: `<div class="other-features">
					<div class="features">
						<h4 class="center">Chip and memory</h4>
						<features-list v-for="value in chipAndMemory"
							v-bind:item="value">
						</features-list>
					</div>
					<div class="features">
                		<h4 class="center">Interface</h4>
                    	<features-list v-for="value in interface"
							v-bind:item="value">
						</features-list>
            		</div>
					<div class="features">
                		<h4 class="center">Physical properties</h4>
                    	<features-list v-for="value in physicalProps"
							v-bind:item="value">
						</features-list>
            		</div>
				</div>`,
	data () {
		return {
			chipAndMemory: [
				{feature: "Nominal frequency: 1365 MHz"},
				{feature: "Boost frequency: 1785 MHz"},
				{feature: "Memory type: GDDR6"},
				{feature: "Memory Speed: 14000 MHz"}
			],
			interface: [
				{feature: "Bus Standard: PCI Express 3.0"},
				{feature: "Connectors: 1xDP, 1xDVI, 2хHDMI"},
				{feature: "Maximum Display Support: 4"},
				{feature: "Digital Max Resolution: 7680x4320"}
			],
			physicalProps: [
				{feature: "Recommended PSU: 500 W"},
				{feature: "Power connectors: 8 pin"},
				{feature: "Dimensions: 242 x 130 x 53 mm"},
				{feature:"Number of fans: 2"}
			]
		}
	}
});

let app = new Vue({
	el: '#app',
	data: {
		product: {name: "ASUS GeForce RTX2060", price: 320},
		description: "6GB 192Bit 1710/14000Mhz",
		image: "https://raw.githubusercontent.com/AlexandrChek/vue_test/master/v_card.webp",
		altText: "V-card RTX2060",
		buyButton: "https://raw.githubusercontent.com/AlexandrChek/vue_test/master/buy_button_big.jpg",
		basket: [],
		total: 0,
		link: "https://www.asus.com/ru/Motherboards-Components/Graphics-Cards/Dual/DUAL-RTX2070-8G-EVO/",
		selected: "",
		addOffers: [
			{offer: "Cabel PowerPlant HDMI 2m", price: 12},
			{offer: "Cooler ASUS STRIX XF120", price: 25},
			{offer: "Additional warranty for 2 years", price: 27}
		],
		basketImg: "https://raw.githubusercontent.com/AlexandrChek/vue_test/master/basket.png",
		classObject: {
			blue: false
		},
		classObjectReview: {
			blue: false
		},
		mainFeatures: [
			"Chip manufacturer: nVidia",
			"Memory Interface: 192-bit",
			"Built-in memory: 6 Gb"
		],
		rightButton: "https://raw.githubusercontent.com/AlexandrChek/vue_test/master/right_button.webp",
		visible: false,
		promocode: "",
		reviews: [],
		currentReview: "",
		buttonState: true
	},
	computed: {
		discount: function () {
			let d = 0;
			if (this.total === this.product.price) {
				d = 1;
				this.promocode = "22ABC01";
			} else if (this.total === this.product.price + this.addOffers[0].price) {
				d = 2;
				this.promocode = "22ABC02";
			} else if (this.total === this.product.price + this.addOffers[0].price + this.addOffers[1].price) {
				d = 3;
				this.promocode = "22ABC03";
			} else if (this.total > this.product.price + this.addOffers[0].price + this.addOffers[1].price) {
				d = 4;
				this.promocode = "22ABC04";
			}
			return d;
		}
	},
	watch: {
		basket: function (val) {
			this.updateTotal();
		}
	},
	methods: {
		buy: function (event) {
			if (event) {
				this.basket.push(this.product);
			}
		},
		addBuy: function (value) {
			this.basket.push(value);
		},
		updateTotal: function () {
			let t = 0;
			for (let i = 0; i < this.basket.length; i++) {
				t += this.basket[i].price;
			}
			this.total = t;
		},
		onFocus: function (event) {
			if (event) {
				this.classObject.blue = true;
			}
		},
		offFocus: function (event) {
			if (event) {
				this.classObject.blue = false;
			}
		},
		promo: function (event) {
			if (event) {
				if (this.total === 0) {
					alert('Make an order first, please!');
				} else {
					this.visible = true;
				}
			}
		},
		onFocusReview: function (event) {
			if (event) {
				this.classObjectReview.blue = true;
			}
		},
		offFocusReview: function (event) {
			if (event) {
				this.classObjectReview.blue = false;
			}
		},
		activeBut: function (event) {
			if (event) {
				this.buttonState = false;
			}
		},
		send: function (event) {
			if (event) {
				this.reviews.push(this.currentReview);
				this.currentReview = "";
			}
		}
	},
	filters: {
		capitalize: function (value) {
			if (!value) {
				return '';
			}
			return value[0].toUpperCase() + value.slice(1);
		}
	}
});