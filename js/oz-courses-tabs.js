document.addEventListener("DOMContentLoaded", function() {
    const ozCoursesTabsWrapper = document.querySelectorAll(".oz_courses_tabs_wrapper");

    nodeListToArray(ozCoursesTabsWrapper).forEach(function(tab) {
        new Tab(tab);
    })

    function Tab(tab) {
        this.startIndex = 0;
        this.stepsProgressBar = tab.querySelector(".oz_courses_steps_progress_bar");
        this.stepButtons = tab.querySelectorAll(".oz_courses_step_button");
        this.innerTabsWrapper = tab.querySelector(".oz_courses_inner_tabs_wrapper");
        this.goToPreviousTabControl = tab.querySelector(".oz_courses_tabs_direction_controls .goToPreviousTab");
        this.goToNextTabControl = tab.querySelector(".oz_courses_tabs_direction_controls .goToNextTab");
        this.size = tab.clientWidth;

        this.innerTabs = tab.querySelectorAll(".oz_courses_inner_tab");
        this.previousButton = tab.querySelector(".previous_slide_button");
        this.nextButton = tab.querySelector(".next_slide_button");
        const self = this;

        // METHOD RESPONSIBLE FOR TRANSLATING THE TABS
        this.translateX = function() {
            self.innerTabsWrapper.style.transform = "translate("+self.startIndex * -self.size+"px)";
            self.stepsProgressBar.style.backgroundSize = ""+(self.startIndex/(self.innerTabs.length - 1)) * 100+"% 100%";

            // initially remove active class from all step buttons
            nodeListToArray(self.stepButtons).forEach(function(button) {
                button.classList.remove("active");
            })

            // add active class to buttons in the selected range
            for(let i = 0; i <= self.startIndex; i++) {
                nodeListToArray(self.stepButtons)[i].classList.add("active");
            }
        }

        // call the translate method on window load - for testing o we can jump to a tab we want without having to click it
        this.translateX();

        // GO TO THE SELECTED TAB WHEN STEP BUTTON IS CLICKED
        nodeListToArray(self.stepButtons).forEach(function(button, index) {
            button.addEventListener("click", function() {
                self.startIndex = Number(index);
                self.translateX();
            })
        })

        // DIRECTION CONTROLS
        this.goToPreviousTabControl.addEventListener("click", function(e) {
            if(self.startIndex <= 0) {
                e.target.classList.add("disable");
                return;
            }

            self.resetControls();
            self.startIndex--;
            self.translateX();
        })

        this.goToNextTabControl .addEventListener("click", function(e) {
            if(self.startIndex >= self.innerTabs.length - 1) {
                e.target.classList.add("disable");
                return;
            }

            self.resetControls();
            self.startIndex++;
            self.translateX();
        })
        // END DIRECTION CONTROLS

        // CHECK FOR DISABLE CLASS ON THE DIRECTION CONTROL BUTTONS
        this.resetControls = function() {
            if(self.goToPreviousTabControl.classList.contains("disable")) {
                self.goToPreviousTabControl.classList.remove("disable")
            }

            if(self.goToNextTabControl.classList.contains("disable")) {
                self.goToNextTabControl.classList.remove("disable")
            }
        }

        // LISTEN FOR WINDOW RESIZE
        window.addEventListener("resize", function() {
            self.size = tab.clientWidth;
            self.translateX();
        })

    }

    function nodeListToArray(nodeList) {
        return Array.from(nodeList);
    }

})