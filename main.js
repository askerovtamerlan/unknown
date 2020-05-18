var vueInstance = new Vue({
  el: "#app",
  data: {
    // login window
    showLoginPopup: false,

    // dropdown town selection
    showTownSelector: false,

    // data about location block
    location: "Екатеринбург",
    locationBlockVisibity: true,
    locations: ["Москва", "Екатеринбург", "Санкт-Петербург", "Нижний Новгород"],
    // menu
    // * inputs
    name: "",
    showOptionsSelector: false,

    options: {
      filters: {
        Рейтинг: false,
        Отзывы: false,
        Алфавит: false,
      },

      triggers: {
        location: true,
        data: false,
        balance: false,
      },
    },
    // * selectors
    section: "",
    sections: ["Рубрика №1", "Рубрика №2", "Рубрика №3", "Рубрика №4"],
    showSectionSelector: false,

    subSection: "",
    subSections: [
      "Подрубрика №1",
      "Подрубрика №2",
      "Подрубрика №3",
      "Подрубрика №4",
    ],
    showSubSectionSelector: false,
  },
  mounted() {
    var startPos;
    let geoSuccess = function (position) {
      startPos = position;
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);
    };
    console.log("start");

    // navigator.geolocation.getCurrentPosition(geoSuccess);
    // console.log(navigator.geolocation);
  },
  watch: {
    // section: function () {
    //   this.dropdownSectionList;
    // },
  },
  computed: {
    dropdownSectionList() {
      let array = [...this.sections];

      let field = this.section;

      let index = array.indexOf(field);
      array.unshift(array[index]);
      index++;
      array.splice(index, 1);

      return array;
    },
    dropdownSubSectionList() {
      let array = [...this.subSections];

      let field = this.subSection;

      let index = array.indexOf(field);
      array.unshift(array[index]);
      index++;
      array.splice(index, 1);

      return array;
    },
    dropdownTownList() {
      let array = [...this.locations];

      let field = this.location;

      let index = array.indexOf(field);
      array.unshift(array[index]);
      index++;
      array.splice(index, 1);

      return array;
    },
  },
  methods: {
    showLoginScreen() {
      this.showLoginPopup = !this.showLoginPopup;
    },
    changeTown(town) {
      // alert("check");
      console.log("change town");
      if (!town) {
        this.showTownSelector = true;
      } else {
        this.location = town;
        this.locationBlockVisibity = false;
        this.showTownSelector = false;
      }
    },
    changeSection(section) {
      if (!section) {
        this.showSectionSelector = true;
      } else {
        this.section = section;
        this.showSectionSelector = false;
      }
    },
    changeSubSection(subSection) {
      if (!subSection) {
        this.showSubSectionSelector = true;
      } else {
        this.subSection = subSection;
        this.showSubSectionSelector = false;
      }
    },
    showOptions() {
      this.showOptionsSelector = !this.showOptionsSelector;
    },
    changeFilters(filterName) {
      console.log("changeFilters", filterName);
      this.$set(
        this.options.filters,
        filterName,
        !this.options.filters[`${filterName}`]
      );
    },
    changeCategory(category) {
      for (const trigger in this.options.triggers) {
        this.$set(this.options.triggers, `${trigger}`, false);
        this.toggleIcon(trigger, "_off");
      }

      this.$set(this.options.triggers, `${category}`, true);
      this.toggleIcon(category, "_on");
    },
    toggleIcon(category, status) {
      const imageElement = document.getElementById(`icon-${category}`);
      const src = imageElement.getAttribute("src");

      let url = "";

      if (src.includes("_off") && status === "_on") {
        url = src.replace("_off", "_on");
      } else if (src.includes("_on") && status === "_off") {
        url = src.replace("_on", "_off");
      } else {
        url = src;
      }

      imageElement.setAttribute("src", url);
    },
  },
});
