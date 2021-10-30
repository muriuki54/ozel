
document.addEventListener("DOMContentLoaded", function() {

    /** STEP 1 */
    const categoryCards = document.querySelectorAll(".oz_courses_step_1_category_card");

    nodeListToArray(categoryCards).forEach(function(card) {
        card.addEventListener("click", function(e) {
            if(card.classList.contains("selected")) {
                card.classList.remove("selected");
            } else {
                card.classList.add("selected");
            }
        })
    })
    /** END STEP 1 */

    /** STEP 2     */
    const courseCards = document.querySelectorAll(".oz_courses_step_2_course_card");

    nodeListToArray(courseCards).forEach(function(card) {
        card.addEventListener("click", function(e) {
            if(card.classList.contains("selected")) {
                card.classList.remove("selected");
            } else {
                card.classList.add("selected");
            }
        })
    })
    /** END STEP 2 */

    /** STEP 4     */
    const studentDetailCards = document.querySelectorAll(".oz_courses_step_4_card");

    nodeListToArray(studentDetailCards).forEach(function(card, index) {
        new StudentDetailsCard(card, index);
    })
    function StudentDetailsCard(card, index) {
        this.expandStudentFormDetailsForm = card.querySelector(".oz_courses_expand_student_details_form");
        this.deleteStudentFormDetailsForm = card.querySelector(".oz_courses_delete_student_details_form");
        this.saveStudentDetails = card.querySelector(".oz_courses_step_4_student_details_form_save_button");
        this.inputs = [
            document.getElementsByName("oz_courses_step_4_student_firstname")[index],
            document.getElementsByName("oz_courses_step_4_student_middlename")[index],
            document.getElementsByName("oz_courses_step_4_student_lastname")[index],
            document.getElementsByName("oz_courses_step_4_student_phone")[index],
            document.getElementsByName("oz_courses_step_4_student_email")[index],
            document.getElementsByName("oz_courses_student_additional_details")[index],
        ];
        this.emptyFields = false;

        const self = this;

        this.expandStudentFormDetailsForm.addEventListener("click", function() {
            card.classList.add("expanded");
        })

        this.deleteStudentFormDetailsForm.addEventListener("click", function() {
            card.remove();
            // @todo - splice array containing student objects
        })

        this.saveStudentDetails.addEventListener("click", function() {
            // check if any if the inputs are empty
            nodeListToArray(self.inputs).forEach(function(input) {
                input.classList.remove("empty");

                if(input.value === "") {
                    input.classList.add("empty");
                    self.emptyFields = true;
                } else {
                    self.emptyFields = false;
                }
            })

            if(self.emptyFields){
                return;
            } else {
                card.classList.remove("expanded");
            }
        })
    }
    /** END STEP 4 */

    /** STEP 5     */
    const specifyPostalAddress = document.getElementsByName("oz_courses_specify_postal_address")[0]; // same address as specified above
    
    specifyPostalAddress.addEventListener("change", function(e) {
        if(e.target.checked) {
            document.querySelector(".specify_postal_address").classList.add("show");
            document.querySelector("#postalAddressOption").innerText = "Specify postal address";
        } else {
            document.querySelector(".specify_postal_address").classList.remove("show");
            document.querySelector("#postalAddressOption").innerText = "Use same address as above";
        }
    })
    
    /** END STEP 5 */

    // HELPER FUNCTION THAT CONVERTS NODELIST (typeof nodelist == object) INTO AN ARRAY
    function nodeListToArray(nodeList) {
        return Array.from(nodeList);
    }

})