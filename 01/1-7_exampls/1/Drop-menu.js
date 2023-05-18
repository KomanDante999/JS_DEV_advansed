/*
Dependencies: GSAP
new DropMenu({
  container: this.$selectContainer,
  title: "Категория",
  list: [
    {
      name: 'Телефон',
      value: 'tel',
    },
    {
      name: 'Email',
      value: 'email',
    },
    {
      name: 'Vk',
      value: 'url',
    },
  ],
  castomClass: 'contact=choosse',    // users class
  arrow: svg,                        //
  btnHeaderDuration: ,               //
  dropListOpenDuration: ,            //
  dropListCloseDuration: ,           //
  dropListItemHeight: ,              //
})

Setters selectedName and selectedValue defines the selected default element.
If this setters undefinen - selected default first element in list

users classes:
.user {}
.user__btn-header {}
.user__title {}
.user__icon {}
.user__list {}
.user__item {}
.user__btn-select {}
.user__select-contant {}
*/

class DropMenu {
  _arrow = `<svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M5.65674 5.80521L10.5593 0.902607L11.3136 1.65685L5.65674 7.31371L-0.000115871 1.65685L0.754131 0.902607L5.65674 5.80521Z" fill="currentColor"/>
  </svg>`;

  _layoutFinished = false;

  constructor(params) {
    if (params.castomClass) this.castomClass = params.castomClass;
    else this.castomClass = "user-class";

    this.layout(params);
    this.listSelect = [];
    this.createContant(params);
    this.setAnimation(params)
    this.selectedName = this.listSelect[0].name;
    this.selectedValue = this.listSelect[0].value;
    this.isActive = false;
    this.disable = false;

    //* animatuion
    this.dropListOpen = gsap.timeline({ paused: true }).to(".drop-menu__item", {
      height: this.dropListItemHeight,
      duration: this.dropListOpenDuration,
      // ease: "back.out(2)",
      ease: "back.out(8)",
      onStart: () => {
        this.$dropList.classList.add("is-open");
        this.$btnHeader.classList.add("is-open");
      },
    });

      this.dropListClose = gsap
      .timeline({ paused: true })
      .to(".drop-menu__item", {
        height: 0,
        duration: this.dropListCloseDuration,
        onComplete: () => {
          this.$dropList.classList.remove("is-open")
          this.$btnHeader.classList.remove("is-open");
        },
      });

    this.btnHeadAnimation = gsap.timeline({ paused: true }).to(this.$icon, {
      rotateX: 180,
      duration: this.btnHeaderDuration,
    });

    this._layoutFinished = true;

    //* events
    // for (const select of this.listSelect) {
    //   select.$btnSelect.addEventListener("click", () => {
    //     for (const select of this.listSelect) {
    //       select.selected = false;
    //     }
    //     select.selected = true;
    //     this.selectedName = select.name;
    //     this.selectedValue = select.value;
    //     this.isActive = false;
    //   });
    // }

    this.$btnHeader.addEventListener("click", () => {
      this.isActive = !this.isActive;
    });

    this.$header.addEventListener("mousedown", (event) => {
      event._mousedownOnHeader = true;
    });
    document.documentElement.addEventListener("mousedown", (event) => {
      if (!event._mousedownOnHeader & this.isActive) {
        this.isActive = false
      }
    });

  }

  layout(params) {
    this.$header = document.createElement("div");
    this.$btnHeader = document.createElement("button");
    this.$title = document.createElement("span");
    this.$icon = document.createElement("span");
    this.$dropList = document.createElement("ul");

    this.$header.classList.add("drop-menu", `${this.castomClass}`);
    this.$btnHeader.classList.add(
      "drop-menu__btn-header",
      `${this.castomClass}__btn-header`
    );
    this.$title.classList.add("drop-menu__title", `${this.castomClass}__title`);
    this.$icon.classList.add("drop-menu__icon", `${this.castomClass}__icon`);
    this.$dropList.classList.add("drop-menu__list", `${this.castomClass}__list`);
    this.$dropList.tabIndex = "-1";
    this.$btnHeader.type = "button";
    if ("title" in params) this.$title.innerHTML = params.title;
    else this.$title.innerHTML = "Drop Menu";
    if ("arrow" in params) this.$icon.innerHTML = params.arrow;
    else this.$icon.innerHTML = this._arrow;
    this.$btnHeader.append(this.$title, this.$icon);
    this.$header.append(this.$btnHeader, this.$dropList);
    if ("containerId" in params) {
      this.$container = document.getElementById(params.containerId)
      this.$container.append(this.$header);
    }
  }

  createContant(params) {
    for (const item of params.list) {
      this.select = new Select(this.$dropList, item, params.hideCurrentSelect);
      this.select.$box.classList.add(
        "drop-menu__item",
        `${this.castomClass}__item`
      );
      this.select.$btnSelect.classList.add(
        "drop-menu__btn-select",
        `${this.castomClass}__btn-select`
      );
      this.select.$contant.classList.add(
        "drop-menu__select-contant",
        `${this.castomClass}__select-contant`
      );
      this.listSelect.push(this.select);
    }
  }

  setAnimation(params) {
    if ("btnHeaderDuration" in params) this.btnHeaderDuration = params.btnHeaderDuration;
    else this.btnHeaderDuration = 0.5;
    if ("dropListOpenDuration" in params)
      this.dropListOpenDuration = params.dropListOpenDuration;
    else this.dropListOpenDuration = 0.5;
    if ("dropListCloseDuration" in params)
      this.dropListCloseDuration = params.dropListCloseDuration;
    else this.dropListCloseDuration = 0.5;
    if ("dropListItemHeight" in params)
      this.dropListItemHeight = params.dropListItemHeight;
    else this.dropListItemHeight = 22;

  }

  get selectedName() {
    return this._selectedName;
  }

  set selectedName(value) {
    this._selectedName = value;
    if (value) {
      for (const select of this.listSelect) {
        select.selected = false;
        if (select.name == value) select.selected = true;
      }
    }
  }

  get selectedValue() {
    return this._selectedValue;
  }

  set selectedValue(value) {
    this._selectedValue = value;
  }

  get isActive() {
    return this._isActive;
  }

  set isActive(value) {
    this._isActive = value;

    if (this._layoutFinished) {
      if (value) {
        this.dropListClose.kill();
        this.dropListOpen.play();
        this.btnHeadAnimation.play();
        this.dropListOpen.restart();
      } else {
        this.dropListOpen.kill();
        this.dropListClose.play();
        this.btnHeadAnimation.reverse();
        this.dropListClose.restart();
      }
    }
  }

  get disable() {
    return this._disable;
  }

  set disable(value) {
    this._disable = value;
    if (value) {
      this.$btnHeader.disabled = true;
      this.$header.classList.add("is-disable");
      this.$btnHeader.classList.add("is-disable");
    } else {
      this.$btnHeader.disabled = false;
      this.$header.classList.remove("is-disable");
      this.$btnHeader.classList.remove("is-disable");
    }
  }
};

class Select {
  _selected = false

  constructor(container, params) {
    this.selected = this._selected
    this.name = params.name
    this.value = params.value
    this.$box = document.createElement('li')
    this.$btnSelect = document.createElement('button')
    this.$btnSelect.type = 'button'
    this.$contant = document.createElement('span')
    this.$contant.innerHTML = this.name

    this.$btnSelect.append(this.$contant)
    this.$box.append(this.$btnSelect)
    container.append(this.$box)
  }

  get selected() {
    return this._selected
  }

  set selected(value) {
    this._selected = value
  }
}


new DropMenu({
  containerId: "drop-menu",
  title: "Категория",
  list: [
    {
      name: "Телефон",
      value: "tel",
    },
    {
      name: "Email",
      value: "email",
    },
    {
      name: "Vk",
      value: "url",
    },
  ],
  // btnHeaderDuration: ,               //
  // dropListOpenDuration: ,            //
  // dropListCloseDuration: ,           //
  // dropListItemHeight: ,              //
});



