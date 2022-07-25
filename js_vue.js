let eventBus = new Vue();

Vue.component('animation', {
	template: `<div class="animation">
					<img id="space" v-bind:src="space" alt="Space">
					<p class="planet">
						<img id="planet" v-bind:src="planet" alt="Planet">
					</p>
					<p id="ad">This could be your ad!</p>
				</div>`,
	data () {
		return {
			space: "https://github.com/AlexandrChek/vue_test/blob/master/space.jpg",
			planet: "https://github.com/AlexandrChek/vue_test/blob/master/planet.jpg"
		}
	}
});

Vue.component('reviews-form', {
	template: `<form>
					<p>
						<input type="text" placeholder="Erter your name"
							v-model="currentName"
							v-bind:class="classObjectName"
							v-on:focus="onFocusName"
							v-on:blur="offFocusName">
					</p>
					<p>
						<textarea id="review" placeholder="Enter your review"
							v-model="currentReview"
							v-bind:class="classObjectReview"
							v-on:focus="onFocusReview"
							v-on:blur="offFocusReview"
							v-on:keyup="activeBut">
						</textarea>
					</p>
					<p>
						<button id="send-but"
							v-bind:disabled="buttonState"
							v-on:click.prevent="send">
								Send
						</button>
					<p/>
				</form>`,
	data () {
		return {
			currentName: "",
			currentReview: "",
			buttonState: true,
			classObjectName: {
				blue: false
			},
			classObjectReview: {
				blue: false
			},
		}
	},
	methods: {
		onFocusName: function (event) {
			if (event) {
				this.classObjectName.blue = true;
			}
		},
		offFocusName: function (event) {
			if (event) {
				this.classObjectName.blue = false;
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
				if (this.currentName === "") {
					alert('Enter you name first, please!');
				}
				else {
					let reviewObj = {
						name: this.currentName,
						review: this.currentReview
					};
					eventBus.$emit('transferReview', reviewObj);
					this.currentName = "";
					this.currentReview = "";
				}
			}
		}
	}
});

Vue.component('reviews-list', {
	template: `<ul id="reviews-list">
					<li v-for="value in reviews">
						<span id="name">{{value.name | capitalize}}: </span>{{value.review | capitalize}}
					</li>
			   </ul>`,
	data () {
		return {
			reviews: []
		}
	},
	mounted () {
		eventBus.$on('transferReview', (reviewObj) => {
			this.reviews.push(reviewObj);
		})
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

Vue.component('promo', {
	template: `<div class="promo">
					<p>
						Make an order & click right button
						<img id="right-button" v-bind:src="rightButton" alt="right-button" v-on:contextmenu.prevent="promo">
		 				to have a promocode for purchases in the stores of our partners.
					</p>
					<p id="code" v-if="visible">
						Code: {{promocode}}. &nbsp &nbsp &nbsp Discount: {{discount}} %
					</p>
				</div>`,
	data () {
		return {
			rightButton: "https://raw.githubusercontent.com/AlexandrChek/vue_test/master/right_button.webp",
			addOffers: [],
			visible: false,
			promocode: "",
		}
	},
	mounted () {
		eventBus.$on ('transferAddOffers', (offersArr) => {
			this.addOffers = offersArr;
		})
	},
	methods: {
		promo: function (event) {
			if (event) {
				if (app.total === 0) {
					alert('Make an order first, please!');
				} else {
					this.visible = true;
				}
			}
		}
	},
	computed: {
		discount: function () {
			let d = 0;
			if (app.total === app.product.price) {
				d = 1;
				this.promocode = "22ABC01";
			} else if (app.total === app.product.price + this.addOffers[0].price) {
				d = 2;
				this.promocode = "22ABC02";
			} else if (app.total === app.product.price + this.addOffers[0].price + this.addOffers[1].price) {
				d = 3;
				this.promocode = "22ABC03";
			} else if (app.total > app.product.price + this.addOffers[0].price + this.addOffers[1].price) {
				d = 4;
				this.promocode = "22ABC04";
			}
			return d;
		}
	}
});

Vue.component('buying', {
	template: `<img id="buy-but-big" v-bind:src="buyButton" alt="Buy" v-on:click="buy">`,
	data () {
		return {
			buyButton: "https://raw.githubusercontent.com/AlexandrChek/vue_test/master/buy_button_big.jpg"
		}
	},
	methods: {
		buy: function (event) {
			let value = app.product;
			if (event) {
				this.$emit('buy', value);
			}
		}
	}
});

Vue.component('add-offers', {
	template: `<div class="add-offers">
					<p> Together with the product you can buy the next goods/servises with the special prices:</p>
					<table class="tab-add-offers">
						<tr v-for="value in addOffers">
							<td class="cell-1">{{value.offer}}</td>
							<td class="cell-2">{{value.price}}$</td>
							<td class="cell-2">
								<button class="buy-but" v-on:click="addBuy(value)">Buy</button>
							</td>
						</tr>
					</table>
			   </div>`,
	data () {
		return {
			addOffers: [
				{offer: "Cabel PowerPlant HDMI 2m", price: 12},
				{offer: "Cooler ASUS STRIX XF120", price: 25},
				{offer: "Additional warranty for 2 years", price: 27}
			]
		}
	},
	methods: {
		addBuy: function (value) {
			this.$emit('add-buy', value);
			let offersArr = this.addOffers;
			eventBus.$emit('transferAddOffers', offersArr);
		}
	}
});

Vue.component('grade', {
	template: `<div id="evaluation">
					<p id="label">Rate the product </p>
					<form>
						<select v-model="selected" v-bind:class="classObjectGrade" v-on:focus="onFocusGrade" v-on:blur="offFocusGrade">
							<option disabled>-Grade-</option>
							<option>Very good</option>
							<option>Good</option>
							<option>Bad</option>
						</select>
					</form>
					<p id="grade">Grade is: {{selected}}</p>
			   </div>`,
	data () {
		return {
			selected: "",
			classObjectGrade: {
				blue: false
			}
		}
	},
	methods: {
		onFocusGrade: function (event) {
			if (event) {
				this.classObjectGrade.blue = true;
			}
		},
		offFocusGrade: function (event) {
			if (event) {
				this.classObjectGrade.blue = false;
			}
		}
	}
});

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
					<li>{{item}}</li>
			   </ul>`
});

Vue.component('main-features', {
	template: `<div class="main-features">
					<h2 id="main-features">Main features</h2>
					<features-list class="m-features-list"
						v-for="value in mainFeatures"
						v-bind:item="value">
					</features-list>
			   </div>`,
	data () {
		return {
			mainFeatures: [
				"Chip manufacturer: nVidia",
				"Memory Interface: 192-bit",
				"Built-in memory: 6 Gb"
			]
		}
	}
});

Vue.component('other-features', {
	template: `<div class="other-features">
					<div class="features">
						<h4 class="center">Chip and memory</h4>
						<features-list v-for="value in chipAndMemory" v-bind:item="value"></features-list>
					</div>
					<div class="features">
                		<h4 class="center">Interface</h4>
                    	<features-list v-for="value in interface" v-bind:item="value"></features-list>
            		</div>
					<div class="features">
                		<h4 class="center">Physical properties</h4>
                    	<features-list v-for="value in physicalProps" v-bind:item="value"></features-list>
            		</div>
				</div>`,
	data () {
		return {
			chipAndMemory: [
				"Nominal frequency: 1365 MHz",
				"Boost frequency: 1785 MHz",
				"Memory type: GDDR6",
				"Memory Speed: 14000 MHz"
			],
			interface: [
				"Bus Standard: PCI Express 3.0",
				"Connectors: 1xDP, 1xDVI, 2хHDMI",
				"Maximum Display Support: 4",
				"Digital Max Resolution: 7680x4320"
			],
			physicalProps: [
				"Recommended PSU: 500 W",
				"Power connectors: 8 pin",
				"Dimensions: 242 x 130 x 53 mm",
				"Number of fans: 2"
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
		basket: [],
		total: 0,
		basketImg: "https://raw.githubusercontent.com/AlexandrChek/vue_test/master/basket.png",
		link: "https://www.asus.com/ru/Motherboards-Components/Graphics-Cards/Dual/DUAL-RTX2070-8G-EVO/"
	},
	methods: {
		addToBasket: function (value) {
			this.basket.push(value);
			let t = 0;
			for (let i = 0; i < this.basket.length; i++) {
				t += this.basket[i].price;
			}
			this.total = t;
		}
	}
});