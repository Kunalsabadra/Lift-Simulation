let no_of_floors = document.getElementById('floors');
let no_of_lifts = document.getElementById('lifts');
let form = document.querySelector('.container1')
let liftpage = document.querySelector('.liftpage')
let appartment = document.querySelector('.appartment')
let floors;
let lifts;

form.addEventListener('submit', e => {
    e.preventDefault();
    console.log("Hello")
    validateInputs();
    form.classList.add('hide');
    liftpage.classList.remove('hide');
    createBuilding(floors, lifts);
});

const validateInputs = () => {
    floors = parseInt(no_of_floors.value);
    lifts = parseInt(no_of_lifts.value);

    console.log(`No of floors are ${floors}`)
    console.log(`No of lifts are ${lifts}`)

    if ((lifts === "" || lifts < 1 || lifts > 10) && (floors > 20 || floors < 2 || floors === "")) {
        alert("Please Enter Valid No Of Lifts and Floors")
    }

    else if (lifts > floors) {
        alert("Lifts Cant be more than Floors")
    }

    else if (lifts === "" || lifts < 1 || lifts > 10) {
        alert("Please Enter Valid No Of Lifts");
    }

    else if (floors > 20 || floors < 2 || floors === "") {
        alert("Please Enter Valid No Of Floors")
    }

    // else {
    //     form.classList.add('hide');
    //     appartment.classList.remove('hide');
    //     createBuilding(floors, lifts);
    // }
}

function createBuilding(floors, lifts) {

    for (let floor = floors; floor >= 0; floor--) {
        let One_floor = document.createElement('div');
        One_floor.classList.add('floor');
        // One_floor.setAttribute('floor', floor);

        let btn_wrap = document.createElement('div');
        btn_wrap.classList.add('btn_wrap');

        let up_btn = document.createElement('button');
        let down_btn = document.createElement('button');

        up_btn.classList.add('btn', 'up_btn');
        down_btn.classList.add('btn', 'down_btn');

        if (floor !== floors) btn_wrap.appendChild(up_btn);
        if (floor !== 0) btn_wrap.appendChild(down_btn);

        let floor_name = document.createElement('h5');
        floor_name.classList.add('label');
        floor_name.textContent = `Floor ${floor}`;
        One_floor.appendChild(btn_wrap);


        One_floor.appendChild(floor_name);
        appartment.appendChild(One_floor);
    }
}

