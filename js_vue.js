Vue.component('other-features', {
	props: ['item'],
	template: '<li class="size-14">{{item.feature}}</li>'
})

let app = new Vue({
	el: '#app',
	data: {
		product: {name: "ASUS GeForce RTX2060", price: 320},
		description: "6GB 192Bit 1710/14000Mhz",
		image: "https://raw.githubusercontent.com/AlexandrChek/vue_test/master/v_card.webp",
		altText: "V-card RTX2060",
		buyButton: "E:/Саша/Фронт-енд/Vue/buy_button_big.jpg",
		basket: [],
		total: 0,
		link: "https://www.asus.com/ru/Motherboards-Components/Graphics-Cards/Dual/DUAL-RTX2070-8G-EVO/",
		selected: "",
		like: "E:/Саша/Фронт-енд/Vue/like.jpg",
		sumLikes: 0,
		weekProduct: false,
		monthProduct: false,
		addOffers: [
			{offer: "Cabel PowerPlant HDMI 2m", price: 12},
			{offer: "Cooler ASUS STRIX XF120", price: 25},
			{offer: "Additional warranty for 2 years", price: 27}
		],
		basketImg: "E:/Саша/Фронт-енд/Vue/basket.png",
		classObject: {
			blue: false
		},
		classObjectChip: {
			increasedprops: false
		},
		classObjectInterface: {
			increasedprops: false
		},
		classObjectPhysicalPr: {
			increasedprops: false
		},
		classObjectReview: {
			blue: false
		},
		mainFeatures: [
			"Chip manufacturer: nVidia",
			"Memory Interface: 192-bit",
			"Built-in memory: 6 Gb"
		],
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
		],
		rightButton: "E:/Саша/Фронт-енд/Vue/right_button.webp",
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
		counter: function (event) {
			if (event) {
				this.sumLikes = this.sumLikes + 1;
			}
			if (this.sumLikes >= 10 && this.sumLikes < 20) {
				this.weekProduct = true;
			} else {
				this.weekProduct = false;
			}
			if (this.sumLikes >= 20) {
				this.monthProduct = true;
			}
		},
		onMouseoverChip: function (event) {
			if(event) {
				this.classObjectChip.increasedprops = true;
			}
		},
		onMouseoutChip: function (event) {
			if (event) {
				this.classObjectChip.increasedprops = false;
			}
		},
		onMouseoverInterface: function (event) {
			if(event) {
				this.classObjectInterface.increasedprops = true;
			}
		},
		onMouseoutInterface: function (event) {
			if (event) {
				this.classObjectInterface.increasedprops = false;
			}
		},
		onMouseoverPhysicalPr: function (event) {
			if(event) {
				this.classObjectPhysicalPr.increasedprops = true;
			}
		},
		onMouseoutPhysicalPr: function (event) {
			if (event) {
				this.classObjectPhysicalPr.increasedprops = false;
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