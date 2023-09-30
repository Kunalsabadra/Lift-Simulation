let no_of_floors = document.getElementById('floors');
let no_of_lifts = document.getElementById('lifts');
let form = document.querySelector('.container1')
let liftpage = document.querySelector('.liftpage')
let appartment = document.querySelector('.appartment')
let floors;
let lifts;
let lifts_info = [];
let lift_requests = [];

form.addEventListener('submit', e => {
    e.preventDefault();
    // console.log("Hello")
    validateInputs();
    form.classList.add('hide');
    liftpage.classList.remove('hide');
    createBuilding(floors, lifts);
    initially();
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

function createBuilding() {

    for (let floor = floors; floor >= 0; floor--) {
        let One_floor = document.createElement('div');
        One_floor.classList.add('floor');
        One_floor.setAttribute('floor', floor);


        let btn_wrap = document.createElement('div');
        btn_wrap.classList.add('btn_wrap');

        let up_btn = document.createElement('button');
        let down_btn = document.createElement('button');

        up_btn.classList.add('btn', 'up_btn');
        down_btn.classList.add('btn', 'down_btn');
        up_btn.setAttribute('floor', floor);
        down_btn.setAttribute('floor', floor);
        up_btn.onclick = (event) => addRequest(event);
        down_btn.onclick = (event) => addRequest(event);

        if (floor !== floors) btn_wrap.appendChild(up_btn);
        if (floor !== 0) btn_wrap.appendChild(down_btn);

        let floor_name = document.createElement('h5');
        floor_name.classList.add('label');
        floor_name.textContent = `Floor ${floor}`;
        One_floor.appendChild(btn_wrap);

        if (floor == 0) {
            for (let lift = 1; lift <= lifts; lift++) {
                let One_lift = document.createElement('div');
                One_lift.innerHTML = `
                    <div class="door left open"></div>
                    <div class="door right open"></div>
                `;
                One_lift.classList.add('lift');
                One_floor.appendChild(One_lift);
            }
        }

        One_floor.appendChild(floor_name);
        appartment.appendChild(One_floor);
    }
}

function initially() {
    let all_lifts = document.querySelectorAll('.lift');
    for (let i = 0; i < all_lifts.length; i++) {
        lifts_info.push({
            One_lift: all_lifts[i],
            floor: 0,
            isMoving: false
        })
    }
}

function addRequest(e) {
    const new_floor = e.target.getAttribute('floor');

    e.target.classList.toggle('btn_toggle');
    lift_requests.push(e.target);
    fulfillRequest();
}

function get_lift(nextFloor) {
    let free_lift = lifts_info.filter((lift) => lift.isMoving === false);
    if (free_lift.length === 0) return null;

    free_lift.sort((a, b) => {
        return Math.abs(nextFloor - a.floor) - Math.abs(nextFloor - b.floor);
    })
    return free_lift[0];
}

function updateLiftData(One_lift, isMoving, floor) {
    for (let i = 0; i < lifts_info.length; i++) {
        if (lifts_info[i].One_lift === One_lift) {
            lifts_info[i].isMoving = isMoving;
            lifts_info.floor = floor;
        }
    }
}


function fulfillRequest() {
    console.log('inside fulfillrequest function');
    let lift_called = get_lift(lift_requests[0].getAttribute('floor'));
    if (lift_called === null) {
        return setTimeout(() => {
            fulfillRequest();
        }, 5000);
    }

    let { One_lift, floor: currFloor, isMoving } = get_lift(lift_requests[0].getAttribute('floor'));

    let nextFloorElement = lift_requests.shift();
    const next_floor = Number(nextFloorElement.getAttribute('floor'));

    console.log("Present Floor: ", currFloor);
    // console.log("nextFloor: ", next_floor);


    updateLiftData(One_lift, true, next_floor);

    const distbtnFloor = Math.abs(next_floor - currFloor);
    moveLift(distbtnFloor, next_floor, One_lift);

    setTimeout(() => {
        nextFloorElement.classList.toggle('btn_toggle');

        setTimeout(() => {
            updateLiftData(One_lift, false, next_floor);
            fulfillRequest();
        }, 2500)
    }, 200 * distbtnFloor)

}

//Throwing error : Uncaught TypeError: Cannot read property 'firstElementChild' of undefined when expanding posts in a certain order
function moveLift(distbtnFloor, next_floor, One_lift) {
    if (next_floor > floors || next_floor < 0) return;
    const liftHeight = One_lift.firstElementChild.offsetHeight;
    One_lift.style.transform = `translateY(-${next_floor * (liftHeight + 2)}px)`
    One_lift.style.transition = `transform ${2 * distbtnFloor}s ease`;
}

